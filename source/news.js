import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from './footer';

const AllNews = () => {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Daftar kategori berita 
  const categories = [
    { name: 'sports', icon: require('../source/assets/img/category/sports.png') },
    { name: 'business', icon: require('../source/assets/img/category/business.png') },
    { name: 'technology', icon: require('../source/assets/img/category/technology.png') },
    { name: 'entertainment', icon: require('../source/assets/img/category/entertainment.png') },
    { name: 'health', icon: require('../source/assets/img/category/health.png') },
    { name: 'science', icon: require('../source/assets/img/category/science.png') },
    { name: 'general', icon: require('../source/assets/img/category/general.png') },
  ];

  // Fungsi untuk mengambil data dari API
  const fetchNews = async () => {
    const apiKey = '6496881ae99b4ff7ba87748cf02b695f';
    const baseUrl = 'https://newsapi.org/v2/everything';
    const pageSize = 5; // Jumlah berita per kategori

    try {
      setLoading(true);

      // Promise.all untuk mengambil data dari semua kategori secara bersamaan
      const responses = await Promise.all(
        categories.map(category =>
          fetch(
            `${baseUrl}?q=${category.name}&pageSize=${pageSize}&apiKey=${apiKey}`,
          ),
        ),
      );

      // Parsing hasil respons menjadi JSON
      const data = await Promise.all(
        responses.map(async (response) => {
          if (!response.ok) {
            console.error(`Error in fetching category: ${response.statusText}`);
            return { articles: [] }; // Kembalikan data kosong jika error
          }
          return response.json();
        }),
      );
      

      // Gabungkan semua artikel dari kategori yang berbeda
      const combinedArticles = data.flatMap((result, index) =>
        (result.articles || []).filter(
          article => article.title && article.description && article.urlToImage,
        ).map(article => ({
          ...article,
          category: categories[index],
        })),
      );
      
      // Simpan artikel ke dalam state
      setArticles(combinedArticles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Ambil data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    fetchNews();
  }, []);

  // Fungsi untuk merender setiap artikel dalam daftar
  const renderArticle = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ArticleDetail', { article: item })}
      style={styles.articleCard}>
      <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.articleDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.articleCategory}>{item.category.name}</Text>
          <Image
            source={item.category.icon}
            style={styles.categoryIcon}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ArticleDetail', { article: item })}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  return (
    <View style={styles.allNewsSection}>
      <Text style={styles.sectionTitle}>News</Text>
      <View style={styles.horizontalLine} />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0864ED" />
          <Text style={styles.loadingText}>Loading news...</Text>
        </View>
      ) : (
        <FlatList
          data={articles} // Data artikel dari API
          renderItem={renderArticle}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
      <Footer />
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