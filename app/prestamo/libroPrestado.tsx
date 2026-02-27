import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from "react-native-paper";

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
            <Card.Content style={styles.contentRow}>
                <Avatar.Image
                    size={80}
                    source={{ uri: 'https://tu-imagen.com' }}
                />
                <View>
                    <Text variant="titleLarge" style={styles.titulo}>{titulo}</Text>
                    <Text variant='labelLarge' style={styles.subtitulo}>{autor}</Text>
                    <Text variant="titleLarge" style={styles.titulo}>{persona}</Text>
                    <Text variant='labelLarge' style={styles.estado}>{estado}</Text>
                </View>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    card: {
        margin: 4,
        backgroundColor: "#2B3035",
        marginBottom:12
    },
    titulo: {
        color: "#E4DAC9"
    },
    subtitulo: {
        color: "#6A7666",
        paddingBottom: 16,
    },
    estado: {
        color: "#C69D91",
        marginTop: 8,
    }
});