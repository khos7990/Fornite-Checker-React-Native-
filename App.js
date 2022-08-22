import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, useTheme } from "react-native-paper";
import LoginScreen from "./app/Screens/LoginScreen";
import HomeScreen from "./app/Screens/HomeScreen";
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
      <HomeScreen />
      {/* <NavigationContainer>
        <BottomNav />
      </NavigationContainer> */}
    </PaperProvider>
  );
}

{
  /* <NavigationContainer>
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
</NavigationContainer> */
}
