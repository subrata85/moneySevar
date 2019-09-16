import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { styles } from '../styles';
import {withNavigation} from 'react-navigation'

import AsyncStorage from '@react-native-community/async-storage';

const win = Dimensions.get('window');
const ratio = win.width / 180;

class Splash extends Component {
    // componentDidMount() { setTimeout(() => { this.props.navigation.replace("Splink") }, 2500); }

    async componentDidMount() { 
        let token = await AsyncStorage.getItem('token');

        setTimeout(() => {this.props.navigation.navigate(token !== null ? 'App' : 'Auth');} , 2500)
        
    }
    componentWillUnmount() { clearTimeout(); }
    render() {
        return (
            <View style={styles.splash}>
                <Image style={stylesImg.imageStyle} source={require("../assets/splash.jpg")} />
            </View>
        );
    }
}


const stylesImg = StyleSheet.create({
    imageStyle: {
        width: win.width,
        height: 362 * ratio,
    }
});

export default withNavigation(Splash);
