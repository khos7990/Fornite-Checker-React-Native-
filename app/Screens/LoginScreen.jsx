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
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalComponent from "../Components/Modal";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default function LoginScreen({ navigation }) {
  const [newsData, setNewsData] = useState([]);
  const [dailyItems, setdailyItems] = useState([]);
  const [singleItems, setsingleItems] = useState([]);
  const [ItemsMoreThanOne, setItemsMoreThanOne] = useState([]);
  const [itemSets, setitemSets] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [itemSelected, setitemSelected] = useState([]);
  const [itemRarity, setitemRarity] = useState();

  useEffect(() => {
    getNewsData();
    getStore();
  }, []);

  useEffect(() => {
    items();
  }, [dailyItems]);

  //better way of doing this and check if it works with more than 2 items

  useEffect(() => {
    let array = [];
    for (let i = 0; i < ItemsMoreThanOne.length; i++) {
      if (ItemsMoreThanOne[i].set.value === ItemsMoreThanOne[i++].set.value) {
        let arr = [];
        arr.push(ItemsMoreThanOne[i], ItemsMoreThanOne[i - 1]);
        array.push(arr);
      }
    }
    setitemSets(array);
  }, [ItemsMoreThanOne]);
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
      let arrOfItems = [];
      results.data.daily.entries.map((item) => {
        arrOfItems.push(item.items);
      });
      setdailyItems(arrOfItems);
    } catch (err) {
      console.log(err);
    }
  };

  const items = () => {
    let arrOne = [];
    let two = [];

    dailyItems.map((item) => {
      if (item.length > 1) {
        for (let i = 0; i < item.length; i++) {
          two.push(item[i]);
          setItemsMoreThanOne(two);
        }
      } else {
        for (let i = 0; i < item.length; i++) {
          arrOne.push(item[i]);
          setsingleItems(arrOne);
        }
      }
    });
  };

  //setting modal and rarity color
  const getDailyEvent = (e, name) => {
    setOpenModal(!openModal);
    const itemClicked = singleItems.filter((item) => item.name === name);
    setitemSelected(itemClicked);
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
                      bottom: 0,
                      justifyContent: "flex-end",
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
            <View
              style={{
                height: 70,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  flex: 1,
                  textAlign: "center",
                  marginLeft: 25,
                }}
              >
                Swipe to see whats new{" "}
                <Image
                  style={{ height: 50, width: 45 }}
                  source={require("../../assets/icons/swipe.png")}
                />
              </Text>
            </View>
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
          <View style={{ border: "2px solid yellow" }}>
            <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
              Dailys
            </Text>
          </View>
          <View
            style={{
              border: "2px solid green",
              height: 375,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {singleItems.map((item) => (
              <View
                style={{
                  border: "2px solid red",
                  width: 120,
                  height: 120,
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "white", textAlign: "center" }}
                >
                  {item.name}
                </Text>
                <TouchableOpacity onPress={(e) => getDailyEvent(e, item.name)}>
                  <Image
                    source={{ uri: item.images.smallIcon }}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "center",
                    }}
                  />
                </TouchableOpacity>

                <ModalComponent
                  open={openModal}
                  close={hideModal}
                  itemSelected={itemSelected}
                  itemRarity={itemRarity}
                />
              </View>
            ))}
            <View
              style={{
                border: "2px solid orange",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 375,
                height: 100,
                borderWidth: 2,
                borderColor: "orange",
              }}
            >
              {itemSets.map((item) => {
                return item.map((set) => {
                  return (
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {set.name}
                      </Text>
                      <Image
                        source={{ uri: set.images.smallIcon }}
                        style={{
                          height: 80,
                          width: 90,
                          resizeMode: "center",
                        }}
                      />
                    </View>
                  );
                });
              })}
            </View>
          </View>
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
    height: "45%",
    top: 0,
    position: "absolute",
  },
});
