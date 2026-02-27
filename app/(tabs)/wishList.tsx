import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { ScrollView, StyleSheet } from "react-native";
import { LibroDeseado } from "../wishList/libroDeseado";

const Deseados = [
    { id: 1, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta'},
    { id: 2, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta'},
    { id: 3, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta'},
    { id: 4, titulo: 'La selección', autor: 'Kiera Cass', prioridad: 'alta'},

];

export default function wishList() {
    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title"
                    style={styles.titulo}>
                    Lista de deseos
                </ThemedText>
            </ThemedView>

            <ScrollView>
                {Deseados.map((deseado) => (
                    <LibroDeseado 
                        key={deseado.id}
                        id={deseado.id}
                        titulo={deseado.titulo}
                        autor={deseado.autor}
                        prioridad={deseado.prioridad}
                    />
                ))}
            </ScrollView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    titulo: {
        color: '#E4DAC9',
        marginBottom: 20,
        fontWeight: 'bold',
        fontFamily: Fonts.rounded
    }
});
