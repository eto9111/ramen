import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';

export default function FormularioInicialScreen() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');

  const enviarFormulario = () => {
    if (!nombres || !apellidos || !telefono) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    Alert.alert('Éxito', 'Tus datos iniciales han sido registrados.', [
      { text: 'OK', onPress: () => router.push('/') }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Datos Iniciales</Text>
      <Text style={styles.subtitulo}>Ingresa tu información de registro</Text>

      <View style={styles.formulario}>
        <Text style={styles.label}>Nombres</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Juan"
          value={nombres}
          onChangeText={setNombres}
        />

        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Pérez"
          value={apellidos}
          onChangeText={setApellidos}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 3001234567"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Pressable style={styles.boton} onPress={enviarFormulario}>
          <Text style={styles.botonTexto}>Registrar</Text>
        </Pressable>

        <Pressable style={styles.botonCancelar} onPress={() => router.back()}>
          <Text style={styles.botonTextoCancelar}>Cancelar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    padding: 25,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#D84315',
    marginBottom: 25,
  },
  formulario: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
  },
  label: {
    fontSize: 14,
    color: '#5D4037',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#3E2723',
    backgroundColor: '#FAFAFA',
  },
  boton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonCancelar: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BF360C',
  },
  botonTextoCancelar: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
