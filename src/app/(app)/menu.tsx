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
      <Text style={styles.descripcion}>Selecciona el ramen que deseas conocer o explora el catálogo completo.</Text>

      {/* Acceso directo al catálogo */}
      <Pressable
        style={styles.bannerCatalogo}
        onPress={() => router.push('/catalogo')}
      >
        <Text style={styles.bannerCatalogoTexto}>📦 Ver en Catálogo Online Completo →</Text>
      </Pressable>

      {/* Producto 1 */}
      <View style={styles.tarjeta}>
        <View style={styles.info}>
          <Text style={styles.producto}>Tonkotsu Ramen Tradicional</Text>
          <Text style={styles.detalle}>Caldo denso de cerdo cocinado 16 horas con chashu</Text>
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
                descripcion: 'Caldo denso y cremoso de cerdo hervido durante 16 horas, fideos artesanales, panceta chashu marinada, huevo nitamago y alga nori.',
                detalle: 'Especialidad de la casa con fondo de huesos de cerdo blanco a fuego lento, aceite de ajo negro aromático (mayu), brotes de bambú (menma), cebolleta fresca y chashu braseado.',
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
          <Text style={styles.detalle}>Caldo a base de salsa de soja, pollo y menma</Text>
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
                descripcion: 'Caldo límpido y profundo a base de soja fermentada artesanal, pollo de corral, menma crujiente y cebolleta fina.',
                detalle: 'El clásico de Tokyo con caldo transparente elaborado con alga kombu, setas shiitake y tare de salsa shoyu añejada en barrica de cedro, con pollo tierno y huevo marinado en mirin.',
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
                descripcion: 'Caldo aromático enriquecido con pasta de miso tostada de Hokkaido, mantequilla dulce, maíz tierno y carne picada.',
                detalle: 'Originario de Sapporo, con base de pasta de miso rojo y blanco salteada al wok con jengibre fresco, ajo confitado, sésamo tostado, maíz dulce y una lágrima de mantequilla pura.',
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
                descripcion: 'Fideos instantáneos premium en bowl sabor carne de res especiada con trozos de vegetales deshidratados y caldo vigorizante.',
                detalle: 'Bowl de fideos ondulados listos en 3 minutos. Incluye sobre de caldo concentrado de res estilo oriental con notas de anís estrella, cebolla de verdeo deshidratada, zanahoria y chile suave.',
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
                descripcion: 'Fideos coreanos picantes stir-fry fusionados con suave y cremosa salsa carbonara, queso mozzarella y un toque ardiente.',
                detalle: 'Famoso plato coreano Buldak Bokkeummyun versión Carbo. Equilibrio perfecto entre el fuego del pollo picante coreano y la indulgencia de una salsa carbonara con queso y perejil.',
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
        <Text style={styles.regresarTexto}>← Regresar al inicio</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2723',
  },
  descripcion: {
    color: '#5D4037',
    marginTop: 4,
    marginBottom: 16,
    fontSize: 14,
  },
  bannerCatalogo: {
    backgroundColor: '#FFE0B2',
    borderWidth: 1.5,
    borderColor: '#BF360C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 16,
    alignItems: 'center',
  },
  bannerCatalogoTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE0B2',
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  producto: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#BF360C',
  },
  detalle: {
    fontSize: 13,
    color: '#D84315',
    marginTop: 4,
    lineHeight: 18,
  },
  precio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E64A19',
    marginTop: 6,
  },
  boton: {
    backgroundColor: '#BF360C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 12,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  regresar: {
    marginTop: 15,
    alignItems: 'center',
    padding: 10,
  },
  regresarTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
