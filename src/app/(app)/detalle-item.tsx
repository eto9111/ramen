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
      {/* Barra de navegacion */}
      <View style={styles.barraSuperior}>
        <Pressable style={styles.btnVolverTop} onPress={() => router.back()}>
          <Text style={styles.btnVolverTopTexto}>Volver</Text>
        </Pressable>
        <Pressable style={styles.btnCatalogoTop} onPress={() => router.push('/catalogo')}>
          <Text style={styles.btnCatalogoTopTexto}>Catalogo</Text>
        </Pressable>
      </View>

      {/* Imagen */}
      <View style={styles.contenedorImagen}>
        <Image source={imagenSeleccionada} style={styles.imagen} resizeMode="cover" />
        <View style={styles.badgeFlotante}>
          <Text style={styles.badgeTexto}>Codigo #{id || '1'}</Text>
        </View>
      </View>

      <Text style={styles.titulo}>{(nombre as string) || 'Tonkotsu Ramen Tradicional'}</Text>

      <View style={styles.precioCard}>
        <Text style={styles.precioLabel}>Precio unitario</Text>
        <Text style={styles.precio}>${Number(precio || 18000).toLocaleString('es-CO')}</Text>
      </View>

      {/* Descripcion */}
      <View style={styles.seccionInfo}>
        <Text style={styles.seccionTitulo}>Descripcion</Text>
        <Text style={styles.descripcion}>
          {(descripcion as string) || 'Caldo de cerdo cocinado a fuego lento con fideos frescos y acompañamientos tradicionales.'}
        </Text>
      </View>

      {/* Detalle si existe */}
      {!!detalle && (
        <View style={styles.seccionDetalle}>
          <Text style={styles.seccionTitulo}>Detalles de preparacion</Text>
          <Text style={styles.textoDetalle}>{detalle as string}</Text>
        </View>
      )}

      {/* Selector de cantidad */}
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
        <Text style={styles.totalTexto}>Total: ${total.toLocaleString('es-CO')} COP</Text>
      </View>

      {/* Acciones */}
      <Pressable style={styles.botonComprar} onPress={hacerPedido}>
        <Text style={styles.botonTexto}>Realizar pedido</Text>
      </Pressable>

      <Pressable style={styles.botonVolver} onPress={() => router.push('/')}>
        <Text style={styles.botonVolverTexto}>Ir al inicio</Text>
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
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BF360C',
  },
  btnVolverTopTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 13,
  },
  btnCatalogoTop: {
    backgroundColor: '#BF360C',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnCatalogoTopTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  contenedorImagen: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 18,
  },
  imagen: {
    width: 230,
    height: 230,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#D7CCC8',
    backgroundColor: '#FFFFFF',
  },
  badgeFlotante: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#BF360C',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E2723',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  precioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFEBE9',
  },
  precioLabel: {
    fontSize: 11,
    color: '#8D6E63',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  precio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E64A19',
    marginTop: 2,
  },
  seccionInfo: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFEBE9',
  },
  seccionDetalle: {
    backgroundColor: '#FFF8E1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#BF360C',
  },
  seccionTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 13,
    color: '#5D4037',
    lineHeight: 20,
  },
  textoDetalle: {
    fontSize: 13,
    color: '#4E342E',
    lineHeight: 20,
  },
  cajaCompra: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EFEBE9',
  },
  cantidadLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3E2723',
    marginBottom: 8,
  },
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  botonCantidad: {
    backgroundColor: '#E64A19',
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCantidad: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  numeroCantidad: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 22,
    color: '#3E2723',
  },
  totalTexto: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
  },
  botonComprar: {
    backgroundColor: '#2E7D32',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botonVolver: {
    borderWidth: 1,
    borderColor: '#BF360C',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonVolverTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 14,
  },
});
