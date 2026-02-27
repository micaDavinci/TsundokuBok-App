
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from '@/constants/theme';
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { LibroList } from "./libroList";

const estanteList = [
    { id: 1, titulo: 'Los juegos del hambre', autor: 'Susane Collins' },
];

export  const idEstante = () => {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ParallaxScrollView>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title"
                        style={{ fontFamily: Fonts.rounded, }}>
                        Estante
                    </ThemedText>
                </ThemedView>
                <ScrollView>
                    {estanteList.map((list) => (
                        <LibroList
                            key={list.id}
                            id={list.id}
                            titulo={list.titulo}
                            autor={list.autor}
                        />
                    ))}
                </ScrollView>
            </ParallaxScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});