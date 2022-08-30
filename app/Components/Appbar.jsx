import React from "react";

import { Dimensions, Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

const icon = require("../../assets/icons/search.png");

export default function AppbarComponent() {
  return (
    <SafeAreaView
      style={{
        width: width,
        height: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 10,
        backgroundColor: "#6C27F8",
        borderRadius: 10,
      }}
    >
      <Text style={styles.text}>Search a Player</Text>
      <Image
        source={icon}
        style={{ width: 40, height: 40, tintColor: "white" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 30,
    height: 40,
  },
});
