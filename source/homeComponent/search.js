import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigation = useNavigation();

  const handleSearchClick = () => {
    navigation.navigate('SearchPage', {
      query: searchQuery || 'default search term',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={handleSearchClick}>
        <Image
          source={require('../assets/img/search/search.png')}
          style={styles.searchIcon}
        />
        {/* Make TextInput read-only, or hide it if you don't need any text input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#767E94"
          value={searchQuery}
          onChangeText={setSearchQuery}
          editable={false} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DADDE5',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: 309,
    height: 48,
    alignSelf: 'center',
  },
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
    tintColor: '#0864ED',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Inter_18pt-Regular',
    color: '#767E94',
  },
});

export default Search;
