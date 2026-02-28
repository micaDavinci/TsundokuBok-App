import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAuth } from "@/context/AuthContext";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, RefreshControl, StyleSheet, View } from "react-native";
import { Badge, Divider, FAB, List, Text } from "react-native-paper";

type Props = {
    id: number;
    nombre: string,
    autor: string,
};


export default function Libro() {
    const { idLibro } = useLocalSearchParams();
    const { token } = useAuth();
    const server = process.env.EXPO_PUBLIC_API_URL;

    const [LibroInfo, setLibroInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (token) {
                getLibro();
            }
        }, [])
    );

    const getLibro = async () => {
        setLoading(true);
        try {
            const request = await api.get(`/ver-libro/${idLibro}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                setLibroInfo(request.data.result);
            } else {
                alert(request.data.message);
            }
        } catch (error: any) {
            console.error("Error completo", error);
            const mensaje = error.response?.data?.message
            Alert.alert("Error", mensaje);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

        const handleEdit = () => {
            router.push(`/biblioteca/edit/${idLibro}`);
        }
    const onRefresh = () => {
        setRefreshing(true);
        getLibro();
    };

    if (!LibroInfo) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' }}>
                <Text style={{ color: 'white' }}>Cargando información...</Text>
            </View>
        );
    }
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ParallaxScrollView headerBackgroundColor={{ light: '#6A7666', dark: '#2B3035' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#C69D91"
                        colors={["#C69D91"]}
                    />
                }
            >
                <View style={styles.headerSection}>
                    <Image
                        source={{
                            uri: LibroInfo.portada
                                ? `${server}/uploads/portadas/${LibroInfo.portada}`
                                : LibroInfo.portadaGoogle
                                    ? LibroInfo.portadaGoogle
                                    : `${server}/uploads/portadas/default-cover.jpg`
                        }}
                        style={styles.portada}
                        resizeMode="cover"
                    />
                    <View style={styles.headerText}>
                        <Text variant="headlineMedium" style={styles.tituloPrincipal}>{LibroInfo.titulo}</Text>
                        <Text variant="titleMedium" style={styles.autorText}>{LibroInfo.autor}</Text>
                        <Badge style={styles.badgeEstado}>{LibroInfo.estado}</Badge>

                        {/* <Button
                            mode="contained"
                            icon="pencil"
                            // onPress={() => router.push(`/mi-biblioteca/editar-libro/${LibroInfo.id_libro}`)}
                            style={styles.buttonGris}
                        >
                            Editar
                        </Button> */}
                    </View>
                </View>

                <Divider style={styles.divider} />

                <List.Section>
                    <List.Accordion
                        title="Reseña"
                        titleStyle={styles.accordionTitle}
                        style={styles.accordionHeader}
                        id="0"
                    >
                        <View style={styles.accordionContent}>
                            <Text style={styles.label}>Fecha de lectura</Text>
                            <View style={styles.row}>
                                <Text style={styles.dataText}>Inicio: {LibroInfo.inicio ? new Date(LibroInfo.inicio).toLocaleDateString('es-AR') : '-'}</Text>
                                <Text style={styles.dataText}>Fin: {LibroInfo.fin ? new Date(LibroInfo.fin).toLocaleDateString('es-AR') : '-'}</Text>
                            </View>

                            <Text style={styles.label}>Reseña</Text>
                            <Text style={styles.dataText}>{LibroInfo.opinion || 'Sin reseña'}</Text>

                            <Text style={styles.label}>Notas adicionales</Text>
                            <Text style={styles.dataText}>{LibroInfo.nota || 'Sin notas'}</Text>
                        </View>
                    </List.Accordion>

                    <Divider />

                    <List.Accordion
                        title="Información"
                        titleStyle={styles.accordionTitle}
                        style={styles.accordionHeader}
                        id="1"
                    >
                        <View style={styles.accordionContent}>
                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>Edición</Text>
                                    <Text style={styles.dataText}>{LibroInfo.edicion}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.label}>Idioma</Text>
                                    <Text style={styles.dataText}>{LibroInfo.idioma}</Text>
                                </View>
                            </View>

                            <Text style={styles.label}>Cantidad de páginas</Text>
                            <Text style={styles.dataText}>{LibroInfo.paginas}</Text>

                            <Text style={styles.label}>Género/s</Text>
                            <Text style={styles.dataText}>{LibroInfo.genero}</Text>

                            <Text style={styles.label}>Sinópsis</Text>
                            <Text style={styles.dataText}>{LibroInfo.sinopsis}</Text>
                        </View>
                    </List.Accordion>
                </List.Section>
            </ParallaxScrollView>

            <FAB
                icon="pencil"
                size='medium'
                style={styles.fab}
                onPress={handleEdit}
            >
            </FAB>
        </>

    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    buttonGris: { backgroundColor: '#6c757d' },
    headerSection: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'flex-start'
    },
    accordionHeader: {
        backgroundColor: '#6A7666',
    },
    accordionTitle: {
        color: '#E4DAC9',
        fontWeight: 'bold',
    },
    portada: {
        width: 120,
        height: 180,
        borderRadius: 8
    },
    headerText: {
        flex: 1,
        marginLeft: 15
    },
    tituloPrincipal: {
        fontWeight: 'bold',
        color: '#E4DAC9'
    },
    autorText: {
        color: '#6A7666',
        marginBottom: 10
    },
    badgeEstado: {
        alignSelf: 'flex-start',
        backgroundColor: '#C69D91',
        color: 'white',
        paddingHorizontal: 8
    },
    divider: { marginVertical: 10 },
    accordionContent: {
        padding: 15,
        backgroundColor: '#2B3035'
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#6A7666', // Tu color verdeO
        marginTop: 10
    },
    dataText: {
        fontSize: 16,
        color: '#555',
        paddingLeft: 10,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    }, fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#C69D91',
        borderRadius: 50,
    },
});