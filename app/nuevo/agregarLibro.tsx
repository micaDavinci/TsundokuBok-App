import { api } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router, Stack, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";


export default function agregarLibro() {
    const { token } = useAuth();
    const { id } = useLocalSearchParams();
    const navigate = useNavigation()

    const [id_ubicacion, setIdUbicacion] = useState("");
    const [titulo, seTtitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [edicion, setEdicion] = useState("");
    const [paginas, setPaginas] = useState("");
    const [idioma, setIdioma] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [genero, setGenero] = useState("");
    const [portadaFile, setPortadaFile] = useState(null);
    const [portadaGoogle, setPortadaGoogle] = useState(null);
    const [previewUrl, setPreviewUrl] = useState<any[]>([]);
    const [prioridad, setPriotidad] = useState("");
    const [destino, setDestino] = useState("");

    const [estantes, setEstantes] = useState([]);
    const [opcionesSegundoCombo, setOpcionesSegundoCombo] = useState<any[]>([]);
    const [segundoValor, setSegundoValor] = useState("");

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [mensaje, setMensaje] = useState("");

    const prioridades = [
        { id: "alta", nombre: "Alta" },
        { id: "media", nombre: "Media" },
        { id: "baja", nombre: "Baja" }
    ];


    useFocusEffect(
        useCallback(() => {
            const updateSegundoCombo = async () => {
                if (destino === "1") {
                    // Biblioteca → mostrar estantes
                    const est = await getEstantes();
                    setOpcionesSegundoCombo(est);
                } else if (destino === "2") {
                    // Lista de deseos → mostrar prioridades
                    setOpcionesSegundoCombo(prioridades);
                } else {
                    setOpcionesSegundoCombo([]);
                }
                setSegundoValor(""); // reiniciamos el segundo combo
            };

            updateSegundoCombo();
        }, [destino])
    );

    useFocusEffect(
        useCallback(() => {
            const cargarLibroDesdeGoogle = async () => {
                try {
                    const res = await api.get(`/libro-buscado/${id}`);
                    const data = res.data;
                    const info = data.volumeInfo;
                    const fecha = info.publishedDate || "";
                    const anio = fecha.substring(0, 4);

                    seTtitulo(info.title || "");
                    setAutor(info.authors?.join(", ") || "");
                    setPaginas(info.pageCount || "");
                    setIdioma(info.language || "");
                    setSinopsis(limpiarHTML(info.description || ""));
                    setGenero(info.categories?.join(", ") || "");
                    setEdicion(anio);
                    setPortadaGoogle(info.imageLinks?.thumbnail || "");

                    // Imagen (solo preview, no archivo real)
                    if (info.imageLinks?.thumbnail) {
                        setPreviewUrl(info.imageLinks.thumbnail);
                    }

                } catch (error) {
                    console.error("Error cargando libro:", error);
                }
            };

            if (id) {
                cargarLibroDesdeGoogle();
            }
        }, [id])
    );


    const getEstantes = async () => {
        try {
            const request = await api.get("/estantes", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (request.data.success) {
                setEstantes(request.data.result);
                return request.data.result;
            } else {
                Alert.alert("Error", request.data.message);
                return [];
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ha surgido un error, por favor intente de nuevo más tarde");
            return [];
        }
    };

    const handleNuevo = async () => {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('autor', autor);
        formData.append('edicion', edicion);
        formData.append('paginas', paginas.toString());
        formData.append('idioma', idioma);
        formData.append('sinopsis', sinopsis);
        formData.append('genero', genero);
        formData.append('portadaGoogle', portadaGoogle || "");
        formData.append('id_ubicacion', destino === "1" ? segundoValor : "");
        formData.append('prioridad', destino === "2" ? segundoValor : "");

        if (portadaFile) {
            // @ts-ignore (FormData en RN pide este formato de objeto)
            formData.append('portada', portadaFile);
        }

        try {
            const request = await api.post(`/nuevo-libro`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });


            if (request.data.success) {
                setMensaje("¡Estante creado con éxito!");
                setVisible(true);

                setTimeout(() => {
                    router.back();
                }, 1500);

            } else {
                Alert.alert("Error", request.data.message);
            }
        } catch (error: any) {
            console.error("Error completo", error);
            setMensaje(error.response?.data?.message);
            Alert.alert("Error", mensaje);
        }
    }



    const handlePortadaChange = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permisos", "Necesitamos acceso a tus fotos para subir la portada.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0];
            // setPreviewUrl(selectedImage.uri);

            // Preparamos el objeto tipo "File" para React Native
            setPortadaFile({
                uri: selectedImage.uri,
                name: `portada_${Date.now()}.jpg`,
                type: 'image/jpeg',
            } as any);
        }
    };

    const limpiarHTML = (html: string) => {
        return html ? html.replace(/<[^>]*>?/gm, '') : "";
    };

    const onRefresh = () => {
        setRefreshing(true);

    };
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView style={styles.mainContainer} contentContainerStyle={styles.scrollContent}>
                <Text variant="headlineMedium" style={styles.tituloHeader}>Nuevo Libro</Text>

                {/* Sección de Portada */}
                <View style={styles.portadaContainer}>
                    {previewUrl ? (
                        // <Image source={{uri: previewUrl }} style={styles.previewImage} />
                        <Image />
                    ) : (
                        <View style={[styles.previewImage, styles.placeholderImage]}>
                            <Text style={{ color: '#6A7666' }}>Sin Portada</Text>
                        </View>
                    )}
                    <Button
                        //   mode="outlined" 
                        //   onPress={handlePortadaChange} 
                        //   style={styles.buttonFile}
                        textColor="#C69D91"
                    >
                        Seleccionar Imagen
                    </Button>
                </View>

                {/* Inputs Principales */}
                <TextInput
                    label="Título"
                    value={titulo}
                    onChangeText={seTtitulo}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#6A7666"
                    activeOutlineColor="#C69D91"
                    textColor="#E4DAC9"
                />

                <TextInput
                    label="Autor/a"
                    value={autor}
                    onChangeText={setAutor}
                    mode="outlined"
                    style={styles.input}
                    outlineColor="#6A7666"
                    activeOutlineColor="#C69D91"
                    textColor="#E4DAC9"
                />

                {/* Selectores (Destino y Ubicación/Prioridad) */}
                <View style={styles.row}>
                    <View style={styles.flex1}>
                        <Text style={styles.label}>Agregar a</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={destino}
                                onValueChange={(itemValue) => setDestino(itemValue)}
                                style={styles.picker}
                                dropdownIconColor="#E4DAC9"
                            >
                                <Picker.Item label="Seleccione" value="" />
                                <Picker.Item label="Biblioteca" value="1" />
                                <Picker.Item label="Lista de deseos" value="2" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.flex1}>
                        <Text style={styles.label}>
                            {destino === "2" ? "Prioridad" : "Ubicación"}
                        </Text>
                        <View style={[styles.pickerWrapper, destino === "" && styles.disabledPicker]}>
                            <Picker
                                selectedValue={segundoValor}
                                enabled={destino !== ""}
                                onValueChange={(itemValue) => setSegundoValor(itemValue)}
                                style={styles.picker}
                                dropdownIconColor="#E4DAC9"
                            >
                                <Picker.Item label="Seleccione" value="" />
                                {opcionesSegundoCombo.map((opcion) => (
                                    <Picker.Item
                                        key={opcion.id_estante ?? opcion.id}
                                        label={opcion.nombre}
                                        value={opcion.id_estante ?? opcion.id}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>

                {/* Datos Técnicos en Fila */}
                <View style={styles.row}>
                    <TextInput
                        label="Año"
                        value={edicion}
                        onChangeText={setEdicion}
                        keyboardType="numeric"
                        mode="outlined"
                        style={[styles.input, styles.flex1, { marginRight: 8 }]}
                    />
                    <TextInput
                        label="Páginas"
                        value={paginas}
                        onChangeText={setPaginas}
                        keyboardType="numeric"
                        mode="outlined"
                        style={[styles.input, styles.flex1]}
                    />
                </View>

                <TextInput
                    label="Idioma"
                    value={idioma}
                    onChangeText={setIdioma}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="Género/s"
                    value={genero}
                    onChangeText={setGenero}
                    mode="outlined"
                    style={styles.input}
                />

                <TextInput
                    label="Sinópsis"
                    value={sinopsis}
                    onChangeText={setSinopsis}
                    mode="outlined"
                    multiline
                    numberOfLines={6}
                    style={[styles.input, styles.textArea]}
                />

                <Button
                    mode="contained"
                    onPress={handleNuevo}
                    style={styles.submitButton}
                    labelStyle={{ fontWeight: 'bold' }}
                >
                    Guardar Libro
                </Button>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#151718',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    tituloHeader: {
        color: '#E4DAC9',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    portadaContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    previewImage: {
        width: 120,
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
    },
    placeholderImage: {
        backgroundColor: '#353b41',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6A7666',
        borderStyle: 'dashed',
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#151718',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 10,
    },
    flex1: {
        flex: 1,
    },
    label: {
        color: '#6A7666',
        fontSize: 12,
        marginBottom: 4,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#6A7666',
        borderRadius: 5,
        backgroundColor: '#151718',
        height: 50,
        justifyContent: 'center',
    },
    picker: {
        color: '#E4DAC9',
    },
    disabledPicker: {
        opacity: 0.5,
        backgroundColor: '#1a1d21',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#6A7666',
        paddingVertical: 5,
    },
});