import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../../redux/features/basketSlice";
import CurrencyFormat from "react-currency-format";

const BasketIcon = () => {
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        style={styles.button}
      >
        <View style={styles.countView}>
          <Text style={styles.itemCount}>{items.length}</Text>
        </View>
        <Text style={styles.totalText}>View Basket</Text>
        <CurrencyFormat
          value={basketTotal.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          thousandSpacing="2"
          prefix={"£ "}
          renderText={(value) => <Text style={styles.totalPrice}>{value}</Text>}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    zIndex: 50,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#00ccbb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countView: {
    backgroundColor: "#01a296",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  totalText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default BasketIcon;
