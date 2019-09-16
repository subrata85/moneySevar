import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image, Dimensions,ActivityIndicator } from "react-native";
import { styles } from '../styles';
import Header from './Header';
import FaceBook from 'react-native-vector-icons/Foundation'
import Google from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';


const{width,height} = Dimensions.get('screen')

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errEmail: '',
            errPass: '',
            resMsg : '',
            id : '',
            token : '',
            loading : false
        }
    }

    allinputFild(text, field) {
        if (field == 'email') {
            this.setState({ email: text });
        } else if (field == 'password') {
            this.setState({ password: text });
        }
    }

    onPressForgot = () => { this.props.navigation.navigate("Forgot"); }
    onPressRegister = () => { this.props.navigation.navigate("Register"); }

    _handlePress = async() => {

        this.state.email == "" ? this.setState({ errEmail: 'Please enter email.' }) : this.setState({ errEmail: '' });
        this.state.password =="" ? this.setState({ errPass: 'Please enter password .' }) : this.setState({ errPass: '' });

        if(this.state.email != "" && this.state.password != ""){
            this.setState({loading : true})

            var form = new FormData();

            form.append("email", this.state.email);

            form.append("password", this.state.password);

            await fetch('https://findit.com.mt/api/login',{method:'POST',contentType: "multipart/form-data", body: form})
            .then(res=>res.json())
            .then(res => {
                console.log(res)

                if(res.data !== "Invalid Username or Password" && this.state.email !== "" && this.state.password !== ""){
                    console.log(`Login ${res.message}`)

                    this.setState({token : res.data.token})

                    AsyncStorage.setItem('token',this.state.token);

                    AsyncStorage.setItem('password',this.state.password);

                    this.setState({loading : false})

                    this.props.navigation.navigate('Accounts_Detail')
                }
                else if(res.data == "Invalid Username or Password"){

                    this.setState({loading:false})

                    this.setState({resMsg : res.data})
                }
                else{

                    this.setState({loading : false});

                    this.setState({resMsg : ''})
                }
                
            
            })

        }
        
        
        
    }

    render() {
        // if(this.props.token == null){
        //     this.state.email = "";
        //     this.state.password = "";
        // }
        return (
            <>
            { 
             this.state.loading ? <ActivityIndicator style={{alignSelf:'center',marginVertical:150}} size="large"/> : 
            <ScrollView style={styles.container}>
                <Header/>
                <Text style={styles.HeaderText}>Login to  <Image style={styles.headingLogo} source={require("../assets/screen-logo.png")} /></Text>
                {/* <Text style={styles.bodyText}>Log in to MoneySaver with your social media account or email address</Text> */}


                {/* <View style={{marginHorizontal:45,paddingHorizontal:35}}>
                    <TouchableOpacity style={styles.socialLoginFacebook}>
                        <View style={{paddingRight:5,justifyContent:'center'}}>
                            <FaceBook name="social-facebook" size={30} color="#ffffff"/>
                        </View>
                        <Text style={styles.socialLoginBtnText}>Login with Facebook</Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity style={styles.socialLoginGoogle}>
                        <View style={{paddingRight:5,justifyContent:'center'}}>
                            <Google name="google" size={30} color="#4285F4"/>
                        </View>
                        <Text style={styles.socialLoginBtnText}><Text style={{color:"#000000",fontWeight:'200'}}>Login with Google</Text></Text>
                    </TouchableOpacity>
                </View> */}



                <View style={{flexDirection: 'row',marginHorizontal:10}}>
                    <View style={{backgroundColor: '#F0F0F0', height: 2, flex: 1, alignSelf: 'center'}} />
                    {/* <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 18,color:'#B8B8B8' }}>OR</Text> */}
                    <View style={{backgroundColor: '#F0F0F0', height: 2, flex: 1, alignSelf: 'center'}} />
                </View>

                <View style={styles.loginContent}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Username*"
                        onChangeText={(text) => this.allinputFild(text, 'email')}
                    />
                    <Text style={styles.errMsg}>{this.state.errEmail}</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password*"
                        secureTextEntry={true}
                        onChangeText={(text) => this.allinputFild(text, 'password')}
                    />
                    <Text style={styles.errMsg}>{this.state.errPass}</Text>
                    <View style={styles.frmTxt}>
                        <TouchableOpacity onPress={this.onPressForgot.bind(this)}><Text style={styles.splLink}>Forgot Password?</Text></TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize : width * 0.037}}> &nbsp;&nbsp;New user? Click here to&nbsp; </Text>
                            <TouchableOpacity onPress={this.onPressRegister.bind(this)}><Text style={styles.splLink}>Register</Text></TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.errMsg}>{this.state.resMsg}</Text>
                    <TouchableOpacity style={styles.btnApps} 
                        onPress={() => this._handlePress()}>
                            <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            }
            </>
        );
    }
}

export default Login;
