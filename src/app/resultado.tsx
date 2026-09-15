import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ResultadoScreen() {
  const params = useLocalSearchParams();
  const { producto, cantidad, total, nombre, correo, telefono, ciudad } = params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>¡Pedido Confirmado!</Text>
      <Text style={styles.subtitulo}>Gracias por tu compra, {nombre}</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.seccionTitulo}>Detalles del Pedido</Text>
        
        <View style={styles.fila}>
          <Text style={styles.label}>Producto:</Text>
          <Text style={styles.valor}>{producto}</Text>
        </View>
        <View style={styles.fila}>
          <Text style={styles.label}>Cantidad:</Text>
          <Text style={styles.valor}>{cantidad}</Text>
        </View>
        <View style={styles.fila}>
          <Text style={styles.label}>Total a pagar:</Text>
          <Text style={styles.valorDestacado}>${total}</Text>
        </View>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.seccionTitulo}>Datos de Envío</Text>
        
        <View style={styles.fila}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.valor}>{correo}</Text>
        </View>
        <View style={styles.fila}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{telefono}</Text>
        </View>
        <View style={styles.fila}>
          <Text style={styles.label}>Ciudad:</Text>
          <Text style={styles.valor}>{ciudad}</Text>
        </View>
      </View>

      <Pressable style={styles.boton} onPress={() => router.push('/')}>
        <Text style={styles.botonTexto}>Volver al inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    padding: 25,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
  },
  subtitulo: {
    fontSize: 18,
    color: '#3E2723',
    marginTop: 10,
    marginBottom: 30,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BF360C',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFCCBC',
    paddingBottom: 5,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#5D4037',
    fontWeight: '600',
  },
  valor: {
    fontSize: 16,
    color: '#3E2723',
  },
  valorDestacado: {
    fontSize: 18,
    color: '#E64A19',
    fontWeight: 'bold',
  },
  boton: {
    backgroundColor: '#BF360C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
