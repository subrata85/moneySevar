import React, { Component } from 'react';
import { View, Text,Dimensions,TextInput,ScrollView,TouchableOpacity,ActivityIndicator,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Foundation'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { styles } from '../styles';
import Header from './Header';
import { throwStatement, thisExpression } from '@babel/types';
import AsyncStorage from '@react-native-community/async-storage';


const {height,width} = Dimensions.get("screen")
export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: {},
      fullname : '',
      email : '',
      contact : '',
      subject : '',
      msg : '',
      token : '',

      errFullname: '',
      errEmail: '',
      errContact: '',
      errSubject: '',
      errMsg: '',

      contactContent : ''

    };
    this.loadData();
  }
  componentDidMount(){
    fetch('https://findit.com.mt/api/page?id='+3,{method: 'GET', contentType: "multipart/form-data"})
    .then(res => res.json())
    .then(res => {
      this.setState({datas : res.data.fielddata});

      let str = this.state.datas.contactcontent;
      console.log(`str ${str}`)
      let trim = str.replace("</p>", "");
      let trim1 = trim.replace("<p>","")
      console.log(`trim ${trim1}`)
      this.setState({contactContent : trim1})
    })
  }

  allInputFields = (text,field) => {
    if(field == 'fullname'){
      this.setState({fullname : text})
    }
    if(field == 'email'){
      this.setState({email : text})
    }
    if(field == 'contact'){
      this.setState({contact : text})
    }
    if(field == 'subject'){
      this.setState({subject : text})
    }
    if(field == 'msg'){
      this.setState({msg : text})
    }
  }

  handlePress = () => {
    var form = new FormData();
    form.append('fullname',this.state.fullname);
    form.append('email',this.state.email);
    form.append('contact',this.state.contact);
    form.append('subject',this.state.subject)
    form.append('msg',this.state.msg);
    
    fetch('https://findit.com.mt/api/sendform',{method:'POST',contentType: "multipart/form-data", body: form})
    .then(res => res.json())
    .then(res => {
      console.log(res);
      
      this.state.fullname == "" ? this.setState({errFullname : 'Please enter fullname'}) : this.setState({errFullname:''})
      this.state.email == "" ? this.setState({errEmail : 'Please enter email'}) : this.setState({errEmail: ''})
      this.state.contact == "" ? this.setState({errContact : 'Please enter contact no'}) : this.setState({errContact: ''})
      this.state.subject == "" ? this.setState({errSubject: 'Please enter subject'}) : this.setState({errSubject:''})
      this.state.msg == "" ? this.setState({errMsg: 'Please enter message'}) : this.setState({errMsg: ''})
      
      if(this.state.fullname != "" && this.state.email != "" && this.state.contact != "" && this.state.subject != "" && this.state.msg != ""){
        Alert.alert(
            "Message sent successfully",
            "",
            [
              { text: "Ok", onPress: () => this.props.navigation.navigate('Accounts_Detail') }
            ],
            { cancelable: false }
          );
        
      }

    })
  }

  loadData = async() => {
    const token = await AsyncStorage.getItem('token');
    this.setState({token : token})
    if(token == null){
        this.props.navigation.replace('Login')
    }
  }
  
  render() {
    return (
    <>
    {this.state.token == null ? <ActivityIndicator/> : 
      <ScrollView>
          <Header />
          <View>
            <View style={{marginHorizontal:15}}>
              <View>
                  <Text style={styles.contactUsHeader}>Contact us</Text>
              </View>
              <View style={{marginTop:5}}>
                <Text style={{color:'#808080'}}>{this.state.contactContent}</Text>    
              </View>
              <View style={{marginTop:10}}>
                  <View style={{flexDirection:'row',marginVertical:5,justifyContent:'space-between'}}>
                      <View style={{left:0}}>
                        <Icon name="location-pin" size={23} color='#b83a84'/>
                      </View>
                      <Text style={{color:'#b83a84',fontSize:14,paddingLeft:10}}>Address: {this.state.datas.address}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginVertical:5}}>
                      <Icon1 name="telephone" size={23} color="#b83a84"/>
                      <Text style={{color:'#b83a84',paddingLeft:5,fontSize:14,marginLeft:10,justifyContent:'center',alignItems:'center'}}>Tel {this.state.datas.phone}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginVertical:5}}>
                      <Icon2 name="envelope" size={23} color="#b83a84"/>
                      <View style={{paddingLeft:7}}>
                        <Text style={{color:'#919191',fontSize:14}}>General Information:<Text style={{color:'#b83a84'}}>info@findit.com.mt</Text></Text>
                        <Text style={{color:'#919191',fontSize:14}}>Updating your listing:<Text style={{color:'#b83a84'}}>admin@findit.com.mt</Text></Text>
                        <Text style={{color:'#919191',fontSize:14}}>Advertising:<Text>sales@findit.mt</Text></Text>
                      </View>
                  </View>
                  <View style={{flexDirection:'row',marginVertical:5}}>
                    <Icon name="facebook-with-circle" size={23} color="#32579e"/>
                    <Text style={{color:'#919191',paddingLeft:7,fontSize:14}}>Join us on Facebook:<Text style={{color:'#b83a84'}}>facebook.com/FinditMalta</Text></Text> 
                  </View>
                  <View style={{flexDirection:'row',marginVertical:5}}>
                    <Icon name="twitter-with-circle" size={23} color="#00acee"/>
                    <Text style={{color:'#919191',paddingLeft:7,fontSize:14}}>Follow us on Twitter:<Text style={{color:'#b83a84'}}>@finditmt</Text></Text> 
                  </View>
              </View>
            </View>
           
           
            
            <View style={{marginTop:10,backgroundColor:'#f4f4f4'}}>
                <View style={{paddingHorizontal:20}}>
                  <Text style={styles.contactUsFormHeading}>Send us a Message</Text>
                  <Text style={{marginTop:10}}>for more information please fill in the form below and we will get back to you:</Text>
                  <View style={{borderWidth:0.5,borderColor:'#b9b9b9',marginVertical:10,borderRadius:5}}>
                    <TextInput
                      style={{padding:13,backgroundColor:'white'}}
                      placeholderTextColor="#535353" 
                      placeholder="Full Name *" 
                      onChangeText = {(text) => this.allInputFields(text,'fullname')}/>
                  </View>
                  <Text style={styles.errMsg}>{this.state.errFullname}</Text>

                  <View style={{borderWidth:0.5,borderColor:'#b9b9b9',marginVertical:10,borderRadius:5}}>
                    <TextInput
                      style={{padding:13,backgroundColor:'white'}}
                      placeholderTextColor="#535353" 
                      placeholder="Email *"
                      onChangeText = {(text) => this.allInputFields(text,'email')} />
                  </View>
                  <Text style={styles.errMsg}>{this.state.errEmail}</Text>

                  <View style={{borderWidth:0.5,borderColor:'#b9b9b9',marginVertical:10,borderRadius:5}}>
                    <TextInput
                      style={{padding:13,backgroundColor:'white'}}
                      placeholderTextColor="#535353" 
                      placeholder="Contact No" 
                      onChangeText = {(text) => this.allInputFields(text,'contact')}/>
                  </View>
                  <Text style={styles.errMsg}>{this.state.errContact}</Text>

                  <View style={{borderWidth:0.5,borderColor:'#b9b9b9',marginVertical:10,borderRadius:5}}>
                    <TextInput
                      style={{padding:13,backgroundColor:'white'}}
                      placeholderTextColor="#535353" 
                      placeholder="Subject" 
                      onChangeText = {(text) => this.allInputFields(text,'subject')}/>
                  </View>
                  <Text style={styles.errMsg}>{this.state.errSubject}</Text>

                  <View style={{borderWidth:0.5,borderColor:'#b9b9b9',marginVertical:10,borderRadius:5}}>
                    <TextInput
                      style={{paddingLeft:10,paddingTop:10,paddingBottom:200,backgroundColor:'white'}}
                      placeholderTextColor="#535353" 
                      placeholder="Message goes here.."
                      onChangeText ={(text) => this.allInputFields(text,'msg')} />
                  </View>
                  <Text style={styles.errMsg}>{this.state.errMsg}</Text>

                  <View>
                    <TouchableOpacity style={styles.btnApps} onPress={() => this.handlePress()}>
                      <Text style={styles.btnText}>Send it!</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
          </View>
      </ScrollView>
    }
    </>
    );
  }
}
