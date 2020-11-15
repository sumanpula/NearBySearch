import React from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ShowListItems } from './ShowListItems';
import { HomeScreen, ResultsScreen } from './screens';
import { close, search } from '../src/icons';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator>
        <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center',
            },
          }}
        >
        </Stack.Screen>
        <Stack.Screen
        name="ResultsScreen"
        options={{
            title: 'Near by...',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        component={ResultsScreen}
        >
        </Stack.Screen>
    </Stack.Navigator>
    );
};

export {
    AppStack,
};