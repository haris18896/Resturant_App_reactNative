import { View, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../../sanity";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    sanityClient.fetch(`*[_type == 'category']`).then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
    >
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00ccbb" />
        </View>
      ) : (
        categories?.map((category) => (
          <CategoryCard
            key={category?._id}
            imgUrl={urlFor(category?.image).width(200).url()}
            title={category?.name}
          />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Categories;
