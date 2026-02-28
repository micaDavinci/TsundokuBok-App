import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAuth } from "@/context/AuthContext";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LibroPrestado } from "../prestamo/libroPrestado";

export default function prestamos() {

    const [show, setShow] = useState(false);

    const { token } = useAuth();
    const [prestamosList, setPrestamosList] = useState([]);
    const [librosDisponibles, setLibrosDisponibles] = useState([]);
    const [persona, setPersona] = useState("");
    const [libro, setLibro] = useState("");
    const [fechaPrestamo, setFechaPrestamo] = useState("");

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (token) {
                getPrestamoList();
            }
        }, [])
    );

    const getPrestamoList = async () => {
        try {
            const request = await api.get(`/prestamos`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                setPrestamosList(request.data.result);
            } else {
                Alert.alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ha surgido un error, por favor intente más tarde");
        }
    }

    const handleNuevo = () => {
        router.push('/prestamo/nuevoPrestamo');
    }

    const onRefresh = () => {
        setRefreshing(true);
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView headerBackgroundColor={{ light: '#6A7666', dark: '#2B3035' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#C69D91"
                        colors={["#C69D91"]}
                    />
                }
            >
                <View style={styles.headerRow}>
                    <Text variant="displaySmall" style={styles.titulo}>
                        Préstamos
                    </Text>
                </View>
                <View style={styles.headerRow}>
                                    <Text style={styles.aclaracionText}>La gestión de préstamos se realiza desde la página web</Text>
                                </View>

                <View>
                    {prestamosList.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay préstamos creados todavía</Text>
                            <Text style={styles.emptySub}>Desliza hacia abajo para actualizar</Text>
                        </View>
                    ) : (
                        prestamosList.map((prestamo) => (
                            <LibroPrestado prestamo={prestamo} />
                        ))
                    )}
                </View>


            </ParallaxScrollView>
        </>



    )
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    titulo: {
        color: '#E4DAC9',
        fontWeight: 'bold',
    },
    logoutBtn: {
        borderColor: '#C69D91',
        borderRadius: 12,
    },
    emptyContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#E4DAC9',
        fontSize: 18,
        opacity: 0.8,
    },
    emptySub: {
        color: '#C69D91',
        fontSize: 14,
        marginTop: 8,
    },
    aclaracionText: {
        color: '#6A7666',
        fontSize: 14,
        opacity: 0.8,
    },
});