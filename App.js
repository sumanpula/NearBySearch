/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Platform,
  Image,
  TouchableHighlight,
  FlatList,
  Keyboard,
  PermissionsAndroid,
  NativeModules,
} from 'react-native';

import { close, search } from './src/icons';

const {MyLocation} = NativeModules;

const App = () => {
  const radius = 10000;// max distance in mts
  const hint = 'Search for restaurants, cousines';
  const baseUrl = 'https://maps.googleapis.com/maps/api/place';
  const api_key = 'AIzaSyDhHzf6y1brSirE2hPeMjTqSBYE73pzukM';

  const [placeholderText, updatePlaceholder] = useState(hint);
  const [list, updateList] = useState([]);
  const [searchText, updateSearchText] = useState('');
  const edit_search = React.createRef();

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

  const fetchRestaurants = keyWord => {
    // get location
    if (keyWord.length > 0) {
      updateSearchText(keyWord);
      // console.log('fetchRestaurants text ', keyWord);
      MyLocation.getLatLng(gpsLocation => {
        const url = `${baseUrl}/nearbysearch/json?location=${
          gpsLocation.latitude},${gpsLocation.longitude}&radius=${radius}&types=restaurant,food,store,establishment,point_of_interest&keyword=${keyWord.toUpperCase()}&key=${api_key}`;
        // console.log('suman gpsLocation', gpsLocation);
        // console.log('fetchRestaurants url ', url);
        return fetch(url)
          .then(response => response.json())
          .then(responseJson => {
            // console.log('fetchRestaurants', responseJson.results)
            updateList(responseJson.results);
          })
          .catch(e => console.log('fetchRestaurants error ', e));
      });
    } else {
      updateList([]);
    }
  };

  const ListItem = item => {
    // console.log('placeholder ', placeholderText);
    const data = item.item;
    // console.log('ListItem ', data.photos[0]);
    const imageUri = data.photos && data.photos.length > 0 ? data.photos[0] : [
    {
      height: 3840,
              html_attributions: [
      "<a href=\"https://maps.google.com/maps/contrib/100684831827595185902\">juan carlos Maldonado</a>"
              ],
      photo_reference:
                'CmRaAAAAeepvcqNPKtJJ82yeXRNrMNpqYNZy7UsNbFSkuhny5Y4PzGjLO3NVMJhndqhfY2VihmFhFyVx9kA7UnmBfzImcVdYDvbQUmfxAiNvf3wB_V8KBpJXM6OKxRW_i4nnr6sFEhAOFICe2jJQO52jEYdk_6iDGhRwqCbDf1CvI8dDnbjbXOInJ5SywA',
              width: 2160,
            },
    ];
    const photo_reference = imageUri.photo_reference;
    const width = imageUri.width;
    const url = `${baseUrl}/photo?maxwidth=${width}&photoreference=${photo_reference}&key=${api_key}`;
    // console.log('ListItem imageUri ', imageUri, url);
    const {
      name,
      vicinity,
      price_level,
      user_ratings_total,
      rating,
    } = data;
    const price = price_level ? price_level : 1;
    const ratings = user_ratings_total ? user_ratings_total : 1;
    const userRatings = rating ? rating : 1;
    return (
      <View style={styles.itemStyleMain}>
        <Image source={{uri: url}} style={styles.imageStyle} />
        <View style={styles.itemsStyle}>
          <Text style={styles.itemNameStyle}>{name}</Text>
          <Text style={styles.itemPlaceStyle}>{vicinity}</Text>
          <Text style={styles.itemPriceLevelStyle}>{`₹ ${price}00 Per Person`}</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.ratingTotalTextStyle}>{`Total Ratings: ${ratings}`}</Text>
        </View>
        <View style={styles.ratingViewStyle}>
          <Text style={styles.ratingTextStyle}>{userRatings}</Text>
        </View>
      </View>
    );
  };

  const clearText = () => {
    edit_search.current.clear();
    Keyboard.dismiss();
    updatePlaceholder(hint);
  };

  const onSearchClick = () => {
    Keyboard.dismiss();
    fetchRestaurants(searchText);
  };

  const renderList = ({item}) => <ListItem item={item} />;

  return (
    <View style={styles.mainStyle}>
      <View style={styles.inputTextStyle}>
        <TouchableHighlight onPress={() => onSearchClick()}>
          <Image style={styles.iconStyle} source={search} />
        </TouchableHighlight>
        <TextInput
          ref={edit_search}
          style={styles.searchItemStyle}
          placeholder={placeholderText}
          onChangeText={text => fetchRestaurants(text)}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableHighlight onPress={() => clearText()}>
          <Image style={styles.iconStyle} source={close} />
        </TouchableHighlight>
      </View>
      {list.length > 0 ? (
        <FlatList
          style={{backgroundColor: '#fff'}}
          data={list}
          renderItem={renderList}
        />
      ) : (
        <Text style={styles.noDataTextStyle}>Please type to search nearby restaurants</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputTextStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D7DBDD',
    borderRadius: 10,
    margin: 10,
    padding: 5,
    alignItems: 'center',
  },
  searchItemStyle: {
    flex: 1,
  },
  itemStyleMain: {
    flexDirection: 'row',
    margin: 10,
  },
  itemsStyle: {
    flex: 1,
  },
  imageStyle: {
    margin: 5,
    width: 100,
    height: 100,
  },
  iconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    tintColor: 'black',
    justifyContent: 'center',
  },
  itemNameStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  itemPlaceStyle: {
    fontSize: 16,
    color: 'black',
  },
  itemPriceLevelStyle: {
    fontSize: 14,
    color: '#ABB2B9',
  },
  ratingViewStyle: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 5,
  },
  ratingTotalTextStyle: {
    color: 'green',
    fontSize: 12,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingTextStyle: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
  },
  noDataTextStyle: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    marginTop: 5,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
