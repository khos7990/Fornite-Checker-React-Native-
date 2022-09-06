import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const modalW = width / 1.5;
const modalH = height / 2.5;

export default function ModalComponent({
  open,
  close,
  itemSelected,
  itemRarity,
}) {
  const containerStyle = { backgroundColor: "#6C27F8", width: modalW };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={close}
        contentContainerStyle={containerStyle}
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: 1,
          shadowOpacity: 1,
        }}
      >
        {itemSelected.map((item) => (
          <ImageBackground
            source={require("../../assets/itemwallpaper.jpg")}
            style={{ width: modalW }}
          >
            <View
              style={{
                height: modalH,
                borderWidth: 3,
                borderColor: itemRarity,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: modalW,
                  backgroundColor: itemRarity,
                  borderWidth: 1,
                  borderColor: "white",
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    color: "white",
                    fontFamily: "Inconsolata_500Medium",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "white",
                    fontFamily: "Inconsolata_400Regular",
                  }}
                >
                  {item.description}{" "}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                    fontFamily: "Inconsolata_400Regular",
                  }}
                >
                  Type: {item.type.displayValue}{" "}
                </Text>
              </View>
              <View
                style={{
                  height: 200,

                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.images.smallIcon }}
                  style={{
                    width: 80,
                    height: 80,
                    borderWidth: 0.5,
                    borderColor: "white",
                    marginBottom: 8,
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "white",
                    fontFamily: "Inconsolata_400Regular",
                  }}
                >
                  Rarity: {item.rarity.displayValue}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "white",
                    fontFamily: "Inconsolata_300Light",

                    position: item.set ? null : "absolute",
                    bottom: item.set ? null : 0,
                  }}
                >
                  Chapter: {item.introduction.chapter}{" "}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: "white",
                      fontFamily: "Inconsolata_300Light",
                    }}
                  >
                    Season: {item.introduction.season}{" "}
                  </Text>
                </Text>
                {item.set ? (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: 10,
                      textAlign: "center",
                      fontSize: 15,
                      color: "white",
                      fontFamily: "Inconsolata_300Light",
                    }}
                  >
                    {" "}
                    {item.set.text}{" "}
                  </Text>
                ) : null}
              </View>
            </View>
          </ImageBackground>
        ))}
      </Modal>
    </Portal>
  );
}
