const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://nndmowsaefnfdwbpkhhz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZG1vd3NhZWZuZmR3YnBraGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMTI5NDQsImV4cCI6MjEwNTU4ODk0NH0.sssQCVP0Pkj0ckY82fre_aFDG1f-lPxvxWn3NjaqQV0";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Entidad con los 5 productos con información detallada
const productosCatalogo = [
  {
    codigo: 1,
    titulo: 'Tonkotsu Ramen Tradicional',
    descripcion: 'Caldo denso y cremoso de cerdo hervido durante 16 horas, fideos artesanales, panceta chashu marinada, huevo nitamago y alga nori.',
    detalle: 'Especialidad de la casa preparada con fondo de huesos de cerdo blanco a fuego lento, aceite de ajo negro aromático (mayu), brotes de bambú (menma), cebolleta japonesa fresca y chashu braseado al momento.',
    precio: 18000
  },
  {
    codigo: 2,
    titulo: 'Shoyu Ramen Clásico de Tokyo',
    descripcion: 'Caldo límpido y profundo a base de soja fermentada artesanal, pollo de corral, menma crujiente y cebolleta fina.',
    detalle: 'El ramen clásico por excelencia con caldo transparente elaborado con alga kombu, setas shiitake y tare de salsa shoyu añejada en barrica de cedro, acompañado de pechuga de pollo tierna y huevo marinado en mirin.',
    precio: 15500
  },
  {
    codigo: 3,
    titulo: 'Miso Ramen Hokkaido',
    descripcion: 'Caldo aromático enriquecido con pasta de miso tostada de Hokkaido, mantequilla dulce, maíz tierno y carne de cerdo picada.',
    detalle: 'Originario de Sapporo, con base de pasta de miso rojo y blanco salteada al wok con jengibre fresco, ajo confitado, sésamo tostado, maíz dulce y un toque de mantequilla pura que crea una textura sedosa inconfundible.',
    precio: 17000
  },
  {
    codigo: 4,
    titulo: 'Bogia Instant Noodles Beef Flavor',
    descripcion: 'Fideos instantáneos premium en bowl sabor carne de res especiada con trozos de vegetales deshidratados y caldo vigorizante.',
    detalle: 'Bowl de fideos ondulados listos en 3 minutos. Incluye sobre de caldo concentrado de res estilo oriental con notas de anís estrella, cebolla de verdeo deshidratada, zanahoria y chile suave.',
    precio: 12500
  },
  {
    codigo: 5,
    titulo: 'Samyang Buldak Carbonara',
    descripcion: 'Fideos coreanos picantes stir-fry fusionados con suave y cremosa salsa carbonara, queso mozzarella y un toque ardiente.',
    detalle: 'Famoso plato coreano Buldak Bokkeummyun versión Carbo. Equilibrio perfecto entre el fuego del pollo picante coreano y la indulgencia de una salsa carbonara con crema de leche, queso parmesano y perejil.',
    precio: 14500
  }
];

// Función para escanear / consultar los datos del catálogo en Supabase
async function escanearCatalogo() {
  console.log("--> Escaneando tabla 'catalogo' en Supabase...");
  const { data, error } = await supabase
    .from('catalogo')
    .select('codigo, titulo, descripcion, detalle, precio')
    .order('codigo', { ascending: true });

  if (error) {
    console.error("Error al escanear catálogo:", error.message);
    return null;
  }

  console.log(`[OK] Registros encontrados (${data.length}):`);
  console.table(data);
  return data;
}

// Función para insertar los 5 valores
async function insertarValores() {
  console.log("\n--> Insertando los 5 registros en 'catalogo'...");
  const { data, error } = await supabase
    .from('catalogo')
    .upsert(productosCatalogo, { onConflict: 'codigo' })
    .select();

  if (error) {
    console.error("Error al insertar:", error.message);
    if (error.code === '42501') {
      console.log("\n[AVISO RLS] Supabase tiene activa la seguridad por filas (RLS).");
      console.log("Ejecuta el script 'scripts/permisos_y_catalogo.sql' en el SQL Editor de tu Dashboard de Supabase para habilitar los permisos.");
    }
    return false;
  }

  console.log("[OK] Datos insertados exitosamente:", data);
  return true;
}

// Función para actualizar / editar un valor
async function actualizarItem(codigo, campos) {
  console.log(`\n--> Actualizando código ${codigo}...`, campos);
  const { data, error } = await supabase
    .from('catalogo')
    .update(campos)
    .eq('codigo', codigo)
    .select();

  if (error) {
    console.error("Error al actualizar:", error.message);
    return false;
  }
  console.log("[OK] Actualizado:", data);
  return true;
}

// Función para eliminar un valor
async function eliminarItem(codigo) {
  console.log(`\n--> Eliminando ítem con código ${codigo}...`);
  const { data, error } = await supabase
    .from('catalogo')
    .delete()
    .eq('codigo', codigo);

  if (error) {
    console.error("Error al eliminar:", error.message);
    return false;
  }
  console.log("[OK] Eliminado exitosamente");
  return true;
}

async function main() {
  console.log("=== GESTIÓN DE CATÁLOGO SUPABASE (JS) ===");
  await escanearCatalogo();
  await insertarValores();
  await escanearCatalogo();
}

if (require.main === module) {
  main();
}

module.exports = {
  productosCatalogo,
  escanearCatalogo,
  insertarValores,
  actualizarItem,
  eliminarItem
};
