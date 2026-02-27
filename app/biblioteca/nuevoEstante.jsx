import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Stack } from "expo-router";
import React from "react";
import { Button, TextInput } from "react-native-paper";

export default function nuevoEstante() {

    const [nombre, setNombre] = React.useState("");
    return (
        <>
        <Stack.Screen options={{ headerShown: false }} />
        <ParallaxScrollView>
            <ThemedView>
                <ThemedText>Nuevo estante</ThemedText>
                <TextInput
                        label="Nombre"
                        mode="outlined"
                        onChangeText={nombre => setNombre(nombre)}
                    />

                    <Button mode="contained">Agregar</Button>
                    <Button mode="contained">Cancelar</Button>
            </ThemedView>
        </ParallaxScrollView>
        </>
    )
}