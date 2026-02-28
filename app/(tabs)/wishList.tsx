import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAuth } from "@/context/AuthContext";
import { Stack, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LibroDeseado } from "../wishList/libroDeseado";

const Deseados = [
    { id: 1, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },
    { id: 2, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },
    { id: 3, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },
    { id: 4, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },

];

export default function wishList() {
    const {token} = useAuth();
    const [wishListId, setWishListId] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
            useCallback(() => {
                if (token) {
                    getWishList();
                }
            }, [])
        );

    const getWishList = async () => {
        try {
            const request = await api.get(`/wish-list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                const result = request.data.result;

                if (result.length > 0) {
                    setWishListId(result[0].id_estante);
                } else {
                    setWishListId("");
                }

            } else {
                Alert.alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ha surgido un error, por favor intente más tarde");
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
                        Préstamos
                    </Text>
                </View>

                <View>
                    {wishListId.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay prestamos creados todavía</Text>
                            <Text style={styles.emptySub}>Desliza hacia abajo para actualizar</Text>
                        </View>
                    ) : (
                        <LibroDeseado wishListId={wishListId} />
                        )
                    }
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