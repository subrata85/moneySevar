import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image,Dimensions,ActivityIndicator } from "react-native";
import { styles } from '../styles';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome'
// import SearchBox from "./SearchBox";
import AsyncStorage from '@react-native-community/async-storage';
import { throwStatement } from "@babel/types";
const {width,height} = Dimensions.get('window')

class FoodandDrink extends Component {
    constructor(props){
        super(props);
        this.state = {
            datas : [],
            sub  : '',
            show : true,
            matchedValues : [],
            id : '',
            loading : false
        }
    }
    componentDidMount(){        
        this.setState({loading:true})

        const { navigation } = this.props;
        const itemId = navigation.getParam('category_id');

        console.log(`item Id ${itemId}`)

        fetch('https://findit.com.mt/api/articlesbycategory?id='+itemId,{
            method : 'POST',
            contentType: "multipart/form-data",
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({datas : res.data});

            this.setState({loading : false});

        })
    }
    async onSubmit(id,publish_date,code){

        const token = await AsyncStorage.getItem('token');

        var form = new FormData()

        form.append('id',id);

        form.append('token',token);

        var formSub = new FormData();

        formSub.append('token',token)

        fetch('https://findit.com.mt/api/getsubscription',{method:'POST',contentType: "multipart/form-data", body: formSub})
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.message == "There is no susbcription"){
                alert('Please subscribe to continue');
                this.props.navigation.navigate('Accounts_Detail')
            }
            else{
                fetch('https://findit.com.mt/api/checkvoucher',{ method : 'POST',contentType: "multipart/form-data",body: form})
                .then(res => res.json())
                .then(res => {
                    if(res.message == "Voucher wasn't used"){
                        alert(res.message)
                        this.props.navigation.navigate('FoodAndDrinkDetails',{id : id,publish_date:publish_date,code:code})
                    }
                    else{
                        alert(res.message);
                        // this.props.navigation.replace('App');
                    }
                })
            }
        })

        
        
        
    }

    searchHandler = (value) => {
        const string = value;
        console.log(` string ${string}`);
        let items = []
        if(value !== ""){
            items = this.state.datas.filter(item => {
                let lc = item.name.toString().toLowerCase();
                let filter = value.toString().toLowerCase();
                return lc.includes(filter);
            })
        }
        else{
            items = [...this.state.datas]
        }
        console.log(`items : ${items}`)
        this.setState({
            matchedValues :  items,
            show : false
        })
    }


    render() {


        const{datas,matchedValues} = this.state;

        console.log({datas});

        let op;
        if(datas !== null && this.state.show){
            op = (
                datas.map((item,id)=>{
                        let desc = item.description;
                        if(desc.length > 10){
                            desc = desc.substring(0,60);
                        }
                        return(
                          
                                <View style={styles.itemInner} key={item.id}>
                                    <View>
                                        <Image style={{width: width*.92, height: 200}} source={{ uri: item.mainimage }} />
                                    </View>
                                    <View style={styles.descItem}>
                                        <View style={{width:width*0.5}}>
                                            <View>
                                                <Text style={styles.HeadListItm}>{item.name}</Text>
                                                <Text style={styles.bodyListItm}>{desc}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={styles.btnApps} onPress={() =>this.onSubmit(item.id,item.publish_date,item.code)}>
                                                <Text style={styles.voucherText}>Use Voucher</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            
                        )
                    })
                )
        }
        
        
        if( !this.state.show){
            op=(
                matchedValues.map((item,i)=>{
                    let desc = item.description;
                    if(desc.length > 10){
                        desc = desc.substring(0,60);
                    }
                    return(
                        <View style={styles.itemInner} key={item.id}>
                        <Image style={{width: width*.92, height: 200}} source={{ uri: item.mainimage }} />
                        <View style={styles.descItem}>
                            <View style={{width:width*0.5}}>
                                <View>
                                    <Text style={styles.HeadListItm}>{item.name}</Text>
                                    <Text style={styles.bodyListItm}>{desc}</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() =>this.onSubmit(item.id,item.publish_date,item.code)}>
                                    <Text style={styles.vouture}>Use Voucher</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> 
                    )
                }) 
            )
        }

        if(datas == null){
            op = (
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.errMsg}>No data found</Text>
                </View>
            )
        }
        return (
        <>{ this.state.loading ? <ActivityIndicator style={{alignSelf:'center',marginVertical:150}} size="large"/> : 
            <ScrollView style={styles.container}>
                <Header />

                {/*  */}
                <View style={{backgroundColor:'#f4f4f4'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',borderWidth:1,borderColor:'#b9b9b9',margin:15}}>
                        <View style={{paddingLeft:10}}>
                        <TextInput
                            type="text"
                            onChangeText={(value) => this.searchHandler(value)}
                            placeholder="What are you looking for" />
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',paddingRight:10,fontWeight:'bold'}}>
                        <Icon name="search" size={20} color="#808080"/>
                        </View>
                    </View>
                </View>
                {/*  */}


                <View style={styles.listWrapper}>
                    {
                        op
                    }
                    {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('FoodAndDrinkDetails')}>
                        <View style={styles.itemInner}>
                            <Image style={styles.itemImag} source={require("../assets/1.png")} />
                            <View style={styles.descItem}>
                                <View style={styles.desDetils}>
                                    <Text style={styles.HeadListItm}>15% OFF your Meal</Text>
                                    <Text style={styles.bodyListItm}>TemptAsian Fusion Restaurents</Text>
                                </View>
                                <Text style={styles.vouture}>Use Voucher</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.itemInner}>
                        <Image style={styles.itemImag} source={require("../assets/2.png")} />
                        <View style={styles.descItem}>
                            <View style={styles.desDetils}>
                                <Text style={styles.HeadListItm}>15% OFF your Meal</Text>
                                <Text style={styles.bodyListItm}>TemptAsian Fusion Restaurents</Text>
                            </View>
                            <Text style={styles.vouture}>Use Voucher</Text>
                        </View>
                    </View>
                    <View style={styles.itemInner}>
                        <Image style={styles.itemImag} source={require("../assets/3.png")} />
                        <View style={styles.descItem}>
                            <View style={styles.desDetils}>
                                <Text style={styles.HeadListItm}>15% OFF your Meal</Text>
                                <Text style={styles.bodyListItm}>TemptAsian Fusion Restaurents</Text>
                            </View>
                            <Text style={styles.vouture}>Use Voucher</Text>
                        </View>
                    </View>
                    <View style={styles.itemInner}>
                        <Image style={styles.itemImag} source={require("../assets/1.png")} />
                        <View style={styles.descItem}>
                            <View style={styles.desDetils}>
                                <Text style={styles.HeadListItm}>15% OFF your Meal</Text>
                                <Text style={styles.bodyListItm}>TemptAsian Fusion Restaurents</Text>
                            </View>
                            <Text style={styles.vouture}>Use Voucher</Text>
                        </View>
                    </View>
                    <View style={styles.itemInner}>
                        <Image style={styles.itemImag} source={require("../assets/2.png")} />
                        <View style={styles.descItem}>
                            <View style={styles.desDetils}>
                                <Text style={styles.HeadListItm}>15% OFF your Meal</Text>
                                <Text style={styles.bodyListItm}>TemptAsian Fusion Restaurents</Text>
                            </View>
                            <Text style={styles.vouture}>Use Voucher</Text>
                        </View>
                    </View>
                    <View style={styles.itemInner}>
                        <Image style={styles.itemImag} source={require("../assets/3.png")} />
                        <View style={styles.descItem}>
                            <View style={styles.desDetils}>
                                <Text style={styles.HeadListItm}>15% OFF your Meal</Text>
                                <Text style={styles.bodyListItm}>TemptAsian Fusion Restaurents</Text>
                            </View>
                            <Text style={styles.vouture}>Use Voucher</Text>
                        </View>
                    </View> */}
                </View>
            </ScrollView>
        }
        </>
        );
    }
}

export default FoodandDrink;
