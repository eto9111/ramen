import { Stack } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

function LogoCircular() {
  return (
    <Image 
      source={require('../../../assets/images/logo.png')} 
      style={styles.logo} 
    />
  );
}

export default function Layout() {
  return (
    <Stack screenOptions={{ headerRight: () => <LogoCircular /> }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Inicio",
        }}
      />
      <Stack.Screen
        name="formulario"
        options={{
          title: "Formulario",
        }}
      />
      <Stack.Screen
        name="resultado"
        options={{
          title: "Datos registrados",
        }}
      />
      <Stack.Screen
        name="imagenes"
        options={{
          title: "Galería",
        }}
      />
      <Stack.Screen
        name="contacto"
        options={{
          title: "Contacto",
        }}
      />
      <Stack.Screen
        name="menu"
        options={{
          title: "Nuestro menú",
        }}
      />
      <Stack.Screen
        name="registros"
        options={{
          title: "Ramen Lovers",
        }}
      />

      {/* NUEVA PANTALLA: DETALLE */}
      <Stack.Screen
        name="detalle-item"
        options={{
          title: "Detalle del producto",
        }}
      />

      {/* NUEVA PANTALLA: CATÁLOGO */}
      <Stack.Screen
        name="catalogo"
        options={{
          title: "Catálogo de Productos",
        }}
      />

      <Stack.Screen
        name="producto/[id]"
        options={{
          title: "Detalle del Ramen",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  }
});
