import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Categories from '../../components/categories/Categories';
import FeaturedRow from '../../components/featuredRow/FeaturedRow';
import sanityClient from '../../sanity';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [featureCategories, setFeatureCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    setLoading(true);
    sanityClient
      .fetch(
        `
    *[_type == 'featured'] {
      ...,
      restaurant[]->{
        ...,
        dishes[]->
      }
    }
    `
      )
      .then(data => {
        setFeatureCategories(data);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Categories />
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size='large' color='#00ccbb' />
          </View>
        ) : (
          featureCategories?.map(category => (
            <FeaturedRow
              key={category?._id}
              id={category?._id}
              title={category?.name}
              description={category?.short_description}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: 'gray',
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingBottom: 135,
  },
  loaderContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
