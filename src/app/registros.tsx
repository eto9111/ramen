import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Registros() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    setCargando(true);

    const { data, error } = await supabase
      .from("clientes_ramen")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      setCargando(false);
      return;
    }

    setRegistros(data || []);
    setCargando(false);
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#D84315" />
        <Text>Consultando Supabase...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ramen Lovers</Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text>{item.correo}</Text>
            <Text>Ciudad: {item.ciudad}</Text>
            <Text>Ramen favorito: {item.ramen_favorito}</Text>
            <Text>Tipo de preparación: {item.tipo_preparacion}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8DC",
    padding: 18,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8DC",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3E2723",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#BF360C",
    marginBottom: 5,
  },
});
