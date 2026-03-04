import { api } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Card, Menu, Text, TextInput } from "react-native-paper";

type LibroDisponible = {
    id: number;
    titulo: string;
};

export default function NuevoPrestamo() {

    const { token } = useAuth();
    const [librosDisponibles, setLibrosDisponibles] = useState<LibroDisponible[]>([]);
    const [persona, setPersona] = useState("");
    const [libro, setLibro] = useState<number | null>(null);
    const [fechaPrestamo, setFechaPrestamo] = useState("");
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();


    useFocusEffect(
        useCallback(() => {
            if (token) {
                getLibrosDisponibles();
            }
        }, [])
    );

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

        } catch (error: any) {
            console.error("Error completo", error);
            const mensaje = error.response?.data?.message
            Alert.alert("Error", mensaje);
        }
    }


    const handleNuevo = async () => {
        const fechaFormateada = convertirFechaParaAPI(fechaPrestamo);
        try {
            const request = await api.post(`/crear-prestamo`,
                {
                    id_libro: libro,
                    persona,
                    fecha_prestamo: fechaFormateada
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (request.data.success) {
                setPersona("");
                setLibro(null);
                setFechaPrestamo("");
                router.back();
            } else {
                alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Ha surgido un error, por favor intente más tarde");
        }
    }

    const handleFechaChange = (text: string) => {
        const cleaned = text.replace(/\D/g, "");

        let formatted = cleaned;

        if (cleaned.length > 2) {
            formatted = cleaned.slice(0, 2) + "-" + cleaned.slice(2);
        }

        if (cleaned.length > 4) {
            formatted =
                cleaned.slice(0, 2) +
                "-" +
                cleaned.slice(2, 4) +
                "-" +
                cleaned.slice(4, 8);
        }

        setFechaPrestamo(formatted);
    };

    const convertirFechaParaAPI = (fecha: string) => {
        const [dia, mes, anio] = fecha.split("-");
        return `${anio}-${mes}-${dia}`;
    };

    const handleCancel = () => {
        router.back();
    }

    return (
        <View style={styles.mainContainer}>
            <Stack.Screen options={{ headerShown: false }} />
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="headlineSmall" style={styles.tituloTexto}>Nuevo Préstamo</Text>
                    <View style={{ marginTop: 16 }}>
                        <Text variant="labelLarge" style={{ color: "#E4DAC9", marginBottom: 6 }}>
                            Libro
                        </Text>

                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={
                                <Button
                                    mode="outlined"
                                    onPress={() => setMenuVisible(true)}
                                    style={{ borderColor: "#E4DAC9" }}
                                    labelStyle={{ color: "#E4DAC9" }}
                                >
                                    {libro
                                        ? librosDisponibles.find(l => l.id === libro)?.titulo
                                        : "[Seleccione un libro]"}
                                </Button>
                            }
                        >
                            {librosDisponibles.map((libroD) => (
                                <Menu.Item
                                    key={libroD.id}
                                    onPress={() => {
                                        setLibro(libroD.id);
                                        setMenuVisible(false);
                                    }}
                                    title={libroD.titulo}
                                />
                            ))}
                        </Menu>
                    </View>

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
                        value={fechaPrestamo}
                        placeholder="DD-MM-AAAA"
                        mode="outlined"
                        outlineColor="#E4DAC9"
                        activeOutlineColor="#E4DAC9"
                        textColor="#E4DAC9"
                        style={styles.input}
                        onChangeText={handleFechaChange}
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
                        onPress={handleNuevo}
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