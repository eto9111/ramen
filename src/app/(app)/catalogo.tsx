import React, { useState, useEffect } from 'react';
import {
  Pressable,
  ScrollView,
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

/// Estructura de los productos de supabase
export type Item = {
  codigo: string | number;
  titulo: string;
  descripcion: string;
  detalle?: string;
  precio: number | null;
};

// Entidad con los 5 productos con información detallada
export const PRODUCTOS_BASE: Item[] = [
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

export default function Catalogo() {
  const router = useRouter();

  // Estados de la aplicación
  const [items, setItems] = useState<Item[]>([]);
  const [errorTexto, setErrorTexto] = useState('');
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  // Estados para modal de edición
  const [editando, setEditando] = useState<Item | null>(null);
  const [editTitulo, setEditTitulo] = useState('');
  const [editPrecio, setEditPrecio] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editDetalle, setEditDetalle] = useState('');

  // Mapeo de imágenes para los 5 productos (reutiliza los 3 y añade las 2 de las fotos)
  const imagenes: Record<string, any> = {
    '1': require('../../../assets/images/tonkotsu.jpg'),
    '2': require('../../../assets/images/shoyu.png'),
    '3': require('../../../assets/images/miso.jpg'),
    '4': require('../../../assets/images/bogia-beef.jpg'),
    '5': require('../../../assets/images/buldak-carbonara.jpg'),
  };

  const badgesCategoria: Record<string, string> = {
    '1': '⭐ Más Vendido',
    '2': '🥢 Tradicional',
    '3': '🍲 Especialidad',
    '4': '🍜 Instantáneo',
    '5': '🔥 Súper Picante',
  };

  useEffect(() => {
    escanearCatalogo();
  }, []);

  // Consultar productos almacenados en Supabase
  const escanearCatalogo = async () => {
    try {
      setCargando(true);
      setErrorTexto('');

      const { data, error } = await supabase
        .from('catalogo')
        .select('codigo, titulo, descripcion, detalle, precio')
        .order('codigo', { ascending: true });

      // Verificar errores de supabase
      if (error) {
        console.error('Error Supabase:', error);
        throw error;
      }

      console.log('productos recibidos:', data);
      if (data && data.length > 0) {
        setItems(data as Item[]);
      } else {
        // Si la tabla está vacía en Supabase, cargar los 5 base
        setItems(PRODUCTOS_BASE);
      }
    } catch (error: unknown) {
      console.error('Error al cargar catalogo:', error);
      const mensaje =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error !== null && 'message' in error
          ? String((error as any).message)
          : String(error);

      setErrorTexto('No fue posible cargar de Supabase: ' + mensaje);
      // Mantiene la app 100% funcional mostrando los 5 productos locales
      setItems(PRODUCTOS_BASE);
    } finally {
      setCargando(false);
    }
  };

  // Función para insertar los 5 valores en la tabla de Supabase
  const sincronizar5Valores = async () => {
    try {
      setCargando(true);
      setErrorTexto('');

      const { error } = await supabase
        .from('catalogo')
        .upsert(PRODUCTOS_BASE, { onConflict: 'codigo' });

      if (error) {
        Alert.alert(
          'Permiso RLS en Supabase Requerido',
          'Ejecuta el archivo "scripts/permisos_y_catalogo.sql" en el SQL Editor de tu Supabase para permitir inserción y edición:\n\n' +
            error.message
        );
      } else {
        Alert.alert(
          '¡Éxito!',
          'Se insertaron y sincronizaron los 5 productos detallados en la tabla catálogo de Supabase.'
        );
        await escanearCatalogo();
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'No se pudo sincronizar');
    } finally {
      setCargando(false);
    }
  };

  // Guardar cambios al editar un producto
  const guardarEdicion = async () => {
    if (!editando || !editTitulo.trim() || !editPrecio.trim()) {
      Alert.alert('Campos obligatorios', 'Por favor ingresa título y precio.');
      return;
    }

    const precioNum = parseFloat(editPrecio);
    const camposActualizados = {
      titulo: editTitulo,
      descripcion: editDesc,
      detalle: editDetalle,
      precio: precioNum,
    };

    // Actualizar en Supabase
    const { error } = await supabase
      .from('catalogo')
      .update(camposActualizados)
      .eq('codigo', editando.codigo);

    if (error) {
      // Actualizar en el estado local de la app
      setItems((prev) =>
        prev.map((it) =>
          it.codigo === editando.codigo
            ? { ...it, ...camposActualizados }
            : it
        )
      );
      Alert.alert(
        'Modificado Localmente',
        'Se aplicó en la vista. Recuerda ejecutar el script SQL en Supabase para persistir cambios remotos.'
      );
    } else {
      Alert.alert('¡Actualizado!', 'Producto modificado exitosamente en Supabase.');
      escanearCatalogo();
    }
    setEditando(null);
  };

  // Eliminar producto
  const confirmarEliminar = (codigo: string | number) => {
    Alert.alert(
      'Eliminar Producto',
      `¿Deseas eliminar el ítem con código #${codigo}?`,
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
              setItems((prev) => prev.filter((it) => it.codigo !== codigo));
              Alert.alert('Eliminado localmente', 'Se retiró de la vista: ' + error.message);
            } else {
              Alert.alert('Eliminado', 'Producto eliminado de la base de datos.');
              escanearCatalogo();
            }
          },
        },
      ]
    );
  };

  // Filtro de búsqueda como catálogo web
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
      {/* Barra superior de navegación / Regresar */}
      <View style={styles.barraNavegacion}>
        <Pressable style={styles.btnRegresar} onPress={() => router.push('/')}>
          <Text style={styles.btnRegresarTexto}>← Volver al Inicio</Text>
        </Pressable>
        <Text style={styles.badgeTienda}>🛒 Catálogo Online</Text>
      </View>

      {/* Encabezado estilo tienda online */}
      <View style={styles.headerCatalogo}>
        <Text style={styles.tituloHeader}>Menú & Catálogo Digital</Text>
        <Text style={styles.subtituloHeader}>
          {productosFiltrados.length} productos disponibles con entrega inmediata
        </Text>

        {/* Buscador de productos */}
        <View style={styles.cajaBuscador}>
          <Text style={styles.lupaIcono}>🔍</Text>
          <TextInput
            style={styles.inputBuscador}
            placeholder="Buscar ramen por nombre, ingrediente o código..."
            placeholderTextColor="#8D6E63"
            value={busqueda}
            onChangeText={setBusqueda}
          />
          {busqueda.length > 0 && (
            <Pressable onPress={() => setBusqueda('')}>
              <Text style={styles.btnLimpiar}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Botones de acción: Escanear e Insertar */}
        <View style={styles.filaAccionesTop}>
          <Pressable style={styles.btnEscanear} onPress={escanearCatalogo}>
            <Text style={styles.btnEscanearTexto}>🔄 Escanear Catálogo</Text>
          </Pressable>
          <Pressable style={styles.btnInsertar} onPress={sincronizar5Valores}>
            <Text style={styles.btnInsertarTexto}>➕ Insertar 5 Valores</Text>
          </Pressable>
        </View>

        {/* Mensaje de error / aviso si lo hay */}
        {!!errorTexto && (
          <View style={styles.bannerAviso}>
            <Text style={styles.textoAviso}>⚠️ {errorTexto}</Text>
          </View>
        )}
      </View>

      {/* Indicador de carga o Lista de Productos */}
      {cargando ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#BF360C" />
          <Text style={styles.textoCargando}>Escaneando productos de Supabase...</Text>
        </View>
      ) : (
        <FlatList
          data={productosFiltrados}
          keyExtractor={(item) => String(item.codigo)}
          contentContainerStyle={styles.listaProductos}
          renderItem={({ item }) => {
            const img = imagenes[String(item.codigo)] || imagenes['1'];
            const badgeTexto = badgesCategoria[String(item.codigo)] || '🍜 Ramen';

            return (
              <View style={styles.tarjeta}>
                {/* Imagen del producto con badge de código y categoría */}
                <View style={styles.contenedorImagenCard}>
                  <Image source={img} style={styles.imagenCard} resizeMode="cover" />
                  <View style={styles.badgeCategoria}>
                    <Text style={styles.badgeCategoriaTexto}>{badgeTexto}</Text>
                  </View>
                  <View style={styles.badgeCodigo}>
                    <Text style={styles.badgeCodigoTexto}>CÓDIGO #{item.codigo}</Text>
                  </View>
                </View>

                {/* Detalles del producto */}
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
                      📌 {item.detalle}
                    </Text>
                  )}
                </View>

                {/* Botones de acción del catálogo */}
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
                    <Text style={styles.btnVerDetalleTexto}>👁️ Ver Detalle</Text>
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
                    <Text style={styles.btnEditarItemTexto}>✏️ Editar</Text>
                  </Pressable>

                  <Pressable
                    style={styles.btnEliminarItem}
                    onPress={() => confirmarEliminar(item.codigo)}
                  >
                    <Text style={styles.btnEliminarItemTexto}>🗑️</Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View style={styles.vacioContainer}>
              <Text style={styles.vacioTexto}>No se encontraron productos.</Text>
              <Pressable style={styles.btnRecargar} onPress={escanearCatalogo}>
                <Text style={styles.btnRecargarTexto}>Recargar Catálogo</Text>
              </Pressable>
            </View>
          }
        />
      )}

      {/* Modal para Editar Producto */}
      <Modal visible={!!editando} transparent animationType="slide">
        <View style={styles.modalFondo}>
          <View style={styles.modalContenedor}>
            <Text style={styles.modalTitulo}>Editar Producto #{editando?.codigo}</Text>

            <Text style={styles.modalLabel}>Título del Producto:</Text>
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
              placeholder="Ej: 18000"
            />

            <Text style={styles.modalLabel}>Descripción General:</Text>
            <TextInput
              style={[styles.modalInput, styles.modalArea]}
              value={editDesc}
              onChangeText={setEditDesc}
              multiline
              numberOfLines={3}
              placeholder="Descripción breve"
            />

            <Text style={styles.modalLabel}>Detalle y Preparación:</Text>
            <TextInput
              style={[styles.modalInput, styles.modalArea]}
              value={editDetalle}
              onChangeText={setEditDetalle}
              multiline
              numberOfLines={3}
              placeholder="Ingredientes detallados y origen"
            />

            <View style={styles.modalBotones}>
              <Pressable
                style={styles.btnModalCancelar}
                onPress={() => setEditando(null)}
              >
                <Text style={styles.btnModalCancelarTexto}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.btnModalGuardar} onPress={guardarEdicion}>
                <Text style={styles.btnModalGuardarTexto}>Guardar Cambios</Text>
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
    backgroundColor: '#FFF8DC', // Tono crema cálido
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
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#BF360C',
  },
  btnRegresarTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 13,
  },
  badgeTienda: {
    backgroundColor: '#BF360C',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
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
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: '#FFCCBC',
    marginBottom: 10,
  },
  lupaIcono: {
    fontSize: 16,
    marginRight: 6,
  },
  inputBuscador: {
    flex: 1,
    paddingVertical: 8,
    color: '#3E2723',
    fontSize: 13,
  },
  btnLimpiar: {
    fontSize: 14,
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
    borderWidth: 1.5,
    borderColor: '#BF360C',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    flex: 1,
    marginRight: 6,
    alignItems: 'center',
  },
  btnInsertar: {
    backgroundColor: '#BF360C',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    flex: 1,
    marginLeft: 6,
    alignItems: 'center',
  },
  btnEscanearTexto: {
    color: '#BF360C',
    fontWeight: 'bold',
    fontSize: 12,
  },
  btnInsertarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bannerAviso: {
    backgroundColor: '#FFF3E0',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  textoAviso: {
    fontSize: 11,
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
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  contenedorImagenCard: {
    width: '100%',
    height: 180,
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeCategoriaTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  badgeCodigo: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#BF360C',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeCodigoTexto: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  infoCard: {
    padding: 14,
  },
  productoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 4,
  },
  productoPrecio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E64A19',
    marginBottom: 8,
  },
  productoDescripcion: {
    fontSize: 13,
    color: '#5D4037',
    lineHeight: 18,
    marginBottom: 8,
  },
  productoDetallePreview: {
    fontSize: 12,
    color: '#795548',
    lineHeight: 16,
    fontStyle: 'italic',
    backgroundColor: '#FFF8E1',
    padding: 6,
    borderRadius: 8,
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
    flex: 2,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnVerDetalleTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnEditarItem: {
    backgroundColor: '#1976D2',
    flex: 1.2,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnEditarItemTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnEliminarItem: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEliminarItemTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  vacioContainer: {
    alignItems: 'center',
    padding: 30,
  },
  vacioTexto: {
    color: '#8D6E63',
    fontSize: 15,
    marginBottom: 12,
  },
  btnRecargar: {
    backgroundColor: '#BF360C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnRecargarTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContenedor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#3E2723',
    marginBottom: 14,
    textAlign: 'center',
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 3,
  },
  modalInput: {
    backgroundColor: '#FBE9E7',
    borderRadius: 8,
    padding: 9,
    fontSize: 13,
    color: '#3E2723',
    marginBottom: 10,
  },
  modalArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  btnModalCancelar: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  btnModalCancelarTexto: {
    color: '#757575',
    fontWeight: 'bold',
  },
  btnModalGuardar: {
    backgroundColor: '#BF360C',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnModalGuardarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
