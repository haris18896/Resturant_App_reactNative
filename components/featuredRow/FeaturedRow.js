import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import RestaurantCard from '../restaurantCard/RestaurantCard';
import sanityClient from '../../sanity';
import { useNavigation } from '@react-navigation/native';
import * as Icons from 'react-native-heroicons/solid';

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: '#888',
    paddingHorizontal: 4,
  },
  scrollView: {
    paddingTop: 4,
    paddingHorizontal: 15,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const FeaturedRow = ({ id, title, description }) => {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    sanityClient
      .fetch(
        `
        *[_type == 'featured' && _id == '${id}'] {
          ...,
          restaurant[]->{
            ...,
            dishes[]->,
            type-> {
              name
            }
          }
        }[0]
    `,
        { id } // params
      )
      .then(data => {
        setRestaurants(data?.restaurant);
        setLoading(false);
      });
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icons.ArrowRightIcon size={20} color='#00ccbb' />
      </View>
      <Text style={styles.description}>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
        {/* Restaurant Card.... */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#00ccbb' />
          </View>
        ) : (
          restaurants?.map(restaurant => (
            <RestaurantCard
              key={restaurant?._id}
              id={restaurant?._id}
              imgUrl={restaurant?.image}
              address={restaurant?.address}
              title={restaurant?.name}
              rating={restaurant?.rating}
              genre={restaurant?.type?.name}
              short_description={restaurant?.short_description}
              dishes={restaurant?.dishes}
              long={restaurant?.long}
              lat={restaurant?.lat}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
