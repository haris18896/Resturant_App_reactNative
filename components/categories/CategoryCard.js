import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={styles.categoryContainer}>
      <Image source={{ uri: imgUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginRight: 10,
    position: "relative",
  },
  categoryImage: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  categoryText: {
    position: "absolute",
    bottom: 10,
    left: 5,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CategoryCard;
