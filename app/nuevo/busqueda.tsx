import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function BusquedaPredictiva() {

    const [text, setText] = React.useState("");
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView>
                <ThemedView style={styles.titleContainer}>                   
                    <ThemedText type='title'
                        style={{ fontFamily: Fonts.rounded, }}>
                        Búsqueda predictiva
                    </ThemedText>                   
                </ThemedView>
                <TextInput 
                            label="Título o autor"
                            value={text}
                            mode="outlined"
                           onChangeText={text => setText(text)}
                        />
            </ParallaxScrollView>
        </>
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