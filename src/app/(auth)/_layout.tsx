import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="registro" options={{ title: "Crear cuenta", headerStyle: { backgroundColor: "#FFF8DC" }, headerTintColor: "#3E2723", headerShadowVisible: false }} />
    </Stack>
  );
}
