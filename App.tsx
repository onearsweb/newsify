/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Category from './source/category';
import ArticleDetail from './source/detail';
import Home from './source/home';
import AllNews from './source/news';
import Profile from './source/profile';
import SearchPage from './source/homeComponent/searchpage';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Category" component={Category} options={{ title: 'Category' }} />
        <Stack.Screen name="AllNews" component={AllNews} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
