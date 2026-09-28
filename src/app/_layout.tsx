import { Stack } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

function LogoCircular() {
  return (
    <Image 
      source={require('../../assets/images/logo.png')} 
      style={styles.logo} 
    />
  );
}

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerRight: () => <LogoCircular /> }}>
      <Stack.Screen name="index" options={{ title: 'Ramen App' }} />
      <Stack.Screen name="menu" options={{ title: 'Nuestro menú' }} />
      <Stack.Screen name="contacto" options={{ title: 'Contacto' }} />
      <Stack.Screen name="producto/[id]" options={{ title: 'Detalle del Ramen' }} />
      <Stack.Screen name="formulario" options={{ title: 'Realizar Pedido' }} />
      <Stack.Screen name="resultado" options={{ title: 'Resumen del Pedido' }} />
      <Stack.Screen name="imagenes" options={{ title: 'Galería de Ramen' }} />
      <Stack.Screen name="registros" options={{ title: 'Ramen Lovers' }} />
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
