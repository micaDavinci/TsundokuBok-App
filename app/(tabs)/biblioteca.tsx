
import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAuth } from "@/context/AuthContext";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { FAB, IconButton, Text } from "react-native-paper";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { Estante } from "../biblioteca/estante";

export default function Biblioteca() {
    const { token } = useAuth();
    const [estantes, setEstantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const {logout} = useAuth();

    // useEffect( ()=> {
    //     if (token) {
    //         getEstantes();
    //     }
    // }, [token])

    useFocusEffect(
        useCallback(() => {
            getEstantes();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        getEstantes();
    };

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
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    };

    const router = useRouter();
    const handleNuevo = () => {
        router.push('/biblioteca/nuevoEstante');
    }

    const handleLogout = async() => {
        await logout();
    }

    return (
        <>
        <Stack.Screen options={{ headerShown: false }} />
        
        <ParallaxScrollView>
            <View style={styles.headerRow}>
                    <Text variant="displaySmall" style={styles.titulo}>
                        Biblioteca
                    </Text>
                    
                    {/* Botón de Logout más elegante (solo icono o borde sutil) */}
                    <IconButton
                        icon="logout"
                        mode="outlined"
                        iconColor="#C69D91"
                        size={24}
                        onPress={handleLogout}
                        style={styles.logoutBtn}
                    />
                </View>

                {/* Contenido principal: Quitamos el ScrollView interno */}
                <View style={styles.listContainer}>
                    {estantes.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay estantes creados todavía</Text>
                            <Text style={styles.emptySub}>Desliza hacia abajo para actualizar</Text>
                        </View>
                    ) : (
                        estantes.map((estante) => (
                            <Estante estante={estante} />
                        ))                    
                    )}
                </View>

                {/* Espaciado final para que el último estante no quede bajo el FAB */}
                <View style={{ height: 80 }} />


            {/* <ThemedView style={styles.titleContainer}>
                <ThemedText type="title"
                    style={styles.titulo}>
                    Biblioteca
                </ThemedText>

                <Button mode="contained" onPress={handleLogout}>
                    Cerrar sesión
                </Button>
            </ThemedView>

            <ScrollView>
                {estantes.length === 0 ? (
                    <Text>No hay estantes creados todavía</Text>
                ) : (
                    estantes.map((estante) => (
                        <Estante 
                            estante={estante}
                        >
                        </Estante>
                    ))                    
                )               
                }
                            </ScrollView> */}

            <FAB
                icon="plus"
                size='medium'
                style={styles.fab}
                onPress={handleNuevo}
            >
            </FAB>
        </ParallaxScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
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
    listContainer: {
        paddingHorizontal: 16,
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
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#C69D91',
    }
});