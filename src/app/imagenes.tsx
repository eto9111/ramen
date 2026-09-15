import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ImagenesScreen() {
  const imagenes = [
    { id: '1', nombre: 'Tonkotsu Ramen', src: require('../../assets/images/tonkotsu.jpg') },
    { id: '2', nombre: 'Shoyu Ramen', src: require('../../assets/images/shoyu.png') },
    { id: '3', nombre: 'Miso Ramen', src: require('../../assets/images/miso.jpg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Galería de Ramen</Text>
      <Text style={styles.descripcion}>Descubre nuestros platillos en imágenes</Text>

      {imagenes.map((img) => (
        <View key={img.id} style={styles.tarjeta}>
          <Image source={img.src} style={styles.imagen} />
          <Text style={styles.nombre}>{img.nombre}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#5D4037',
    marginBottom: 20,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#BF360C',
  },
  boton: {
    borderWidth: 2,
    borderColor: '#BF360C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  botonTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
