import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRoute } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { Button, TextInput } from "react-native-paper";

export default function NuevoPrestamo() {

    const [email, setEmail] = React.useState("");
    const [biblioteca, setBiblioteca] = React.useState("");
    const [contrasena, setContrasena] = React.useState("");

    const router = useRoute();


    return (
        <>
        <Stack.Screen options={{ headerShown: false }} />
        <ParallaxScrollView>
            <ThemedView>
                <ThemedText>Nuevo prestamo</ThemedText>
                <TextInput
                        label="Persona"
                        mode="outlined"
                        onChangeText={email => setEmail(email)}
                    />

                    <TextInput
                        label="Fecha"
                        mode="outlined"
                        onChangeText={biblioteca => setBiblioteca(biblioteca)}
                    />

                    <Button mode="contained">Buscar</Button>
                    <Button mode="contained">Cancelar</Button>
            </ThemedView>
        </ParallaxScrollView>
        </>
    )
}