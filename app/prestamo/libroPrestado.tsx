import { useAuth } from '@/context/AuthContext';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, TouchableRipple } from "react-native-paper";

type PrestamoType = {
    id: number,
    titulo: string,
    autor: string,
    persona: string,
    estado: string,
    fecha_prestamo: string,
    portada: string,
    portadaGoogle: string,
};

type Props = {
  prestamo: PrestamoType;
};

export const LibroPrestado = ({ prestamo }: Props) => {
    const { token } = useAuth();
    const server = process.env.EXPO_PUBLIC_API_URL;
    const [show, setShow] = React.useState(false);
    const [personaNueva, setPersonaNueva] =  React.useState("");
    const [fechaNueva, setFechaNueva] =  React.useState("");

    const formatearFecha = (fechaStr: string) => {
        if (!fechaStr) return "-";
        const fecha = new Date(fechaStr);
        
        // Verificamos si la fecha es válida para evitar "Invalid Date"
        if (isNaN(fecha.getTime())) return fechaStr; 

        return fecha.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <View style={styles.containerSeparador}>
        <TouchableRipple
            rippleColor="rgba(198, 157, 145, 0.2)"
        >
            <Card style={styles.card}>
                <Card.Content style={styles.contentRow}>
                    <Image
                        style={styles.portada}
                        source={{
                            uri: prestamo.portada
                                ? prestamo.portada
                                : prestamo.portadaGoogle
                                    ? prestamo.portadaGoogle
                                    : `${server}/uploads/portadas/default-cover.jpg`
                        }
                        }
                    />
                    <View style={styles.infoContainer}>
                        <Text variant="titleMedium" style={styles.titulo}>{prestamo.titulo}</Text>
                        <Text variant='labelLarge' style={styles.autor}>{prestamo.autor}</Text>
                        <Text variant="titleMedium" style={styles.titulo}>{prestamo.persona}</Text>
                        <Text variant='labelLarge' style={styles.autor}>Fecha de préstamo: {formatearFecha(prestamo.fecha_prestamo)}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{prestamo.estado}</Text>
                        </View>
                    </View>    
                </Card.Content>
            </Card>
        </TouchableRipple>
        </View>
    )
};

const styles = StyleSheet.create({
    containerSeparador: {
        paddingVertical: 6,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding:10
    }, ripple: {
       borderRadius: 12,
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
        elevation: 4,
    },
    portada: {
        width: 80,
        height: 120,
        borderRadius: 8,
        backgroundColor: '#3e444a',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
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