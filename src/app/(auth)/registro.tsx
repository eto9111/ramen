import { useState } from "react";
import {
  ActivityIndicator, Alert, Image, Pressable, StyleSheet,
  Text, TextInput, View
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function Registro() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  const crearCuenta = async () => {
    if (!correo.trim() || !password) {
      Alert.alert("Campos incompletos", "Ingrese correo y contraseña");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Contraseña", "Debe tener mínimo 6 caracteres");
      return;
    }

    try {
      setGuardando(true);
      const { error } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      await supabase.auth.signOut();
      Alert.alert("Cuenta creada", "Ahora puede iniciar sesión");
      router.replace("/(auth)/login");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.titulo}>Crear cuenta</Text>
      <Text style={styles.subtitulo}>Regístrate en Ramen App</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#A1887F"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#A1887F"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.boton} onPress={crearCuenta} disabled={guardando}>
        {guardando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>Crear cuenta</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.replace("/(auth)/login")}>
        <Text style={styles.enlace}>Ya tengo una cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#FFF8DC" },
  logo: { width: 90, height: 90, borderRadius: 45, alignSelf: "center", marginBottom: 15, borderWidth: 2, borderColor: "#BF360C" },
  titulo: { fontSize: 32, fontWeight: "bold", color: "#3E2723", textAlign: "center", marginBottom: 6 },
  subtitulo: { color: "#5D4037", textAlign: "center", marginBottom: 24, fontSize: 16 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D84315", borderRadius: 14, padding: 14, marginBottom: 14, color: "#3E2723" },
  boton: { backgroundColor: "#BF360C", padding: 16, borderRadius: 14, alignItems: "center", marginTop: 10 },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  enlace: { color: "#D84315", textAlign: "center", marginTop: 22, fontWeight: "600", fontSize: 15 },
});
