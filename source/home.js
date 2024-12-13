import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions, Animated, FlatList, TouchableOpacity  } from 'react-native';
import Footer from './footer';
import MostRead from './homeComponent/mostread';
import LatestNews from './homeComponent/latestnews';

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [mostRead, setMostRead] = useState([]);
  const [headerNews, setHeaderNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // State for selected category
  const scrollX = useRef(new Animated.Value(0)).current;

  // Function to fetch news data based on selected category
  const fetchNewsData = async (category) => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${category}&pageSize=15&apiKey=0c8cdda648d74f5aac01aadf55c159be`;

    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
  
      // Validasi dan filter data
      const allArticles = result.articles.filter(article => 
        article.title && article.description && article.urlToImage
      );
  
      // Data untuk Header
      const sortedByDate = [...allArticles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      setHeaderNews(sortedByDate.slice(0, 5)); // Artikel terbaru untuk header
  
      // Data untuk Most Read
      const sortedByPopularity = [...allArticles].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      setMostRead(sortedByPopularity.slice(0, 7)); // Artikel terpopuler untuk Most Read
  
      // Data untuk Latest News
      setLatestNews(sortedByDate); // Semua artikel diurutkan berdasarkan tanggal
    } catch (error) {
      console.error('Failed to fetch news data:', error);
    }
  };

  useEffect(() => {
    fetchNewsData(selectedCategory); // Fetch news based on selected category
  }, [selectedCategory]); // Re-fetch data whenever selected category changes

  const renderHeaderItem = ({ item }) => (
    <View style={styles.headerItemContainer}>
      <Image 
        source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }} 
        style={styles.headerImage} 
      />
      <Text style={styles.headerTitle}>{item.title.split(' ').slice(0, 10).join(' ')}</Text>
      <Text style={styles.headerSubtitle}>{item.description.split(' ').slice(0, 20).join(' ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[]} // Karena konten utama tidak berbasis data
        renderItem={null} // Tidak diperlukan item
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <>
            {/* Header Section */}
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
              <FlatList
                data={[
                  { id: '1', name: 'All', icon: require('../source/assets/img/category/all.png') },
                  { id: '2', name: 'Sports', icon: require('../source/assets/img/category/sports.png') },
                  { id: '3', name: 'Business', icon: require('../source/assets/img/category/business.png') },
                ]}
                horizontal
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setSelectedCategory(item.name.toLowerCase())}>
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
            <LatestNews articles={latestNews}/>
          </>
        }

        contentContainerStyle={{ paddingBottom: 70 }}
      />

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
  headerItemContainer: {
    width: Dimensions.get('window').width,
    borderBottomColor: '#767E94',
    borderBottomWidth: 0.5,
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
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    color: '#191F33',
    fontFamily: 'Nunito-SemiBold'
  },
  viewAllText: {
    color: '#0864ED',
    marginTop: 4,
    fontFamily: 'Nunito-SemiBold'
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
    color: '#191F33'
  },
});

export default Home;
