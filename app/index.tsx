import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [biblioteca, setBiblioteca] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");


  const handleLogin = async () => {
    try {
      const request = await api.post(`/login`, {
        email, biblioteca, contrasena
      });

      if (request.data.success) {
        login(request.data);
        router.replace('/(tabs)/biblioteca');
      } else {
        Alert.alert(request.data.message);
      }
    } catch (error: any) {
      console.error("Error completo", error);
      const mensaje = error.response?.data?.message
      Alert.alert("Error", mensaje);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <Card style={styles.card}>
        <Card.Content>
          <Text variant='displaySmall' style={styles.tituloTexto}>Login</Text>

          <TextInput
            label="Email"
            value={email}
            mode="outlined"
            outlineColor="#E4DAC9"
            activeOutlineColor="#E4DAC9"
            textColor="#E4DAC9"
            style={styles.input}
            onChangeText={setEmail}
            theme={{
              colors: {
                onSurfaceVariant: '#E4DAC9',
                primary: '#E4DAC9',
              }
            }}
          />

          <TextInput
            label="Biblioteca"
            value={biblioteca}
            mode="outlined"
            outlineColor="#E4DAC9"
            activeOutlineColor="#E4DAC9"
            textColor="#E4DAC9"
            style={styles.input}
            onChangeText={setBiblioteca}
            theme={{
              colors: {
                onSurfaceVariant: '#E4DAC9',
                primary: '#E4DAC9',
              }
            }}
          />

          <TextInput
            label="Contraseña"
            value={contrasena}
            mode="outlined"
            outlineColor="#E4DAC9"
            activeOutlineColor="#E4DAC9"
            textColor="#E4DAC9"
            style={styles.input}
            onChangeText={setContrasena}
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
            onPress={handleLogin}
          >
            Ingresar
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151718',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    paddingVertical: 10,
    backgroundColor: "#2B3035",
    borderRadius: 30,
    elevation: 18,
    paddingTop: 32,
    paddingBottom: 32,
  },
  tituloTexto: {
    color: '#E4DAC9',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 16
  },
  input: {
    marginVertical: 8,
    backgroundColor: "#2B3035"
  },
  button: {
    backgroundColor: "#6A7666",
    marginTop: 20,
    borderRadius: 15,
  },
});
