import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

type BookType = {
  id: number,
  volumeInfo: {
    title: string,
    authors?: string[],
    imageLinks?: {
      thumbnail: string;
    }
  },
};

type Props = {
  book: BookType,
};

const Resultado = ({ book } : Props) => {
  const { id, volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;

  return (
    <TouchableRipple
            rippleColor="rgba(198, 157, 145, 0.2)"
        >

          
      <Card style={styles.card}>
        {/* Imagen del Libro */}
        <View style={styles.imageContainer}>
          <Image
            source={{ 
              uri: imageLinks?.thumbnail
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Card.Content style={styles.content}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          <Text variant="bodySmall" numberOfLines={1} style={styles.author}>
            {authors?.join(", ")}
          </Text>
        </Card.Content>
      </Card>


{/* <Card style={styles.card}>
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
            </Card> */}

    </TouchableRipple>
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
    flex: 1,
    justifyContent: 'center',
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