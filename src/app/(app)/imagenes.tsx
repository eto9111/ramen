import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ImagenesScreen() {
  const imagenes = [
    { id: '1', nombre: 'Tonkotsu Ramen Tradicional', src: require('../../../assets/images/tonkotsu.jpg') },
    { id: '2', nombre: 'Shoyu Ramen Clásico', src: require('../../../assets/images/shoyu.png') },
    { id: '3', nombre: 'Miso Ramen Hokkaido', src: require('../../../assets/images/miso.jpg') },
    { id: '4', nombre: 'Bogia Instant Noodles Beef Flavor', src: require('../../../assets/images/bogia-beef.jpg') },
    { id: '5', nombre: 'Samyang Buldak Carbonara', src: require('../../../assets/images/buldak-carbonara.jpg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Galería de Ramen</Text>
      <Text style={styles.descripcion}>Descubre nuestros 5 platillos y presentaciones</Text>

      {imagenes.map((img) => (
        <View key={img.id} style={styles.tarjeta}>
          <Image source={img.src} style={styles.imagen} resizeMode="contain" />
          <Text style={styles.nombre}>{img.nombre}</Text>
        </View>
      ))}

      <Pressable style={styles.boton} onPress={() => router.replace('/')}>
        <Text style={styles.botonTexto}>← Volver al inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 10,
  },
  descripcion: {
    fontSize: 15,
    color: '#5D4037',
    marginBottom: 20,
    textAlign: 'center',
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  imagen: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#FAFAFA',
  },
  nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#BF360C',
    textAlign: 'center',
  },
  boton: {
    borderWidth: 2,
    borderColor: '#BF360C',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  botonTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
