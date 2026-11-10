import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

export const CATALOGO_BASE = [
  {
    codigo: 1,
    titulo: 'Tonkotsu Ramen Tradicional',
    descripcion: 'Caldo de cerdo cocinado a fuego lento por 16 horas, fideos artesanales, chashu y huevo marinado.',
    detalle: 'Preparado con fondo de cerdo blanco a fuego lento, aceite de ajo negro aromático, brotes de bambú, cebolleta fresca y chashu braseado.',
    precio: 18000,
  },
  {
    codigo: 2,
    titulo: 'Shoyu Ramen Clásico de Tokyo',
    descripcion: 'Caldo ligero a base de salsa de soja fermentada, pollo de corral, bambú y cebolleta fina.',
    detalle: 'Receta tradicional con caldo transparente elaborado con alga kombu, setas shiitake y salsa shoyu añejada, pechuga tierna y huevo suave.',
    precio: 15500,
  },
  {
    codigo: 3,
    titulo: 'Miso Ramen Hokkaido',
    descripcion: 'Caldo aromático con pasta de miso tostada, maíz tierno, mantequilla y carne picada.',
    detalle: 'Originario de Sapporo, con pasta de miso salteada con jengibre fresco, ajo confitado, sésamo tostado, maíz dulce y mantequilla pura.',
    precio: 17000,
  },
  {
    codigo: 4,
    titulo: 'Bogia Instant Noodles Beef Flavor',
    descripcion: 'Fideos instantáneos en bowl con caldo especiado de res y vegetales deshidratados.',
    detalle: 'Bowl de fideos ondulados listos en 3 minutos. Incluye sobre de caldo concentrado de res con notas de anís estrella, cebolleta y zanahoria.',
    precio: 12500,
  },
  {
    codigo: 5,
    titulo: 'Samyang Buldak Carbonara',
    descripcion: 'Fideos picantes coreanos salteados con salsa carbonara cremosa, queso y un toque picante.',
    detalle: 'Famoso ramen coreano Buldak Bokkeummyun Carbo. Balance entre el pollo picante coreano y salsa cremosa con queso y perejil.',
    precio: 14500,
  },
];

