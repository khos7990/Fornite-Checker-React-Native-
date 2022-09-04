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
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalComponent from "../Components/Modal";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function FeaturedScreen() {
  const [featuredData, setFeaturedData] = useState([]);
  const [bundles, setBundles] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [itemSelected, setitemSelected] = useState([]);
  const [itemRarity, setitemRarity] = useState();

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

  const getFeaturedEvent = (e, name, bundle) => {
    setOpenModal(!openModal);
    const itemClicked = bundle.items.filter((item) => item.name === name);
    setitemSelected(itemClicked);
    console.log(itemClicked);
    if (itemClicked[0].rarity.displayValue === "Uncommon") {
      setitemRarity("#016604");
    } else if (itemClicked[0].rarity.displayValue === "Rare") {
      setitemRarity("#008dd4");
    } else if (itemClicked[0].rarity.displayValue === "Epic") {
      setitemRarity("#8a2be2");
    } else if (itemClicked[0].rarity.displayValue === "Legendary") {
      setitemRarity("#de6e0e");
    } else {
      setitemRarity("#40464d");
    }
  };

  const hideModal = () => setOpenModal(false);

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
                      borderWidth: 1,
                      borderColor: "yellow",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    <View
                      style={{
                        height: 70,
                        width: width,
                        marginBottom: 30,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 25,
                          fontFamily: "Inconsolata_700Bold",
                        }}
                      >
                        {item.section.name}
                      </Text>
                      <Text style={{ fontSize: 20, color: "white" }}>
                        {item.bundle.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        {item.finalPrice}
                      </Text>
                    </View>
                    <ModalComponent
                      open={openModal}
                      close={hideModal}
                      itemSelected={itemSelected}
                      itemRarity={itemRarity}
                    />
                    {item.items.map((i) => (
                      <View
                        style={{
                          width: 150,
                          height: 115,
                          borderWidth: 1,
                          borderColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 20,
                          margin: 5,
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 15 }}>
                          {i.name}
                        </Text>
                        <TouchableOpacity
                          onPress={(e) => getFeaturedEvent(e, i.name, item)}
                        >
                          <Image
                            source={{ uri: i.images.smallIcon }}
                            style={{ width: 100, height: 80 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                );
              }}
            />
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
