import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const ArticleDetail = ({ route }) => {
  const { article } = route.params; // Data artikel diterima melalui parameter route

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Gambar Header */}
      <Image 
        source={{ uri: article.urlToImage || 'https://via.placeholder.com/200' }} 
        style={styles.articleImage} 
      />

      {/* Konten Artikel */}
      <View style={styles.content}>
        {/* Kategori */}
        <View style={styles.categoryContainer}>
          <Image 
            source={article.category?.icon} 
            style={styles.categoryIcon} 
          />
          <Text style={styles.categoryText}>{article.category?.name}</Text>
        </View>

        {/* Judul */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Informasi Penulis */}
        <View style={styles.authorContainer}>
          <Image
            source={{
              uri: article.urlToImage || 'https://via.placeholder.com/50',
            }}
            style={styles.authorImage}
          />
          <View>
            <Text style={styles.authorName}>
              {article.author || 'Unknown Author'}
            </Text>
            <Text style={styles.dateText}>
              {article.publishedAt
                ? new Date(article.publishedAt).toDateString()
                : 'Unknown Date'}{' '}
              • 8 mins read
            </Text>
          </View>
        </View>

        {/* Deskripsi */}
        {article.description && (
          <Text style={styles.description}>
            {article.description}
          </Text>
        )}

        {/* Isi Artikel */}
        <Text style={styles.body}>
          {article.content
            ? article.content.replace(/\[\+\d+ chars\]/, '') // Hapus simbol "[+chars]" jika ada
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
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row-reverse', // Atur elemen dari kanan ke kiri
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#555', // Warna abu-abu
    marginLeft: 8, // Jarak antara teks dan ikon
    fontWeight: '400', // Regular
    fontStyle: 'italic', // Teks miring
  },
  categoryIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Membuat gambar menjadi bulat
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    textAlign: 'justify', // Rata kanan-kiri
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
    textAlign: 'justify', // Rata kanan-kiri
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
