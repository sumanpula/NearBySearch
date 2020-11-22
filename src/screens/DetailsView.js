import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard,
    FlatList,
    NativeModules,
    TextInput,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import {
    call,
    share,
    total,
    info,
    location,
    open,
    star,
} from '../icons';
import { getInfo } from '../network/APIUtils';

const { AppModule } = NativeModules;

class DetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '000',
            webSite: 'www.google.com',
        };
        const data  = this.props.route.params.formattedData;
        this.getDetails(data.place_id);
    }
    
    onPhoneCallClick = () => {
        const {
            phoneNumber,
        } = this.state;
        console.log('suman phoneNumber ', phoneNumber)
        AppModule.phoneCall(phoneNumber);
    }

    onShareClick = () => {
        const {
            webSite,
        } = this.state;
        console.log('suman webSite ', webSite)
        AppModule.shareLocation(webSite);
    }

    getDetails = (placeId) => {
        getInfo(placeId, (res) => {
         // console.log('getDetails ', res)
         this.setState({
             phoneNumber: res.data.formatted_phone_number,
             webSite: res.data.website,
         });
        }, 'formatted_phone_number', 'website');
    }

    render() {
        const data  = this.props.route.params.formattedData;
        console.log('Suman on clikc', data);
        return(
            <View style={styles.containerStyle}>
            <View style={styles.dataViewStyle}>
            <View style={styles.infoViewStyle}>
            <Image style={styles.infoIconStyle} source={location} />
            <Text style={styles.titleStyle}>{data.name}</Text>
            </View>
            <View style={styles.infoViewStyle}>
            <Image style={styles.infoIconStyle} source={info} />
            <Text style={styles.addStyle}>{data.vicinity}</Text>
            </View>
            <View style={styles.infoViewStyle}>
            <Image style={styles.infoIconStyle} source={star} />
            <Text style={styles.ratingTotalTextStyle}>{`Total Ratings: ${data.user_ratings_total}`}</Text>
            </View> 
            <View style={styles.infoViewStyle}>
            <Image style={styles.infoIconStyle} source={open} />
            <Text style={styles.ratingTotalTextStyle}>{`Open now: ${data.openNow}`}</Text>
            </View>
            </View>
            <View style={styles.footerViewStyle}>
            <View style={styles.ratingViewStyle}>
            <Text style={styles.ratingTextStyle}>{data.userRatings}
            </Text>
            </View>
            <TouchableOpacity onPress={() => this.onPhoneCallClick()}>
            <Image style={styles.footerIconStyle} source={call} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onShareClick()} >
            <Image style={styles.footerIconStyle} source={share} />
            </TouchableOpacity>
            </View>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    dataViewStyle: {
        flex: 1,
    },
    infoViewStyle: {
        flexDirection: 'row',
        marginRight: 20,
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 8,
    },
    addStyle: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 8,
    },
    ratingViewStyle: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        marginBottom: 12,
        color: 'white',
        marginTop: 5,
        borderRadius: 5,
    },
    ratingTotalTextStyle: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 5,
        alignSelf: 'center',
    },
    ratingTextStyle: {
        fontSize: 12,
        color: 'white',
        alignSelf: 'center',
      },
    footerViewStyle: {
        marginTop: 12,
        marginLeft: 5,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    footerIconStyle: {
        width: 32,
        height: 32,
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 12,
        marginRight: 10,
    },
    infoIconStyle: {
        width: 24,
        height: 24,
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 5,
        marginRight: 5,
    },
});

export {
    DetailsView,
};