import { api } from "@/api/api";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  nombre?: string;
  email?: string;
  is_admin?: boolean;
  biblioteca: {
    nombre: string;
  };
  role: string;
};

type AuthContextType = {
  logueado: boolean;
  login: (data: { accessToken: string; refreshToken: string }) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  user: User | null;
  loading: boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [logueado, setLogueado] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    let guest = "GUEST";
    let admin = "ADMIN";
    let lector = "LECTOR";

    useEffect(() => {
        const initAuth = async () => {
            await doRefreshToken()
        }

        initAuth()
    }, [])

    const doRefreshToken = async () => {
        const refreshToken = await SecureStore.getItemAsync("token");
        const authType = await SecureStore.getItemAsync("authType");

        if (!refreshToken || !authType) {
            setLoading(false);
            return;
        }

        try {
            const endpoint =
                authType === guest
                    ? `/refresh-token-invitado`
                    : `/refresh-token`;

            const request = await api.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (request.data.success) {
                const newAccessToken = request.data.accessToken;
                const decoded = jwtDecode(newAccessToken);
                console.log("TOKEN DECODIFICADO:", decoded);
                setLogueado(true);
                setToken(newAccessToken);

                // if (authType === guest) {
                //     setUser({
                //         email: decoded.email,
                //         biblioteca: {
                //             nombre: decoded.biblioteca.nombre
                //         },
                //         role: guest
                //     });
                // } else {
                //     setUser({
                //         nombre: decoded.nombre,
                //         is_admin: decoded.is_admin,
                //         biblioteca: {
                //             nombre: decoded.biblioteca.nombre
                //         },
                //         role: decoded.is_admin ? admin : lector
                //     });
                // }
            }

        } catch (error) {
            await logout();
            alert("Ha surgido un error, por favor intente más tarde");
        } finally {
            setLoading(false);
        }

    }

    const login = async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
        const decoded = jwtDecode(accessToken);
        console.log("TOKEN DECODIFICADO:", decoded);
        // setLogueado(true);
        // setToken(accessToken);

        // if (decoded.role === guest) {
        //     setUser({
        //         email: decoded.email,
        //         biblioteca: {
        //             nombre: decoded.biblioteca.nombre
        //         },
        //         role: guest
        //     });

        //     await SecureStore.setItemAsync("authType", guest);
        // } else {
        //     setUser({
        //     nombre: decoded.nombre,
        //     is_admin: decoded.is_admin,
        //     biblioteca: {
        //         nombre: decoded.biblioteca.nombre
        //     },
        //     role: decoded.is_admin ? admin : lector
        // });
        //     await SecureStore.setItemAsync("authType", lector);
        // }
        await SecureStore.setItemAsync("token", refreshToken);
    }

    const logout = async () => {
        setLogueado(false);
        setToken(null);
        setUser(null);
        await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("authType");
    }

    return (
        <AuthContext.Provider value={{logueado, login, logout, token, user, loading}}>
            {(loading)
            ?
                <div>
                    Cargando...
                </div>
                :
                children
        }
        </AuthContext.Provider>
    )
};