import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Item(props) {
  const { item } = props;
  const decimals = (num) => {
    let number = Number(num).toFixed(2);
    return number;
  };

  const navigateToS = () => {
    props.navigation.navigate("Single", {
      id: item.id,
      price: decimals(item.market_data.current_price.usd),
    });
  };
  return (
    <View style={styles.listItem}>
      <Image
        source={{ uri: item.image.small }}
        style={{ width: 60, height: 60, borderRadius: 30 }}
      />
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>Price</Text>
        <Text style={{ fontWeight: "bold" }}>
          ${decimals(item.market_data.current_price.usd)}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigateToS()}
      >
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={
              ({ marginRight: 12, fontSize: 18 },
              decimals(item.market_data.price_change_percentage_24h) > 0
                ? { fontWeight: "bold", color: "green" }
                : { fontWeight: "bold", color: "red" })
            }
          >
            Change
          </Text>
          <Text
            style={
              ({ marginRight: 12 },
              decimals(item.market_data.price_change_percentage_24h) > 0
                ? { fontWeight: "bold", color: "green" }
                : { fontWeight: "bold", color: "red" })
            }
          >
            {decimals(item.market_data.price_change_percentage_24h) > 0 ? (
              <AntDesign name="arrowup" size={18} color="green" />
            ) : (
              <AntDesign name="arrowdown" size={18} color="red" />
            )}
            {decimals(item.market_data.price_change_percentage_24h)}%
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
  },
  symbol: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "#9fb2d1",
    justifyContent: "center",
  },
});
