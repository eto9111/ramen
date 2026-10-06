import "react-native-url-polyfill/auto"; //agrega a  react native funciones para procesar direcciones URL
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js"; // esta es una funcion que crea el cliente de conexion de supabase 

const supabaseUrl = "https://nndmowsaefnfdwbpkhhz.supabase.co"; // Removing /rest/v1/ because createClient handles the base URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZG1vd3NhZWZuZmR3YnBraGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwMTI5NDQsImV4cCI6MjEwNTU4ODk0NH0.sssQCVP0Pkj0ckY82fre_aFDG1f-lPxvxWn3NjaqQV0";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
);
