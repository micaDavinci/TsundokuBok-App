
import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAuth } from "@/context/AuthContext";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import { FAB, IconButton, Text } from "react-native-paper";
import { EstanteList } from "../biblioteca/estanteList";

export default function Biblioteca() {
    const { token } = useAuth();
    const [estantes, setEstantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { logout } = useAuth();

    useFocusEffect(
        useCallback(() => {
            if (token) {
                getEstantes();
            }
        }, [])
    );

    const getEstantes = async () => {
        setLoading(true);
        try {
            const request = await api.get("/estantes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                setEstantes(request.data.result);
            } else {
                Alert.alert("Error", request.data.message);
            }
        } catch (error: any) {
            console.error("Error completo", error);
            const mensaje = error.response?.data?.message
            Alert.alert("Error", mensaje);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const router = useRouter();
    const handleNuevo = () => {
        router.push('/biblioteca/nuevoEstante');
    }

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    }

    const onRefresh = () => {
        setRefreshing(true);
        getEstantes();
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
                        Biblioteca
                    </Text>

                    <IconButton
                        icon="logout"
                        mode="outlined"
                        iconColor="#C69D91"
                        size={24}
                        onPress={handleLogout}
                        style={styles.logoutBtn}
                    />
                </View>

                <View>
                    {estantes.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay estantes creados todavía</Text>
                            <Text style={styles.emptySub}>Desliza hacia abajo para actualizar</Text>
                        </View>
                    ) : (
                        estantes.map((estante) => (
                            <EstanteList estante={estante} />
                        ))
                    )}
                </View>
                

            </ParallaxScrollView>
            <FAB
                icon="plus"
                size='medium'
                style={styles.fab}
                onPress={handleNuevo}
            >
            </FAB>
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
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#C69D91',
        borderRadius: 50,
    },
});