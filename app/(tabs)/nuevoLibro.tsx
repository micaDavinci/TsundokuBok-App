import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function nuevoLibro() {

    const router = useRouter();

    const handleAltaManual = () => {
        router.push('/nuevo/agregarLibro');
    }
    const handleBusqueda = () => {
        router.push('/nuevo/busqueda');
    }

    return (
<View style={styles.mainContainer}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.content}>
                <Text variant="displaySmall" style={styles.titulo}>
                    Nuevo libro
                </Text>

                <Text style={styles.subtitulo}>
                    ¿Cómo desias añadir tu próximo libro?
                </Text>

                <View style={styles.buttonContainer}>
                    <Button 
                        mode="contained" 
                        icon="magnify"
                        style={styles.button} 
                        labelStyle={styles.buttonLabel}
                        onPress={handleBusqueda}
                    >
                        Buscar por título o autor
                    </Button>

                    <Button 
                        mode="outlined"
                        icon="pencil"
                        style={[styles.button, styles.buttonManual]} 
                        labelStyle={[styles.buttonLabel, { color: '#C69D91' }]}
                        onPress={handleAltaManual}
                    >
                        Agregar manualmente
                    </Button>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#151718',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    titulo: {
        color: '#E4DAC9',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitulo: {
        color: '#6A7666',
        fontSize: 16,
        marginBottom: 40,
    },
    buttonContainer: {
        gap: 16,
    },
    button: {
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: '#6A7666',
    },
    buttonManual: {
        backgroundColor: 'transparent',
        borderColor: '#C69D91',
        borderWidth: 1,
    },
    buttonLabel: {
        color: '#E4DAC9',
        fontWeight: 'bold',
        fontSize: 16
    },
});