import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../Screens/SearchScreen";
import HomeScreen from "../Screens/HomeScreen";

//screennames

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          borderRadius: 5,
          backgroundColor: "#6C27F8",
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../../assets/icons/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFFFFF" : "#31BD00",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FFFFFF" : "#31BD00",
                  fontFamily: "Inconsolata_400Regular",
                  fontSize: 20,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../../assets/icons/search.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#FFFFFF" : "#31BD00",
                }}
              />
              <Text
                style={{
                  color: focused ? "#FFFFFF" : "#31BD00",
                  fontFamily: "Inconsolata_400Regular",
                  fontSize: 20,
                }}
              >
                {" "}
                Search{" "}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({});
