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
import SearchPage from './homeComponent/searchpage';

const AllNews1 = ({route}) => {
  const [articles, setArticles] = useState(route.params.articles || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.refresh) {
      // Jika ada data baru setelah pencarian, update articles
      setArticles(route.params.articles);
    }
  }, [route.params?.articles]);  
  
  useEffect(() => {
    // Jika perlu, Anda bisa mengubah logika untuk mengambil lebih banyak artikel.
  }, [page]);

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
      
      <FlatList
        data={articles}
        ListHeaderComponent={<SearchPage />}
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
              <Text style={styles.articleTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.articleDescription} numberOfLines={2}>
                {item.description}
              </Text>
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

export default AllNews1;
