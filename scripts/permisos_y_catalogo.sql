-- ==============================================================================
-- SCRIPT SQL: PERMISOS COMPLETOS (SELECT, INSERT, UPDATE, DELETE) Y 5 PRODUCTOS
-- Para ejecutar en: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. CREAR / ACTUALIZAR ESTRUCTURA DE LA TABLA 'catalogo'
CREATE TABLE IF NOT EXISTS public.catalogo (
    codigo BIGINT PRIMARY KEY,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    detalle TEXT,
    precio NUMERIC NOT NULL
);

-- Si la tabla ya existía, asegurar que exista la columna 'detalle'
ALTER TABLE public.catalogo ADD COLUMN IF NOT EXISTS detalle TEXT;

-- 2. HABILITAR PERMISOS COMPLETOS: EDICIÓN, ELIMINACIÓN, INSERCIÓN Y ACTUALIZACIÓN
-- Habilitamos RLS en las tablas
ALTER TABLE public.catalogo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes_ramen ENABLE ROW LEVEL SECURITY;

-- Eliminamos políticas previas para evitar conflictos de nombres
DROP POLICY IF EXISTS "Permitir_todo_catalogo" ON public.catalogo;
DROP POLICY IF EXISTS "Permitir_todo_clientes_ramen" ON public.clientes_ramen;

-- Política integral que otorga SELECT, INSERT, UPDATE y DELETE a usuarios anónimos y autenticados
CREATE POLICY "Permitir_todo_catalogo"
ON public.catalogo
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir_todo_clientes_ramen"
ON public.clientes_ramen
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Otorgar privilegios directos de edición, eliminación, inserción y lectura a los roles
GRANT ALL ON TABLE public.catalogo TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.clientes_ramen TO anon, authenticated, service_role;

-- 3. INSERTAR ENTIDAD DE 5 PRODUCTOS CON INFORMACIÓN DETALLADA
-- Reutiliza los 3 tradicionales e incluye los 2 nuevos de las imágenes
INSERT INTO public.catalogo (codigo, titulo, descripcion, detalle, precio)
VALUES
(
    1,
    'Tonkotsu Ramen Tradicional',
    'Caldo denso y cremoso de cerdo hervido durante 16 horas, fideos artesanales, panceta chashu marinada, huevo nitamago y alga nori.',
    'Especialidad de la casa preparada con fondo de huesos de cerdo blanco a fuego lento, aceite de ajo negro aromático (mayu), brotes de bambú (menma), cebolleta japonesa fresca y chashu braseado al momento.',
    18000
),
(
    2,
    'Shoyu Ramen Clásico de Tokyo',
    'Caldo límpido y profundo a base de soja fermentada artesanal, pollo de corral, menma crujiente y cebolleta fina.',
    'El ramen clásico por excelencia con caldo transparente elaborado con alga kombu, setas shiitake y tare de salsa shoyu añejada en barrica de cedro, acompañado de pechuga de pollo tierna y huevo marinado en mirin.',
    15500
),
(
    3,
    'Miso Ramen Hokkaido',
    'Caldo aromático enriquecido con pasta de miso tostada de Hokkaido, mantequilla dulce, maíz tierno y carne de cerdo picada.',
    'Originario de Sapporo, con base de pasta de miso rojo y blanco salteada al wok con jengibre fresco, ajo confitado, sésamo tostado, maíz dulce y un toque de mantequilla pura que crea una textura sedosa inconfundible.',
    17000
),
(
    4,
    'Bogia Instant Noodles Beef Flavor',
    'Fideos instantáneos premium en bowl sabor carne de res especiada con trozos de vegetales deshidratados y caldo vigorizante.',
    'Bowl de fideos ondulados listos en 3 minutos. Incluye sobre de caldo concentrado de res estilo oriental con notas de anís estrella, cebolla de verdeo deshidratada, zanahoria y chile suave.',
    12500
),
(
    5,
    'Samyang Buldak Carbonara',
    'Fideos coreanos picantes stir-fry fusionados con suave y cremosa salsa carbonara, queso mozzarella y un toque ardiente.',
    'Famoso plato coreano Buldak Bokkeummyun versión Carbo. Equilibrio perfecto entre el fuego del pollo picante coreano y la indulgencia de una salsa carbonara con crema de leche, queso parmesano y perejil.',
    14500
)
ON CONFLICT (codigo) DO UPDATE 
SET titulo = EXCLUDED.titulo,
    descripcion = EXCLUDED.descripcion,
    detalle = EXCLUDED.detalle,
    precio = EXCLUDED.precio;

-- 4. VERIFICACIÓN DE LOS DATOS INSERTADOS
SELECT * FROM public.catalogo ORDER BY codigo ASC;