export default function CatalogoJS() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [itemEditando, setItemEditando] = useState(null);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevoDetalle, setNuevoDetalle] = useState('');

  const imagenes = {
    '1': require('../../assets/images/tonkotsu.jpg'),
    '2': require('../../assets/images/shoyu.png'),
    '3': require('../../assets/images/miso.jpg'),
    '4': require('../../assets/images/bogia-beef.jpg'),
    '5': require('../../assets/images/buldak-carbonara.jpg'),
  };

  useEffect(() => {
    escanearCatalogo();
  }, []);

  const escanearCatalogo = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('catalogo')
        .select('*')
        .order('codigo', { ascending: true });

      if (error) {
        setItems(CATALOGO_BASE);
      } else if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems(CATALOGO_BASE);
      }
    } catch (e) {
      setItems(CATALOGO_BASE);
    } finally {
      setCargando(false);
    }
  };

  const insertarCincoValores = async () => {
    try {
      setCargando(true);
      let { error } = await supabase
        .from('catalogo')
        .upsert(CATALOGO_BASE, { onConflict: 'codigo' });

      if (error && error.message.includes('detalle')) {
        const sinDetalle = CATALOGO_BASE.map(({ detalle, ...resto }) => resto);
        const retry = await supabase.from('catalogo').upsert(sinDetalle, { onConflict: 'codigo' });
        error = retry.error;
      }

      if (error) {
        Alert.alert('Aviso', 'Para habilitar permisos ejecute el script SQL: ' + error.message);
      } else {
        Alert.alert('Exito', 'Productos sincronizados con Supabase.');
        escanearCatalogo();
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setCargando(false);
    }
  };

  const guardarEdicion = async () => {
    if (!itemEditando || !nuevoTitulo.trim() || !nuevoPrecio.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa titulo y precio');
      return;
    }

    const precioNum = parseFloat(nuevoPrecio);
    let { error } = await supabase
      .from('catalogo')
      .update({
        titulo: nuevoTitulo,
        descripcion: nuevaDesc,
        detalle: nuevoDetalle,
        precio: precioNum,
      })
      .eq('codigo', itemEditando.codigo);

    if (error && error.message.includes('detalle')) {
      const retry = await supabase
        .from('catalogo')
        .update({
          titulo: nuevoTitulo,
          descripcion: nuevaDesc,
          precio: precioNum,
        })
        .eq('codigo', itemEditando.codigo);
      error = retry.error;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.codigo === itemEditando.codigo
          ? { ...i, titulo: nuevoTitulo, descripcion: nuevaDesc, detalle: nuevoDetalle, precio: precioNum }
          : i
      )
    );

    Alert.alert('Listo', 'Producto actualizado.');
    setItemEditando(null);
  };

  const eliminarItem = async (codigo) => {
    Alert.alert(
      'Confirmar eliminacion',
      `Deseas eliminar el item #${codigo}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await supabase.from('catalogo').delete().eq('codigo', codigo);
            setItems((prev) => prev.filter((i) => i.codigo !== codigo));
          },
        },
      ]
    );
  };

  const itemsFiltrados = items.filter((prod) => {
    const txt = busqueda.toLowerCase().trim();
    if (!txt) return true;
    return (
      prod.titulo.toLowerCase().includes(txt) ||
      (prod.descripcion && prod.descripcion.toLowerCase().includes(txt)) ||
      String(prod.codigo).includes(txt)
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable style={styles.btnVolver} onPress={() => router.push('/')}>
          <Text style={styles.btnVolverTexto}>Volver al inicio</Text>
        </Pressable>
        <Text style={styles.badgeFormato}>Version JS</Text>
      </View>

      <Text style={styles.titulo}>Catalogo de productos (JS)</Text>
      <Text style={styles.subtitulo}>Consulta y gestion de 5 productos</Text>

      <TextInput
        style={styles.buscador}
        placeholder="Buscar en el catalogo..."
        placeholderTextColor="#8D6E63"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={styles.botonesAccion}>
        <Pressable style={styles.btnEscanear} onPress={escanearCatalogo}>
          <Text style={styles.btnTexto}>Escanear catalogo</Text>
        </Pressable>
        <Pressable style={styles.btnInsertar} onPress={insertarCincoValores}>
          <Text style={styles.btnTextoBlanco}>Insertar 5 valores</Text>
        </Pressable>
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#BF360C" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={itemsFiltrados}
          keyExtractor={(item) => String(item.codigo)}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => {
            const img = imagenes[String(item.codigo)] || imagenes['1'];
            return (
              <View style={styles.tarjeta}>
                <Image source={img} style={styles.tarjetaImg} resizeMode="cover" />
                <View style={styles.tarjetaBody}>
                  <View style={styles.headerTarjeta}>
                    <Text style={styles.badgeCodigo}>#{item.codigo}</Text>
                    <Text style={styles.nombreItem}>{item.titulo}</Text>
                  </View>
                  <Text style={styles.precioItem}>
                    ${Number(item.precio || 0).toLocaleString('es-CO')} COP
                  </Text>
                  <Text style={styles.descItem}>{item.descripcion}</Text>

                  {!!item.detalle && (
                    <Text style={styles.detalleItem}>{item.detalle}</Text>
                  )}

                  <View style={styles.filaAcciones}>
                    <Pressable
                      style={styles.btnDetalle}
                      onPress={() =>
                        router.push({
                          pathname: '/detalle-item',
                          params: {
                            id: String(item.codigo),
                            nombre: item.titulo,
                            precio: String(item.precio),
                            descripcion: item.descripcion,
                            detalle: item.detalle || '',
                          },
                        })
                      }
                    >
                      <Text style={styles.btnTextoBlanco}>Ver detalle</Text>
                    </Pressable>

                    <Pressable
                      style={styles.btnEditar}
                      onPress={() => {
                        setItemEditando(item);
                        setNuevoTitulo(item.titulo);
                        setNuevoPrecio(String(item.precio || ''));
                        setNuevaDesc(item.descripcion || '');
                        setNuevoDetalle(item.detalle || '');
                      }}
                    >
                      <Text style={styles.btnTextoBlanco}>Editar</Text>
                    </Pressable>

                    <Pressable
                      style={styles.btnEliminar}
                      onPress={() => eliminarItem(item.codigo)}
                    >
                      <Text style={styles.btnTextoBlanco}>Eliminar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Modal */}
      <Modal visible={!!itemEditando} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Editar producto #{itemEditando?.codigo}</Text>
            <TextInput
              style={styles.input}
              value={nuevoTitulo}
              onChangeText={setNuevoTitulo}
              placeholder="Titulo"
            />
            <TextInput
              style={styles.input}
              value={nuevoPrecio}
              onChangeText={setNuevoPrecio}
              placeholder="Precio"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { height: 45 }]}
              value={nuevaDesc}
              onChangeText={setNuevaDesc}
              placeholder="Descripcion"
              multiline
            />
            <TextInput
              style={[styles.input, { height: 45 }]}
              value={nuevoDetalle}
              onChangeText={setNuevoDetalle}
              placeholder="Detalle"
              multiline
            />
            <View style={styles.modalBotones}>
              <Pressable style={styles.btnCancelar} onPress={() => setItemEditando(null)}>
                <Text style={styles.btnTexto}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.btnGuardar} onPress={guardarEdicion}>
                <Text style={styles.btnTextoBlanco}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8DC', padding: 16 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnVolver: {
    backgroundColor: '#FFE0B2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BF360C',
  },
  btnVolverTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 12,
  },
  badgeFormato: {
    backgroundColor: '#3E2723',
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#3E2723', textAlign: 'center' },
  subtitulo: { fontSize: 13, color: '#D84315', textAlign: 'center', marginBottom: 12 },
  buscador: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    color: '#3E2723',
    marginBottom: 10,
  },
  botonesAccion: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  btnEscanear: { backgroundColor: '#FF8A65', padding: 9, borderRadius: 8, flex: 1, marginRight: 5, alignItems: 'center' },
  btnInsertar: { backgroundColor: '#BF360C', padding: 9, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: 'center' },
  btnTexto: { color: '#3E2723', fontWeight: '600', fontSize: 12 },
  btnTextoBlanco: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEBE9',
    elevation: 1,
  },
  tarjetaImg: { width: '100%', height: 150 },
  tarjetaBody: { padding: 12 },
  headerTarjeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  badgeCodigo: { backgroundColor: '#BF360C', color: '#FFF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, fontWeight: 'bold', marginRight: 6, fontSize: 11 },
  nombreItem: { fontSize: 16, fontWeight: 'bold', color: '#3E2723', flex: 1 },
  descItem: { fontSize: 13, color: '#5D4037', marginBottom: 6, lineHeight: 18 },
  detalleItem: { fontSize: 12, color: '#795548', marginBottom: 8, backgroundColor: '#FFF8E1', padding: 6, borderRadius: 6 },
  precioItem: { fontSize: 15, fontWeight: 'bold', color: '#E64A19', marginBottom: 8 },
  filaAcciones: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  btnDetalle: { backgroundColor: '#FF7043', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 6, flex: 1.2, alignItems: 'center' },
  btnEditar: { backgroundColor: '#1976D2', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 6, flex: 1, alignItems: 'center' },
  btnEliminar: { backgroundColor: '#D32F2F', paddingVertical: 7, paddingHorizontal: 10, borderRadius: 6, flex: 1, alignItems: 'center' },
  modalFondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContenido: { backgroundColor: '#FFF', padding: 18, borderRadius: 10 },
  modalTitulo: { fontSize: 17, fontWeight: 'bold', marginBottom: 10, color: '#3E2723' },
  input: { borderWidth: 1, borderColor: '#D7CCC8', borderRadius: 6, padding: 7, marginBottom: 8, fontSize: 13 },
  modalBotones: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 6 },
  btnCancelar: { padding: 8, marginRight: 8 },
  btnGuardar: { backgroundColor: '#BF360C', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
});
