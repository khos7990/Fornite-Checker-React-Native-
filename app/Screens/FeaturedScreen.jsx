import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function FeaturedScreen() {
  const [featuredData, setFeaturedData] = useState([]);
  const [bundles, setBundles] = useState();

  useEffect(() => {
    getFeature();
  }, []);

  useEffect(() => {
    getBundle();
  }, [featuredData]);

  //get news data change to a way in which i dont have to fetch for each page

  const getFeature = async () => {
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
      setFeaturedData(results.data.featured.entries);
      //   console.log(results.data.featured.entries);
    } catch (err) {
      console.log(err);
    }
  };

  const getBundle = () => {
    const results = featuredData.filter((data) => data.bundle !== null);
    setBundles(results);
    console.log(results);
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
            border: "2px solid red",
            flex: 0.9,
            width: width,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontFamily: "Inconsolata_700Bold",
            }}
          >
            Featured
          </Text>
          {bundles ? (
            <View
              style={{
                height: 1000,
                width: width,
                border: "2px solid orange",
                flexDirection: "row",
                flexWrap: "wrap",
                borderWidth: 1,
                borderColor: "green",
              }}
            >
              {/* {bundles.map((data) => {
                return ( */}
              {/* <View
                style={{
                  width: width,
                  height: height,
                  border: "2px solid yellow",
                  borderWidth: 1,
                  borderColor: "yellow",
                }}
              > */}
              {/* <Text
                      style={{
                        color: "white",
                        fontSize: 25,
                        textAlign: "center",
                      }}
                    >
                      {data.section.name}
                    </Text> */}

              <FlatList
                data={bundles}
                keyExtractor={(item) => item.name}
                horizontal
                pagingEnabled
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: width,
                        height: height,
                        // borderWidth: 1,
                        // borderColor: "orange",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <View
                        style={{
                          height: 50,
                          width: width,

                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 25,
                            fontFamily: "Inconsolata_700Bold",
                            position: "absolute",
                            top: 0,
                            textAlign: "center",
                          }}
                        >
                          {item.section.name}
                        </Text>
                      </View>

                      {item.items.map((item) => (
                        <View
                          style={{
                            width: 150,
                            height: 150,
                            borderWidth: 1,
                            borderColor: "green",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: "white", fontSize: 15 }}>
                            {item.name}
                          </Text>
                          <Image
                            source={{ uri: item.images.smallIcon }}
                            style={{ width: 100, height: 80 }}
                          />
                        </View>
                      ))}
                    </View>
                  );
                }}
              />

              {/* </View> */}
              {/* ); */}
              {/* })} */}
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
