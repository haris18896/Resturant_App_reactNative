import React from "react";
import { useSelector } from "react-redux";
import * as Icons from "react-native-heroicons/solid";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../../redux/features/restaurantSlice";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icons.XCircleIcon color="#FFF" size={30} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Order Help</Text>
        </View>

        <View style={styles.cardContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontSize: 16, color: "#9CA3AF" }}>
                Estimated Arrival
              </Text>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                45-55 Minutes
              </Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              style={{ width: 100, height: 100 }}
            />
          </View>

          <Progress.Bar size={30} color="#00ccbb" indeterminate={true} />

          <Text style={{ marginTop: 10, color: "#9CA3AF" }}>
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        style={styles.map}
        region={{
          latitude: restaurant?.ltd,
          longitude: restaurant?.long,
          latitudeDelta: 0.0922, // zoom scale
          longitudeDelta: 0.0421,
        }}
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant?.lat,
            longitude: restaurant?.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          pinColor="#00ccbb"
        />
      </MapView>

      <SafeAreaView style={styles.riderContainer}>
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          style={styles.riderImage}
        />
        <View style={styles.riderDetails}>
          <Text style={{ fontSize: 18 }}>Haris Ahmad Khan</Text>
          <Text style={{ color: "#9CA3AF" }}>Your Rider</Text>
        </View>
        <Text style={styles.callButton}>Call</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ccbb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    zIndex: 50,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#FFF",
  },
  cardContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    marginVertical: 2,
    borderRadius: 10,
    padding: 10,
    zIndex: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    flex: 1,
    marginTop: 10,
  },
  riderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 120,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 10,
  },
  riderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  callButton: {
    color: "#00ccbb",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default DeliveryScreen;
