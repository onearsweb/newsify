import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LatestNews = ({ articles }) => {
  const navigation = useNavigation();

  // Batasi hanya 6 artikel
  const limitedArticles = articles.slice(0, 6);

  return (
    <View style={styles.latestNewsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>LATEST NEWS</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllNews', { articles })}>
          <Text style={styles.viewAllText}>View all ➜</Text>
        </TouchableOpacity>
      </View>

      {limitedArticles.length === 0 ? (
        <Text style={styles.emptyMessage}>No latest news available.</Text>
      ) : (
        <FlatList
          data={limitedArticles} // Gunakan limitedArticles untuk membatasi jumlah artikel
          renderItem={({ item }) => {
            const title = item.title.split(' ').slice(0, 10).join(' ');
            const description = (item.description || '').split(' ').slice(0, 7).join(' ');

            return (
              <TouchableOpacity onPress={() => navigation.navigate('ArticleDetail', { article: item })} style={styles.articleCard}>
                <Image
                  source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }}
                  style={styles.articleImage}
                />
                <View style={styles.articleTextContainer}>
                  <Text style={styles.articleTitle} numberOfLines={2}>
                    {title || 'No title available'}
                  </Text>
                  <Text style={styles.articleSubtitle} numberOfLines={3}>
                    {description || 'No description available'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  latestNewsSection: {
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
  articleCard: {
    flexDirection: 'row-reverse',
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'space-between',
    width: 378,
    height: 100,
  },
  articleImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  articleTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  articleTitle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#191F33', 
  },
  articleSubtitle: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 12,
    fontFamily: 'Nunito-Reguler',
    color: '#767E94',
  },
});

export default LatestNews;