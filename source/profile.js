import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from './footer';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Profile Screen</Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Profile;
