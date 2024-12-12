import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigationState, useNavigation } from '@react-navigation/native'; // Gunakan useNavigationState

const Footer = () => {
  const navigation = useNavigation(); 
  const currentRouteName = useNavigationState(state => state.routes[state.index].name); // Dapatkan rute yang aktif

  // Mengecek apakah layar saat ini Home atau Profile
  const isHomeFocused = currentRouteName === 'Home';
  const isProfileFocused = currentRouteName === 'Profile';

  return (
    <View style={styles.container}>
      {/* Tombol Home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Image 
          source={require('../source/assets/img/footer/home.png')} 
          style={isHomeFocused ? styles.iconActive : styles.iconInactive} 
        />
        <Text style={isHomeFocused ? styles.textActive : styles.textInactive}>Home</Text>
      </TouchableOpacity>

      {/* Tombol Profile */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image 
          source={require('../source/assets/img/footer/profile.png')} 
          style={isProfileFocused ? styles.iconActive : styles.iconInactive} 
        />
        <Text style={isProfileFocused ? styles.textActive : styles.textInactive}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    alignItems: 'center',
  },
  iconInactive: {
    width: 24,
    height: 24,
    tintColor: '#aaa',
  },
  iconActive: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  textInactive: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins-Regular'
  },
  textActive: {
    color: '#000',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins-Regular'
  },
});

export default Footer;
