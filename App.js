import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fortnite Checker</Text>
      <Button color="orange" title="Continue to app" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C27F8",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: "50px",
  },
});
