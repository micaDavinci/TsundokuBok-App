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
            rippleColor="rgba(198, 157, 145, 0.2)"
            style={styles.ripple}
        >
            <Link 
            href={`/biblioteca/${estante.id_estante}`}
                style={styles.link}
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
    ripple: {
        width: '100%',
        marginBottom: 8,
    },
    link: {
        width: '100%',
    },
    card: {
        width: '100%',
        backgroundColor: "#2B3035",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(106, 118, 102, 0.3)",
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titulo: {
        color: "#E4DAC9",
    },
    cantidad: {
        color: "#5A7362",
    },
});