import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { useRouter } from 'expo-router';
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

export default function nuevoLibro() {
    const router = useRouter();

    const handleAltaManual = () => {
        router.push('/nuevo/altaManual');
    }
    const handleBusqueda = () => {
        router.push('/nuevo/busqueda');
    }

    return (
        <ParallaxScrollView>
            <ThemedView>
                <ThemedText type="title"
                    style={{ fontFamily: Fonts.rounded, }}>
                    Nuevo libro
                </ThemedText>

                <Button mode="contained" style={styles.button} onPress={handleBusqueda}>Buscar</Button>
                <Button mode="contained" style={styles.button} onPress={handleAltaManual}>Agregar manualmente</Button>
            </ThemedView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        color: "#E4DAC9",
        backgroundColor: "#6A7666",
        margin: 8
    }
});