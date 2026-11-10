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
      <Text style={styles.titulo}>Nuestro menu</Text>
      <Text style={styles.descripcion}>Selecciona el ramen que deseas conocer o explora el catalogo completo.</Text>

      {/* Acceso directo al catalogo */}
      <Pressable
        style={styles.bannerCatalogo}
        onPress={() => router.push('/catalogo')}
      >
        <Text style={styles.bannerCatalogoTexto}>Ver en catalogo completo</Text>
      </Pressable>

      {/* Producto 1 */}
      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Tonkotsu Ramen Tradicional</Text>
          <Text style={styles.detalle}>Caldo de cerdo cocinado 16 horas con chashu</Text>
          <Text style={styles.precio}>$18.000 COP</Text>
        </View>
        <Pressable
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/detalle-item',
              params: {
                id: '1',
                nombre: 'Tonkotsu Ramen Tradicional',
                precio: '18000',
                descripcion: 'Caldo de cerdo cocinado a fuego lento por 16 horas con chashu, huevo marinado y fideos artesanales.',
                detalle: 'Preparado con fondo de cerdo blanco a fuego lento, aceite de ajo negro aromático, brotes de bambú, cebolleta fresca y chashu braseado.',
              },
            })
          }
        >
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      {/* Producto 2 */}
      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Shoyu Ramen Clásico</Text>
          <Text style={styles.detalle}>Caldo ligero a base de salsa de soja, pollo y menma</Text>
          <Text style={styles.precio}>$15.500 COP</Text>
        </View>
        <Pressable
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/detalle-item',
              params: {
                id: '2',
                nombre: 'Shoyu Ramen Clásico de Tokyo',
                precio: '15500',
                descripcion: 'Caldo ligero a base de salsa de soja tradicional con pollo de corral y cebolleta fina.',
                detalle: 'Receta tradicional con caldo transparente elaborado con alga kombu, setas shiitake y salsa shoyu añejada, pechuga tierna y huevo suave.',
              },
            })
          }
        >
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      {/* Producto 3 */}
      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Miso Ramen Hokkaido</Text>
          <Text style={styles.detalle}>Sabor intenso de miso tostado, maíz y mantequilla</Text>
          <Text style={styles.precio}>$17.000 COP</Text>
        </View>
        <Pressable
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/detalle-item',
              params: {
                id: '3',
                nombre: 'Miso Ramen Hokkaido',
                precio: '17000',
                descripcion: 'Caldo aromático enriquecido con pasta de miso tostada, maíz tierno, mantequilla y carne picada.',
                detalle: 'Originario de Sapporo, con pasta de miso salteada con jengibre fresco, ajo confitado, sésamo tostado, maíz dulce y mantequilla pura.',
              },
            })
          }
        >
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      {/* Producto 4 */}
      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Bogia Instant Noodles Beef</Text>
          <Text style={styles.detalle}>Fideos instantáneos en bowl con caldo especiado de res</Text>
          <Text style={styles.precio}>$12.500 COP</Text>
        </View>
        <Pressable
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/detalle-item',
              params: {
                id: '4',
                nombre: 'Bogia Instant Noodles Beef Flavor',
                precio: '12500',
                descripcion: 'Fideos instantáneos en bowl con caldo especiado de res y vegetales deshidratados.',
                detalle: 'Bowl de fideos ondulados listos en 3 minutos. Incluye sobre de caldo concentrado de res con notas de anís estrella, cebolleta y zanahoria.',
              },
            })
          }
        >
          <Text style={styles.botonTexto}>Ver</Text>
        </Pressable>
      </View>

      {/* Producto 5 */}
      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Samyang Buldak Carbonara</Text>
          <Text style={styles.detalle}>Fideos picantes coreanos con crema suave y queso</Text>
          <Text style={styles.precio}>$14.500 COP</Text>
        </View>
        <Pressable
          style={styles.boton}
          onPress={() =>
            router.push({
              pathname: '/detalle-item',
              params: {
                id: '5',
                nombre: 'Samyang Buldak Carbonara',
                precio: '14500',
                descripcion: 'Fideos picantes coreanos salteados con salsa carbonara cremosa, queso y un toque picante.',
                detalle: 'Famoso ramen coreano Buldak Bokkeummyun Carbo. Balance entre el pollo picante coreano y salsa cremosa con queso y perejil.',
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
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  descripcion: {
    color: '#5D4037',
    marginTop: 4,
    marginBottom: 14,
    fontSize: 14,
  },
  bannerCatalogo: {
    backgroundColor: '#FFE0B2',
    borderWidth: 1,
    borderColor: '#BF360C',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 14,
    alignItems: 'center',
  },
  bannerCatalogoTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 14,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFEBE9',
  },
  info: {
    flex: 1,
  },
  producto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BF360C',
  },
  detalle: {
    fontSize: 13,
    color: '#5D4037',
    marginTop: 3,
    lineHeight: 18,
  },
  precio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E64A19',
    marginTop: 4,
  },
  boton: {
    backgroundColor: '#BF360C',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  regresar: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
  },
  regresarTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 14,
  },
});
