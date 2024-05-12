import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Icons from 'react-native-heroicons/outline';
import { View, Text, SafeAreaView, Image, TextInput, StyleSheet } from 'react-native';

const Header = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Header */}
        <View style={styles.profile}>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.headerTextSmall}>Deliver Now!</Text>
          <View style={styles.headerTextLarge}>
            <Text style={styles.headerTextLargeText}>Current Location</Text>
            <Icons.ChevronDownIcon size={20} color='#00CCBB' />
          </View>
        </View>

        <Icons.UserIcon size={35} color='#00ccbb' />
      </View>

      {/* Search */}
      <View style={styles.search}>
        <View style={styles.searchInput}>
          <Icons.SearchIcon color='gray' size={20} />
          <TextInput placeholder='Restaurants and Cuisines' keyboardType='default' />
        </View>
        <Icons.AdjustmentsIcon  color='#00ccbb' size={20} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 3,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: 'gray',
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  headerTextSmall: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 12,
  },
  headerTextLarge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextLargeText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderRadius: 4,
  },
  searchInput: {
    marginRight: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
  },
});

export default Header;
