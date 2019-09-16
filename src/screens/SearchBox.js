import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search : ""
    };
    changeHandler = () =>{
      
    }
  }

  render() {
    return (
      <View style={{backgroundColor:'#f4f4f4'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',borderWidth:1,borderColor:'#b9b9b9',margin:15}}>
            <View style={{paddingLeft:10}}>
              <TextInput
                type="text"
                name = "search"
                value = {this.state.name}
                onChangeText={() => this.changeHandler()}
                placeholder="What are you looking for" />
            </View>
            <View style={{justifyContent:'center',alignItems:'center',paddingRight:10,fontWeight:'bold'}}>
              <Icon name="search" size={20} color="#808080"/>
            </View>
        </View>
      </View>
    );
  }
}
