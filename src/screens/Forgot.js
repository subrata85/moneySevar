import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image,ActivityIndicator } from "react-native";
import { styles } from '../styles';
import Header from './Header';


class Forgot extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            errEmail : '',
            resMsg : '',
            showIndicator : false
        }
    }
    inputField = (text) => {
        this.setState({email : text})
    }
    forgetPasswordHanlder = () => {
        this.setState({showIndicator : true})

        var form = new FormData()
        form.append('email',this.state.email)
        fetch('https://findit.com.mt/api/forgotpass',{method:'POST',contentType: "multipart/form-data", body: form})
        .then(res => res.json())
        .then(res => {
            // this.setState({showIndicator : true})
            console.log(res);
            this.setState({resMsg : res.message})
            this.state.email === "" ? this.setState({errEmail: 'Please enter email'}) : this.setState({errEmail: ''})
            if(this.state.email === ""){
                this.setState({showIndicator : false})
            }
            if(this.state.resMsg !== "Sucess"){
                this.setState({showIndicator : false})
            }
            if(res.message === "Success" && this.state.email !== ""){
                  this.setState({showIndicator : false})
                  this.props.navigation.replace('ResetPassword')
            }
        })
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.showIndicator ?
                    <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                     <ActivityIndicator
                        style={{alignSelf:'center',marginVertical:150}}
                        size="large" />
                    </View>  : 
                    <View>
                        <Header />
                        <Text style={styles.HeaderText}>Forgot <Text style={styles.boldText}>Password?</Text></Text>
                        <Text style={styles.bodyTextBold}>Welcome back to MoneySaver. Please enter your email below:</Text>
                        <Text style={styles.bodyText}>Instructions to recover your account will be sent via email.</Text>

                        <View style={styles.loginContent}>
                            <TextInput 
                                style={styles.inputs} 
                                placeholder="Email *"
                                onChangeText={(text) => this.inputField(text)} />

                            <Text style={styles.errMsg}>{this.state.errEmail}</Text>
                            <Text style={styles.errMsg}>{this.state.resMsg == 'Unable to find your Email Address' ? this.state.resMsg : null}</Text>
                            <TouchableOpacity
                                onPress = {() => this.forgetPasswordHanlder()} 
                                style={styles.btnApps}><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
                        </View>
                    </View>
                }
            </ScrollView>
        );
    }
}

export default Forgot;
