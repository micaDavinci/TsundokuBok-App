import { Link, useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

type EstanteType = {
  id_estante: number;
  nombre: string;
  cantidad_libros: number;
};

type Props = {
  estante: EstanteType;
};

export const Estante = ( {estante} : Props ) => {
    const router = useRouter();
    return (
        <TouchableRipple
            // onPress={handlePress}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <Link 
            href="/" 
            dismissTo
            >
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.titulo}>{estante.nombre}</Text>
                    <Text variant='labelLarge' style={styles.cantidad}>Cantidad: {estante.cantidad_libros}</Text>
                </Card.Content>
            </Card>
            </Link>
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