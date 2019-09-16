import React, { Component } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from '../styles';
import Header from './Header';
import { ScrollView } from 'react-native-gesture-handler';

export default class Voucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
        datas : []
    };
  }

  async componentDidMount(){
    let token = await AsyncStorage.getItem('token');

    let id = await AsyncStorage.getItem('id')

    console.log(`inside Voucher id- ${id}  token- ${token}`);

    var form = new FormData();

    form.append('id' , id);
    form.append('token', token);

    fetch('https://findit.com.mt/api/voucher',{method:'POST',contentType: "multipart/form-data", body: form})
    .then(res=>res.json())
    .then(res => {
      this.setState({datas : res.data})
      console.log(datas)
    })
  }

  render() {
    
    const { navigation } = this.props;
    const code  = navigation.getParam('code')
    const qrCode = navigation.getParam('qrCode')
    const date = navigation.getParam('publishDate');
    
    console.log(`${code} ${date}`)
    

    const name = navigation.getParam('name');
    genreateQrcode = `https://api.qrserver.com/v1/create-qr-code/?data=${qrCode}`

    return (
      <ScrollView style={{flex:1}}>
        <Header />
      <View style={{backgroundColor:'#ececec'}}>  
      <View style={{marginHorizontal:20,marginTop:20,backgroundColor:'#fff'}}>
          <View style={{alignItems:'center'}}>
                <Text style={{fontSize:14,color:'#555555',marginTop:10}}>TemptAsian Fusion Resturants</Text>
                <Text style={styles.HeadListItm}>{name}</Text>
                <Text style={{fontSize:14,color:'#555555',marginTop:10}}>Please present the code when asking doe the bill</Text>
          </View>
         <View style={{marginVertical:10}}>
           <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image source={{uri : genreateQrcode}} style={{width:150,height:150}} alt="" title="" />
           </View>
         </View>
         <View style={{marginHorizontal:10}}>
            <TouchableOpacity style={styles.btnApps}><Text style={styles.btnText}>{code}</Text></TouchableOpacity>
         </View>
         <View style={{alignItems:'center'}}>
             <Text style={styles.bodyListItm}>{date}</Text>
         </View>
        <View style={{marginVertical:10,marginHorizontal:10}}>
            <TouchableOpacity 
                            style={styles.accountDetailsChangePasswordButton}>
                <Text style={styles.btnText}>Finished</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
    );
  }
}
