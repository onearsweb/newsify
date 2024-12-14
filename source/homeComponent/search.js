import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Search = ({ articles }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };



  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={require('../assets/img/search/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#767E94"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#DADDE5',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      width: 309,
      height: 48,
      alignSelf: 'center',
    },
    searchIcon: {
      width: 22,
      height: 22,
      marginRight: 8,
      tintColor: '#0864ED',
    },
    searchInput: {
      flex: 1,
      height: '100%',
      fontSize: 16,
      fontFamily: 'Inter_18pt-Regular',
      color: '#767E94',
    },
  });
  
  export default Search;
