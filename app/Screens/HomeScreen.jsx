import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.home}>
      <Text style={styles.text}>Hey </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#6C27F8",
    flex: 0.2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  text: {
    color: "#E8D70A",
    fontSize: "55px",
  },
});
