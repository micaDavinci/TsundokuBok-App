
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from '@/constants/theme';
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { Estante } from "../biblioteca/estante";

const EstanteData = [
    { id: 1, nombre: 'Ficción', cantidad: '12' },
    { id: 2, nombre: 'Romance', cantidad: '2' },
    { id: 3, nombre: 'Ciencia Ficción', cantidad: '0' },
    { id: 4, nombre: 'Ciencia Ficción', cantidad: '0' },
    { id: 5, nombre: 'Ciencia Ficción', cantidad: '0' },
];

export default function Biblioteca() {
    const router = useRouter();
    const handleNuevo = () => {
        router.push('/biblioteca/nuevoEstante');
    }
    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title"
                    style={{ fontFamily: Fonts.rounded, }}>
                    Biblioteca
                </ThemedText>
            </ThemedView>
            <ScrollView>
                {EstanteData.map((estante) => (
                    <Estante key={estante.id}
                        id={estante.id}
                        nombre={estante.nombre}
                        cantidad={estante.cantidad} />
                ))}
            </ScrollView>

            <FAB
                icon="plus"
                size='medium'
                style={styles.fab}
                onPress={handleNuevo}
            >
            </FAB>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#E4DAC9',
    }
});