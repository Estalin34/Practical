import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import UsuarioScreen from "./UsuarioScreen";
import { RootStackParamList } from "./types";

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ImageBackground
    source={require("../assets/image/MAMI.jpg")}
    style={styles.background}
  >
    <Text style={styles.title}>WelcomeScreen</Text>
    <Text style={styles.subtitle}>¡Nos alegra verte aquí!</Text>
  </ImageBackground>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
