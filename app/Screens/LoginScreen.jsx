import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../../assets/fortnite.jpg")}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Fortnite Tracker</Text>
        </View>
        {/* <TouchableOpacity
          style={styles.loginBtnContainer}
          height="100%"
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.loginBtn}>Continue to Track</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#E8D70A",
    fontSize: "55px",
  },
  welcomeContainer: {
    flex: 0.1,
    bottom: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6C27F8",
  },
  loginBtnContainer: {
    width: "100%",
    height: "12%",
    backgroundColor: "#E8790A",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    color: "#6C27F8",
    fontSize: "30px",
  },
});
