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

// Entidad con los 5 productos con información detallada
export const CATALOGO_BASE = [
  {
    codigo: 1,
    titulo: 'Tonkotsu Ramen Tradicional',
    descripcion: 'Caldo denso y cremoso de cerdo hervido durante 16 horas, fideos artesanales, panceta chashu marinada, huevo nitamago y alga nori.',
    detalle: 'Especialidad de la casa con fondo de huesos de cerdo blanco a fuego lento, aceite de ajo negro aromático (mayu), brotes de bambú (menma), cebolleta fresca y chashu braseado.',
    precio: 18000,
  },
  {
    codigo: 2,
    titulo: 'Shoyu Ramen Clásico de Tokyo',
    descripcion: 'Caldo límpido y profundo a base de soja fermentada artesanal, pollo de corral, menma crujiente y cebolleta fina.',
    detalle: 'El clásico de Tokyo con caldo transparente elaborado con alga kombu, setas shiitake y tare de salsa shoyu añejada en barrica de cedro, con pollo tierno y huevo marinado en mirin.',
    precio: 15500,
  },
  {
    codigo: 3,
    titulo: 'Miso Ramen Hokkaido',
    descripcion: 'Caldo aromático enriquecido con pasta de miso tostada de Hokkaido, mantequilla dulce, maíz tierno y carne picada.',
    detalle: 'Originario de Sapporo, con base de pasta de miso rojo y blanco salteada al wok con jengibre fresco, ajo confitado, sésamo tostado, maíz dulce y una lágrima de mantequilla pura.',
    precio: 17000,
  },
  {
    codigo: 4,
    titulo: 'Bogia Instant Noodles Beef Flavor',
    descripcion: 'Fideos instantáneos premium en bowl sabor carne de res especiada con trozos de vegetales deshidratados y caldo vigorizante.',
    detalle: 'Bowl de fideos ondulados listos en 3 minutos. Incluye sobre de caldo concentrado de res estilo oriental con notas de anís estrella, cebolla de verdeo deshidratada, zanahoria y chile suave.',
    precio: 12500,
  },
  {
    codigo: 5,
    titulo: 'Samyang Buldak Carbonara',
    descripcion: 'Fideos coreanos picantes stir-fry fusionados con suave y cremosa salsa carbonara, queso mozzarella y un toque ardiente.',
    detalle: 'Famoso plato coreano Buldak Bokkeummyun versión Carbo. Equilibrio perfecto entre el fuego del pollo picante coreano y la indulgencia de una salsa carbonara cremosa con queso y perejil.',
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

  // Escanear / Consultar los datos de la tabla catálogo
  const escanearCatalogo = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from('catalogo')
        .select('codigo, titulo, descripcion, detalle, precio')
        .order('codigo', { ascending: true });

      if (error) {
        console.log('Error al consultar catálogo en Supabase:', error.message);
        setItems(CATALOGO_BASE);
      } else if (data && data.length > 0) {
        setItems(data);
      } else {
        setItems(CATALOGO_BASE);
      }
    } catch (e) {
      console.log('Error de red o ejecución:', e);
      setItems(CATALOGO_BASE);
    } finally {
      setCargando(false);
    }
  };

  // Insertar los 5 valores en Supabase
  const insertarCincoValores = async () => {
    try {
      setCargando(true);
      const { error } = await supabase
        .from('catalogo')
        .upsert(CATALOGO_BASE, { onConflict: 'codigo' });

      if (error) {
        Alert.alert(
          'Permiso RLS Requerido',
          'Ejecuta el script SQL en Supabase para habilitar permisos: ' + error.message
        );
      } else {
        Alert.alert('Éxito', 'Se sincronizaron los 5 productos en Supabase.');
        escanearCatalogo();
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setCargando(false);
    }
  };

  // Guardar edición
  const guardarEdicion = async () => {
    if (!itemEditando || !nuevoTitulo.trim() || !nuevoPrecio.trim()) {
      Alert.alert('Error', 'Completa los campos obligatorios');
      return;
    }

    const precioNum = parseFloat(nuevoPrecio);
    const { error } = await supabase
      .from('catalogo')
      .update({
        titulo: nuevoTitulo,
        descripcion: nuevaDesc,
        detalle: nuevoDetalle,
        precio: precioNum,
      })
      .eq('codigo', itemEditando.codigo);

    if (error) {
      setItems((prev) =>
        prev.map((i) =>
          i.codigo === itemEditando.codigo
            ? { ...i, titulo: nuevoTitulo, descripcion: nuevaDesc, detalle: nuevoDetalle, precio: precioNum }
            : i
        )
      );
      Alert.alert('Nota', 'Actualizado localmente en la vista: ' + error.message);
    } else {
      Alert.alert('Éxito', 'Producto actualizado en Supabase');
      escanearCatalogo();
    }
    setItemEditando(null);
  };

  // Eliminar un ítem
  const eliminarItem = async (codigo) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Deseas eliminar el ítem #${codigo}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase
              .from('catalogo')
              .delete()
              .eq('codigo', codigo);

            if (error) {
              setItems((prev) => prev.filter((i) => i.codigo !== codigo));
              Alert.alert('Nota', 'Eliminado localmente: ' + error.message);
            } else {
              Alert.alert('Éxito', 'Producto eliminado en Supabase');
              escanearCatalogo();
            }
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
      {/* Botón de regreso */}
      <View style={styles.topBar}>
        <Pressable style={styles.btnVolver} onPress={() => router.push('/')}>
          <Text style={styles.btnVolverTexto}>← Regresar al Inicio</Text>
        </Pressable>
        <Text style={styles.badgeFormato}>Formato .JS</Text>
      </View>

      <Text style={styles.titulo}>Catálogo de Productos (JS)</Text>
      <Text style={styles.subtitulo}>Entidad de 5 productos con permisos CRUD y escaneo</Text>

      {/* Buscador */}
      <TextInput
        style={styles.buscador}
        placeholder="🔍 Buscar en el catálogo..."
        placeholderTextColor="#8D6E63"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={styles.botonesAccion}>
        <Pressable style={styles.btnEscanear} onPress={escanearCatalogo}>
          <Text style={styles.btnTexto}>🔄 Escanear Catálogo</Text>
        </Pressable>
        <Pressable style={styles.btnInsertar} onPress={insertarCincoValores}>
          <Text style={styles.btnTextoBlanco}>➕ Insertar 5 Valores</Text>
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
                    <Text style={styles.detalleItem}>📌 {item.detalle}</Text>
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
                      <Text style={styles.btnTextoBlanco}>Ver Detalle</Text>
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
                      <Text style={styles.btnTextoBlanco}>🗑️</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Modal de edición */}
      <Modal visible={!!itemEditando} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Editar Producto #{itemEditando?.codigo}</Text>
            <TextInput
              style={styles.input}
              value={nuevoTitulo}
              onChangeText={setNuevoTitulo}
              placeholder="Título"
            />
            <TextInput
              style={styles.input}
              value={nuevoPrecio}
              onChangeText={setNuevoPrecio}
              placeholder="Precio"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, { height: 50 }]}
              value={nuevaDesc}
              onChangeText={setNuevaDesc}
              placeholder="Descripción"
              multiline
            />
            <TextInput
              style={[styles.input, { height: 50 }]}
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
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BF360C',
  },
  btnVolverTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  badgeFormato: {
    backgroundColor: '#3E2723',
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#3E2723', textAlign: 'center' },
  subtitulo: { fontSize: 13, color: '#D84315', textAlign: 'center', marginBottom: 12 },
  buscador: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFCCBC',
    color: '#3E2723',
    marginBottom: 10,
  },
  botonesAccion: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  btnEscanear: { backgroundColor: '#FF8A65', padding: 10, borderRadius: 10, flex: 1, marginRight: 6, alignItems: 'center' },
  btnInsertar: { backgroundColor: '#BF360C', padding: 10, borderRadius: 10, flex: 1, marginLeft: 6, alignItems: 'center' },
  btnTexto: { color: '#3E2723', fontWeight: 'bold', fontSize: 12 },
  btnTextoBlanco: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  tarjetaImg: { width: '100%', height: 160 },
  tarjetaBody: { padding: 14 },
  headerTarjeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  badgeCodigo: { backgroundColor: '#BF360C', color: '#FFF', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, fontWeight: 'bold', marginRight: 8, fontSize: 11 },
  nombreItem: { fontSize: 17, fontWeight: 'bold', color: '#3E2723', flex: 1 },
  descItem: { fontSize: 13, color: '#5D4037', marginBottom: 6, lineHeight: 18 },
  detalleItem: { fontSize: 12, color: '#795548', fontStyle: 'italic', marginBottom: 8, backgroundColor: '#FFF8E1', padding: 6, borderRadius: 6 },
  precioItem: { fontSize: 16, fontWeight: 'bold', color: '#E64A19', marginBottom: 8 },
  filaAcciones: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  btnDetalle: { backgroundColor: '#FF7043', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, flex: 1.5, alignItems: 'center' },
  btnEditar: { backgroundColor: '#1976D2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, flex: 1, alignItems: 'center' },
  btnEliminar: { backgroundColor: '#D32F2F', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, alignItems: 'center' },
  modalFondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContenido: { backgroundColor: '#FFF', padding: 20, borderRadius: 14 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#3E2723' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 8, marginBottom: 10, fontSize: 13 },
  modalBotones: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  btnCancelar: { padding: 10, marginRight: 10 },
  btnGuardar: { backgroundColor: '#BF360C', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
});
