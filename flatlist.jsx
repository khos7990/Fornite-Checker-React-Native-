
  <View
  style={{
    width: width,
    height: 200,
    border: "2px solid yellow",
    borderWidth: 1,
    borderColor: "yellow",
  }}
>
  <Text
    style={{
      color: "white",
      fontSize: 25,
      textAlign: "center",
    }}
  >
    {data.section.name}
  </Text>

  <View></View>
</View>
);
})}
</View>
<FlatList
  data={data.items}
  keyExtractor={(item) => item.name}
  horizontal
  // pagingEnabled
  renderItem={({ item }) => {
    return (
      <View
        style={{
          justifyContent: "flex-end",
          width: 150,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "Inconsolata_700Bold",
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>

        <Image
          source={{ uri: item.images.smallIcon }}
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
            borderWidth: "1",
            borderColor: "white",
            borderRadius: 15,
          }}
        />
      </View>
    );
  }}
/>;
