import React, { useLayoutEffect, useEffect } from "react";
import { urlFor } from "../../sanity";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import DishRow from "../../components/dishRow/DishRow";
import BasketIcon from "../../components/basketIcon/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../../redux/features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
      id,
      imgUrl,
      rating,
      title,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        rating,
        title,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      }),
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView style={styles.container}>
        <View>
          <Image source={{ uri: urlFor(imgUrl).url() }} style={styles.image} />

          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backButton}
          >
            <Icons.ArrowLeftIcon size={20} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "#FFF" }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.ratingGenreContainer}>
              <View style={styles.ratingView}>
                <Icons.StarIcon size={20} color="green" opacity={0.5} />
                <Text style={styles.ratingGenreText}>
                  <Text style={{ color: "green" }}>{rating}</Text> . {genre}
                </Text>
              </View>
              <View style={styles.ratingView}>
                <Icons.LocationMarkerIcon
                  size={20}
                  color="gray"
                  opacity={0.4}
                />
                <Text style={styles.ratingGenreText}>{address}</Text>
              </View>
            </View>

            <Text style={styles.descriptionText}>{short_description}</Text>
          </View>

          <TouchableOpacity style={styles.allergyContainer}>
            <Icons.QuestionMarkCircleIcon
              color="gray"
              size={20}
              opacity={0.6}
            />
            <Text style={styles.allergyText}>Have a food allergy?</Text>
            <Icons.ChevronRightIcon size={20} color="#00ccbb" />
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 180 }}>
          <Text style={styles.menu}>Menu</Text>

          {/* Dishes */}
          {dishes.map((dish) => (
            <DishRow
              key={dish?._id}
              id={dish?._id}
              name={dish?.name}
              description={dish?.short_description}
              price={dish?.price}
              image={dish?.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#D1D5DB",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 34,
    left: 10,
    padding: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ratingGenreContainer: {
    flexDirection: "column",
    marginVertical: 8,
  },
  ratingView: { flexDirection: "row", alignItems: "center", marginRight: 8 },
  ratingGenreText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 5,
  },
  menu: {
    paddingTop: 12,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  descriptionText: {
    color: "#9CA3AF",
    marginBottom: 16,
  },
  allergyContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  allergyText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
});

export default RestaurantScreen;
