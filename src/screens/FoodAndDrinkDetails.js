import React, { Component } from 'react';
import { View, Text,Image,TouchableOpacity,ScrollView } from 'react-native';
import { styles } from '../styles';
import Icon from 'react-native-vector-icons/AntDesign'
import Telephone from 'react-native-vector-icons/Foundation'
import Paw from 'react-native-vector-icons/FontAwesome'
import Web from 'react-native-vector-icons/Foundation'
import Right from 'react-native-vector-icons/AntDesign'
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';

export default class FoodAndDrinkDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        datas : [],
        id : ''
    };
  }
  componentDidMount(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('id');
      fetch('https://findit.com.mt/api/article?id='+itemId,{
        method : 'POST',
        contentType: "multipart/form-data",
      })
      .then(res => res.json())
      .then(res => {
          console.log(res);
          this.setState({datas : res.data})
       })
  }

  async onSubmit(code,publishDate,qrCode,name){

    const { navigation } = this.props;

    const id = navigation.getParam('id');

    console.log(`code: ${code} publishDate: ${publishDate} qrCode: ${qrCode} id: ${id}`)
    
    AsyncStorage.setItem('id',id)

    this.props.navigation.navigate('Voucher',{
        code : code,
        publishDate : publishDate,
        qrCode : qrCode,
        name: name,
    })
  }


  render() {
    const{datas} = this.state
    // console.log(`Datas ${JSON.stringify(datas)}`);

    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const code = navigation.getParam('code');
    const publishDate = navigation.getParam('publish_date')


    console.log(id);


    return (
    <>
    { datas !== null ?
      <ScrollView>
        <Header />
          <View style={{margin:10}}>
            <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#e2e2e2',paddingBottom:10}}>
              <Image style={styles.LandingIcon}  resizeMode={'contain'} source={require("../assets/fooddrink.png")} />
              <Text style={styles.foodAndDrink2Heading}>Food & Drink</Text>

            </View>   
            <View>  
            
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Image source={require("../assets/logo.png")} />
                        <View style={styles.foodAndDrinkDescDetials}>
                            <View style={styles.desDetils}>
                                <Text style={styles.HeadListItm}>{this.state.datas.name}</Text>
                                {/* <Text style={styles.bodyListItm}><Text style={{fontWeight:'bold'}}>TemptAsian</Text>{this.state.datas.description}</Text> */}
                                <View style={{marginTop:10}}>
                                    <Text style={styles.bodyListItm}>Exclusive <Text style={{fontWeight:'bold'}}>findit!</Text> offer</Text>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{borderWidth:1,borderColor:'black',height:300,justifyContent:'center',alignItems:'center'}}>
                            <Image style={{width: 400, height: 300}} source={{uri: this.state.datas.mainimage}}/>

                        </View>
                    </View>
                    <View style={{marginVertical:5,marginBottom:20}}>
                        <TouchableOpacity 
                            style={styles.accountDetailsLoginButton}
                            onPress={() => this.onSubmit(code,publishDate,this.state.datas.code,this.state.datas.name)} >
                                <Text style={styles.btnText}>Get Voucher Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <View style={{marginVertical:5}}>
                <Text style={{color:'#808080',fontWeight:'500'}}>Redeemable at:</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:5}}>
                        <Text style={{color: '#b83a84',fontWeight:'600',fontSize:20}}>{this.state.datas.name}</Text> 
                    </View>
                    {/* <Text style={{marginVertical:5,color:'#808080',fontWeight:'500'}}>Fusion Resturants</Text> */}
                </View>
            </View>
            {/* <View style={{flexDirection:'row',marginVertical:5}}>
                <Icon name="star" size={20} color="#ffad33" />
                <Icon name="star" size={20} color="#ffad33" />
                <Icon name="star" size={20} color="#ffad33" />
                <Icon name="star" size={20} color="#ffad33" />
                <Icon name="star" size={20} color="#ffad33" />
                <View style={{marginLeft:10,marginVertical:2}}>
                    <Text style={{fontSize:13}}>5 out of 5</Text>
                </View>
            </View> */}
            {/* <View style={{marginBottom:10}}>
                <Text style={{color:"#717171"}}>The Palace,Triq II-kbira,Tas-Sliema, Malta SLM 1542</Text>
            </View> */}
            {/* <View style={{flexDirection:'row'}}>
                <View style={styles.circle}>
                    <View style={{marginVertical:20,marginHorizontal:25}}>
                        <Telephone name="telephone" size={50} color="#b83a84" />
                    </View>    
                </View>
                <View style={styles.circle}>
                    <View style={{marginVertical:20,marginHorizontal:25}}>
                        <Web name="web" size={50} color="#b83a84" />
                    </View>    
                </View>
                <View style={styles.circle}>
                    <View style={{marginVertical:20,marginHorizontal:20}}>
                        <Paw name="paw" size={50} color="#b83a84" />
                    </View>    
                </View>
            </View> */}
        </View>
        <View>
            <View style={{borderBottomWidth:1,borderBottomColor:'#f0f0f0',marginVertical:10}}></View>
            <View style={{marginHorizontal:10}}>
                <Text style={{color:'#858585',fontSize:15}}>Valid until {this.state.datas.archive_date}</Text>
                {/* <Text style={{color:'#858585',fontSize:15}}>Valid Everyday</Text>
                <Text style={{color:'#858585',fontSize:15}}>Not Valid on Holidays</Text>
                <Text style={{color:'#858585',fontSize:15}}>Unlimited uses per user</Text> */}

                <Text style={{color:'#858585',fontSize:15}}>{this.state.datas.description}</Text>

                <TouchableOpacity onPress={() => {this.props.navigation.navigate('TermsAndCondition')}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:"#b83a84"}}>View all Terms & Conditions</Text>
                        <View style={{marginTop:5}}>
                            <Right name="right" size={13} color="#b83a84"/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView> : <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{color:'#a00'}}>No data found</Text></View>
    }
    </>
    );
  }
}
