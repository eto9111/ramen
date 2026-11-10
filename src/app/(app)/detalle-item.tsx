import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function DetalleItemScreen() {
  const { id, nombre, precio, descripcion, detalle } = useLocalSearchParams();
  const [cantidad, setCantidad] = useState(1);

  const imagenes: Record<string, any> = {
    '1': require('../../../assets/images/tonkotsu.jpg'),
    '2': require('../../../assets/images/shoyu.png'),
    '3': require('../../../assets/images/miso.jpg'),
    '4': require('../../../assets/images/bogia-beef.jpg'),
    '5': require('../../../assets/images/buldak-carbonara.jpg'),
  };

  const imagenSeleccionada = (id && imagenes[id as string]) ? imagenes[id as string] : imagenes['1'];

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const precioNumerico = parseFloat((precio as string) || '0');
  const total = cantidad * (isNaN(precioNumerico) ? 0 : precioNumerico);

  const hacerPedido = () => {
    router.push({
      pathname: '/formulario',
      params: {
        producto: (nombre as string) || 'Tonkotsu Ramen Tradicional',
        cantidad: cantidad.toString(),
        total: total.toString()
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón superior de retroceso rápido */}
      <View style={styles.barraSuperior}>
        <Pressable style={styles.btnVolverTop} onPress={() => router.back()}>
          <Text style={styles.btnVolverTopTexto}>← Volver</Text>
        </Pressable>
        <Pressable style={styles.btnCatalogoTop} onPress={() => router.push('/catalogo')}>
          <Text style={styles.btnCatalogoTopTexto}>📦 Catálogo</Text>
        </Pressable>
      </View>

      {/* Imagen del producto */}
      <View style={styles.contenedorImagen}>
        <Image source={imagenSeleccionada} style={styles.imagen} resizeMode="cover" />
        <View style={styles.badgeFlotante}>
          <Text style={styles.badgeTexto}>CÓDIGO #{id || '1'}</Text>
        </View>
      </View>

      {/* Información del producto */}
      <Text style={styles.titulo}>{(nombre as string) || 'Tonkotsu Ramen Tradicional'}</Text>
      
      <View style={styles.precioCard}>
        <Text style={styles.precioLabel}>Precio Unitario</Text>
        <Text style={styles.precio}>${Number(precio || 18000).toLocaleString('es-CO')}</Text>
      </View>

      {/* Descripción corta */}
      <View style={styles.seccionInfo}>
        <Text style={styles.seccionTitulo}>Descripción</Text>
        <Text style={styles.descripcion}>
          {(descripcion as string) || 'Caldo de huesos de cerdo cocinado a fuego lento por horas, acompañado de chashu, huevo marinado y fideos frescos.'}
        </Text>
      </View>

      {/* Detalle ampliado */}
      {!!detalle && (
        <View style={styles.seccionDetalle}>
          <Text style={styles.seccionTitulo}>✨ Detalle del Producto & Preparación</Text>
          <Text style={styles.textoDetalle}>{detalle as string}</Text>
        </View>
      )}

      {/* Selector de cantidad y cálculo de total */}
      <View style={styles.cajaCompra}>
        <Text style={styles.cantidadLabel}>Cantidad a ordenar:</Text>
        <View style={styles.controles}>
          <Pressable style={styles.botonCantidad} onPress={disminuir}>
            <Text style={styles.textoCantidad}>-</Text>
          </Pressable>
          <Text style={styles.numeroCantidad}>{cantidad}</Text>
          <Pressable style={styles.botonCantidad} onPress={aumentar}>
            <Text style={styles.textoCantidad}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.totalTexto}>Total: ${total.toLocaleString('es-CO')}</Text>
      </View>

      {/* Botones de acción principal */}
      <Pressable style={styles.botonComprar} onPress={hacerPedido}>
        <Text style={styles.botonTexto}>🛒 Realizar Pedido Ahora</Text>
      </Pressable>

      <Pressable style={styles.botonVolver} onPress={() => router.push('/')}>
        <Text style={styles.botonVolverTexto}>🏠 Ir al Inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    padding: 20,
    paddingBottom: 40,
  },
  barraSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  btnVolverTop: {
    backgroundColor: '#FFE0B2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BF360C',
  },
  btnVolverTopTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnCatalogoTop: {
    backgroundColor: '#BF360C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  btnCatalogoTopTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contenedorImagen: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  imagen: {
    width: 250,
    height: 250,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#BF360C',
    backgroundColor: '#FFFFFF',
  },
  badgeFlotante: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#BF360C',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2723',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  precioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFCCBC',
  },
  precioLabel: {
    fontSize: 12,
    color: '#8D6E63',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  precio: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E64A19',
    marginTop: 2,
  },
  seccionInfo: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  seccionDetalle: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#E64A19',
  },
  seccionTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    color: '#5D4037',
    lineHeight: 22,
  },
  textoDetalle: {
    fontSize: 14,
    color: '#4E342E',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  cajaCompra: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  cantidadLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 8,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  botonCantidad: {
    backgroundColor: '#E64A19',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  textoCantidad: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  numeroCantidad: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 25,
    color: '#3E2723',
  },
  totalTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 4,
  },
  botonComprar: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonVolver: {
    borderWidth: 2,
    borderColor: '#BF360C',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  botonVolverTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
