import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import BottomNav from "./app/Components/BottomNav";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Inconsolata_200ExtraLight,
  Inconsolata_300Light,
  Inconsolata_400Regular,
  Inconsolata_500Medium,
  Inconsolata_700Bold,
} from "@expo-google-fonts/inconsolata";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Featured from "./app/Screens/FeaturedScreen";

const Stack = createNativeStackNavigator();

const theme = {
  colors: {
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Inconsolata_300Light,
    Inconsolata_400Regular,
    Inconsolata_500Medium,
    Inconsolata_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <BottomNav />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
