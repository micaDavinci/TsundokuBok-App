import { api } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, List, Text, TextInput } from "react-native-paper";

export default function editarLibro() {
    const { idLibro } = useLocalSearchParams();
    const { token } = useAuth();
    const navigate = useNavigation();
    const [portada, setPortada] = useState(null);
    const [previewUrl, setPreviewUrl] = useState<any>(null);

    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const [mensaje, setMensaje] = useState("");

    const [formData, setformData] = useState({
        titulo: "",
        autor: "",
        formato: "",
        opinion: "",
        nota: "",
        edicion: "",
        idioma: "",
        paginas: "",
        genero: "",
        sinopsis: "",
        inicio: "",
        fin: ""
    });

    useFocusEffect(
        useCallback(() => {
            if (token) {
                getLibro();
            }
        }, [])
    );

    const getLibro = async () => {
        try {
            const request = await api.get(`/ver-libro/${idLibro}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (request.data.success) {
                const libro = request.data.result
                setformData({
                    titulo: libro.titulo ?? "",
                    autor: libro.autor ?? "",
                    formato: libro.formato ?? "",
                    opinion: libro.opinion ?? "",
                    nota: libro.nota ?? "",
                    edicion: libro.edicion ?? "",
                    idioma: libro.idioma ?? "",
                    paginas: libro.paginas ?? "",
                    genero: libro.genero ?? "",
                    sinopsis: libro.sinopsis ?? "",
                    fin: libro.fin ?? "",
                    inicio: libro.inicio ?? "",
                });
            } else {
                alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Ha surgido un error, por favor intente más tarde");
        }
    }

    const handleEditar = async () => {
        try {
            const form = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            // if (portada) {
            //     form.append('portada', portada);
            // }

            console.log("Enviando a ID:", idLibro);
            const request = await api.put(`/editar-libro/${idLibro}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (request.data.success) {
                setMensaje("¡Estante creado con éxito!");
                setVisible(true);

                setTimeout(() => {
                    router.back();
                }, 1500);
            } else {
                alert(request.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Ha surgido un error, por favor intente más tarde");
        }
    }
    const handleChange = (name: string, value: string) => {
        setformData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePortadaChange = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            const selectedImage = result.assets[0];

            setPortada({
                uri: selectedImage.uri,
                name: `portada_${Date.now()}.jpg`,
                type: 'image/jpeg',
            } as any);
            setPreviewUrl(selectedImage.uri);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text variant="headlineMedium" style={styles.header}>Editar libro</Text>

            {/* Sección Principal */}
            <View style={styles.section}>
                <TextInput
                    label="Título"
                    value={formData.titulo}
                    onChangeText={(val) => handleChange('titulo', val)}
                    mode="outlined"
                    outlineColor="#E4DAC9"
                    activeOutlineColor="#E4DAC9"
                    textColor="#E4DAC9"
                    theme={{
                        colors: {
                            onSurfaceVariant: '#E4DAC9',
                            primary: '#E4DAC9',
                        }
                    }}
                    style={styles.input}
                />
                <TextInput
                    label="Autor/a"
                    value={formData.autor}
                    onChangeText={(val) => handleChange('autor', val)}
                    mode="outlined"
                    outlineColor="#E4DAC9"
                    activeOutlineColor="#E4DAC9"
                    textColor="#E4DAC9"
                    theme={{
                        colors: {
                            onSurfaceVariant: '#E4DAC9',
                            primary: '#E4DAC9',
                        }
                    }}
                    style={styles.input}
                />

                {/* Selector de Portada mejorado */}
                <View style={styles.portadaContainer}>
                    {/* {previewUrl && (
                        <Image source={{ uri: previewUrl }} style={styles.previewImage} />
                    )} */}
                    <Button
                        icon="camera"
                        mode="contained-tonal"
                        onPress={handlePortadaChange}
                        style={styles.imageButton}
                    >
                        {previewUrl ? 'Cambiar Portada' : 'Seleccionar Portada'}
                    </Button>
                </View>
            </View>

            {/* Acordeones */}
            <List.Section>
                <List.Accordion
                    title="Reseña"
                    titleStyle={styles.accordionTitle}
                    style={styles.accordionHeader}
                    id="0"
                >
                    <View style={styles.accordionBody}>
                        <Text style={styles.label}>Fecha de lectura (Inicio / Fin)</Text>
                        {/* Aquí podrías usar un DateTimePicker nativo */}
                        <View style={styles.row}>
                            <TextInput
                                label="Inicio"
                                placeholder="AAAA-MM-DD"
                                value={formData.inicio}
                                onChangeText={(val) => handleChange('inicio', val)}
                                mode="flat"
                                outlineColor="#E4DAC9"
                                activeOutlineColor="#E4DAC9"
                                textColor="#E4DAC9"
                                theme={{
                                    colors: {
                                        onSurfaceVariant: '#E4DAC9',
                                        primary: '#E4DAC9',
                                    }
                                }}
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="Fin"
                                placeholder="AAAA-MM-DD"
                                value={formData.fin}
                                onChangeText={(val) => handleChange('fin', val)}
                                mode="flat"
                                outlineColor="#E4DAC9"
                                activeOutlineColor="#E4DAC9"
                                textColor="#E4DAC9"
                                theme={{
                                    colors: {
                                        onSurfaceVariant: '#E4DAC9',
                                        primary: '#E4DAC9',
                                    }
                                }}
                                style={[styles.input, { flex: 1 }]}
                            />
                        </View>

                        <TextInput
                            label="Reseña"
                            value={formData.opinion}
                            onChangeText={(val) => handleChange('opinion', val)}
                            multiline
                            numberOfLines={4}
                            mode="outlined"
                            outlineColor="#E4DAC9"
                            activeOutlineColor="#E4DAC9"
                            textColor="#E4DAC9"
                            theme={{
                                colors: {
                                    onSurfaceVariant: '#E4DAC9',
                                    primary: '#E4DAC9',
                                }
                            }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Notas adicionales"
                            value={formData.nota}
                            onChangeText={(val) => handleChange('nota', val)}
                            multiline
                            numberOfLines={3}
                            mode="outlined"
                            outlineColor="#E4DAC9"
                            activeOutlineColor="#E4DAC9"
                            textColor="#E4DAC9"
                            theme={{
                                colors: {
                                    onSurfaceVariant: '#E4DAC9',
                                    primary: '#E4DAC9',
                                }
                            }}
                            style={styles.input}
                        />
                    </View>
                </List.Accordion>

                <List.Accordion
                    title="Información"
                    titleStyle={styles.accordionTitle}
                    style={styles.accordionHeader}
                    id="0"
                >
                    <View style={styles.accordionBody}>
                        <View style={styles.row}>
                            <TextInput
                                label="Edición (Año)"
                                keyboardType="numeric"
                                value={formData.edicion?.toString()}
                                onChangeText={(val) => handleChange('edicion', val)}
                                mode="outlined"
                                outlineColor="#E4DAC9"
                                activeOutlineColor="#E4DAC9"
                                textColor="#E4DAC9"
                                theme={{
                                    colors: {
                                        onSurfaceVariant: '#E4DAC9',
                                        primary: '#E4DAC9',
                                    }
                                }}
                                style={[styles.input, { flex: 1, marginRight: 5 }]}
                            />
                            <TextInput
                                label="Idioma"
                                value={formData.idioma}
                                onChangeText={(val) => handleChange('idioma', val)}
                                mode="outlined"
                                outlineColor="#E4DAC9"
                                activeOutlineColor="#E4DAC9"
                                textColor="#E4DAC9"
                                theme={{
                                    colors: {
                                        onSurfaceVariant: '#E4DAC9',
                                        primary: '#E4DAC9',
                                    }
                                }}
                                style={[styles.input, { flex: 1 }]}
                            />
                        </View>
                        <TextInput
                            label="Páginas"
                            keyboardType="numeric"
                            value={formData.paginas?.toString()}
                            onChangeText={(val) => handleChange('paginas', val)}
                            mode="outlined"
                            outlineColor="#E4DAC9"
                            activeOutlineColor="#E4DAC9"
                            textColor="#E4DAC9"
                            theme={{
                                colors: {
                                    onSurfaceVariant: '#E4DAC9',
                                    primary: '#E4DAC9',
                                }
                            }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Géneros"
                            value={formData.genero}
                            onChangeText={(val) => handleChange('genero', val)}
                            mode="outlined"
                            outlineColor="#E4DAC9"
                            activeOutlineColor="#E4DAC9"
                            textColor="#E4DAC9"
                            theme={{
                                colors: {
                                    onSurfaceVariant: '#E4DAC9',
                                    primary: '#E4DAC9',
                                }
                            }}
                            style={styles.input}
                        />
                        <TextInput
                            label="Sinopsis"
                            value={formData.sinopsis}
                            onChangeText={(val) => handleChange('sinopsis', val)}
                            multiline
                            numberOfLines={5}
                            mode="outlined"
                            outlineColor="#E4DAC9"
                            activeOutlineColor="#E4DAC9"
                            textColor="#E4DAC9"
                            theme={{
                                colors: {
                                    onSurfaceVariant: '#E4DAC9',
                                    primary: '#E4DAC9',
                                }
                            }}
                            style={styles.input}
                        />
                    </View>
                </List.Accordion>
            </List.Section>

            {/* Botones de Acción */}
            <View style={styles.buttonContainer}>
                <Button
                    mode="outlined"
                    onPress={() => router.back()}
                    style={styles.button}
                >
                    Cancelar
                </Button>
                <Button
                    mode="contained"
                    onPress={handleEditar}
                    style={[styles.button, styles.saveButton]}
                >
                    Guardar
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        backgroundColor: '#151718'
    },
    header: {
        padding: 20,
        fontWeight: 'bold',
        color: '#E4DAC9'
    },
    section: {
        paddingHorizontal: 20
    },
    input: {
        marginVertical: 15,
        backgroundColor: "#2B3035"
    },
    accordionHeader: {
        backgroundColor: '#6A7666',
    },
    accordionTitle: {
        color: '#E4DAC9',
        fontWeight: 'bold',
    },
    accordionBody: {
        padding: 15,
        backgroundColor: '#2B3035'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        marginBottom: 8,
        color: '#666',
        fontSize: 14
    },
    portadaContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    previewImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
        marginBottom: 10
    },
    imageButton: {
        width: '100%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
        marginTop: 10
    },
    button: {
        flex: 1,
        marginHorizontal: 5
    },
    saveButton: {
        backgroundColor: '#C69D91'
    },
});
