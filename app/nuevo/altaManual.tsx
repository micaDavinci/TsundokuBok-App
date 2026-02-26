import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function altaManual() {
    return (
        <>
         <Stack.Screen options={{ headerShown: false }} />
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'
                    style={{ fontFamily: Fonts.rounded, }}>
                    Alta manual
                </ThemedText>
            </ThemedView>
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