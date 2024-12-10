import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from './footer';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Home Screen</Text>
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

export default Home;
