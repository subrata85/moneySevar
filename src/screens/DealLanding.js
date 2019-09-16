import React, { Component } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image,ActivityIndicator,TextInput } from "react-native";
import { styles } from '../styles';
import Header from './Header';
import SearchBox from "./SearchBox";
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';

class DealLanding extends Component {
    constructor(props){
        super(props)
        this.state = {
            datas : [],
            showIndicator : true,
            matchedValues : [],
            dataNotFound : false,
            show:true,
            categoryId : '',
            token : '',
            active_tab:2
        };
        // this.loadData()
    }
   
    onPressFoodDrink = (id) => { 
        console.log(`category_id  ${id}`)

        this.props.navigation.navigate("FoodandDrink",{category_id : id}); 
    }

    async componentDidMount(){
        
        const token = await AsyncStorage.getItem('token');
        this.setState({token : token})
        if(token == null){
            this.props.navigation.replace('Login')
        }

        fetch('https://findit.com.mt/api/categories',{
            method : 'GET',
            contentType: "multipart/form-data",
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.setState({
                datas : response.data,
                showIndicator : !(this.state.showIndicator)
            
            })
            console.log('Deal landing:' + " " + this.state.datas)
        })
        .catch(error => console.log(error)) 
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

    loadData = async() => {
        const token = await AsyncStorage.getItem('token');
        this.setState({token : token})
        if(token == null){
            this.props.navigation.replace('Login')
        }
    }
    render() {
        const {datas : datafile,matchedValues} = this.state;

        let op;
        if(this.state.showIndicator){
            op = (
                <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                    <ActivityIndicator
                    style={{alignSelf:'center',marginVertical:150}}
                    size="large" />
                </View> 
            )
        }
        // Retreving category_id

        const category_id = datafile.map((data) => data.category_id)

        if(!this.state.showIndicator && this.state.show){
            op=(
                datafile.map((data,i)=>{
                    // this.setState({categoryId : data.category_id})
                    return(
                        <TouchableOpacity
                            key = {i}
                            onPress={() => this.onPressFoodDrink(data.category_id)} style={styles.itemLanding}>
                                <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={data.image} /></View>
                                <Text style={styles.landingIcText}>{data.name}</Text>
                        </TouchableOpacity>
                    )
                }) 
            )
        }
        if(!this.state.show){
            console.log(`executing ${this.state.show}`)
            op=(
                matchedValues.map((data,i)=>{
                    return(
                        <TouchableOpacity
                            key = {i} 
                            onPress={() => this.onPressFoodDrink(data.id)} style={styles.itemLanding}>
                                <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={data.image} /></View>
                                <Text style={styles.landingIcText}>{data.name}</Text>
                        </TouchableOpacity>
                    )
                })
            )
        }
        return (
        <>
        { this.state.token == null ? <ActivityIndicator/> : 
            <ScrollView style={styles.container}>
                <Header />
                {/* <SearchBox /> */}
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
                {/* end of search box */}
                <Text style={styles.HeaderText}>Stop Looking..Start <Text style={styles.boldText}>Finding!</Text></Text>
                <View style={styles.Landingcover}>
                    {
                         this.state.dataNotFound ? <Text style={{fontSize:20}}>Data not found</Text> : op
                    }    
                    
                    {/* <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/shopping.png")} /></View>
                        <Text style={styles.landingIcText}>Shopping</Text>
                    </View>
                    <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/homegarden.png")} /></View>
                        <Text style={styles.landingIcText}>Home &amp; Garden</Text>
                    </View>
                    <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/healthbeauty.png")} /></View>
                        <Text style={styles.landingIcText}>Health &amp; Beauty</Text>
                    </View>
                    <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/leisure.png")} /></View>
                        <Text style={styles.landingIcText}>Leisure</Text>
                    </View>
                    <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/traveltourism.png")} /></View>
                        <Text style={styles.landingIcText}>Travel &amp; Tourism</Text>
                    </View>
                    <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/motoring.png")} /></View>
                        <Text style={styles.landingIcText}>Motoring</Text>
                    </View>
                    <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/boating.png")} /></View>
                        <Text style={styles.landingIcText}>Boating</Text>
                    </View>
                    <View style={styles.itemLanding}>
                        <View style={styles.LandingImgCov}><Image style={styles.LandingIcon} source={require("../assets/itelectronics.png")} /></View>
                        <Text style={styles.landingIcText}>IT &amp; Electronics</Text>
                    </View> */}

                </View>
            </ScrollView>
        }
        </>
        );
    }
}

export default DealLanding;
