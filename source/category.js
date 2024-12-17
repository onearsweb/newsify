import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Category = () => {
  const navigation = useNavigation();

  // Daftar kategori beserta icon
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>All Category</Text>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('AllNews', { category: item.name.toLowerCase() })}
          >
            <Image source={item.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryCard: {
    backgroundColor: '#f0f8ff',
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default Category;
