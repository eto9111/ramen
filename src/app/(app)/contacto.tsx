import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function ContactoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Ramen App</Text>
      <Text style={styles.subtitulo}>Información y Contacto</Text>

      <View style={styles.tarjeta}>
        <Text style={styles.label}>Universidad</Text>
        <Text style={styles.texto}>Universidad CESMAG</Text>

        <Text style={styles.label}>Programa</Text>
        <Text style={styles.texto}>Ingeniería de Sistemas</Text>

        <Text style={styles.label}>Asignatura</Text>
        <Text style={styles.texto}>Desarrollo Móvil</Text>

        <Text style={styles.label}>Ciudad</Text>
        <Text style={styles.texto}>Pasto</Text>

        <Text style={styles.label}>Ubicación</Text>
        <Text style={styles.texto}>Centro de la ciudad, Local 5</Text>

        <Text style={styles.label}>Correo</Text>
        <Text style={styles.texto}>sebanda.9640@unicesmag.edu.co</Text>
        
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.texto}>3189827377</Text>

        <Text style={styles.label}>Horario</Text>
        <Text style={styles.texto}>Lunes a domingo: 12 PM - 10 PM</Text>
      </View>

      <Pressable style={styles.boton} onPress={() => router.replace('/')}>
        <Text style={styles.botonTexto}>Volver al inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#FFF8DC', justifyContent: 'center', padding: 30 },
  titulo: { fontSize: 32, fontWeight: 'bold', color: '#3E2723' },
  subtitulo: { fontSize: 18, color: '#D84315', marginTop: 5, marginBottom: 25 },
  tarjeta: { backgroundColor: '#FFFFFF', padding: 22, borderRadius: 18 },
  label: { color: '#D84315', fontSize: 12, marginTop: 10 },
  texto: { color: '#3E2723', fontSize: 16, fontWeight: '600', marginTop: 3 },
  boton: { backgroundColor: '#BF360C', paddingVertical: 15, borderRadius: 15, alignItems: 'center', marginTop: 25 },
  botonTexto: { color: '#FFFFFF', fontWeight: 'bold' },
});
