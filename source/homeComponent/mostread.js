import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MostRead = () => {
  const [articles, setArticles] = useState([
    {
      id: '1',
      title: 'Proin vitae suscipit nisi',
      subtitle: 'Mauris odio nisi, posuere ac viverra eu, molestie...',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      title: 'Cras tempor rutrum sem',
      subtitle: 'Sit amet congue, malesuada fames ac turpis egestas.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      title: 'Aenean et enim quis nulla',
      subtitle: 'Interdum posuere class aptent taciti sociosqu ad.',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const loadMoreArticles = () => {
    const newArticles = [
      {
        id: Math.random().toString(),
        title: 'New Article',
        subtitle: 'This is a new article loaded.',
        image: 'https://via.placeholder.com/150',
      },
    ];
    setArticles([...articles, ...newArticles]);
  };

  const renderArticle = ({ item, index }) => {
    const isFirstItem = index === 0;
    return (
      <View style={[isFirstItem ? styles.firstArticleCard : styles.articleCard]}>
        {isFirstItem ? (
          <Image source={{ uri: item.image }} style={styles.firstArticleImage} />
        ) : (
          <Image source={{ uri: item.image }} style={styles.articleImage} />
        )}
        <View style={[isFirstItem ? styles.firstArticleTextContainer : styles.articleTextContainer]}>
          {isFirstItem ? (
            <Text style={styles.firstArticleTitle}>{item.title}</Text>
          ) : (
            <Text style={styles.articleTitle}>{item.title}</Text>
          )}
          {isFirstItem ? (
            <Text style={styles.firstArticleSubtitle}>{item.subtitle}</Text>
          ) : (
            <Text style={styles.articleSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mostReadSection}>
      <Text style={styles.sectionTitle}>Most Read</Text>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreArticles}>
        <Text style={styles.loadMoreText}>LOAD MORE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    mostReadSection: {
      padding: 16,
    },
    sectionTitle: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        color: '#191F33'
    },
    articleCard: {
      flexDirection: 'row',
      marginVertical: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
    },
    firstArticleCard: {
      marginBottom: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 20
    },
    firstArticleImage: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    firstArticleTextContainer: {
      padding: 20,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    firstArticleTitle: {
      fontFamily: 'Nunito-Bold',
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
      fontFamily: 'Nunito-Bold',
      color: '#191F33',
    },
    articleSubtitle: {
      fontSize: 12,
      fontFamily: 'Nunito-Reguler',
      color: '#767E94',
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
});

export default MostRead;