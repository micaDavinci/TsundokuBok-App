import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';


export default function Login() {

  const [email, setEmail] = React.useState("");
  const [biblioteca, setBiblioteca] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");

  const router = useRouter();

  const handleLogin = () => {
    router.push('/(tabs)/biblioteca');
  }
  return (

    <ParallaxScrollView>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant='displaySmall' style={styles.titulo}>Login</Text>
          <TextInput
            label="Email"
            value={email}
            mode="outlined"
            style={styles.input}
            onChangeText={email => setEmail(email)}
          />

          <TextInput
            label="Biblioteca"
            value={biblioteca}
            mode="outlined"
            style={styles.input}
            onChangeText={biblioteca => setBiblioteca(biblioteca)}
          />

          <TextInput
            label="Contraseña"
            value={contrasena}
            mode="outlined"
            style={styles.input}
            onChangeText={contrasena => setContrasena(contrasena)}
          />

          <Button mode="contained" style={styles.button} onPress={handleLogin}>Buscar</Button>
        </Card.Content>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    margin: 4,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: "#6A7666"

  },
  titulo: {
    color: '#E4DAC9',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    margin: 4,
    backgroundColor: "#6A7666",
  },
  button: {
    color: "#E4DAC9",
    backgroundColor: "#2B3035",
    marginTop: 32,
  }
});
