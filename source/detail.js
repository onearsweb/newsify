import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const ArticleDetail = ({ route }) => {
  const { article } = route.params;

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  // Hitung waktu baca berdasarkan jumlah kata dalam konten
  const calculateReadTime = (text) => {
    if (!text) return 0; // Jika tidak ada teks, waktu baca adalah 0 menit
    const words = text.split(/\s+/).length; // Hitung jumlah kata
    const readTime = Math.ceil(words / 200); // Asumsikan kecepatan baca 200 kata per menit
    return readTime;
  };

  const readTime = calculateReadTime(article.content); // Hitung waktu baca untuk konten artikel

  // Foto profil default atau acak
  const profileImage =
    article.authorImage || `https://i.pravatar.cc/150?u=${article.author}`;

  return (
    <ScrollView style={styles.container}>
      {/* Gambar Header */}
      <Image
        source={{ uri: article.urlToImage || 'https://via.placeholder.com/200' }}
        style={styles.articleImage}
      />

      {/* Konten Artikel */}
      <View style={styles.content}>
        {/* Judul */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Informasi Penulis */}
        <View style={styles.authorContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.authorImage}
          />
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

        {/* Garis Pembatas */}
        <View style={styles.divider} />

        {/* Deskripsi */}
        {article.description && (
          <Text style={styles.description}>{article.description}</Text>
        )}

        {/* Isi Artikel */}
        <Text style={styles.body}>
          {article.content
            ? article.content.replace(/\[\+\d+ chars\]/, '')
            : 'No additional content available.'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  articleImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Membuat gambar berbentuk lingkaran
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  authorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#555',
  },
  readTimeText: {
    fontSize: 14,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 24,
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
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
