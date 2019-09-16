import React, { Component } from 'react'
import { Text, View,AsyncStorage } from 'react-native'

export default class AuthLoading extends Component {
    async componentDidMount(){
        let token = await AsyncStorage.getItem('token');
        this.props.navigation.navigate(token !== null ? 'App' : 'Auth');
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
