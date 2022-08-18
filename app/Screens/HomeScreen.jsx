import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";

export default function Welcome() {
  const [PlayerSearch, onChangeText] = useState();
  const [Player, setPlayer] = useState();
  const [PlayerLvl, setPlayerLvl] = useState();
  const [GameMode, setGameMode] = useState("Solo");

  const getGameMode = (e) => {
    console.log(e.target);
  };

  const getPlayer = async () => {
    try {
      setPlayer(PlayerSearch);
      let response = await fetch(
        "https://fortnite-api.com/v2/stats/br/v2/?name=" + PlayerSearch,
        {
          method: "GET",
          headers: {
            Authorization: "c7ed655d-7550-4737-9791-2a0b3ab588cd",
          },
        }
      );
      let results = await response.json();
      console.log(results.data);
      setPlayerLvl(results.data.battlePass.level);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.searchText}>Search a player</Text>
        <TextInput
          onChangeText={onChangeText}
          placeholder="AccountID"
          style={styles.input}
        />
        <Button onPress={getPlayer} title="submit"></Button>
      </View>
      <View style={styles.StatsContainer}>
        <Text style={styles.searchText}>{Player}</Text>
        {PlayerLvl ? (
          <Text style={styles.searchText}>Level: {PlayerLvl} </Text>
        ) : null}
        <View style={styles.NavContainer}>
          <Button title="Solo" />
          <Button title="Duo" />
          <Button title="Squad" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6C27F8",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  search: {
    border: "2px solid orange",
    width: "90%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  StatsContainer: {
    border: "2px solid yellow",
    height: "75%",
    width: "100%",
    alignItems: "center",
  },

  searchText: {
    fontSize: "40px",
    color: "yellow",
  },
  input: {
    width: "100%",
    color: "orange",
    border: "2px solid orange",
    height: "20%",
  },
  NavContainer: {
    width: "100%",
    border: "red 2px solid",
    flex: 0.08,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
