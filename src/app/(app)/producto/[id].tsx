import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function ProductoScreen() {
  const { id, nombre, precio, descripcion } = useLocalSearchParams();
  const [cantidad, setCantidad] = useState(1);

  const imagenes: any = {
    '1': require('../../../../assets/images/tonkotsu.jpg'),
    '2': require('../../../../assets/images/shoyu.png'),
    '3': require('../../../../assets/images/miso.jpg'),
  };
  const imagenSeleccionada = imagenes[id as string];

  const aumentar = () => setCantidad(cantidad + 1);
  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const hacerPedido = () => {
    const total = cantidad * parseFloat(precio as string);
    router.push({
      pathname: '/formulario',
      params: {
        producto: nombre,
        cantidad: cantidad.toString(),
        total: total.toString()
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imagenSeleccionada && (
        <Image source={imagenSeleccionada} style={styles.imagen} />
      )}
      
      <Text style={styles.etiqueta}>Plato #{id}</Text>
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
      <Text style={styles.precio}>${precio}</Text>

      <View style={styles.controles}>
        <Pressable style={styles.botonCantidad} onPress={disminuir}>
          <Text style={styles.textoCantidad}>-</Text>
        </Pressable>
        <Text style={styles.numeroCantidad}>{cantidad}</Text>
        <Pressable style={styles.botonCantidad} onPress={aumentar}>
          <Text style={styles.textoCantidad}>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.botonComprar} onPress={hacerPedido}>
        <Text style={styles.botonTexto}>Realizar pedido</Text>
      </Pressable>

      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.botonTextoSecundario}>Volver al menú</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
    padding: 30,
    paddingTop: 10,
  },
  imagen: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#BF360C',
  },
  etiqueta: { fontSize: 13, color: '#D84315', marginBottom: 5 },
  titulo: { fontSize: 30, fontWeight: 'bold', color: '#3E2723', textAlign: 'center' },
  descripcion: { fontSize: 15, color: '#5D4037', marginTop: 10, lineHeight: 22, textAlign: 'center' },
  precio: { fontSize: 27, fontWeight: 'bold', color: '#E64A19', marginTop: 15 },
  
  controles: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  botonCantidad: {
    backgroundColor: '#E64A19',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCantidad: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  numeroCantidad: { fontSize: 22, fontWeight: 'bold', marginHorizontal: 20, color: '#3E2723' },
  
  botonComprar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  boton: {
    borderWidth: 2,
    borderColor: '#BF360C',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
  },
  botonTexto: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  botonTextoSecundario: { color: '#BF360C', fontWeight: 'bold', fontSize: 16 },
});
