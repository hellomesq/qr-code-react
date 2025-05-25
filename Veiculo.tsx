import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const motos_cadastradas = [
  {
    placa: "ABC1234",
    modelo: "Mottu-e",
    setor_cadastrado: "Manutenção",
    setor_atual: "Disponível",
    status: "No setor incorreto",
  },
  {
    placa: "DEF5678",
    modelo: "Mottu Pop",
    setor_cadastrado: "Manutenção",
    setor_atual: "Manutenção",
    status: "No pátio",
  },
  {
    placa: "GHI9012",
    modelo: "Mottu-e",
    setor_cadastrado: "Disponível",
    setor_atual: "Disponível",
    status: "No pátio",
  },
  {
    placa: "JKL3456",
    modelo: "Mottu Sport",
    setor_cadastrado: "Triagem",
    setor_atual: "Manutenção",
    status: "No setor incorreto",
  },
  {
    placa: "MNO7890",
    modelo: "Mottu Sport",
    setor_cadastrado: "Disponível",
    setor_atual: "Disponível",
    status: "No pátio",
  },
];

export default function Veiculo({ route, navigation }: any) {
  const { placa } = route.params;
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const moto = motos_cadastradas.find((m) => m.placa === placa);
  if (!moto) return <Text>Moto não encontrada</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Informações da Moto</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Placa:</Text>
        <Text style={styles.valor}>{moto.placa}</Text>

        <Text style={styles.label}>Modelo:</Text>
        <Text style={styles.valor}>{moto.modelo}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text
          style={[
            styles.valor,
            moto.status === "No setor incorreto" && styles.statusAlerta,
          ]}
        >
          {moto.status}
        </Text>

        {mostrarDetalhes && (
          <>
            <Text style={styles.label}>Setor Cadastrado:</Text>
            <Text style={styles.valor}>{moto.setor_cadastrado}</Text>

            <Text style={styles.label}>Setor Atual:</Text>
            <Text style={styles.valor}>{moto.setor_atual}</Text>
          </>
        )}

        <TouchableOpacity
          style={styles.botao}
          onPress={() => setMostrarDetalhes((prev) => !prev)}
        >
          <Text style={styles.textoBotao}>
            {mostrarDetalhes ? "Esconder Detalhes" : "Ver Detalhes"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoSecundario]}
          onPress={() => navigation.navigate("Camera")}
        >
          <Text style={styles.textoBotao}>Escanear Novamente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F3F4F6",
    flexGrow: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2F3E46",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    fontWeight: "bold",
  },
  valor: {
    fontSize: 16,
    color: "#333",
  },
  statusAlerta: {
    color: "#D9534F",
    fontWeight: "bold",
  },
  botao: {
    backgroundColor: "#52764B",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  botaoSecundario: {
    backgroundColor: "#35483B",
  },
  textoBotao: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
