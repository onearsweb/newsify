import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { id: '1', name: 'All', icon: require('../source/assets/img/category/all.png'), color: '#DFFFD6' },
  { id: '2', name: 'Sports', icon: require('../source/assets/img/category/sports.png'), color: '#C6F9FF' },
  { id: '3', name: 'Business', icon: require('../source/assets/img/category/business.png'), color: '#E9E7FD' },
  { id: '4', name: 'Technology', icon: require('../source/assets/img/category/technology.png'), color: '#FFF2CF' },
  { id: '5', name: 'Entertainment', icon: require('../source/assets/img/category/entertainment.png'), color: '#FFE5E5' },
  { id: '6', name: 'Health', icon: require('../source/assets/img/category/health.png'), color: '#FFE0F7' },
  { id: '7', name: 'Science', icon: require('../source/assets/img/category/science.png'), color: '#E4E7FF' },
  { id: '8', name: 'General', icon: require('../source/assets/img/category/general.png'), color: '#DFF3FF' },
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
            style={[styles.card, {backgroundColor: item.color}]}
            onPress={() => {
              if (item.name === 'All') {
                navigation.navigate('AllNews', { category: item.name.toLowerCase() }, {  category: 'all' });
              } else if (item.name === 'Sports') {
                navigation.navigate('AllNews',  { category: item.name.toLowerCase() }, {  category: 'sports' });
              } else if (item.name === 'Business') {
                navigation.navigate('AllNews',  { category: item.name.toLowerCase() }, {  category: 'business' });
              } else if (item.name === 'Technology') {
                navigation.navigate('AllNews',  { category: item.name.toLowerCase() }, {  category: 'technology' });
              } else if (item.name === 'Entertainment') {
                navigation.navigate('AllNews',  { category: item.name.toLowerCase() }, {  category: 'entertainment' });
              } else if (item.name === 'Health') {
                navigation.navigate('AllNews',  { category: item.name.toLowerCase() }, {  category: 'health' });
              } else if (item.name === 'Science') {
                navigation.navigate('AllNews',  { category: item.name.toLowerCase() }, {  category: 'science' });
              } else if (item.name === 'General') {
                navigation.navigate('AllNews',  { category: item.name.toLowerCase() }, {  category: 'general' });
              } else {
                setSelectedCategory(item.name.toLowerCase());
              }
            }}
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