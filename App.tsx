/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Footer from './source/footer';
import Home from './source/home'; 
import Category from './source/category';
import Profile from './source/profile'; 
import AllNews from './source/newscoba';  
import ArticleDetail from './source/detailcoba';  


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="AllNews" component={AllNews} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
