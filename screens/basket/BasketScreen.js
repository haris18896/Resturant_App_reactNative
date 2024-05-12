import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../../redux/features/restaurantSlice";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../../redux/features/basketSlice";
import * as Icons from "react-native-heroicons/solid";
import { urlFor } from "../../sanity";
import CurrencyFormat from "react-currency-format";
import { removeFromBasket } from "../../redux/features/basketSlice";

const BasketScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.titleText}>Basket</Text>
            <Text style={styles.restaurantText}>{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          >
            <Icons.XCircleIcon color="#00ccbb" size={50} />
          </TouchableOpacity>
        </View>

        <View style={styles.deliveryContainer}>
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            style={{ height: 35, width: 35, borderRadius: 999 }}
          />
          <Text style={styles.deliveryText}>Deliver in 50 - 75 mints</Text>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (
              <View key={key} style={styles.itemContainer}>
                <Text style={styles.itemCountText}>{items.length} x</Text>
                <Image
                  source={{ uri: urlFor(items[0]?.image).url() }}
                  style={styles.itemImage}
                />
                <Text style={{ flex: 1 }}>{items[0]?.name}</Text>
                <CurrencyFormat
                  value={items[0]?.price.toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"£ "}
                  renderText={(value) => (
                    <Text style={{ color: "#9CA3AF", marginTop: 5 }}>
                      {value}
                    </Text>
                  )}
                />
                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <View style={styles.subtotalContainer}>
            <Text style={{ color: "#9CA3AF" }}>SubTotal</Text>
            <CurrencyFormat
              value={basketTotal.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"£ "}
              renderText={(value) => (
                <Text style={{ color: "#9CA3AF" }}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.subtotalContainer}>
            <Text style={{ color: "#9CA3AF" }}>Delivery Fee</Text>
            <CurrencyFormat
              value={(5.99).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"£ "}
              renderText={(value) => (
                <Text style={{ color: "#9CA3AF" }}>{value}</Text>
              )}
            />
          </View>
          <View style={styles.subtotalContainer}>
            <Text style={{ color: "#9CA3AF" }}>Order Total</Text>
            <CurrencyFormat
              value={(5.99 + basketTotal).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"£ "}
              renderText={(value) => (
                <Text style={{ color: "#000", fontWeight: "bold" }}>
                  {value}
                </Text>
              )}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigation.navigate("PreparingOrderScreen")}
          style={styles.placeOrderButton}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#00ccbb",
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  restaurantText: {
    color: "#9CA3AF",
    marginLeft: 10,
  },
  closeButton: {
    position: "absolute",
    top: 3,
    right: 5,
    backgroundColor: "#FFF",
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    marginBottom: 5,
  },
  deliveryText: {
    flex: 1,
    textAlign: "center",
  },
  changeText: {
    color: "#00ccbb",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  itemCountText: {
    color: "#00ccbb",
    marginRight: 10,
  },
  itemImage: { width: 60, height: 60, borderRadius: 999, marginRight: 10 },
  removeText: {
    color: "#00ccbb",
    fontSize: 14,
    marginLeft: 10,
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  placeOrderButton: {
    borderRadius: 10,
    backgroundColor: "#00ccbb",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  placeOrderText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },
});

export default BasketScreen;
