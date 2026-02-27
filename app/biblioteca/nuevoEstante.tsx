import { api } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, Snackbar, Text, TextInput } from 'react-native-paper';


export default function nuevoEstante() {
    const { token } = useAuth();
    const [nombre, setNombre] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const router = useRouter();
    const [mensaje, setMensaje] = useState("");


    const handleNew = async () => {
        try {
            const request = await api.post(`/nuevo-estante`, {
                nombre
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (request.data.success) {
                setNombre(request.data.result);
                setMensaje("¡Estante creado con éxito!");
                setVisible(true);

                setTimeout(() => {
                    router.back();
                }, 1500);
            }
        } catch (error: any) {
            console.error("Error completo", error);
            setMensaje(error.response?.data?.message);
            Alert.alert("Error", mensaje);
        }
    }

    const handleCancel = () => {
        router.back();

    }

    return (
        <View style={styles.mainContainer}>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={2000}
                style={{ backgroundColor: '#6A7666' }}
                action={{
                    label: 'OK',
                    onPress: () => setVisible(false),
                }}>
                {mensaje}
            </Snackbar>
            <Stack.Screen options={{ headerShown: false }} />
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineSmall" style={styles.tituloTexto}>Nuevo estante</Text>

                    <TextInput
                        label="Nombre del estante"
                        value={nombre}
                        mode="outlined"
                        outlineColor="#E4DAC9"
                        activeOutlineColor="#E4DAC9"
                        textColor="#E4DAC9"
                        style={styles.input}
                        onChangeText={setNombre}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#E4DAC9',
                                primary: '#E4DAC9',
                            }
                        }}
                    />

                    <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={{ color: '#E4DAC9', fontWeight: 'bold' }}
                        onPress={handleNew}
                    >
                        Guardar
                    </Button>

                    <Button
                        mode="text"
                        style={styles.buttonSecondary}
                        labelStyle={{ color: '#808080' }}
                        onPress={handleCancel}
                    >
                        Cancelar
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#151718',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '85%',
        paddingVertical: 10,
        backgroundColor: "#2B3035",
        borderRadius: 30,
        elevation: 18,
        paddingTop: 32,
        paddingBottom: 32,
    },
    tituloTexto: {
        color: '#E4DAC9',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 22,
        paddingBottom: 8
    },
    input: {
        marginVertical: 8,
        backgroundColor: "#2B3035"
    },
    button: {
        backgroundColor: "#6A7666",
        marginTop: 20,
        borderRadius: 15,
    },
    buttonSecondary: {
        marginTop: 8,
    },
});