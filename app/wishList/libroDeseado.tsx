import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from "react-native-paper";

type Props = {
    id: number,
    titulo: string,
    autor: string,
    prioridad: string,
};

export const LibroDeseado = ({ id, titulo, autor, prioridad }: Props) => {
    return (
        <Card style={styles.card}>
            <Card.Content style={styles.contentRow}>
                <Avatar.Image
                    size={80}
                    source={{ uri: 'https://tu-imagen.com' }}
                />
                <View>
                    <Text variant="titleMedium" style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.subtitulo}>{autor}</Text>
                    <Text style={styles.titulo}>Prioridad: {prioridad}</Text>
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
        backgroundColor: "#2B3035"
    },
    titulo: {
        color: "#E4DAC9"
    },
    subtitulo: {
        color: "#6A7666",
        paddingBottom: 16
    },
});