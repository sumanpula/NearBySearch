import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListTiles } from '../index';

class HomeScreen extends Component {
    render() {
        return(
            <View style={styles.mainStyle}>
            <ListTiles navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainStyle: {
      flex: 1,
    },
  });

export {
    HomeScreen,
};
