import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { id: '1', name: 'All', icon: require('../source/assets/img/category/all.png') },
  { id: '2', name: 'Sports', icon: require('../source/assets/img/category/sports.png') },
  { id: '3', name: 'Business', icon: require('../source/assets/img/category/business.png') },
  { id: '4', name: 'Technology', icon: require('../source/assets/img/category/technology.png') },
  { id: '5', name: 'Entertainment', icon: require('../source/assets/img/category/entertainment.png') },
  { id: '6', name: 'Health', icon: require('../source/assets/img/category/health.png') },
  { id: '7', name: 'Science', icon: require('../source/assets/img/category/science.png') },
  { id: '8', name: 'General', icon: require('../source/assets/img/category/general.png') },
];

const Category = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Category</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Home', { selectedCategory: item.name.toLowerCase() })}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#191F33',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#191F33',
    textAlign: 'center',
  },
});

export default Category;