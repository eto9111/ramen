import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
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
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.logo}>🍜 Ramen App</Text>
        <Text style={styles.titulo}>Tu ramen, tu momento</Text>
        <Text style={styles.descripcion}>
          Descubre nuestros deliciosos tazones preparados artesanalmente para ti.
        </Text>
      </View>

      {/* BOTONES PRINCIPALES DE ACCIÓN RÁPIDA: CATÁLOGO Y DETALLES */}
      <View style={styles.seccionAccionesPrincipales}>
        <Pressable
          style={styles.btnPrincipalCatalogo}
          onPress={() => router.push('/catalogo')}
        >
          <Text style={styles.btnPrincipalCatalogoTexto}>
            📦 Explorar Catálogo Completo
          </Text>
          <Text style={styles.btnPrincipalSubtexto}>
            Escanea y consulta los 5 productos disponibles
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
                descripcion: 'Caldo de huesos de cerdo cocinado a fuego lento por horas, acompañado de chashu, huevo marinado y fideos frescos.',
                detalle: 'Especialidad de la casa con fondo de huesos de cerdo blanco a fuego lento, aceite de ajo negro aromático (mayu), brotes de bambú (menma), cebolleta fresca y chashu braseado.',
              },
            })
          }
        >
          <Text style={styles.btnPrincipalDetalleTexto}>
            🔍 Ver Detalle del Producto Destacado
          </Text>
          <Text style={styles.btnPrincipalSubtextoBlanco}>
            Conoce los ingredientes y realiza tu orden
          </Text>
        </Pressable>
      </View>

      <Text style={styles.seccionTitulo}>Tazones Recomendados</Text>

      {/* Tarjeta Producto 1 con Pressable */}
      <Pressable
        style={styles.tarjeta}
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
        <View style={styles.tarjetaHeader}>
          <Text style={styles.badgeCodigo}>#1</Text>
          <Text style={styles.productoTitulo}>Tonkotsu Ramen Tradicional</Text>
        </View>
        <Text style={styles.productoDescripcion}>
          Caldo denso y cremoso de cerdo hervido 16h con panceta chashu
        </Text>
        <View style={styles.tarjetaFooter}>
          <Text style={styles.precio}>$18.000 COP</Text>
          <View style={styles.btnVerDetalleMini}>
            <Text style={styles.btnVerDetalleMiniTexto}>Ver Detalle →</Text>
          </View>
        </View>
      </Pressable>

      {/* Tarjeta Producto 2 con Pressable */}
      <Pressable
        style={styles.tarjeta}
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
        <View style={styles.tarjetaHeader}>
          <Text style={styles.badgeCodigo}>#2</Text>
          <Text style={styles.productoTitulo}>Shoyu Ramen Clásico</Text>
        </View>
        <Text style={styles.productoDescripcion}>
          Caldo clásico a base de salsa de soja, pollo y brotes de bambú
        </Text>
        <View style={styles.tarjetaFooter}>
          <Text style={styles.precio}>$15.500 COP</Text>
          <View style={styles.btnVerDetalleMini}>
            <Text style={styles.btnVerDetalleMiniTexto}>Ver Detalle →</Text>
          </View>
        </View>
      </Pressable>

      {/* Barra de Navegación Rápida con Botón Catálogo incluido */}
      <Text style={styles.seccionSubtitulo}>Navegación Rápida</Text>
      <View style={styles.filaBotones}>
        <Pressable
          style={styles.botonMiniDestacado}
          onPress={() => router.push('/catalogo')}
        >
          <Text style={styles.botonMiniTextoBlanco}>📦 Catálogo</Text>
        </Pressable>

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
        <Text style={styles.botonTexto}>👥 Ramen Lovers (Registros)</Text>
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
    backgroundColor: '#FFF8DC', // Crema fideos
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
    fontSize: 16,
    color: '#D84315',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 4,
  },
  descripcion: {
    fontSize: 14,
    color: '#5D4037',
    marginTop: 8,
    lineHeight: 20,
  },
  seccionAccionesPrincipales: {
    marginBottom: 20,
    gap: 12,
  },
  btnPrincipalCatalogo: {
    backgroundColor: '#FFE0B2',
    borderWidth: 2,
    borderColor: '#BF360C',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#BF360C',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  btnPrincipalCatalogoTexto: {
    color: '#BF360C',
    fontSize: 17,
    fontWeight: 'bold',
  },
  btnPrincipalSubtexto: {
    color: '#D84315',
    fontSize: 12,
    marginTop: 4,
  },
  btnPrincipalDetalle: {
    backgroundColor: '#BF360C',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  btnPrincipalDetalleTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnPrincipalSubtextoBlanco: {
    color: '#FFCCBC',
    fontSize: 12,
    marginTop: 4,
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 12,
  },
  seccionSubtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 10,
    marginBottom: 10,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    elevation: 2,
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
    fontSize: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  productoTitulo: {
    fontSize: 17,
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
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5EBE6',
    paddingTop: 8,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E64A19',
  },
  btnVerDetalleMini: {
    backgroundColor: '#BF360C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnVerDetalleMiniTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  botonMini: {
    backgroundColor: '#8D6E63',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonMiniDestacado: {
    backgroundColor: '#BF360C',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 12,
    flex: 1.2,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonMiniTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
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
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botonCerrar: {
    backgroundColor: '#D32F2F',
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  textoCerrar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
