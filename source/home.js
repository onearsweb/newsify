import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, Animated, FlatList, TouchableOpacity  } from 'react-native';
import Footer from './footer';

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [mostRead, setMostRead] = useState([]);
  const [headerNews, setHeaderNews] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchNewsData = async () => {
      const apiUrls = [
        "https://newsapi.org/v2/everything?q=apple&from=2024-12-10&to=2024-12-10&sortBy=popularity&apiKey=0c8cdda648d74f5aac01aadf55c159be",
        "https://newsapi.org/v2/everything?q=tesla&from=2024-11-11&sortBy=publishedAt&apiKey=0c8cdda648d74f5aac01aadf55c159be",
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0c8cdda648d74f5aac01aadf55c159be",
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0c8cdda648d74f5aac01aadf55c159be",
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=0c8cdda648d74f5aac01aadf55c159be"
      ];

      try {
        const responses = await Promise.all(apiUrls.map(url => fetch(url)));
        const results = await Promise.all(responses.map(res => res.json()));

        const allArticles = results.flatMap(result => result.articles);

        const sortedByDate = [...allArticles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setLatestNews(sortedByDate.slice(0, 5));
        setHeaderNews(sortedByDate.slice(0, 5));

        const sortedByPopularity = [...allArticles].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        setMostRead(sortedByPopularity.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch news data:', error);
      }
    };

    fetchNewsData();
  }, []);

  const renderHeaderItem = ({ item }) => (
    <View style={styles.headerItemContainer}>
      <Image 
        // source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }} 
        style={styles.headerImage} 
      />
      {/* <Text style={styles.headerTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.headerSubtitle} numberOfLines={3}>{item.description}</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        {/* Header Section with Native Carousel */}
        {headerNews.length > 0 && (
          <View style={styles.carouselContainer}>
            <Animated.FlatList
              data={headerNews}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderHeaderItem}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
            />

            {/* indikator (belum kepake) */}
            <View style={styles.indicatorContainer}>
              {headerNews.map((_, index) => {
                const scale = scrollX.interpolate({
                  inputRange: [
                    (index - 1) * Dimensions.get('window').width,
                    index * Dimensions.get('window').width,
                    (index + 1) * Dimensions.get('window').width,
                  ],
                  outputRange: [0.8, 1.2, 0.8],
                  extrapolate: 'clamp',
                });
                return <Animated.View key={index} style={[styles.indicator, { transform: [{ scale }] }]} />;
              })}
            </View>
          </View>
        )}

        {/* Top Category Section */}
        <View style={styles.topCategorySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TOP CATEGORY</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all ➜</Text>
            </TouchableOpacity>
          </View>
          <Animated.FlatList
            data={[
              { id: '1', name: 'All', icon: require('../source/assets/img/category/all.png') },
              { id: '2', name: 'Apple', icon: require('../source/assets/img/category/apple.png') },
              { id: '3', name: 'Tesla', icon: require('../source/assets/img/category/tesla.png') },
            ]}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.categoryCard}>
                <Image source={item.icon} style={styles.categoryIcon} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
            )}
          />
        </View>



        {/* Most Read Section */}
        {/* <View style={styles.mostReadSection}>
          <Text style={styles.sectionTitle}>Most Read</Text>
          {mostRead.map((article, index) => (
            <View key={index} style={styles.articleCard}>
              <Image 
                source={{ uri: article.urlToImage }} 
                style={styles.articleImage} 
              />
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleSubtitle}>{article.description}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>LOAD MORE</Text>
          </TouchableOpacity>
        </View> */}

        {/* Latest News Section */}
        {/* <View style={styles.latestNewsSection}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          {latestNews.map((article, index) => (
            <View key={index} style={styles.articleCard}>
              <Image 
                source={{ uri: article.urlToImage }} 
                style={styles.articleImage} 
              />
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleSubtitle}>{article.description}</Text>
              </View>
            </View>
          ))}
        </View> */}
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // =================================================================== Header ===================================================================
  contentContainer: {
    flex: 1,
    marginBottom: 60,
  },

  headerItemContainer: {
    width: Dimensions.get('window').width,
    borderBottomColor: '#767E94',
    borderBottomWidth: 1,
    fontFamily: 'Nunito-Regular'
  },

  headerImage: {
    width: '100%',
    height: 200,
  },

  headerTitle: {
    fontSize: 18,
    marginVertical: 8,
    color: '#191F33',
    paddingLeft: 20, 
    paddingRight: 20
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
  // indicatorContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginTop: 8,
  // },
  // indicator: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: '#007bff',
  //   marginHorizontal: 4,
  // },

  // =================================================================== Category ===================================================================
  topCategorySection: {
    padding: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold'
  },

  viewAllText: {
    color: '#007bff',
    marginTop: 4,
    fontFamily: 'Nunito-Regular'
  },

  categoryCard: {
    backgroundColor: '#f0f0f0',
    marginTop: 16,
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
    fontFamily: 'Nunito-Regular'
  },
  

  // Artikel 
  mostReadSection: {
    padding: 16,
  },
  articleCard: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  articleTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  articleSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  loadMoreButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  latestNewsSection: {
    padding: 16,
  },
});

export default Home;
