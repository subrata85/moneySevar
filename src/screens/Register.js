import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image, CheckBox,Alert,ActivityIndicator } from "react-native";
import { styles } from '../styles';
import Header from './Header';
import FaceBook from 'react-native-vector-icons/Foundation'
import Google from 'react-native-vector-icons/FontAwesome'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            email2: '',
            password: '',
            confirm_password: '',
            errName: '',
            errLastname: '',
            errEmail: '',
            errEmail2: '',
            errPass: '',
            errPass2: '',
            radioButton: 'value1',
            radioButton2: 'value2',
            resMsg: '',
            id: '',
            loading : false
            
        }
    }

    allinputFild(text, field) {
        if (field == 'name') {
            this.setState({ name: text });
        } else if (field == 'surname') {
            this.setState({ surname: text });
        } else if (field == 'email') {
            // var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            // if (reg.test(field)){
                this.setState({ email: text });
            // }else{
                // alert('Invalid email address')
            // }

        } else if (field == 'email2') {
            this.setState({ email2: text });
        } else if (field == 'password') {
            this.setState({ password: text });
        } else if (field == 'confirm_password') {
            this.setState({ confirm_password: text });
        }
    }

    validation = () => {
       
    }

    handlePress = () => {
        const {name,surname,email,email2,password,confirm_password} = this.state;


        name === "" ? this.setState({ errName: 'Please enter name.' }) : this.setState({ errName: '' })
        surname === "" ? this.setState({ errLastname: 'Please enter last name.' }) : this.setState({ errLastname: '' })
        email === "" ? this.setState({ errEmail: 'Please enter email.' }) : this.setState({ errEmail: '' })
        email === email2 ? this.setState({ errEmail2: '' }) : this.setState({ errEmail2: 'Email and Confirm email do not match.' })
        password === "" ? this.setState({ errPass: 'Please enter password.' }) : this.setState({ errPass: '' })
        password === confirm_password ? this.setState({ errPass2: '' }) : this.setState({ errPass2: 'Password and Confirm password do not match.' })


        if(name != "" && surname !== "" && email != "" && email2 != "" && password != "" && confirm_password != "" && (email == email2 && password == confirm_password)){
            this.setState({loading : true})


            var form = new FormData();

            form.append("name", this.state.name);

            form.append("surname", this.state.surname);

            form.append("email", this.state.email);

            form.append("password", this.state.password);

            console.log('form : '+JSON.stringify(form));

            fetch('https://findit.com.mt/api/registration', { method: 'POST', contentType: "multipart/form-data", body: form })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.message == "Email already exist"){

                    this.setState({loading : false});

                    Alert.alert("Email already exist");

                }
                else if(res.message == "Registration is successfully"){

                    this.setState({loading : false});

                    this.props.navigation.navigate('Login');

                }

                
            })
        }

        

    };

    render() {
        return (
            <>
            { this.state.loading ? <ActivityIndicator style={{alignSelf:'center',marginVertical:150}} size="large"/> : 
            <ScrollView style={styles.container}>
                <Header />
                <Text style={styles.HeaderText}>Register to  <Image style={styles.headingLogo} source={require("../assets/screen-logo.png")} /></Text>
                <Text style={styles.bodyText}>Create your MoneySever account by filling in the form below:</Text>

                <View style={styles.loginContent}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="First Name*"
                        onChangeText={(text) => this.allinputFild(text, 'name')}
                    />
                    <Text style={styles.errMsg}>{this.state.errName}</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Last Name*"
                        onChangeText={(text) => this.allinputFild(text, 'surname')}
                    />
                    <Text style={styles.errMsg}>{this.state.errLastname}</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Email*"
                        onChangeText={(text) => this.allinputFild(text, 'email')}
                    />
                    <Text style={styles.errMsg}>{this.state.errEmail}</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Confirm Email*"
                        onChangeText={(text) => this.allinputFild(text, 'email2')}
                    />
                    <Text style={styles.errMsg}>{this.state.errEmail2}</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Password*"
                        secureTextEntry={true}
                        onChangeText={(text) => this.allinputFild(text, 'password')}
                    />
                    <Text style={styles.errMsg}>{this.state.errPass}</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Confirm Password*"
                        secureTextEntry={true}
                        onChangeText={(text) => this.allinputFild(text, 'confirm_password')}
                    />
                    <Text style={styles.errMsg}>{this.state.errPass2}</Text>

                    {/* <View style={styles.checkboxStyle}><CheckBox title='value1' checked={this.state.radioButton === 'value1'} onPress={() => this.setState({ radioButton: 'value1' })} /><Text style={styles.checkTxt}>Yes, send me offers and information from findit.com.mt</Text></View>
                    <View style={styles.checkboxStyle}><CheckBox title='value2' checked={this.state.radioButton2 === 'value2'} onPress={() => this.setState({ radioButton2: 'value2' })} /><Text style={styles.checkTxt}>I would like to receive promotional offers from third-parties</Text></View> */}

                    <Text style={styles.errMsg}>{this.state.resMsg}</Text>
                    <TouchableOpacity style={styles.btnApps} 
                        onPress={() => this.handlePress(this.state.name,this.state.surname)}>
                            <Text style={styles.btnText}>Create Account</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: '#F0F0F0', height: 2, flex: 1, alignSelf: 'center'}} />
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 18,color:'#B8B8B8' }}>OR</Text>
                        <View style={{backgroundColor: '#F0F0F0', height: 2, flex: 1, alignSelf: 'center'}} />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{marginRight:5}}>Already have an account!</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={{fontWeight:'600',color:'#b83a84'}}>Sign In</Text></TouchableOpacity>
                    </View>
                    {/* <View style={{marginHorizontal:45}}>
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
                </View>
                {/* <Text style={styles.bodyTextLast}>By clicking Log In, Log In with Facebook or Log In with Google, you agree to the Terms of Use and Privacy Policy.</Text> */}
            </ScrollView>
            }
            </>
        );
    }
}

export default Login;
