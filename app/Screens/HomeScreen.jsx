import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, TextInput } from "react-native";
import {
  Card,
  Appbar,
  Button,
  Title,
  Text,
  Searchbar,
} from "react-native-paper";

export default function Welcome() {
  const [PlayerSearch, onChangeText] = useState();
  const [Player, setPlayer] = useState();
  const [PlayerLvl, setPlayerLvl] = useState();
  const [GameMode, setGameMode] = useState("solo");
  const [Allstats, setAllStats] = useState();

  const getGameMode = async (e, game) => {
    setGameMode(game);
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
      setAllStats(results.data.stats.all);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ImageBackground
      style={styles.imagecontainer}
      source={require("../../assets/statsbgrnd.jpg")}
    >
      <View style={styles.search}>
        <Text style={styles.searchText}>Search a player</Text>
        <TextInput
          onChangeText={onChangeText}
          placeholder="Enter an account name"
          placeholderTextColor={"orange"}
          style={styles.input}
        />
        <Button style={styles.submitBtn} onPress={getPlayer} mode="outlined">
          {" "}
          Submit
        </Button>
      </View>

      <View style={styles.StatsContainer}>
        <Text style={styles.searchText}>{Player}</Text>
        {PlayerLvl ? (
          <Text style={styles.searchText}>Level: {PlayerLvl} </Text>
        ) : null}
        <View style={styles.NavContainer}>
          <Appbar.Header style={styles.header}>
            <Button
              style={styles.NavBtn}
              onPress={(e) => getGameMode(e, "solo")}
              mode="contained"
            >
              Solo
            </Button>
            <Button
              style={styles.NavBtn}
              onPress={(e) => getGameMode(e, "duo")}
              mode="contained"
            >
              Duo
            </Button>
            <Button
              style={styles.NavBtn}
              onPress={(e) => getGameMode(e, "squad")}
              mode="contained"
            >
              Squad
            </Button>
          </Appbar.Header>
        </View>
        {Allstats ? (
          <View style={styles.dataContainer}>
            <Card style={styles.card} elevation={3} mode={"elevated"}>
              <Card.Title titleVariant="displaySmall" title={GameMode} />
              <Card.Content>
                <Text style={styles.cardText} variant="headlineMedium">
                  Score:
                  <Text style={styles.cardText} variant="headlineSmall">
                    {" "}
                    {Allstats[GameMode].score}{" "}
                  </Text>
                </Text>
              </Card.Content>
            </Card>
            <Card elevation={3} mode={"elevated"}>
              <Card.Content>
                <Text style={styles.cardText} variant="headlineMedium">
                  Kills:
                  <Text variant="headlineMedium" style={styles.cardText}>
                    {Allstats[GameMode].kills}{" "}
                  </Text>{" "}
                </Text>
                <Text variant="headlineMedium" style={styles.cardText}>
                  Deaths:
                  <Text variant="headlineMedium" style={styles.cardText}>
                    {" "}
                    {Allstats[GameMode].deaths}
                  </Text>
                </Text>
              </Card.Content>
            </Card>
            <Card elevation={3} mode={"elevated"}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.cardText}>
                  Matches:{" "}
                  <Text variant="headlineMedium" style={styles.cardText}>
                    {Allstats[GameMode].matches}{" "}
                  </Text>
                  Wins:{" "}
                  <Text style={styles.cardText} variant="headlineMedium">
                    {Allstats[GameMode].wins}
                  </Text>
                </Text>
              </Card.Content>
            </Card>
            <Card elevation={3} mode={"elevated"}>
              <Card.Content>
                <Text style={styles.cardText} variant="headlineMedium">
                  KD:
                  <Text style={styles.cardText} variant="headlineMedium">
                    {" "}
                    {Allstats[GameMode].kd}
                  </Text>
                </Text>
              </Card.Content>
            </Card>
          </View>
        ) : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imagecontainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  search: {
    border: "2px solid orange",
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  StatsContainer: {
    border: "2px solid white",
    top: "5%",
    height: "70%",
    width: "100%",
    alignItems: "center",
  },

  searchText: {
    fontSize: "30px",
    color: "yellow",
  },
  input: {
    width: "75%",
    textAlign: "center",
    border: "2px solid yellow",
    height: "25%",
    color: "yellow",
    fontSize: 25,
  },
  searchInput: {
    color: "white",
  },

  NavContainer: {
    width: "100%",
    border: "red 2px solid",
    flex: 0.08,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },

  dataContainer: {
    flex: 1,
    border: "2px solid black",
    width: "90%",
  },

  NavBtn: {},

  submitBtn: {
    border: "2px solid orange",
  },

  card: {
    border: "2px solid black",
  },

  cardText: {
    color: "#40C81B",
  },
  header: {
    border: "2px solid pink",
    width: "100%",
    padding: 0,
    justifyContent: "space-evenly",
  },
});
