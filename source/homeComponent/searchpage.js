import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const SearchPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {articles} = route.params; // Retrieve 'articles' passed from previous screen
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false); // Track if a search was attempted
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    // Filter articles based on the search query
    if (articles && searchQuery.length > 0) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]); // Re-run whenever searchQuery or articles changes

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleSubmit = () => {
    if (searchQuery.trim()) {
      setSearchAttempted(true); // Mark that search has been attempted
      setIsLoading(true); // Show loading spinner
      fetchNewsData(searchQuery);
    }
  };

  const fetchNewsData = async category => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&pageSize=15&apiKey=0c8cdda648d74f5aac01aadf55c159be`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Filter articles to ensure they have the necessary fields
      const allArticles = result.articles.filter(
        article => article.title && article.description && article.urlToImage,
      );

      if (allArticles.length > 0) {
        // If articles exist, navigate to AllNews page and pass the articles
        navigation.navigate('AllNews', {articles: allArticles});
      } else {
        // Show message if no articles found
        Alert.alert(
          'No results found',
          'No articles match your search criteria.',
        );
      }
    } catch (error) {
      console.error('Failed to fetch news data:', error);
      Alert.alert(
        'Error',
        'Failed to fetch news data. Please try again later.',
      );
    } finally {
      setIsLoading(false); // Hide loading spinner once the request is complete
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/img/search/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#767E94"
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit} // Trigger the search when Enter/Return is pressed
        />
      </View>

      {/* Display loading indicator while fetching data */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0864ED" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : // Display filtered articles
      searchAttempted && filteredArticles.length === 0 ? (
        <Text style={styles.noResultsText}>No articles found.</Text>
      ) : (
        <FlatList
          data={filteredArticles}
          renderItem={({item}) => (
            <View style={styles.article}>
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
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
  article: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#767E94',
    fontSize: 16,
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#767E94',
    fontSize: 16,
  },
});

export default SearchPage;
