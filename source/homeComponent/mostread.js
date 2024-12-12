import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MostRead = () => {
  const [articles, setArticles] = useState([
    {
        id: '1',
        title: 'Proin vitae suscipit nisi coba aj sebelum kehabisan',
        subtitle: 'Mauris odio nisi, posuere ac viverra eu, molestie sed sapien. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Proin vitae suscipit nisi, sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Mauris odio nisi, posuere ac viverra eu, molestie sed sapien.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '2',
        title: 'Cras tempor rutrum sem a a a a a a a a a a a a 1 1 1 1',
        subtitle: 'Sit amet congue, malesuada fames ac turpis egestas. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cras tempor rutrum sem, sit amet congue, malesuada fames ac turpis egestas. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '3',
        title: 'Aenean et enim quis nulla',
        subtitle: 'Interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Aenean et enim quis nulla, interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '4',
        title: 'Proin vitae suscipit nisi',
        subtitle: 'Mauris odio nisi, posuere ac viverra eu, molestie sed sapien. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Proin vitae suscipit nisi, sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Mauris odio nisi, posuere ac viverra eu, molestie sed sapien.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '5',
        title: 'Cras tempor rutrum sem',
        subtitle: 'Sit amet congue, malesuada fames ac turpis egestas. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Cras tempor rutrum sem, sit amet congue, malesuada fames ac turpis egestas. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '6',
        title: 'Aenean et enim quis nulla',
        subtitle: 'Interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Aenean et enim quis nulla, interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '7',
        title: 'Aenean et enim quis nulla 1',
        subtitle: 'Interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Aenean et enim quis nulla, interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '8',
        title: 'Aenean et enim quis nulla 2 ',
        subtitle: 'Interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Aenean et enim quis nulla, interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: '9',
        title: 'Aenean et enim quis nulla 3',
        subtitle: 'Interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Aenean et enim quis nulla, interdum posuere class aptent taciti sociosqu ad. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.',
        image: 'https://via.placeholder.com/150',
      },
  ]);

  const [displayedArticles, setDisplayedArticles] = useState(articles.slice(0, 4));

  const loadMoreArticles = () => {
    const newArticles = articles.slice(displayedArticles.length, Math.min(displayedArticles.length + 4, articles.length));
    setDisplayedArticles([...displayedArticles, ...newArticles]);
  };

  const renderArticle = ({ item, index }) => {
    const isFirstItem = index === 0;
    const title = isFirstItem ? item.title.split(' ').slice(0, 15).join(' ') : item.title.split(' ').slice(0, 10).join(' ');
    const subtitle = isFirstItem ? item.subtitle.split(' ').slice(0, 20).join(' ') : item.subtitle.split(' ').slice(0, 6).join(' ');
  
    return (
      <View style={[isFirstItem ? styles.firstArticleCard : styles.articleCard]}>
        {isFirstItem ? (
          <View>
            <Image source={{ uri: item.image }} style={styles.firstArticleImage} />
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
          <Image source={{ uri: item.image }} style={styles.articleImage} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.mostReadSection}>
      <Text style={styles.sectionTitle}>Most Read</Text>
      <FlatList
        data={displayedArticles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
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