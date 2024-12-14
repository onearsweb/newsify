import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MostRead = ({ articles }) => {
  const navigation = useNavigation();
  
  const [displayedArticles, setDisplayedArticles] = useState(articles.slice(0, 4));

  useEffect(() => {
    setDisplayedArticles(articles.slice(0, 4)); // Reset saat prop berubah
  }, [articles]);

  const loadMoreArticles = () => {
    const newArticles = articles.slice(
      displayedArticles.length,
      Math.min(displayedArticles.length + 4, articles.length)
    );
    setDisplayedArticles([...displayedArticles, ...newArticles]);
  };

  const renderArticle = ({ item, index }) => {
    const isFirstItem = index === 0;
    const title = isFirstItem
      ? item.title.split(' ').slice(0, 15).join(' ')
      : item.title.split(' ').slice(0, 10).join(' ');
    const subtitle = isFirstItem
      ? (item.description || '').split(' ').slice(0, 30).join(' ')
      : (item.description || '').split(' ').slice(0, 7).join(' ');

    return (
      <TouchableOpacity style={[isFirstItem ? styles.firstArticleCard : styles.articleCard]}  onPress={() => navigation.navigate('ArticleDetail', { article: item })}>
        {isFirstItem ? (
          <View>
            <Image source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }} style={styles.firstArticleImage} />
            <View style={styles.firstArticleTextContainer}>
              <Text style={styles.firstArticleTitle}>{title}</Text>
              <Text style={styles.firstArticleSubtitle}>{subtitle}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.articleTextContainer}>
            <Text style={styles.articleTitle}>{title}</Text>
            <Text style={styles.articleSubtitle}>{subtitle}</Text>
          </View>
        )}
        {!isFirstItem && (
          <Image source={{ uri: item.urlToImage || 'https://via.placeholder.com/150' }} style={styles.articleImage} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mostReadSection}>
      <Text style={styles.sectionTitle}>MOST READ</Text>
      <FlatList
        data={displayedArticles}
        renderItem={renderArticle}
        keyExtractor={(item, index) => index.toString()}
      />
      {displayedArticles.length < articles.length && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreArticles}>
          <Text style={styles.loadMoreText}>LOAD MORE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    mostReadSection: {
      padding: 16,
    },
    sectionTitle: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 16,
      color: '#191F33'
    },
    articleCard: {
      flexDirection: 'row',
      marginVertical: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      justifyContent: 'space-between',
      width: 378,
      height: 100,
    },
    firstArticleCard: {
      width: 378,
      height: 420,
      marginBottom: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      marginTop: 20
    },
    firstArticleImage: {
      width: 378,
      height: 200,
    },
    firstArticleTextContainer: {
      padding: 20,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    firstArticleTitle: {
      fontFamily: 'Nunito-Regular',
      color: '#191F33',
      fontSize: 16,
      marginBottom: 8,
    },
    firstArticleSubtitle: {
      fontSize: 14,
      fontFamily: 'Nunito-Reguler',
      color: '#767E94',
      marginBottom: 20,
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
    loadMoreButton: {
      width: 374,
      height: 48,
      marginTop: 16,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#e6f0fd',
    },
    loadMoreText: {
      fontFamily: 'Inter_18pt-SemiBold',
      textAlign: 'center',
      color: '#0864ED',
    },
});

export default MostRead;