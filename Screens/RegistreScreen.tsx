import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../Config/Config";
import { ref, set, onValue } from "firebase/database";

export default function RegistreScreen({ onGuardar }: any) {
  const [cedula, setcedula] = useState("");
  const [nombres, setnombre] = useState("");
  const [correo, setcorre] = useState("");
  const [comentarios, setcomentarios] = useState("");

  const handleGuardar = () => {
    if (cedula && nombres && correo && comentarios) {
      guardarUsuario(cedula, nombres, correo, comentarios)
        .then(() => {
          Alert.alert("Exitoso", "Guardado correctamente");
          if (onGuardar) {
            onGuardar();
          }
          setcedula("");
          setnombre("");
          setcorre("");
          setcomentarios("");
        })
        .catch((error) => {
          Alert.alert("Error", "Ocurrió un error al guardar los datos");
          console.error("Error al guardar los datos:", error);
        });
    } else {
      Alert.alert("Error", "Por favor, completar todos los campos");
    }
  };

  useEffect(() => {
    // Solo ejecutar si cedula tiene un valor válido
    if (cedula) {
      const starCountRef = ref(db, "usuarios/" + cedula);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // Aquí podrías hacer algo con los datos si es necesario.
      });
    }
  }, [cedula]); // Asegúrate de incluir cedula como dependencia si es necesario.

  function guardarUsuario(
    cedula: string,
    nombres: string,
    correo: string,
    comentarios: string
  ) {
    return set(ref(db, "usuarios/" + cedula), {
      Username: nombres,
      email: correo,
      comentarios: comentarios,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RegistreScreen</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar Cedula"
        value={cedula}
        onChangeText={setcedula}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresar nombre"
        value={nombres}
        onChangeText={setnombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresar Correo"
        value={correo}
        onChangeText={setcorre}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentarios"
        value={comentarios}
        onChangeText={setcomentarios}
      />
      <Button
        title="Guardar"
        onPress={handleGuardar}
        color="#841584"
      />
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
    fontSize: 19,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
});
