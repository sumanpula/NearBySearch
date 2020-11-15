/**
 * NearBySearch React Native App
 * https://github.com/sumanpula/NearBySearch
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Keyboard,
  PermissionsAndroid,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './src/AppStack';
import ListTiles from './src/ListTiles';

const App = () => {

 useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }, []);


  return (
    <NavigationContainer>
     <AppStack>
     </AppStack>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
