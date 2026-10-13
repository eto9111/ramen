import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

import { router } from 'expo-router';

export default function MenuScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contenido}
    >
      <Text style={styles.titulo}>Nuestro menú</Text>
      <Text style={styles.descripcion}>Selecciona el ramen que deseas conocer.</Text>

      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Tonkotsu Ramen</Text>
          <Text style={styles.detalle}>Caldo de cerdo rico y cremoso</Text>
          <Text style={styles.precio}>$18.000</Text>
        </View>
        <Pressable
          style={styles.boton}
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
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Shoyu Ramen</Text>
          <Text style={styles.detalle}>Caldo a base de salsa de soja</Text>
          <Text style={styles.precio}>$15.500</Text>
        </View>
        <Pressable
          style={styles.boton}
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
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Miso Ramen</Text>
          <Text style={styles.detalle}>Sabor intenso y reconfortante</Text>
          <Text style={styles.precio}>$17.000</Text>
        </View>
        <Pressable
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/producto/[id]',
              params: {
                id: '3',
                nombre: 'Miso Ramen',
                precio: '17000',
                descripcion: 'Delicioso caldo mezclado con pasta de miso, acompañado de maíz dulce, mantequilla y tiernas rebanadas de cerdo.',
              },
            })
          }
        >
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.regresar}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.regresarTexto}>Regresar al inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  contenido: {
    padding: 25,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  descripcion: {
    color: '#5D4037',
    marginTop: 5,
    marginBottom: 25,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  producto: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#BF360C',
  },
  detalle: {
    fontSize: 13,
    color: '#D84315',
    marginTop: 5,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E64A19',
    marginTop: 8,
  },
  boton: {
    backgroundColor: '#BF360C',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    marginLeft: 15,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  regresar: {
    marginTop: 20,
    alignItems: 'center',
  },
  regresarTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
  },
});
