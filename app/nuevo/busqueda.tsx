import { api } from '@/api/api';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, IconButton, Text, TextInput } from 'react-native-paper';
import Resultado from './resultado';

export default function BusquedaPredictiva(){
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const buscarLibro = async () => {
        if (!query) return;
        setLoading(true);
        try {
            const res = await api.get("/buscar-libros", {
                params: { q: query }
            });
            setBooks(res.data);
        } catch (error) {
            console.error("Error buscando libros:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.mainContainer}>
            {/* Header: Título y Volver */}
            <View style={styles.header}>
                <Text style={styles.titulo}>Buscar libro</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.linkRosa}>‹ Volver</Text>
                </TouchableOpacity>
            </View>

            {/* Barra de Búsqueda */}
            <View style={styles.searchRow}>
                <TextInput
                    mode="outlined"
                    placeholder="Ej: El principito"
                    value={query}
                    onChangeText={setQuery}
                    style={styles.input}
                    outlineColor="#E4DAC9"
                    activeOutlineColor="#C69D91"
                    textColor="#E4DAC9"
                    placeholderTextColor="rgba(228, 218, 201, 0.4)"
                />
                <IconButton
                    icon="magnify"
                    mode="contained"
                    containerColor="#C69D91"
                    iconColor="#2B3035"
                    size={30}
                    onPress={buscarLibro}
                />
            </View>

            {/* Lista de Resultados */}
            {loading ? (
                <ActivityIndicator animating={true} color="#C69D91" style={{ marginTop: 20 }} />
            ) : (
                <>
                {/* <FlatList
                    data={books}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={({ item }) => <Resultado book={item} />}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No hay libros que mostrar</Text>
                    }
                /> */}

                {books.map(book => (
                    <Resultado book={book}/>
                ))}


                </>

                
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#2B3035',
        paddingTop: 50, // Espacio para el notch del celular
    },
    header: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E4DAC9',
    },
    linkRosa: {
        color: '#C69D91',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: '#6A7666',
        marginRight: 10,
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    emptyText: {
        color: '#E4DAC9',
        textAlign: 'center',
        marginTop: 50,
        opacity: 0.5
    }
});