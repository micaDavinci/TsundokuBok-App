import { api } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import { useFocusEffect, useRouter } from 'expo-router';
import * as React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

type LibroType = {
    id_libro: number;
    titulo: string,
    autor: string,
    estado: string,
    portada: string,
    portadaGoogle: string,
};

type Props = {
    libro: LibroType
}
export const LibroList = ({ libro }: Props) => {
    const router = useRouter();
    const { token } = useAuth();
    const server = process.env.EXPO_PUBLIC_API_URL;

    const [estantes, setEstantes] = React.useState([]);
    const [idLibro, setIdLibro] = React.useState("");
    const [estanteDestino, setEstanteDestino] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            if (token) {
                getEstantes();
            }
        }, [])
    );

    const getEstantes = async () => {
        setLoading(true);
        try {
            const request = await api.get("/estantes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                setEstantes(request.data.result);
            } else {
                Alert.alert("Error", request.data.message);
            }
        } catch (error: any) {
            console.error("Error completo", error);
            const mensaje = error.response?.data?.message
            Alert.alert("Error", mensaje);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleMove = async () => {
        try {
            const request = await api.put(`/mover-libro/${idLibro}`,
                {
                    id_ubicacion: Number(estanteDestino)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (request.data.success) {
                getEstantes();
                setIdLibro("");
                setEstanteDestino("");
            } else {
                Alert.alert("Error", request.data.message);
            }
        } catch (error: any) {
            console.error("Error completo", error);
            const mensaje = error.response?.data?.message
            Alert.alert("Error", mensaje);
        }

    }

    const handleEliminar = async () => {
        const confirmeDelete = window.confirm(
            "Esta acción es irreversible ¿Está seguro/a de que desea eliminar este libro?"
        )

        if (!confirmeDelete) {
            return;
        }

        try {
            const request = await api.delete(
                `/eliminar-libro/${libro.id_libro}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (request.data.success) {
                getEstantes();
            } else {
                Alert.alert("Error", request.data.message);
            }

        } catch (error: any) {
            console.error("Error completo", error);
            const mensaje = error.response?.data?.message
            Alert.alert("Error", mensaje);
        }

    }

    return (
        <TouchableRipple
            rippleColor="rgba(198, 157, 145, 0.2)"
        >
            <Card style={styles.card}>
                <Card.Content style={styles.contentRow}>
                    <Image
                        style={styles.portada}
                        source={{
                            uri: libro.portada
                                ? `${server}/uploads/portadas/${libro.portada}`
                                : libro.portadaGoogle
                                    ? libro.portadaGoogle
                                    : `${server}/uploads/portadas/default-cover.jpg`
                        }
                        }
                    />
                    <View>
                        <Text variant="titleLarge" style={styles.titulo} numberOfLines={2}>{libro.titulo}</Text>
                        <Text variant='labelLarge' style={styles.autor}>{libro.autor}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{libro.estado}</Text>
                        </View>
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
    }, ripple: {
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
    portada: {
        width: 80,
        height: 120,
        borderRadius: 8,
        backgroundColor: '#3e444a', // Color de carga mientras baja la imagen
    },
    titulo: {
        color: "#E4DAC9",
        fontWeight: 'bold',
    },
    autor: {
        color: "#5A7362",
        marginBottom: 8,
    },
    badge: {
        backgroundColor: "#6A7666", // Tu verde seco
        alignSelf: 'flex-start',    // Para que no ocupe todo el ancho
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 5,
    },
    badgeText: {
        color: "#E4DAC9",
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});