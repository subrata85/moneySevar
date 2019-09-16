import React, { Component } from "react";
import { View, Image,TouchableOpacity,Modal,Text,Linking, Alert } from "react-native";
import { styles } from '../styles';
import {withNavigation} from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';


class Header extends Component {
    constructor(props){
        super(props);
        this.loadData();
        this.state={
            modalVisible: false,
            token : ''
        }
    }
    async componentDidMount(){
        const token = await AsyncStorage.getItem('token');

        this.setState({token : token})

        if(token == null){
            this.props.navigation.navigate('Auth');
        }
    }

    setModalVisible = () => {
        this.setState({modalVisible: !(this.state.modalVisible)});
    }

    async goto(value){
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if(token == null){
            Alert.alert(
                "Please Login to continue.",
                "",
                [
                  { text: "Ok", onPress: () => this.props.navigation.navigate('Auth') }
                ],
                { cancelable: false }
            );
        }
        else{
            this.props.navigation.navigate(value);
        }
        this.setModalVisible();
    }

    logout = async() => {
        const token = await AsyncStorage.getItem('token');
        if(token == null){
            alert('Please login first.');
            this.props.navigation.navigate('Auth');
        }
        else{
            await AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
        }
       
    }

    loadData = async() => {
       
        // console.log(`token ${token}`);
    }
    render() {
        return (
            <>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() =>{}}>
                    <View style={{marginTop: 22,backgroundColor:'#ececec',flex:1}}>
                        <View>
                            <View style={{borderBottomWidth:1,borderBottomColor:'#808080'}}>
                                <TouchableOpacity onPress={() => this.setModalVisible()}><Text style={styles.modalText}>Close Menu X</Text></TouchableOpacity> 
                            </View>
                            <View style={{borderBottomWidth:1,borderBottomColor:'#808080'}}>
                                <TouchableOpacity onPress={() => this.goto('DealLanding')}><Text style={styles.modalText}>Deals</Text></TouchableOpacity> 
                            </View>
                            { this.state.token ? <View style={{borderBottomWidth:1,borderBottomColor:'#808080'}}>
                                <TouchableOpacity onPress={() => this.goto('Accounts_Detail')}><Text style={styles.modalText}>My Account</Text></TouchableOpacity> 
                            </View> : null}
                            {/* <View style={{borderBottomWidth:1,borderBottomColor:'#808080'}}>
                                <TouchableOpacity><Text style={styles.modalText}>Contact Details</Text></TouchableOpacity> 
                            </View> */}
                            <View style={{borderBottomWidth:1,borderBottomColor:'#808080'}}>
                                <TouchableOpacity onPress={() => this.goto('ContactUs')}><Text style={styles.modalText}>Contact Us</Text></TouchableOpacity> 
                            </View>
                            <View style={{borderBottomWidth:1,borderBottomColor:'#808080'}}>
                                <TouchableOpacity onPress={() => this.goto('TermsAndCondition')}><Text style={styles.modalText}>Corporate</Text></TouchableOpacity> 
                            </View>
                            { this.state.token ? <View style={{borderBottomWidth:1,borderBottomColor:'#808080'}}>
                                <TouchableOpacity onPress={() => this.logout()}><Text style={styles.modalText}>Log out</Text></TouchableOpacity> 
                            </View> : null}
                            <View style={{marginVertical:10}}>
                                <View style={{marginHorizontal:10}}>
                                    <TouchableOpacity
                                    onPress={() => Linking.openURL('https://www.findit.com.mt/en/home.htm')} 
                                    style={styles.btnApps}><Text style={styles.btnText}>Go to <Text style={{fontWeight:'bold'}}>www.findit.com.mt</Text></Text></TouchableOpacity>
                                </View>
                               
                            </View>
                        </View>
                    </View>
                </Modal>
            
                <View style={styles.header}>
                    <Image style={styles.headLogo} source={require("../assets/top-logo.png")} />
                    <TouchableOpacity onPress={() => this.setModalVisible()}>
                        <Image style={styles.humbMenu} source={require("../assets/menu.png")} />
                    </TouchableOpacity>

                </View>
            </>
        );
    }
}

export default withNavigation(Header);
