import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const truncate = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

const LatestNews = () => {
  const [articles, setArticles] = useState([
    {
      title: "Pemerintah Luncurkan Program Baru untuk Meningkatkan Ekonomi",
      description: "Pemerintah hari ini meluncurkan program baru untuk meningkatkan ekonomi negara. Program ini bertujuan untuk meningkatkan pendapatan masyarakat dan mengurangi kemiskinan.",
      urlToImage: "https://picsum.photos/200/300",
    },
    {
      title: "Kerusuhan di Jakarta, 10 Orang Terluka",
      description: "Kerusuhan terjadi di Jakarta hari ini, menyebabkan 10 orang terluka. Polisi sedang melakukan penyelidikan untuk mengetahui penyebab kerusuhan tersebut.",
      urlToImage: "https://picsum.photos/200/301",
    },
    {
      title: "Penemuan Baru di Bidang Kedokteran, Obat Kanker Ditemukan",
      description: "Para ilmuwan hari ini mengumumkan penemuan baru di bidang kedokteran, yaitu obat kanker yang efektif. Obat ini diharapkan dapat membantu meningkatkan harapan hidup penderita kanker.",
      urlToImage: "https://picsum.photos/200/302",
    },
    {
      title: "Gempa Bumi Melanda Jawa Barat, 5 Orang Meninggal",
      description: "Gempa bumi berkekuatan 6,5 SR melanda Jawa Barat hari ini, menyebabkan 5 orang meninggal. Bantuan darurat sedang diberikan kepada korban gempa.",
      urlToImage: "https://picsum.photos/200/303",
    },
    {
      title: "Pertandingan Sepak Bola Antar Negara, Indonesia Kalah 2-1",
      description: "Pertandingan sepak bola antar negara antara Indonesia dan Malaysia berakhir dengan kekalahan Indonesia 2-1. Timnas Indonesia akan berusaha untuk membalas kekalahan tersebut di pertandingan berikutnya.",
      urlToImage: "https://picsum.photos/200/304",
    },
    {
      title: "Penghargaan Nobel Fisika Diberikan kepada Ilmuwan Indonesia",
      description: "Penghargaan Nobel Fisika tahun ini diberikan kepada ilmuwan Indonesia, Prof. Dr. XYZ. Penghargaan ini diberikan atas kontribusi beliau dalam bidang fisika.",
      urlToImage: "https://picsum.photos/200/305",
    },
  ]);

  return (
    <View style={styles.latestNewsSection}>
      <Text style={styles.sectionTitle}>Latest News</Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View style={styles.articleCard}>
            <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
            <View style={styles.articleTextContainer}>
              <Text style={styles.articleTitle}>{item.title.split(' ').slice(0, 10).join(' ')}</Text>
              <Text style={styles.articleSubtitle}>{item.description.split(' ').slice(0, 7).join(' ')}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  latestNewsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: '#191F33',
    marginBottom: 20
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