import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AllNews = ({ route }) => {
    const navigation = useNavigation();
  const { articles } = route.params; // Terima data artikel dari navigasi

  const renderArticle = ({ item }) => (
    <TouchableOpacity
    onPress={() => navigation.navigate('ArticleDetail', { article: item })} // Navigasi ke halaman detail
    style={styles.articleCard}
  >
      <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.articleDescription} numberOfLines={2}>{item.description}</Text>
      </View>
      </TouchableOpacity>
  );

  return (
    <View style={styles.allNewsSection}>
      <Text style={styles.sectionTitle}>All News</Text>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  articleCard: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
  articleContent: {
    padding: 8,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  articleDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default AllNews;