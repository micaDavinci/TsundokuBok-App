import { api } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export default function NuevoPrestamo() {

    const { token } = useAuth();
    const [librosDisponibles, setLibrosDisponibles] = useState([]);
    const [persona, setPersona] = useState("");
    const [libro, setLibro] = useState("");
    const [fechaPrestamo, setFechaPrestamo] = useState("");
    const router = useRouter();

    const getLibrosDisponibles = async () => {
        try {
            const request = await api.get(`/libros-disponibles`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                setLibrosDisponibles(request.data.result);
            } else {
                alert(request.data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Ha surgido un error, por favor intente más tarde");
        }
    }

    const handleNuevo = async () => {
        try {
            const request = await api.post(`/crear-prestamo`,
                {
                    id_libro: libro, 
                    persona, 
                    fecha_prestamo: fechaPrestamo
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (request.data.success) {
                setPersona("");
                setLibro("");
                setFechaPrestamo("");
            } else {
                alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Ha surgido un error, por favor intente más tarde");
        }
    }

    const handleCancel = () => {
        router.back();
    }
    return (
        <View style={styles.mainContainer}>
            <Stack.Screen options={{ headerShown: false }} />
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineSmall" style={styles.tituloTexto}>Nuevo Préstamo</Text>


                    <TextInput
                        label="Persona"
                        value={persona}
                        mode="outlined"
                        outlineColor="#E4DAC9"
                        activeOutlineColor="#E4DAC9"
                        textColor="#E4DAC9"
                        style={styles.input}
                        onChangeText={setPersona}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#E4DAC9',
                                primary: '#E4DAC9',
                            }
                        }}
                    />

                    <TextInput
                        label="Fecha"
                        value={persona}
                        mode="outlined"
                        outlineColor="#E4DAC9"
                        activeOutlineColor="#E4DAC9"
                        textColor="#E4DAC9"
                        style={styles.input}
                        onChangeText={setFechaPrestamo}
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
                        onPress={() => console.log('Guardado')}
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
    }
});