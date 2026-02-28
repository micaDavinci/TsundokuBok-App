
import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAuth } from "@/context/AuthContext";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LibroList } from "./libroList";



export default function estante() {
    const { id_libro } = useLocalSearchParams();
    const { token } = useAuth();

    const [estanteNombre, setEstanteNombre] = useState("");
    const [show, setShow] = useState(false);
    const [estanteList, setEstanteList] = useState([]);
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (token) {
                getEstanteList();
            }
            
        }, [])
    );

    const getEstanteList = async () => {
        setLoading(true);
        try {
            const request = await api.get(`/librosList/${id_libro}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (request.data.success) {
                setEstanteList(request.data.result);
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
                        Estante nombre
                    </Text>
                </View>

                <View style={styles.listContainer}>
                    {estanteList.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay estantes creados todavía</Text>
                            <Text style={styles.emptySub}>Desliza hacia abajo para actualizar</Text>
                        </View>
                    ) : (
                        estanteList.map((libro) => (
                            <LibroList libro={libro} />
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
    listContainer: {

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