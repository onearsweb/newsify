import React, { useState } from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../footer';

const SearchPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]); // Store filtered articles
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const fetchNewsData = async () => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=20&apiKey=6496881ae99b4ff7ba87748cf02b695f`;

    setIsLoading(true);
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result.articles && result.articles.length > 0) {
        // Filter articles to ensure they have the necessary fields
        const allArticles = result.articles.filter(
          article => article.title && article.description && article.urlToImage
        );

        setFilteredArticles(allArticles); // Set filtered articles
        // Navigate to AllNews1 with filtered articles
        navigation.navigate('AllNews1', { articles: allArticles, refresh: true }); // Add refresh flag
      } else {
        Alert.alert(
          'No results found',
          'No articles match your search criteria.'
        );
        setFilteredArticles([]); // Clear filtered articles
      }
    } catch (error) {
      console.error('Failed to fetch news data:', error);
      Alert.alert(
        'Error',
        'Failed to fetch news data. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchContainer}>
        <Image
          source={require('../assets/img/search/search.png')}
          style={styles.searchIcon}
        />
      {/* Search Input and Button */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#767E94"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={fetchNewsData}
      />
      {isLoading && (
        <ActivityIndicator size="large" color="#0864ED" style={styles.loading} />
      )}
      </TouchableOpacity>
      <Footer />
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
  loading: {
    marginTop: 16,
  },
});

export default SearchPage;
