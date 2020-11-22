import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList,
    TouchableHighlight,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { getNearestPlaces } from '../network/APIUtils';
import { baseUrlPlaces, apiKey } from '../utils/URLConstants'
import { close, search } from '../icons';
import { getIcon, getType } from '../utils/AppUtils';
import {
  RESTAURANTS,
  STORES,
  BARS,
  ESHTABLISHEMENTS,
  HOTELS,
  HOSPITALS,
} from '../utils/AppConstants';
const loading = require('../icons/dish.png');

const hint = 'Search for near by ';
let type = '';
class ResultsScreen extends Component {
 constructor(props) {
        super(props);
        this.state = {
            list: [],
            noDataText: 'Please type to search nearby ',
            isImageLoading: false,
        };
        type = getType(this.props.route.params.type);
        console.log('suman type', type);
        this.getInitialList();
        this.changeHeader()
    }

    changeHeader = () => {
      const icon = getIcon(this.props.route.params.type);
      // Function to change navigation options
      this.props.navigation.setOptions({
        title: `Near by ${type}`,
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: 'white', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        headerRight: () =>
        <Image
        style={styles.iconStyle}
        source={icon}
        />
      });
    };

    updateList = (list) => {
        this.setState({ list });
    }

    getInitialList = () => {
      getNearestPlaces('', type, (response) => {
        // console.log('suman data ', response.error);
        if (response.code > 200) {
          if (response.error !== '') {
            if (response.error === 'Network request failed') {
              alert('Please Connect to Working Internet!');
            } else {
              alert('Something wrong, try again later');
            }
          }
        }
        this.updateList(response.data);
      });
    }

    fetchRestaurants = keyWord => {
        // console.log('suman type ', type)
        // get location
        if (keyWord.length >= 3) {
          this.setState({ noDataText: 'Please type to search nearby '});
          // console.log('fetchRestaurants text ', keyWord);
          getNearestPlaces(keyWord, type, (response) => {
            // console.log('suman data ', response.error);
            if (response.code > 200) {
              if (response.error !== '') {
                if (response.error === 'Network request failed') {
                  alert('Please Connect to Working Internet!');
                } else {
                  alert('Something wrong, try again later');
                }
              }
            }
            this.updateList(response.data);
          });
        } else {
          this.setState({ noDataText: 'Please type at least 3 characters' });
        }
      };

    clearText = () => {
        Keyboard.dismiss();
        this.changeHeader();
      };
    
    onSearchClick = () => {
        Keyboard.dismiss();
        fetchRestaurants(searchText);
      };

    onListItemClick = (formattedData) => {
      this.props.navigation.navigate('DetailsView', {formattedData});
    }

    renderList = ({item}) => {
        console.log('ListItem ', item);
        const data = item;
        const {
          name,
          vicinity,
          price_level,
          user_ratings_total,
          rating,
          icon,
          opening_hours,
          place_id,
          reference,
        } = item;
        // console.log('suman ListItem ', data);
        let imageUri = data.photos && data.photos.length > 0 ? data.photos[0] : data.icon;
        const photo_reference = imageUri.photo_reference;
        // console.log('suman imageUri ', photo_reference);
        const width = imageUri.width;
        imageUri = photo_reference ? `${baseUrlPlaces}/photo?maxwidth=${width}&photoreference=${photo_reference}&key=${apiKey}` : data.icon;
        // console.log('ListItem imageUri ', imageUri);
    
        const price = price_level ? price_level : 1;
        const ratings = user_ratings_total ? user_ratings_total : 1;
        const userRatings = rating ? rating : 1;
        const openNow = opening_hours && opening_hours.open_now ? 'Open now' : 'Closed';
        const formattedData = {
          name,
          vicinity,
          price_level,
          user_ratings_total,
          rating,
          icon,
          price,
          userRatings,
          openNow,
          place_id,
          reference,
        };
        return (
          <TouchableOpacity
            style={styles.itemStyleMain}
            onPress={() => this.onListItemClick(formattedData)}
            >
             <Image
              loadingIndicatorSource={loading}
              source={{uri: imageUri}} style={styles.imageStyle}
              onLoadStart={() => this.showLoading(imageUri, true)}
              onLoad={() => this.showLoading(imageUri, false)}
            />
            <View style={styles.itemsStyle}>
              <Text style={styles.itemNameStyle}>{name}</Text>
              <Text style={styles.itemPlaceStyle}>{vicinity}</Text>
              <Text style={styles.itemPriceLevelStyle}>{`₹ ${price}00 Per Person`}</Text>
              <View style={styles.lineStyle} />
              <Text style={styles.ratingTotalTextStyle}>{`Ratings in Total: ${ratings}`}</Text>
            </View>
            <View style={styles.ratingViewStyle}>
              <Text style={styles.ratingTextStyle}>{userRatings}</Text>
            </View>
          </TouchableOpacity>
        );
    };

    showLoading = (imageUri, isImageLoading) => {
     console.log('suman isImageLoading', isImageLoading)
      return(
        isImageLoading ?
        (
          <View style={styles.imageStyle}>
          <ActivityIndicator size="large" color="#FFD700"/>
        </View>
        ) : (
          <View style={styles.imageStyle}>
          <Text style={{ color: 'red' }}>Suman</Text>
          </View>
        )
      );
    }

  render() {
      const {
        list,
        noDataText,
      } = this.state;
    const type = getType(this.props.route.params.type);
    return(
        <View>
            <View style={styles.inputTextStyle}>
        <TouchableHighlight onPress={() => this.onSearchClick()}>
          <Image style={styles.iconStyle} source={search} />
        </TouchableHighlight>
        <TextInput
          style={styles.searchItemStyle}
          placeholder={`${hint} ${type}`}
          onChangeText={text => this.fetchRestaurants(text)}
          onSubmitEditing={Keyboard.dismiss}
        />
        <TouchableHighlight onPress={() => this.clearText()}>
          <Image style={styles.iconStyle} source={close} />
        </TouchableHighlight>
      </View>
            {list.length > 0 ? (
            <FlatList
              style={{backgroundColor: '#fff'}}
              data={list}
              renderItem={this.renderList}
            />
          ) : (
            <Text style={styles.noDataTextStyle}>{`${noDataText} ${type}`}</Text>
          )} 
        </View>
    )
  }
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
      backgroundColor: 'white',
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
    iconStyle: {
      width: 32,
      height: 32,
      tintColor: 'white',
      marginRight: 16,
    },
  });

export {
    ResultsScreen,
};