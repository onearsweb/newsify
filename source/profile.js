import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from './footer';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://imgur.com/undefined' }} 
          style={styles.headerImage}
        />
      </View>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://imgur.com/BFECBwy' }} 
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileButtonText}>My Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <ScrollView>
        <View style={styles.detailsSection}>
          <Text style={styles.detailText}>Reddis Angel</Text>
          <Text style={styles.detailText}>Wilda Agustina</Text>
          <Text style={styles.detailText}>Rifki Ainul Yaqin</Text>
          <Text style={styles.detailText}>Azilma Nuzul Yasinta</Text>
          <Text style={styles.detailText}>Yafi Fahriza Akhsan</Text>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  profileButton: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  profileButtonText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  detailsSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#333333',
    marginVertical: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#dddddd',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    color: '#333333',
    fontSize: 16,
  },
});

