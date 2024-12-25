import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from './footer';
import MostRead from './homeComponent/mostread';
import LatestNews from './homeComponent/latestnews';
import Search from './homeComponent/search';

const Home = () => {
  const navigation = useNavigation();
  const [latestNews, setLatestNews] = useState([]);
  const [mostRead, setMostRead] = useState([]);
  const [headerNews, setHeaderNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // New state for refreshing

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const fetchNewsData = async category => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&pageSize=20&apiKey=6496881ae99b4ff7ba87748cf02b695f`;
    
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const result = await response.json();
      
      // Filter data
      const allArticles = result.articles.filter(
        article => article.title && article.description && article.urlToImage,
      );

      const sortedByDate = [...allArticles].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
      );
      setHeaderNews(sortedByDate.slice(0, 5));

      const sortedByPopularity = [...allArticles].sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0),
      );
      setMostRead(sortedByPopularity.slice(0, 7));

      setLatestNews(sortedByDate);
    } catch (error) {
      console.error('Failed to fetch news data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing after data is fetched
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNewsData(selectedCategory);
  };

  useEffect(() => {
    fetchNewsData(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (headerNews.length > 0) {
        const nextIndex =
          currentIndex + 1 >= headerNews.length ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (flatListRef.current && nextIndex < headerNews.length) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, headerNews, selectedCategory]);

  const renderHeaderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ArticleDetail', { article: item })}
      style={styles.headerItemContainer}>
      <Image
        source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }}
        style={styles.headerImage}
      />
      <Text style={styles.headerTitle}>
        {item.title.split(' ').slice(0, 10).join(' ')}
      </Text>
      <Text style={styles.headerSubtitle}>
        {item.description.split(' ').slice(0, 20).join(' ')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0864ED" />
          <Text style={styles.loadingText}>Loading news...</Text>
        </View>
      ) : (
        <FlatList
          data={[]}
          renderItem={null}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              <Search />

              {/* Header Section */}
              {headerNews.length > 0 && (
                <View style={styles.carouselContainer}>
                  <Animated.FlatList
                    ref={flatListRef}
                    data={headerNews}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderHeaderItem}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                      { useNativeDriver: false },
                    )}
                    getItemLayout={(data, index) => ({
                      length: Dimensions.get('window').width,
                      offset: Dimensions.get('window').width * index,
                      index,
                    })}
                    onScrollToIndexFailed={(info) => {
                      console.warn('Scroll to index failed:', info);
                      flatListRef.current?.scrollToOffset({
                        offset: info.averageItemLength * info.index,
                        animated: true,
                      });
                    }}
                  />
                </View>
              )}

              <View style={styles.topCategorySection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>TOP CATEGORY</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                    <Text style={styles.viewAllText}>View all ➜</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={[
                    {
                      id: '1',
                      name: 'All',
                      icon: require('../source/assets/img/category/all.png'),
                    },
                    {
                      id: '2',
                      name: 'Sports',
                      icon: require('../source/assets/img/category/sports.png'),
                    },
                    {
                      id: '3',
                      name: 'Business',
                      icon: require('../source/assets/img/category/business.png'),
                    },
                  ]}
                  horizontal
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        if (item.name === 'All') {
                          navigation.navigate('AllNews');
                        } else {
                          setSelectedCategory(item.name.toLowerCase());
                        }
                      }}>
                      <View style={styles.categoryCard}>
                        <Image source={item.icon} style={styles.categoryIcon} />
                        <Text style={styles.categoryText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </>
          }
          ListFooterComponent={
            <>
              <MostRead articles={mostRead} />
              <LatestNews articles={latestNews} />
            </>
          }
          onRefresh={onRefresh}
          refreshing={refreshing}  // Apply refreshing state
          contentContainerStyle={{ paddingBottom: 70 }}
        />
      )}

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // =================================================================== Loading ===================================================================
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#191F33',
    marginTop: 10,
    fontFamily: 'Nunito-Regular',
  },

  // =================================================================== Header ===================================================================
  headerItemContainer: {
    width: Dimensions.get('window').width,
    borderBottomColor: '#767E94',
    borderBottomWidth: 0.5,
    fontFamily: 'Nunito-Regular',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  headerTitle: {
    fontSize: 18,
    marginVertical: 8,
    color: '#191F33',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#767E94',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  carouselContainer: {
    marginBottom: 20,
  },

  // =================================================================== Category ===================================================================
  topCategorySection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#191F33',
    fontFamily: 'Nunito-SemiBold',
  },
  viewAllText: {
    color: '#0864ED',
    marginTop: 4,
    fontFamily: 'Nunito-SemiBold',
  },
  categoryCard: {
    backgroundColor: '#f0f0f0',
    width: 179,
    height: 92,
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  categoryIcon: {
    width: 24,
    height: 24,
  },
  categoryText: {
    fontSize: 14,
    marginTop: 12,
    fontFamily: 'Nunito-Regular',
    color: '#191F33',
  },
});

export default Home;
