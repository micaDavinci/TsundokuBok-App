import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text, TouchableRipple } from 'react-native-paper';

type Props = {
    id: number;
    titulo: string,
    autor: string,
};

export const LibroList = ({ id, titulo, autor }: Props) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: '/biblioteca/[idLibro]',
            params: { idLibro: String(id) }
        });
    }

    return (
        <TouchableRipple
            onPress={handlePress}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <Card style={styles.card}>
                <Card.Content style={styles.contentRow}>
                    <Avatar.Image
                        size={80}
                        source={{ uri: 'https://tu-imagen.com' }}
                    />
                    <View>
                        <Text variant="titleMedium" style={styles.titulo}>{titulo}</Text>
                        <Text style={styles.subtitulo}>{autor}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableRipple>
    )
};

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
    cantidad: {
        color: "#6A7666"
    },
    subtitulo: {
        color: "#6A7666",
        paddingBottom: 16,
    }
});