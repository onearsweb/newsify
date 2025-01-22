import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';

const ArticleDetail = ({ route, navigation }) => {
  const { article } = route.params;

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  const calculateReadTime = (text) => {
    if (!text) return 0;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const readTime = calculateReadTime(article.content);

  const profileImage =
    article.authorImage || `https://i.pravatar.cc/150?u=${article.author}`;

  return (
    <View style={styles.container}>
      {/* Header dengan Tombol Back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Gambar Artikel */}
        <Image
          source={{ uri: article.urlToImage || 'https://via.placeholder.com/200' }}
          style={styles.articleImage}
        />

        {/* Judul Artikel */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Informasi Penulis */}
        <View style={styles.authorContainer}>
          <Image source={{ uri: profileImage }} style={styles.authorImage} />
          <View>
            <Text style={styles.authorName}>
              {article.author || 'Unknown Author'}
            </Text>
            <View style={styles.authorDetails}>
              <Text style={styles.dateText}>
                {article.publishedAt
                  ? new Date(article.publishedAt).toDateString()
                  : 'Unknown Date'}
              </Text>
              <Text style={styles.readTimeText}> • {readTime} mins read</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Deskripsi Artikel */}
        {article.description && (
          <Text style={styles.description}>{article.description}</Text>
        )}

        {/* Konten Artikel */}
        <Text style={styles.body}>
          {article.content
            ? article.content.replace(/\[\+\d+ chars\]/, '')
            : 'No additional content available.'}
        </Text>
      </ScrollView>

      {/* Tombol Baca Selengkapnya */}
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => Linking.openURL(article.url)}>
        <Text style={styles.readMoreText}>Baca Selengkapnya</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 30, // Ukuran panah lebih besar
    color: '#007BFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    lineHeight: 28,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  authorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  readTimeText: {
    fontSize: 14,
    color: '#888',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  description: {
    fontSize: 16, // Sama dengan body
    color: '#444',
    textAlign: 'justify',
    lineHeight: 24,
    marginBottom: 16,
  },
  body: {
    fontSize: 16, // Sama dengan deskripsi
    lineHeight: 22,
    color: '#666',
    textAlign: 'justify',
  },
  readMoreButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  readMoreText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ArticleDetail;
