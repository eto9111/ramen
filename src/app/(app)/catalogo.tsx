import React, { useState, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export type Item = {
  codigo: string | number;
  titulo: string;
  descripcion: string;
  detalle?: string;
  precio: number | null;
};

// 5 productos base con informacion completa
export const PRODUCTOS_BASE: Item[] = [
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

export default function Catalogo() {
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [errorTexto, setErrorTexto] = useState('');
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  // Modal de edicion
  const [editando, setEditando] = useState<Item | null>(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editPrecio, setEditPrecio] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editDetalle, setEditDetalle] = useState('');

  const imagenes: Record<string, any> = {
    '1': require('../../../assets/images/tonkotsu.jpg'),
    '2': require('../../../assets/images/shoyu.png'),
    '3': require('../../../assets/images/miso.jpg'),
    '4': require('../../../assets/images/bogia-beef.jpg'),
    '5': require('../../../assets/images/buldak-carbonara.jpg'),
  };

  const categorias: Record<string, string> = {
    '1': 'Mas vendido',
    '2': 'Tradicional',
    '3': 'Especialidad',
    '4': 'Instantaneo',
    '5': 'Picante',
  };

  useEffect(() => {
    escanearCatalogo();
  }, []);

  // Consultar productos en Supabase usando select('*') para no fallar si falta alguna columna
  const escanearCatalogo = async () => {
    try {
      setCargando(true);
      setErrorTexto('');

      const { data, error } = await supabase
        .from('catalogo')
        .select('*')
        .order('codigo', { ascending: true });

      if (error) {
        console.error('Error al consultar Supabase:', error);
        throw error;
      }

      if (data && data.length > 0) {
        setItems(data as Item[]);
      } else {
        setItems(PRODUCTOS_BASE);
      }
    } catch (error: unknown) {
      console.log('Aviso al cargar de Supabase:', error);
      const mensaje =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error !== null && 'message' in error
          ? String((error as any).message)
          : String(error);

      // Si la columna detalle no existe en la tabla de Supabase, no mostramos un error molesto
      if (!mensaje.includes('column catalogo.detalle does not exist')) {
        setErrorTexto('Modo local: ' + mensaje);
      }
      setItems(PRODUCTOS_BASE);
    } finally {
      setCargando(false);
    }
  };

  // Insertar o sincronizar los 5 valores en Supabase
  const sincronizar5Valores = async () => {
    try {
      setCargando(true);
      setErrorTexto('');

      // Intentar primero con todos los campos
      let { error } = await supabase
        .from('catalogo')
        .upsert(PRODUCTOS_BASE, { onConflict: 'codigo' });

      // Si la tabla aun no tiene la columna detalle, guardamos sin detalle para que no falle
      if (error && error.message.includes('detalle')) {
        const productosSinDetalle = PRODUCTOS_BASE.map(({ detalle, ...resto }) => resto);
        const retry = await supabase
          .from('catalogo')
          .upsert(productosSinDetalle, { onConflict: 'codigo' });
        error = retry.error;

        if (!error) {
          Alert.alert(
            'Productos guardados',
            'Los 5 productos se guardaron en Supabase. Si deseas guardar tambien la columna de detalles, ejecuta en el SQL Editor:\n\nALTER TABLE catalogo ADD COLUMN IF NOT EXISTS detalle TEXT;'
          );
          await escanearCatalogo();
          return;
        }
      }

      if (error) {
        Alert.alert(
          'Permiso o tabla en Supabase',
          'Para habilitar permisos de insercion en Supabase, ejecuta el script "scripts/permisos_y_catalogo.sql" en tu panel de control:\n\n' + error.message
        );
      } else {
        Alert.alert('Listo', 'Los 5 productos se han sincronizado con Supabase.');
        await escanearCatalogo();
      }
    } catch (err: any) {
      Alert.alert('Aviso', err.message || 'No fue posible sincronizar');
    } finally {
      setCargando(false);
    }
  };

  // Guardar cambios al editar un producto
  const guardarEdicion = async () => {
    if (!editando || !editTitulo.trim() || !editPrecio.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa titulo y precio.');
      return;
    }

    const precioNum = parseFloat(editPrecio);
    const camposConDetalle = {
      titulo: editTitulo,
      descripcion: editDesc,
      detalle: editDetalle,
      precio: precioNum,
    };

    let { error } = await supabase
      .from('catalogo')
      .update(camposConDetalle)
      .eq('codigo', editando.codigo);

    // Si la columna detalle aun no existe en la base remota, actualizamos sin detalle
    if (error && error.message.includes('detalle')) {
      const camposSinDetalle = {
        titulo: editTitulo,
        descripcion: editDesc,
        precio: precioNum,
      };
      const retry = await supabase
        .from('catalogo')
        .update(camposSinDetalle)
        .eq('codigo', editando.codigo);
      error = retry.error;
    }

    // Actualizamos siempre el estado local de la app
    setItems((prev) =>
      prev.map((it) =>
        it.codigo === editando.codigo
          ? { ...it, ...camposConDetalle }
          : it
      )
    );

    if (error) {
      Alert.alert('Actualizado localmente', 'Se aplico el cambio en la pantalla.');
    } else {
      Alert.alert('Actualizado', 'Producto modificado correctamente en la base de datos.');
      escanearCatalogo();
    }
    setEditando(null);
  };

  // Eliminar un producto
  const confirmarEliminar = (codigo: string | number) => {
    Alert.alert(
      'Eliminar producto',
      `Deseas eliminar el producto #${codigo}?`,
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

            setItems((prev) => prev.filter((it) => it.codigo !== codigo));

            if (error) {
              Alert.alert('Aviso', 'Se retiro de la lista.');
            } else {
              Alert.alert('Eliminado', 'Producto eliminado de la base de datos.');
              escanearCatalogo();
            }
          },
        },
      ]
    );
  };

  const productosFiltrados = items.filter((prod) => {
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return true;
    return (
      prod.titulo.toLowerCase().includes(texto) ||
      (prod.descripcion && prod.descripcion.toLowerCase().includes(texto)) ||
      String(prod.codigo).includes(texto)
    );
  });

  return (
    <View style={styles.container}>
      {/* Barra superior limpia */}
      <View style={styles.barraNavegacion}>
        <Pressable style={styles.btnRegresar} onPress={() => router.push('/')}>
          <Text style={styles.btnRegresarTexto}>Volver al inicio</Text>
        </Pressable>
        <Text style={styles.badgeTienda}>Catalogo</Text>
      </View>

      <View style={styles.headerCatalogo}>
        <Text style={styles.tituloHeader}>Catalogo de productos</Text>
        <Text style={styles.subtituloHeader}>
          {productosFiltrados.length} productos disponibles
        </Text>

        {/* Buscador sencillo */}
        <View style={styles.cajaBuscador}>
          <TextInput
            style={styles.inputBuscador}
            placeholder="Buscar por nombre, descripcion o codigo..."
            placeholderTextColor="#8D6E63"
            value={busqueda}
            onChangeText={setBusqueda}
          />
          {busqueda.length > 0 && (
            <Pressable onPress={() => setBusqueda('')}>
              <Text style={styles.btnLimpiar}>Limpiar</Text>
            </Pressable>
          )}
        </View>

        {/* Botones de control */}
        <View style={styles.filaAccionesTop}>
          <Pressable style={styles.btnEscanear} onPress={escanearCatalogo}>
            <Text style={styles.btnEscanearTexto}>Escanear catalogo</Text>
          </Pressable>
          <Pressable style={styles.btnInsertar} onPress={sincronizar5Valores}>
            <Text style={styles.btnInsertarTexto}>Insertar 5 valores</Text>
          </Pressable>
        </View>

        {!!errorTexto && (
          <View style={styles.bannerAviso}>
            <Text style={styles.textoAviso}>{errorTexto}</Text>
          </View>
        )}
      </View>

      {cargando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#BF360C" />
          <Text style={styles.textoCargando}>Cargando catalogo...</Text>
        </View>
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => String(item.codigo)}
          contentContainerStyle={styles.listaProductos}
          renderItem={({ item }) => {
            const img = imagenes[String(item.codigo)] || imagenes['1'];
            const cat = categorias[String(item.codigo)] || 'Ramen';

            return (
              <View style={styles.tarjeta}>
                <View style={styles.contenedorImagenCard}>
                  <Image source={img} style={styles.imagenCard} resizeMode="cover" />
                  <View style={styles.badgeCategoria}>
                    <Text style={styles.badgeCategoriaTexto}>{cat}</Text>
                  </View>
                  <View style={styles.badgeCodigo}>
                    <Text style={styles.badgeCodigoTexto}>Codigo #{item.codigo}</Text>
                  </View>
                </View>

                <View style={styles.infoCard}>
                  <Text style={styles.productoTitulo}>{item.titulo}</Text>
                  <Text style={styles.productoPrecio}>
                    ${Number(item.precio || 0).toLocaleString('es-CO')} COP
                  </Text>
                  <Text style={styles.productoDescripcion} numberOfLines={3}>
                    {item.descripcion}
                  </Text>

                  {!!item.detalle && (
                    <Text style={styles.productoDetallePreview} numberOfLines={2}>
                      {item.detalle}
                    </Text>
                  )}
                </View>

                <View style={styles.filaBotonesItem}>
                  <Pressable
                    style={styles.btnVerDetalle}
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
                    <Text style={styles.btnVerDetalleTexto}>Ver detalle</Text>
                  </Pressable>

                  <Pressable
                    style={styles.btnEditarItem}
                    onPress={() => {
                      setEditando(item);
                      setEditTitulo(item.titulo);
                      setEditPrecio(String(item.precio || ''));
                      setEditDesc(item.descripcion);
                      setEditDetalle(item.detalle || '');
                    }}
                  >
                    <Text style={styles.btnEditarItemTexto}>Editar</Text>
                  </Pressable>

                  <Pressable
                    style={styles.btnEliminarItem}
                    onPress={() => confirmarEliminar(item.codigo)}
                  >
                    <Text style={styles.btnEliminarItemTexto}>Eliminar</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.vacioContainer}>
              <Text style={styles.vacioTexto}>No se encontraron productos.</Text>
              <Pressable style={styles.btnRecargar} onPress={escanearCatalogo}>
                <Text style={styles.btnRecargarTexto}>Recargar</Text>
              </Pressable>
            </View>
          }
        />
      )}

      {/* Modal de edicion */}
      <Modal visible={!!editando} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalContenedor}>
            <Text style={styles.modalTitulo}>Editar producto #{editando?.codigo}</Text>

            <Text style={styles.modalLabel}>Nombre del producto:</Text>
            <TextInput
              style={styles.modalInput}
              value={editTitulo}
              onChangeText={setEditTitulo}
              placeholder="Nombre del ramen"
            />

            <Text style={styles.modalLabel}>Precio ($ COP):</Text>
            <TextInput
              style={styles.modalInput}
              value={editPrecio}
              onChangeText={setEditPrecio}
              keyboardType="numeric"
              placeholder="18000"
            />

            <Text style={styles.modalLabel}>Descripcion general:</Text>
            <TextInput
              style={[styles.modalInput, styles.modalArea]}
              value={editDesc}
              onChangeText={setEditDesc}
              multiline
              numberOfLines={3}
              placeholder="Descripcion breve"
            />

            <Text style={styles.modalLabel}>Detalles de preparacion:</Text>
            <TextInput
              style={[styles.modalInput, styles.modalArea]}
              value={editDetalle}
              onChangeText={setEditDetalle}
              multiline
              numberOfLines={3}
              placeholder="Ingredientes detallados"
            />

            <View style={styles.modalBotones}>
              <Pressable
                style={styles.btnModalCancelar}
                onPress={() => setEditando(null)}
              >
                <Text style={styles.btnModalCancelarTexto}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.btnModalGuardar} onPress={guardarEdicion}>
                <Text style={styles.btnModalGuardarTexto}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoCargando: {
    marginTop: 12,
    color: '#3E2723',
    fontWeight: '600',
    fontSize: 14,
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  btnRegresar: {
    backgroundColor: '#FFE0B2',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BF360C',
  },
  btnRegresarTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 13,
  },
  badgeTienda: {
    backgroundColor: '#BF360C',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  headerCatalogo: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tituloHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E2723',
    marginTop: 4,
  },
  subtituloHeader: {
    fontSize: 13,
    color: '#D84315',
    marginBottom: 10,
    fontWeight: '500',
  },
  cajaBuscador: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    marginBottom: 10,
  },
  inputBuscador: {
    flex: 1,
    paddingVertical: 8,
    color: '#3E2723',
    fontSize: 13,
  },
  btnLimpiar: {
    fontSize: 12,
    color: '#8D6E63',
    padding: 4,
    fontWeight: 'bold',
  },
  filaAccionesTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  btnEscanear: {
    backgroundColor: '#FFE0B2',
    borderWidth: 1,
    borderColor: '#BF360C',
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
    alignItems: 'center',
  },
  btnInsertar: {
    backgroundColor: '#BF360C',
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
    alignItems: 'center',
  },
  btnEscanearTexto: {
    color: '#BF360C',
    fontWeight: '600',
    fontSize: 12,
  },
  btnInsertarTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  bannerAviso: {
    backgroundColor: '#FFF3E0',
    padding: 8,
    borderRadius: 6,
    marginTop: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  textoAviso: {
    fontSize: 12,
    color: '#E65100',
    fontWeight: '500',
  },
  listaProductos: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 6,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEBE9',
    elevation: 2,
  },
  contenedorImagenCard: {
    width: '100%',
    height: 170,
    backgroundColor: '#FAFAFA',
    position: 'relative',
  },
  imagenCard: {
    width: '100%',
    height: '100%',
  },
  badgeCategoria: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(62, 39, 35, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeCategoriaTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  badgeCodigo: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#BF360C',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeCodigoTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  infoCard: {
    padding: 14,
  },
  productoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 4,
  },
  productoPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E64A19',
    marginBottom: 6,
  },
  productoDescripcion: {
    fontSize: 13,
    color: '#5D4037',
    lineHeight: 18,
    marginBottom: 6,
  },
  productoDetallePreview: {
    fontSize: 12,
    color: '#795548',
    lineHeight: 16,
    backgroundColor: '#FFF8E1',
    padding: 6,
    borderRadius: 6,
  },
  filaBotonesItem: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingBottom: 14,
    alignItems: 'center',
    gap: 8,
  },
  btnVerDetalle: {
    backgroundColor: '#E64A19',
    flex: 1.5,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnVerDetalleTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  btnEditarItem: {
    backgroundColor: '#1976D2',
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnEditarItemTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  btnEliminarItem: {
    backgroundColor: '#D32F2F',
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnEliminarItemTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  vacioContainer: {
    alignItems: 'center',
    padding: 30,
  },
  vacioTexto: {
    color: '#8D6E63',
    fontSize: 14,
    marginBottom: 12,
  },
  btnRecargar: {
    backgroundColor: '#BF360C',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  btnRecargarTexto: {
    color: '#FFF',
    fontWeight: '600',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContenedor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    maxHeight: '90%',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5D4037',
    marginBottom: 3,
  },
  modalInput: {
    backgroundColor: '#FBE9E7',
    borderRadius: 8,
    padding: 8,
    fontSize: 13,
    color: '#3E2723',
    marginBottom: 10,
  },
  modalArea: {
    height: 55,
    textAlignVertical: 'top',
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  btnModalCancelar: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  btnModalCancelarTexto: {
    color: '#757575',
    fontWeight: '600',
  },
  btnModalGuardar: {
    backgroundColor: '#BF360C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnModalGuardarTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
