import { api } from '@/api/api';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, IconButton, Text, TextInput } from 'react-native-paper';
import Resultado from './resultado';

export default function BusquedaPredictiva(){
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscarLibro = async () => {
        console.log("Buscando:", query);
   const queryLimpia = encodeURIComponent(query.trim()); 
    
    try {
        const res = await api.get("/buscar-libros", {
            params: { q: queryLimpia }
        });
        console.log("Respuesta completa:", res.data);

        setBooks(res.data);
    } catch (error) {
        console.error(error);
    }
};

    return (
        <>
        {/* <TextInput
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
         <Button 
                        mode="contained" 
                        icon="magnify"
                        onPress={buscarLibro}
                    >
                        Buscar por título o autor
                    </Button> */}
        
        <View style={styles.mainContainer}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.header}>
                <Text style={styles.titulo}>Buscar libro</Text>
            </View>

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
           

            {loading ? (
                <ActivityIndicator animating={true} color="#C69D91" style={{ marginTop: 20 }} />
            ) : (

                <View style={styles.listContent}>
                    {books.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No se encontraron resultados</Text>
                        </View>
                    ) : (
                        books.map((book) => (
                            <Resultado book={book} />
                        ))
                    )}
                </View>                
            )}
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#151718',
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
        backgroundColor: '#2B3035',
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
    }, emptyContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
});