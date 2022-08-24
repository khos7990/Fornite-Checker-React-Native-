import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function LoginScreen({ navigation }) {
  const [newsData, setNewsData] = useState([]);

  useEffect(async () => {
    try {
      let response = await fetch("https://fortnite-api.com/v2/news/br", {
        method: "GET",
        headers: {
          Authorization: "c7ed655d-7550-4737-9791-2a0b3ab588cd",
        },
      });
      let results = await response.json();
      setNewsData(results.data.motds);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../../assets/statsbgrnd.jpg")}
      >
        {newsData ? (
          <SafeAreaView style={styles.cardContainer}>
            <FlatList
              data={newsData}
              keyExtractor={(item) => item.image}
              horizontal
              pagingEnabled
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: width,
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid yellow",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 40,
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: imageW,
                        height: imageH,
                        resizeMode: "cover",
                        borderWidth: "2",
                        borderColor: "white",
                        borderRadius: 15,
                      }}
                    />
                  </View>
                );
              }}
            />
          </SafeAreaView>
        ) : null}
        <View
          style={{
            position: "absolute",
            border: "2px solid orange",
            bottom: "15%",
          }}
        ></View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  background: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    border: "2px solid red",
    width: "100%",
    position: "relative",
    height: "80%",
    position: "absolute",
  },
});
