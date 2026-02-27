import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { LibroDeseado } from "../wishList/libroDeseado";

const Deseados = [
    { id: 1, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },
    { id: 2, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },
    { id: 3, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },
    { id: 4, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta' },

];

export default function wishList() {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
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
                <ThemedText type="title"
                    style={styles.titulo}>
                    Lista de deseos
                </ThemedText>
            </ThemedView>

            <ScrollView>
                {Deseados.map((deseado) => (
                    <LibroDeseado
                        key={deseado.id}
                        id={deseado.id}
                        titulo={deseado.titulo}
                        autor={deseado.autor}
                        prioridad={deseado.prioridad}
                    />
                ))}
            </ScrollView>
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
        marginBottom: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.rounded
    }
});
