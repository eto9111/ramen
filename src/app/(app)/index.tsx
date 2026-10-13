import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { supabase } from "../../lib/supabase";

export default function HomeScreen() {
  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }
  };

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

      <Pressable
        style={styles.tarjeta}
        onPress={() =>
          router.push({
            pathname: '/producto/[id]',
            params: {
              id: '1',
              nombre: 'Tonkotsu Ramen',
              precio: '18000',
              descripcion: 'Caldo de huesos de cerdo cocinado a fuego lento por horas, acompañado de chashu, huevo marinado y fideos frescos.',
            },
          })
        }
      >
        <Text style={styles.productoTitulo}>Tonkotsu Ramen</Text>
        <Text style={styles.productoDescripcion}>Caldo de cerdo rico y cremoso</Text>
        <Text style={styles.precio}>$18.000</Text>
      </Pressable>

      <Pressable
        style={styles.tarjeta}
        onPress={() =>
          router.push({
            pathname: '/producto/[id]',
            params: {
              id: '2',
              nombre: 'Shoyu Ramen',
              precio: '15500',
              descripcion: 'Un clásico ligero con caldo a base de salsa de soja, pollo, bambú, cebolleta y un huevo suave.',
            },
          })
        }
      >
        <Text style={styles.productoTitulo}>Shoyu Ramen</Text>
        <Text style={styles.productoDescripcion}>Caldo a base de salsa de soja</Text>
        <Text style={styles.precio}>$15.500</Text>
      </Pressable>

      <View style={styles.filaBotones}>
        <Pressable
          style={styles.botonMini}
          onPress={() => router.push('/menu')}
        >
          <Text style={styles.botonMiniTexto}>Menú</Text>
        </Pressable>

        <Pressable
          style={styles.botonMini}
          onPress={() => router.push('/imagenes')}
        >
          <Text style={styles.botonMiniTexto}>Galería</Text>
        </Pressable>

        <Pressable
          style={styles.botonMini}
          onPress={() => router.push('/formulario')}
        >
          <Text style={styles.botonMiniTexto}>Pedido</Text>
        </Pressable>

        <Pressable
          style={styles.botonMini}
          onPress={() => router.push('/contacto')}
        >
          <Text style={styles.botonMiniTexto}>Contacto</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.boton}
        onPress={() => router.push('/registros')}
      >
        <Text style={styles.botonTexto}>Ramen Lovers (Registros)</Text>
      </Pressable>

      <Pressable
        style={styles.botonCerrar}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoCerrar}>Cerrar sesión</Text>
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
    fontWeight: 'bold',
    fontSize: 16,
  },
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  botonMini: {
    backgroundColor: '#BF360C',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonMiniTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botonCerrar: {
    backgroundColor: "#8E3B46",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  textoCerrar: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
