import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contenido}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>Ramen App</Text>
        <Text style={styles.titulo}>Tu ramen, tu momento</Text>
        <Text style={styles.descripcion}>
          Descubre nuestros deliciosos tazones preparados especialmente para ti.
        </Text>
      </View>

      <Text style={styles.seccionTitulo}>Recomendados</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.productoTitulo}>Tonkotsu Ramen</Text>
        <Text style={styles.productoDescripcion}>Caldo de cerdo rico y cremoso</Text>
        <Text style={styles.precio}>$18.000</Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.productoTitulo}>Shoyu Ramen</Text>
        <Text style={styles.productoDescripcion}>Caldo a base de salsa de soja</Text>
        <Text style={styles.precio}>$15.500</Text>
      </View>

      <Pressable
        style={styles.boton}
        onPress={() => router.push('/menu')}
      >
        <Text style={styles.botonTexto}>Ver menú completo</Text>
      </Pressable>

      <Pressable
        style={styles.botonSecundario}
        onPress={() => router.push('/imagenes')}
      >
        <Text style={styles.botonSecundarioTexto}>Galería de Imágenes</Text>
      </Pressable>

      <Pressable
        style={styles.botonSecundario}
        onPress={() => router.push('/contacto')}
      >
        <Text style={styles.botonSecundarioTexto}>Contacto</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC', // Color crema tipo fideos
  },
  contenido: {
    padding: 25,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    fontSize: 16,
    color: '#D84315', // Naranja rojizo oscuro
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 5,
  },
  descripcion: {
    fontSize: 15,
    color: '#5D4037',
    marginTop: 10,
    lineHeight: 22,
  },
  seccionTitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 15,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },
  productoTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#BF360C',
  },
  productoDescripcion: {
    color: '#D84315',
    marginTop: 5,
  },
  precio: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E64A19',
    marginTop: 10,
  },
  boton: {
    backgroundColor: '#BF360C',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: '#BF360C',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  botonSecundarioTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
  },
});