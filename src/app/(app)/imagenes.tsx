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
      <Text style={styles.titulo}>Galeria de platos</Text>
      <Text style={styles.descripcion}>Presentaciones de nuestros 5 productos</Text>

      {imagenes.map((img) => (
        <View key={img.id} style={styles.tarjeta}>
          <Image source={img.src} style={styles.imagen} resizeMode="contain" />
          <Text style={styles.nombre}>{img.nombre}</Text>
        </View>
      ))}

      <Pressable style={styles.boton} onPress={() => router.replace('/')}>
        <Text style={styles.botonTexto}>Volver al inicio</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 8,
  },
  descripcion: {
    fontSize: 14,
    color: '#5D4037',
    marginBottom: 16,
    textAlign: 'center',
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#EFEBE9',
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#FAFAFA',
  },
  nombre: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#BF360C',
    textAlign: 'center',
  },
  boton: {
    borderWidth: 1,
    borderColor: '#BF360C',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  botonTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 14,
  },
});
