import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { LibroPrestado } from "../prestamo/libroPrestado";

const Prestamos = [
    { id: 1, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },
    { id: 2, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },
    { id: 3, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },
    { id: 4, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },

];


export default function prestamos() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const handleNuevo = () => {
        router.push('/prestamo/nuevoPrestamo');
    }

    const onRefresh = () => {
        setRefreshing(true);
    };
    
    return (
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
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'
                    style={styles.titulo}>
                    Préstamos
                </ThemedText>
            </ThemedView>

            <ScrollView>
                {Prestamos.map((prestado) => (
                    <LibroPrestado
                        key={prestado.id}
                        id={prestado.id}
                        titulo={prestado.titulo}
                        autor={prestado.autor}
                        persona={prestado.persona}
                        estado={prestado.estado} />
                ))}

            </ScrollView>
            <FAB
                icon="plus"
                size='medium'
                style={styles.fab}
                onPress={handleNuevo}
            />
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    titulo: {
        color: '#E4DAC9',
        marginBottom: 16,
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
})