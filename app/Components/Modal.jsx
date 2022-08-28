import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const modalW = width / 1.5;
const modalH = height / 3;

export default function ModalComponent({ open, close, itemSelected }) {
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
          opacity: 0.5,
          shadowOpacity: 1,
        }}
      >
        {itemSelected ? (
          <View
            style={{
              height: modalH,

              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 25, color: "orange" }}
            >
              {itemSelected[0].name}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 20, color: "orange" }}
            >
              {itemSelected[0].description}{" "}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 15, color: "orange" }}
            >
              Type: {itemSelected[0].type.displayValue}{" "}
            </Text>
            <Image
              source={{ uri: itemSelected[0].images.smallIcon }}
              style={{
                width: 80,
                height: 80,
                borderWidth: 0.5,
                borderColor: "black",
              }}
            />
            <Text
              style={{ textAlign: "center", fontSize: 20, color: "orange" }}
            >
              Rarity: {itemSelected[0].rarity.displayValue}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 15, color: "orange" }}
            >
              Chapter: {itemSelected[0].introduction.chapter}{" "}
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 15, color: "orange" }}
            >
              Season: {itemSelected[0].introduction.season}{" "}
            </Text>
          </View>
        ) : null}
      </Modal>
    </Portal>
  );
}
