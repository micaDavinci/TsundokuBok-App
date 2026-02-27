
import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from '@/constants/theme';
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from '@react-navigation/native';
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Button, FAB, Text } from "react-native-paper";
import { Estante } from "../bibliotecaGroup/estante";

export default function Biblioteca() {
    const { token } = useAuth();
    const [estantes, setEstantes] = useState([]);
    const {logout} = useAuth();
    const navigation = useNavigation();
    const router = useRouter();

    useEffect( ()=> {
        if (token) {
            getEstantes();
        }
    }, [token])

    const getEstantes = async () => {
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
        }
    };

    const handleLogout = async () => {
        await logout();
        router.replace("./index");
    }

    const handleNuevo = async () => {
        await logout();
        router.replace("/biblioteca/nuevoEstante");
    }
    
    return (
        <>
        <Stack.Screen options={{ headerShown: false }} />
        
        <ParallaxScrollView>
            
            <ThemedView style={styles.titleContainer}>
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
            </ScrollView>

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
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    titulo: {
        color: '#E4DAC9',
        marginBottom: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.rounded
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#C69D91',
    }
});