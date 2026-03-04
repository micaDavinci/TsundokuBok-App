import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function nuevoLibro() {

    const router = useRouter();

    const handleAltaManual = () => {
        router.push('/nuevo/agregarLibro');
    }


    return (
<View style={styles.mainContainer}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.content}>
                <Text variant="displaySmall" style={styles.titulo}>
                    Nuevo libro
                </Text>

                <View style={styles.buttonContainer}>
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
        marginBottom: 40,
    },
    buttonContainer: {
        gap: 16,
    },
    button: {
        paddingVertical: 10,
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