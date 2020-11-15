import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { getIcon } from './utils/AppUtils';

const Tile = (props) => {
    const {
        data,
        onPress,
    } = props;

    // console.log('item ', data)
    return(
        <View style={styles.tileView}>
            <TouchableOpacity
            style={styles.innerViewStyle}
            onPress={() => onPress(data)}
            >
            <Text style={styles.titleTitleStyle}>{data.name}</Text>
            <Image
                style={styles.imageStyle}
                source={getIcon(data.type)}
            />
            </TouchableOpacity>
        </View>
    )
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    tileView: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        width: windowWidth /2,
        height: windowWidth /4,
        justifyContent: 'center',
        margin: 12,
    },
    innerViewStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageStyle: {
        margin: 5,
        width: 50,
        height: 50,
      },
});

export {
    Tile,
};