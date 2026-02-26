import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { ScrollView, StyleSheet } from "react-native";
import { LibroPrestado } from "../prestamo/libroPrestado";

const Prestamos = [
    { id: 1, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },
    { id: 2, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },
    { id: 3, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },
    { id: 4, titulo: 'La selección', autor: 'Kiera Cass', persona: 'Popi', estado: 'prestado' },

];


export default function prestamos() {
    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type='title'
                    style={{ fontFamily: Fonts.rounded, }}>
                    Préstamos
                </ThemedText>
            </ThemedView>

            <ScrollView>
                {Prestamos.map((prestado) => (
                    <LibroPrestado
                        key={prestado.id}
                        id={prestado.id}
                        titulo={prestado.titulo}
                        autor={prestado.autor}
                        persona={prestado.persona}
                        estado={prestado.estado} />
                ))}

            </ScrollView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    }
})