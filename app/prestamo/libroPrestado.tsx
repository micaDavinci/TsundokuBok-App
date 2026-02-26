import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from "react-native-paper";

type Props = {
    id: number,
    titulo: string,
    autor: string,
    persona: string,
    estado: string,
};

export const LibroPrestado = ({ id, titulo, autor, persona, estado }: Props) => {
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.subtitulo}>{autor}</Text>
                <Text style={styles.titulo}>{persona}</Text>
                <Text>{estado}</Text>
            </Card.Content>
        </Card>
    )
}

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
    subtitulo: {
        color: "#6A7666"
    },
});