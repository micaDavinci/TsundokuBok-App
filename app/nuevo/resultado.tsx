import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type BookType = {
  id: number;
  volumeInfo: String;
};

type Props = {
  estante: BookType;
};

const Resultado = ({ book } : Props) => {
  const navigation = useNavigation();
  const { id, volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;

  return (
    <TouchableOpacity 
      style={styles.cardWrapper}
    //   onPress={() => navigation.navigate('AgregarLibro', { id })}
    >
      <Card style={styles.card}>
        {/* Imagen del Libro */}
        <View style={styles.imageContainer}>
          <Image
            source={{ 
              uri: imageLinks?.thumbnail?.replace('http:', 'https:') 
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Card.Content style={styles.content}>
          <Text variant="titleMedium" numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <Text variant="bodySmall" numberOfLines={1} style={styles.author}>
            {authors?.join(", ")}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    margin: 8,
  },
  card: {
    backgroundColor: '#6A7666', // Tu verde seco
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    height: 350, // Altura fija para que todos los items se vean parejos
  },
  imageContainer: {
    backgroundColor: '#2B3035', // Fondo oscuro tras la imagen por si no ocupa todo el espacio
    height: 220,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  content: {
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  title: {
    color: '#E4DAC9', // Tu crema
    fontWeight: 'bold',
    lineHeight: 20,
  },
  author: {
    color: '#C69D91', // Tu rosa/terracota
    marginTop: 4,
  },
});

export default Resultado;