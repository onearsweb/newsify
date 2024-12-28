import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AllNews = ({ route }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { category } = route.params; 

  const fetchNewsData = async category => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&pageSize=20&apiKey=6496881ae99b4ff7ba87748cf02b695f`;

    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const result = await response.json();

      const allArticles = result.articles.filter(
        article => article.title && article.description && article.urlToImage
      );

      const sortedByDate = [...allArticles].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
      );

      setArticles(sortedByDate); 
    } catch (error) {
      console.error('Failed to fetch news data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData(category);
  }, [category]);

  return (
    <View style={styles.allNewsSection}>
      <Text style={styles.sectionTitle}>All News</Text>
      {loading ? (
        <Text style={styles.emptyMessage}>Loading news...</Text>
      ) : (
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ArticleDetail', { article: item })}
              style={styles.articleCard}
            >
              <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  allNewsSection: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#191F33',
  },

  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#B7B7B7',
    marginVertical: 4,
  },

  articleCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // Shadow Android
    elevation: 5,
  },

  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  articleContent: {
    padding: 8,
  },

  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },

  articleDescription: {
    fontSize: 14,
    color: '#555',
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    marginTop: 8,
  },

  categoryIcon: {
    width: 12,
    height:12,
    resizeMode: 'contain',
    marginLeft: 5, 
  },

  articleCategory: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
  },

  readMoreText: {
    fontSize: 13,
    color: '#0864ED',
    marginTop: 5,
    fontWeight: 'semibold',
  },

  contentContainer: {
    paddingTop: 10,
    paddingBottom: 50,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#191F33',
  },
});

export default AllNews;
