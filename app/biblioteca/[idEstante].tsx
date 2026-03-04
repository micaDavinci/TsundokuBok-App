
import { api } from "@/api/api";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useAuth } from "@/context/AuthContext";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import { Button, FAB, Modal, Portal, Text, TextInput } from "react-native-paper";
import { LibroList } from "./libroList";



export default function estante() {
    const { idEstante } = useLocalSearchParams();
    const { token } = useAuth();

    const [estanteNombre, setEstanteNombre] = useState("");
    const [show, setShow] = useState(false);
    const [estanteList, setEstanteList] = useState([]);
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


    useFocusEffect(
        useCallback(() => {
            if (token) {
                getEstanteList();
            }

        }, [])
    );

    const getEstanteList = async () => {
        setLoading(true);
        try {
            const request = await api.get(`/librosList/${idEstante}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (request.data.success) {
                setEstanteList(request.data.result);
                getEstanteNombre();
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
    }

    const getEstanteNombre = async () => {
        try {
            const request = await api.get(`/recuperar-estante/${idEstante}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (request.data.success) {
                setEstanteNombre(request.data.result.nombre);
            } else {
                alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async () => {
         try {
            const request = await api.put(`/editar-estante/${idEstante}`,
                {
                    nombre
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (request.data.success) {
                handleClose();
                await getEstanteList();
                setNombre("");

            } else {
                Alert.alert("Error", request.data.message);
            }
        } catch (error: any) {
            console.error("Error completo", error);
            const mensaje = error.response?.data?.message
            Alert.alert("Error", mensaje);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onRefresh = () => {
        setRefreshing(true);
    };

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
                <View style={styles.headerRow}>
                    <Text variant="displaySmall" style={styles.titulo}>
                        {estanteNombre}
                    </Text>
                </View>

                <View style={styles.listContainer}>
                    {estanteList.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Todavía no se han guardado libros en este estante</Text>
                            <Text style={styles.emptySub}>Desliza hacia abajo para actualizar</Text>
                        </View>
                    ) : (
                        estanteList.map((libro) => (
                            <LibroList libro={libro} />
                        ))
                    )}
                </View>
            </ParallaxScrollView>
            <FAB
                icon="pencil"
                size='medium'
                style={styles.fab}
                onPress={handleShow}
            >
            </FAB>


            <Portal>
                <Modal visible={show} onDismiss={handleClose} contentContainerStyle={styles.containerStyle}>
                    <Text variant="headlineSmall" style={styles.tituloEdit}>Editar estante</Text>

                    <TextInput
                        label="Nombre"
                        value={nombre}
                        placeholder={estanteNombre}
                        mode="outlined"
                        outlineColor="#E4DAC9"
                        activeOutlineColor="#E4DAC9"
                        textColor="#E4DAC9"
                        style={styles.input}
                        onChangeText={setNombre}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#E4DAC9',
                                primary: '#E4DAC9',
                            }
                        }}
                    />

                    <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={{ color: '#E4DAC9', fontWeight: 'bold' }}
                    onPress={handleEdit}
                    >
                        Guardar
                    </Button>

                    <Button
                        mode="text"
                        style={styles.buttonSecondary}
                        labelStyle={{ color: '#2B3035' }}
                        onPress={handleClose}
                    >
                        Cancelar
                    </Button>
                </Modal>
            </Portal>


        </>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    titulo: {
        color: '#E4DAC9',
        fontWeight: 'bold',
    },
    logoutBtn: {
        borderColor: '#C69D91',
        borderRadius: 12,
    },
    listContainer: {

    },
    emptyContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#E4DAC9',
        fontSize: 18,
        opacity: 0.8,
        alignItems: 'center',
    },
    emptySub: {
        color: '#C69D91',
        fontSize: 14,
        marginTop: 8,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#C69D91',
        borderRadius: 50,
    },
    containerStyle: {
        width: '85%',
        backgroundColor: "#808080",
        borderRadius: 24,
        padding: 24,
        alignSelf: 'center',
    },
    tituloEdit: {
        color: '#E4DAC9',
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 22,
        paddingBottom: 8
    },
    input: {
        marginVertical: 8,
        backgroundColor: "#808080"
    },
    button: {
        backgroundColor: "#6A7666",
        marginTop: 20,
        borderRadius: 15,
    },
    buttonSecondary: {
        marginTop: 8,
    },
});