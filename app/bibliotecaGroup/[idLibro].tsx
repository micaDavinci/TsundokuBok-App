import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";

type Props = {
    id: number;
    nombre: string,
    autor: string,
};


export const Libro =({ id, nombre, autor }: Props) => {
    const { idLibro } = useLocalSearchParams();
    return (
        <ParallaxScrollView >
            <Text>Información completa del libro</Text>

        </ParallaxScrollView>

    )
}
