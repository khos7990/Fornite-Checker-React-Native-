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
  const [dailyItems, setdailyItems] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsImg, setitemsImg] = useState([]);

  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
    let itemArr = [];
    let imgs = [];
    for (let i = 0; i < dailyItems.length; i++) {
      itemArr.push(dailyItems[i].items);
    }
    setItems(itemArr);
  }, [dailyItems]);

  useEffect(() => {
    let data = [];
    const obj = {};
    for (let i = 0; i < items.length; i++) {
      let name = items[i][0].name;
      let description = items[i][0].description;
      let images = items[i][0].images.icon;
      obj[i] = {
        name: name,
        des: description,
        img: images,
      };
      data.push(obj[i]);
    }
    console.log(data);
    setitemsImg(data);
  }, [items]);

  const getNewsData = async () => {
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
  };

  const getStore = async () => {
    try {
      let response = await fetch(
        "https://fortnite-api.com/v2/shop/br/combined",
        {
          method: "GET",
          headers: {
            Authorization: "c7ed655d-7550-4737-9791-2a0b3ab588cd",
          },
        }
      );
      let results = await response.json();
      setdailyItems(results.data.daily.entries);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={require("../../assets/statsbgrnd.jpg")}
      >
        <View
          style={{
            height: "10%",
            width: "100%",
            position: "absolute",
            top: 45,
          }}
        >
          <Text
            style={{
              color: "yellow",
              fontSize: 40,
              textAlign: "center",
            }}
          >
            {" "}
            News{" "}
          </Text>
        </View>
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
                      height: "90%",
                      marginTop: 0,
                      justifyContent: "center",
                      alignItems: "center",
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
                        height: 150,
                        resizeMode: "contain",
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
            borderWidth: 1,
            borderColor: "orange",
            height: "45%",
            marginBottom: 90,
            width: "100%",
          }}
        >
          {items ? (
            <FlatList
              data={itemsImg}
              horizontal
              pagingEnabled
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: width,
                      height: "90%",
                      marginTop: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 40,
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      {item.des}
                    </Text>
                    <Image
                      source={{ uri: item.img }}
                      style={{
                        width: imageW,
                        height: 150,
                        resizeMode: "contain",
                        borderWidth: "2",
                        borderColor: "white",
                        borderRadius: 15,
                      }}
                    />
                  </View>
                );
              }}
            />
          ) : null}
          <Button onPress={getStore} title="press" />
        </View>
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
    width: "100%",
    position: "relative",
    height: "70%",
    top: -50,
    position: "absolute",
  },
});
