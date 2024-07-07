import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../Config/Config";
import { ref, onValue, set } from "firebase/database";

// Definir interfaz para el usuario
interface Usuario {
  Username: string;
  email: string;
  comentarios: string;
}

export default function UsuarioScreen() {
  const [cedula, setCedula] = useState("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const handleGuardar = () => {
    if (cedula && usuario) {
      guardarUsuario(cedula, usuario.Username, usuario.email, usuario.comentarios)
        .then(() => {
          Alert.alert("Exitoso", "Guardado correctamente");
          setUsuario(null); // Limpiar estado después de guardar
        })
        .catch((error) => {
          Alert.alert("Error", "Ocurrió un error al guardar los datos");
          console.error("Error al guardar los datos:", error);
        });
    } else {
      Alert.alert("Error", "Por favor, completa todos los campos y busca un usuario válido");
    }
  };

  const handleBuscarUsuario = () => {
    if (cedula) {
      const starCountRef = ref(db, "usuarios/" + cedula);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUsuario(data as Usuario); // Asignar datos del usuario encontrado al estado
        } else {
          Alert.alert("Usuario no encontrado", "No se encontró usuario con esta cédula");
        }
      });
    } else {
      Alert.alert("Error", "Por favor, ingresa una cédula válida");
    }
  };

  function guardarUsuario(cedula: string, nombre: string, correo: string, comentarios: string) {
    const usuarioData: Usuario = {
      Username: nombre,
      email: correo,
      comentarios: comentarios
    };
    return set(ref(db, "usuarios/" + cedula), usuarioData);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar y Guardar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />
      <Button
        title="Buscar Usuario"
        onPress={handleBuscarUsuario}
        color="#841584"
      />
      {usuario && (
        <View style={styles.usuarioContainer}>
          <Text style={styles.usuarioText}>Nombre: {usuario.Username}</Text>
          <Text style={styles.usuarioText}>Correo: {usuario.email}</Text>
          <Text style={styles.usuarioText}>Comentarios: {usuario.comentarios}</Text>
          <Button
            title="Guardar Usuario"
            onPress={handleGuardar}
            color="#841584"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  usuarioContainer: {
    marginTop: 20,
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  usuarioText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
});
