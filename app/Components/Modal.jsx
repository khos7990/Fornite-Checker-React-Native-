import React from "react";
import { Modal, View } from "react-native";

export default function ModalComponent({ open }) {
  if (!open) return false;
  return (
    <View style={{ border: "2px solid black", height: 200, width: 300 }}>
      <Modal animationType="slide" />
    </View>
  );
}
