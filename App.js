import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import BottomNav from "./app/Components/BottomNav";

const Stack = createNativeStackNavigator();

const theme = {
  colors: {
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <BottomNav />
      </NavigationContainer>
    </PaperProvider>
  );
}
