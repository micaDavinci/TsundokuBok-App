import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

type Props = {
    id: number;
    nombre: string,
    cantidad: string,
};

export const Estante = ({ id, nombre, cantidad }: Props) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: '/biblioteca/[idEstante]',
            params: { idEstante: String(id) }
        });
    }

    return (
        <TouchableRipple
            // onPress={handlePress}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <Card style={styles.card} onPress={handlePress}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.titulo}>{nombre}</Text>
                    <Text variant='labelLarge' style={styles.cantidad}>Cantidad: {cantidad}</Text>
                </Card.Content>
            </Card>
        </TouchableRipple>
    )
};

const styles = StyleSheet.create({
    card: {
        gap: 8,
        margin: 4,
        backgroundColor: "#2B3035"
    },
    titulo: {
        color: "#E4DAC9",
        marginBottom: 6
    },
    cantidad: {
        color: "#6A7666"
    },
});