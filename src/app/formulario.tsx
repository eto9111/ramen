import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function FormularioScreen() {
  const { producto, cantidad, total } = useLocalSearchParams();
  
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');

  const enviarFormulario = () => {
    if (!nombre || !correo || !telefono || !ciudad) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    router.push({
      pathname: '/resultado',
      params: {
        producto,
        cantidad,
        total,
        nombre,
        correo,
        telefono,
        ciudad
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Tus Datos</Text>
      <Text style={styles.subtitulo}>Ingresa tu información para confirmar el pedido de {cantidad}x {producto}</Text>

      <View style={styles.formulario}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Juan Pérez"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. juan@correo.com"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 3001234567"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Bogotá"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Pressable style={styles.boton} onPress={enviarFormulario}>
          <Text style={styles.botonTexto}>Confirmar Pedido</Text>
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
