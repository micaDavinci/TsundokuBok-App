import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

type Props = {
    id: number;
    titulo: string,
    autor: string,
};

export const LibroList = ({ id, titulo, autor }: Props) => {
    const router = useRouter();

    const handlePress = () => {
        // router.push({
        //     pathname: '/biblioteca/[idEstante]',
        //     params: { idEstante: String(id) }
        // });
    }

    return (
        <TouchableRipple
            // onPress={handlePress}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant='titleMedium' style={styles.titulo}>{titulo}</Text>
                    <Text variant='labelLarge' style={styles.cantidad}>Cantidad: {autor}</Text>
                </Card.Content>
            </Card>
        </TouchableRipple>
    )
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 8,
        margin: 4,
        backgroundColor: "#2B3035"
    },
    titulo: {
        color: "#E4DAC9"
    },
    cantidad: {
        color: "#6A7666"
    },
});