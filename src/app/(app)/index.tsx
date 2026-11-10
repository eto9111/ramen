import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

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
          Descubre nuestros platos tradicionales preparados con ingredientes frescos.
        </Text>
      </View>

      {/* Botones principales de acceso */}
      <View style={styles.seccionAccionesPrincipales}>
        <Pressable
          style={styles.btnPrincipalCatalogo}
          onPress={() => router.push('/catalogo')}
        >
          <Text style={styles.btnPrincipalCatalogoTexto}>
            Explorar catalogo completo
          </Text>
          <Text style={styles.btnPrincipalSubtexto}>
            Consulta los 5 productos disponibles
          </Text>
        </Pressable>

        <Pressable
          style={styles.btnPrincipalDetalle}
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
          <Text style={styles.btnPrincipalDetalleTexto}>
            Ver detalle del plato destacado
          </Text>
          <Text style={styles.btnPrincipalSubtextoBlanco}>
            Conoce los ingredientes y realiza tu orden
          </Text>
        </Pressable>
      </View>

      <Text style={styles.seccionTitulo}>Platos recomendados</Text>

      {/* Tarjeta Producto 1 */}
      <Pressable
        style={styles.tarjeta}
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
        <View style={styles.tarjetaHeader}>
          <Text style={styles.badgeCodigo}>#1</Text>
          <Text style={styles.productoTitulo}>Tonkotsu Ramen Tradicional</Text>
        </View>
        <Text style={styles.productoDescripcion}>
          Caldo cremoso de cerdo con panceta chashu y huevo marinado
        </Text>
        <View style={styles.tarjetaFooter}>
          <Text style={styles.precio}>$18.000 COP</Text>
          <View style={styles.btnVerDetalleMini}>
            <Text style={styles.btnVerDetalleMiniTexto}>Ver detalle</Text>
          </View>
        </View>
      </Pressable>

      {/* Tarjeta Producto 2 */}
      <Pressable
        style={styles.tarjeta}
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
        <View style={styles.tarjetaHeader}>
          <Text style={styles.badgeCodigo}>#2</Text>
          <Text style={styles.productoTitulo}>Shoyu Ramen Clásico</Text>
        </View>
        <Text style={styles.productoDescripcion}>
          Caldo ligero a base de salsa de soja, pollo y brotes de bambú
        </Text>
        <View style={styles.tarjetaFooter}>
          <Text style={styles.precio}>$15.500 COP</Text>
          <View style={styles.btnVerDetalleMini}>
            <Text style={styles.btnVerDetalleMiniTexto}>Ver detalle</Text>
          </View>
        </View>
      </Pressable>

      {/* Navegacion rapida */}
      <Text style={styles.seccionSubtitulo}>Accesos directos</Text>
      <View style={styles.filaBotones}>
        <Pressable
          style={styles.botonMiniDestacado}
          onPress={() => router.push('/catalogo')}
        >
          <Text style={styles.botonMiniTextoBlanco}>Catalogo</Text>
        </Pressable>

        <Pressable
          style={styles.botonMini}
          onPress={() => router.push('/menu')}
        >
          <Text style={styles.botonMiniTexto}>Menu</Text>
        </Pressable>

        <Pressable
          style={styles.botonMini}
          onPress={() => router.push('/imagenes')}
        >
          <Text style={styles.botonMiniTexto}>Galeria</Text>
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
        <Text style={styles.textoCerrar}>Cerrar sesion</Text>
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
  header: {
    marginTop: 15,
    marginBottom: 20,
  },
  logo: {
    fontSize: 15,
    color: '#D84315',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 4,
  },
  descripcion: {
    fontSize: 14,
    color: '#5D4037',
    marginTop: 6,
    lineHeight: 20,
  },
  seccionAccionesPrincipales: {
    marginBottom: 20,
    gap: 10,
  },
  btnPrincipalCatalogo: {
    backgroundColor: '#FFE0B2',
    borderWidth: 1.5,
    borderColor: '#BF360C',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  btnPrincipalCatalogoTexto: {
    color: '#BF360C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnPrincipalSubtexto: {
    color: '#D84315',
    fontSize: 12,
    marginTop: 2,
  },
  btnPrincipalDetalle: {
    backgroundColor: '#BF360C',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  btnPrincipalDetalleTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnPrincipalSubtextoBlanco: {
    color: '#FFCCBC',
    fontSize: 12,
    marginTop: 2,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 10,
  },
  seccionSubtitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 10,
    marginBottom: 10,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEBE9',
    elevation: 1,
  },
  tarjetaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeCodigo: {
    backgroundColor: '#FFCCBC',
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 11,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  productoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723',
    flex: 1,
  },
  productoDescripcion: {
    color: '#5D4037',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  tarjetaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5EBE6',
    paddingTop: 8,
  },
  precio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E64A19',
  },
  btnVerDetalleMini: {
    backgroundColor: '#BF360C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnVerDetalleMiniTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  botonMini: {
    backgroundColor: '#8D6E63',
    paddingVertical: 9,
    paddingHorizontal: 4,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonMiniDestacado: {
    backgroundColor: '#BF360C',
    paddingVertical: 9,
    paddingHorizontal: 4,
    borderRadius: 8,
    flex: 1.1,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonMiniTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  botonMiniTextoBlanco: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#4E342E',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  botonCerrar: {
    backgroundColor: '#D32F2F',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  textoCerrar: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
