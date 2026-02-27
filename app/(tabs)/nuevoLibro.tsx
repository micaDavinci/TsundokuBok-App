import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet } from "react-native";
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
        <ScrollView>
            <ThemedView>
                <ThemedText type="title"
                    style={styles.titulo}>
                    Nuevo libro
                </ThemedText>

                <Button 
                mode="contained" 
                style={styles.button} 
                labelStyle={{ color: '#E4DAC9', fontWeight: 'bold', fontSize: 16 }}
                onPress={handleBusqueda}
                >
                    Buscar
                    </Button>

                <Button 
                mode="contained" 
                style={styles.button}
                labelStyle={{ color: '#E4DAC9', fontWeight: 'bold', fontSize: 16 }}
                onPress={handleAltaManual}
                >
                    Agregar manualmente
                    </Button>

            </ThemedView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    titulo: {
        color: '#E4DAC9',
        marginBottom: 32,
        fontWeight: 'bold',
        fontFamily: Fonts.rounded
    },
    button: {
        color: "#E4DAC9",
        backgroundColor: "#6A7666",
        margin: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 50,
    }
});