import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    TextInput,
    Image,
} from 'react-native';

const ShowListItems = (listData) => {
    const hint = 'Search for restaurants, cousines';
  
    const [placeholderText, updatePlaceholder] = useState(hint);
    const [list, updateList] = useState([]);
    const [searchText, updateSearchText] = useState('');
    const fetchRestaurants = keyWord => {
        // get location
        if (keyWord.length > 0) {
          updateSearchText(keyWord);
          // console.log('fetchRestaurants text ', keyWord);
          getNearestPlaces(keyWord, (response) => {
            console.log('suman data ', response);
            updateList(response.data);
          });
        } else {
          updateList([]);
        }
      };

    const ListItem = item => {
        // console.log('placeholder ', placeholderText);
        console.log('ListItem ', item);
        const data = item.item;
        const {
          name,
          vicinity,
          price_level,
          user_ratings_total,
          rating,
          icon,
        } = data;
        // console.log('ListItem ', data);
        const imageUri = data.photos && data.length > 0 ? data.photos[0] : data.icon;
        const photo_reference = imageUri.photo_reference;
        const width = imageUri.width;
        const url = `${baseUrlPlaces}/photo?maxwidth=${width}&photoreference=${photo_reference}&key=${api_key}`;
        // console.log('ListItem imageUri ', imageUri, url);
    
        const price = price_level ? price_level : 1;
        const ratings = user_ratings_total ? user_ratings_total : 1;
        const userRatings = rating ? rating : 1;
        return (
          <View style={styles.itemStyleMain}>
            <Image source={{uri: imageUri}} style={styles.imageStyle} />
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
        Keyboard.dismiss();
        updatePlaceholder(hint);
      };
    
      const onSearchClick = () => {
        Keyboard.dismiss();
        fetchRestaurants(searchText);
      };

    const renderList = ({item}) => <ListItem item={item} />;

    return(
        <View>
            <View style={styles.inputTextStyle}>
        <TouchableHighlight onPress={() => onSearchClick()}>
          <Image style={styles.iconStyle} source={search} />
        </TouchableHighlight>
        <TextInput
          style={styles.searchItemStyle}
          placeholder={hint}
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
    )
}

const styles = StyleSheet.create({
    mainStyle: {
      flex: 1,
      flexDirection: 'column',
    },
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

export {
    ShowListItems,
};