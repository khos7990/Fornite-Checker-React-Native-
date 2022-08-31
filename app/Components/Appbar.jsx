import React from "react";

import { Dimensions, Image, Text, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const icon = require("../../assets/icons/search.png");

export default function AppbarComponent() {
  return (
    <View
      style={{
        width: width,
        height: 65,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 10,
        backgroundColor: "#6C27F8",
      }}
    >
      <Text style={styles.text}>Search a Player</Text>
      <Image
        source={icon}
        style={{
          width: 30,
          height: 30,
          tintColor: "white",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 30,
    height: 40,
  },
});
