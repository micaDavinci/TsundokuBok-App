import { api } from '@/api/api';
import { useAuth } from '@/context/AuthContext';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, TouchableRipple } from "react-native-paper";

type Wishtype = {
    id: number,
    titulo: string,
    autor: string,
    prioridad: string,
};

type Props = {
    wishListId: Wishtype,
}

export const LibroDeseado = ({ wishListId }: Props) => {
const {  token } = useAuth();
const [librosList, setLibrosList] = React.useState([]);
    const getLibrosList = async () => {
        try {
            const request = await api.get(`/librosList/${wishListId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                setLibrosList(request.data.result);
            } else {
                alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Ha surgido un error, por favor intente más tarde");
        }
    }
    return (
        <TouchableRipple
            rippleColor="rgba(198, 157, 145, 0.2)"
        >
            <Card style={styles.card}>
                <Card.Content style={styles.contentRow}>
                    <></>
                    {/* <Image
                        style={styles.portada}
                        source={{
                            uri: librosList.portada
                                ? `${server}/uploads/portadas/${librosList.portada}`
                                : wishListId.portadaGoogle
                                    ? wishListId.portadaGoogle
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
                    </View> */}

                    
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
        backgroundColor: '#3e444a',
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
        backgroundColor: "#6A7666",
        alignSelf: 'flex-start',
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