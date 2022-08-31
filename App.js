import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import BottomNav from "./app/Components/BottomNav";
import SearchScreen from "./app/Screens/SearchScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const theme = {
  colors: {
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        {/* <NavigationContainer> */}
        <SearchScreen />
        {/* </NavigationContainer> */}
      </PaperProvider>
    </SafeAreaProvider>
  );
}
