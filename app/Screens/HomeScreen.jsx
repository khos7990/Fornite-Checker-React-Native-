import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Image,
} from "react-native";
import { Card, Appbar, Button, Title, Text } from "react-native-paper";
import BottomNav from "../Components/BottomNav";

export default function Welcome() {
  const [PlayerSearch, onChangeText] = useState();
  const [Player, setPlayer] = useState();
  const [PlayerLvl, setPlayerLvl] = useState();
  const [GameMode, setGameMode] = useState("solo");
  const [Allstats, setAllStats] = useState();
  const [CardTitleColor, setCardTitleColor] = useState("#20C7DE");
  const [focusColor, setfocusColor] = useState("yellow");

  useEffect(() => {
    if (GameMode === "solo") {
      setCardTitleColor("#2D7CF5");
    } else if (GameMode === "duo") {
      setCardTitleColor("#FF9E43");
    } else {
      setCardTitleColor("#852DF5");
    }
  }, [GameMode]);

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
          placeholderTextColor="orange"
          onBlur={() => setfocusColor("yellow")}
          onFocus={() => setfocusColor("orange")}
          style={{
            color: "orange",
            borderWidth: 2,
            width: "70%",
            height: "30%",
            borderRadius: 10,
            textAlign: "center",
            borderColor: focusColor,
          }}
        />
        <Button style={styles.submitBtn} onPress={getPlayer} mode="outlined">
          Submit
        </Button>
      </View>

      <View style={styles.StatsContainer}>
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
        <View style={styles.PlayerContainer}>
          {PlayerLvl ? (
            <>
              <Text style={styles.PlayerLvlText}>Level: {PlayerLvl} </Text>
              <Text style={styles.PlayerText}>{Player}</Text>
            </>
          ) : null}
        </View>
        {Allstats ? (
          <View style={styles.dataContainer}>
            <Card style={styles.card} elevation={3} mode={"elevated"}>
              <View
                style={{
                  backgroundColor: CardTitleColor,
                  position: "relative",
                }}
              >
                <Card.Title
                  titleVariant="displaySmall"
                  title={GameMode}
                  right={(text) => (
                    <Text style={{ marginRight: "5%" }} variant="headlineSmall">
                      {Allstats[GameMode].matches} Matches
                    </Text>
                  )}
                />
              </View>

              <Card.Content
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  height: "80%",
                }}
              >
                <View style={styles.chartData}>
                  <View style={styles.winsndlosses}>
                    <Text
                      variant="headlineSmall"
                      style={{ color: "orange", marginBottom: "5%" }}
                    >
                      {" "}
                      Wins {Allstats[GameMode].wins}
                    </Text>
                    <Text variant="headlineSmall" style={styles.text}>
                      Losses{" "}
                      {Allstats[GameMode].matches - Allstats[GameMode].wins}
                    </Text>
                  </View>
                  <View style={styles.chartContainer}>
                    <Text
                      variant="headlineSmall"
                      style={{ color: "orange", marginBottom: "5%" }}
                    >
                      {" "}
                      Win Rate
                    </Text>
                    <CircularProgress
                      radius={50}
                      value={Allstats[GameMode].winRate}
                      textColor="#F3A900"
                      activeStrokeColor="orange"
                      valueSuffix={"%"}
                      inActiveStrokeColor={"orange"}
                      inActiveStrokeOpacity={0.4}
                      inActiveStrokeWidth={6}
                      duration={500}
                    />
                  </View>
                </View>
                <View style={styles.matchData}>
                  <View style={styles.kills}>
                    <Text
                      style={{
                        color: "orange",
                        border: "2px solid yellow",
                      }}
                      variant="headlineSmall"
                    >
                      {" "}
                      Kills{" "}
                    </Text>
                    <Text style={styles.text} variant="headlineSmall">
                      {" "}
                      {Allstats[GameMode].kills}{" "}
                    </Text>
                  </View>
                  <View style={styles.deaths}>
                    <Text style={styles.text} variant="headlineSmall">
                      {" "}
                      Deaths{" "}
                    </Text>

                    <Text style={styles.text} variant="headlineSmall">
                      {" "}
                      {Allstats[GameMode].deaths}
                    </Text>
                  </View>
                  <View style={styles.kd}>
                    <Text style={styles.text} variant="headlineSmall">
                      {" "}
                      KD{" "}
                    </Text>
                    <Text style={styles.text} variant="headlineSmall">
                      {" "}
                      {Allstats[GameMode].kd}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        ) : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  kills: {
    border: "2px solid blue",
  },
  chartContainer: {
    marginLeft: "20%",
  },
  winsndlosses: {
    marginTop: "15%",
    height: "60%",
  },
  matchData: {
    border: "2px solid pink",
    height: "75%",
    width: "100%",
    position: "absolute",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
  },
  chartData: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    border: "2px solid red",
  },
  scoreCard: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    position: "relative",
    height: "90%",
  },
  imagecontainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  search: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  StatsContainer: {
    top: "0%",
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
    height: "25%",
    color: "yellow",
    fontSize: 25,
  },
  searchInput: {
    color: "white",
  },

  NavContainer: {
    width: "100%",
    flex: 0.08,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },

  dataContainer: {
    flex: 1,
    width: "100%",
    marginTop: "10%",
  },

  NavBtn: {},

  submitBtn: {
    borderWidth: 2,
    borderColor: "orange",
  },

  card: {
    backgroundColor: "#171717",
    height: "100%",
    border: "2px solid green",
  },

  cardText: {
    color: "#40C81B",
  },
  header: {
    width: "100%",
    padding: 0,
    justifyContent: "space-evenly",
  },

  PlayerContainer: {
    marginTop: "5%",
    position: "relative",
    width: "95%",
  },

  PlayerLvlText: {
    position: "absolute",
    left: 0,
    fontSize: "26px",
    color: "orange",
  },

  PlayerText: {
    position: "absolute",
    right: 0,
    fontSize: "26px",
    color: "orange",
  },
  text: {
    color: "orange",
  },
});
