import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Footer from './footer';

const AllNews = ({route}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const {category} = route.params;

  const fetchNewsData = async (category, page) => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&pageSize=20&apiKey=6496881ae99b4ff7ba87748cf02b695f`;

    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const result = await response.json();

      const allArticles = result.articles.filter(
        article => article.title && article.description && article.urlToImage,
      );

      const updatedArticles = [...articles, ...allArticles];

      const sortedArticles = updatedArticles.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
      );

      setArticles(sortedArticles);
      setHasMore(allArticles.length > 0);
    } catch (error) {
      console.error('Failed to fetch news data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData(category, page);
  }, [category, page]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="large" color="#0864ED" />
        </View>
      );
    }
    if (!hasMore) {
      return <Text style={styles.noMoreText}>No more news available</Text>;
    }
    return null;
  };

  return (
    <View style={styles.allNewsSection}>
      <Text style={styles.sectionTitle}>News</Text>
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ArticleDetail', {article: item})
            }
            style={styles.articleCard}>
            <Image
              source={{uri: item.urlToImage}}
              style={styles.articleImage}
            />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.articleDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.categoryContainer}>
                <Text style={styles.articleCategory}>
                  Category: {category || 'General'}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ArticleDetail', {article: item})
                }>
                <Text style={styles.readMoreText}>Read More</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.scrollContainer}
      />
      <Footer />
    </View>
  );
};

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
  articleCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    overflow: 'hidden',
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  articleContent: {
    padding: 17,
    width: '107%',
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
    textAlign: 'justify',
    marginBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 0,
  },
  articleCategory: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
    paddingTop: 10,
    paddingRight: 10,
    fontWeight: '600',
  },
  readMoreText: {
    fontSize: 13,
    color: '#0864ED',
    fontWeight: 'semibold',
    paddingTop: 10,
    paddingLeft: 3,
  },
  footerLoader: {
    paddingVertical: 20,
  },
  noMoreText: {
    paddingVertical: 20,
    textAlign: 'center',
    color: '#777',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
});

export default AllNews;
