import { useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";

export default function NuevoPrestamo() {

    const [persona, setPersona] = React.useState("");
    const [fecha, setFecha] = React.useState("");
const router = useRoute();
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
                            style={styles.input}
                            onChangeText={setFecha}
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
                            onPress={() => console.log('Cancelado')}
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