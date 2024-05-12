import React from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as Icons from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../../sanity';

const RestaurantCard = ({ id, imgUrl, rating, title, genre, address, short_description, dishes, long, lat }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
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
        });
      }}
      style={styles.cardContainer}
    >
      <Image source={{ uri: urlFor(imgUrl).url() }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <Icons.StarIcon color='green' opacity={0.5} size={22} />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={{ color: 'gray' }}> {genre}</Text>
          </View>

          <View style={styles.locationContainer}>
            <Icons.LocationMarkerIcon color='gray' opacity={0.5} size={22} />
            <Text style={styles.locationText}>Nearby . {address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f1f1f1',
    marginRight: 15,
    borderRadius: 10,
    width: 250,
    marginVertical: 5,
  },
  image: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    padding: 10,
    paddingBottom: 20,
    flex: 1,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  ratingContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    paddingLeft: 5,
    color: 'green',
  },
  locationContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    flex: 1,
    paddingLeft: 5,
     fontSize: 14,
    color: 'gray',
  }
});

export default RestaurantCard;
