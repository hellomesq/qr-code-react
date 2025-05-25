import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Animated, Easing } from "react-native";
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import type { CameraView as CameraViewType } from "expo-camera";

export default function TelaCamera({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef<CameraViewType | null>(null);
  const scanningLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanningLineAnim, {
          toValue: 250,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanningLineAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

 const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
  if (!scanned) {
    setScanned(true);

    try {
      const url = new URL(data);
      const placa = url.searchParams.get("placa");

      if (placa) {
        Alert.alert("QR Code lido", `Placa: ${placa}`);
        navigation.navigate("Veiculo", { placa });
      } else {
        Alert.alert("Erro", "QR Code inválido. Placa não encontrada.");
        setScanned(false);
      }
    } catch (error) {
      Alert.alert("Erro", "QR Code inválido.");
      setScanned(false);
    }
  }
};



  if (!permission) return <Text>Carregando permissões...</Text>;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text>Sem permissão para usar a câmera.</Text>
        <Button title="Conceder permissão" onPress={requestPermission} />
      </View>
    );

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />
      <View style={styles.overlay}>
        <View style={styles.scanBox}>
          <Animated.View
            style={[styles.scanningLine, { transform: [{ translateY: scanningLineAnim }] }]}
          />
        </View>
      </View>
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Escanear novamente" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
  scanBox: {
    width: 250,
    height: 250,
    borderColor: "#00FF00",
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
  },
  scanningLine: {
    height: 2,
    backgroundColor: "#00FF00",
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
});
