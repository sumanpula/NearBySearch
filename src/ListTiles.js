import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Tile } from './Tile';
import {
    RESTAURANTS,
    STORES,
    BARS,
    ESHTABLISHEMENTS,
    HOTELS,
    HOSPITALS,
} from './utils/AppConstants';

const tiles = [
    {id: 1, name: 'Hospitals', type: HOSPITALS },
    {id: 2, name: 'Restaurants', type: RESTAURANTS},
    {id: 3, name: 'Hotels', type: HOTELS },
    {id: 4, name: 'Stores', type: STORES },
    {id: 5, name: 'Bars', type: BARS },
];

const ListTiles = (navigation) => {
  const [isConnected, setNetworkState] = useState(true);

  const getNetState = async() => {
    await NetInfo.fetch().then(state => {
        // console.log("Connection type", state.type);
        // console.log(" state Is connected?", state.isConnected);
        setNetworkState(state.isConnected);
        return state.isConnected;
      });
    return false;
  }

    const onTitlePress = (data) => {
        // check network state
        getNetState();
        // console.log('tile press', data, navigation.navigation.navigate);
        if (isConnected) {
            navigation.navigation.navigate('ResultsScreen', { type: data.type });
        } else {
            alert('Please connect to working internet');
        }
    }
    return(
        <ScrollView style={{ backgroundColor: '#d9f9b1' }}>
            <View style={styles.container}>
            {
               tiles.map((item, index) => (
                <Tile
                style = {styles.text}
                data={item}
                onPress={data => onTitlePress(data)}
                >
                </Tile>
               ))
            }
         </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
    },
    container: {
        padding: 10,
        marginTop: 12,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
     },
     text: {
        color: '#4f603c'
     },
});

export default ListTiles;