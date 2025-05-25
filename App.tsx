import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TelaCamera from "./TelaCamera";
import Veiculo from "./Veiculo";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Camera" component={TelaCamera} />
        <Stack.Screen name="Veiculo" component={Veiculo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
