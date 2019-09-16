import React, { PureComponent } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image,ActivityIndicator } from "react-native";
import { styles } from '../styles';
import Header from './Header';

export default class ResetPassword extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            errPassword : '',
            errEmail: "",
            resMsg : '',
            showIndicator : false
        }
    }
    inputField = (text,field) => {
        if(field == "password"){
            this.setState({password : text})
        }
        else if(field == "email"){
            this.setState({email : text})
        }
        
    }
    resetPasswordHanlder = () => {
        this.setState({showIndicator : true})
        var form = new FormData()
        form.append('email',this.state.email)
        form.append('password',this.state.password)

        fetch('https://findit.com.mt/api/resetpass',{method:'POST',contentType: "multipart/form-data", body: form})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({resMsg : res.message})
            this.state.email === "" ? this.setState({errEmail: 'Please enter Email'}) : this.setState({errEmail: ''})
            this.state.password === "" ? this.setState({errPassword: 'Please enter password'}) : this.setState({errPassword: ''})
            
            if(this.state.email == "" || this.state.password == ""){
                this.setState({showIndicator : false})
            }

            if(res.message === "Password updated" && this.state.password !== "" && this.state.email !== ""){
                this.setState({showIndicator:false})  
                this.props.navigation.replace('Login')
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
                    </View> :
                    <View>  
                        <Header />
                        <Text style={styles.HeaderText}>Reset <Text style={styles.boldText}>Password?</Text></Text>
                        <Text style={styles.bodyTextBold}>Welcome back to MoneySaver. Please enter your password below:</Text>
                        <View style={styles.loginContent}>
                            <TextInput 
                                style={styles.inputs} 
                                placeholder="Email *"
                                onChangeText={(text) => this.inputField(text,"email")} />

                            <Text style={styles.errMsg}>{this.state.errEmail}</Text>

                            <TextInput 
                                secureTextEntry = {true}
                                style={styles.inputs} 
                                placeholder="Password *"
                                onChangeText={(text) => this.inputField(text,"password")} />

                            <Text style={styles.errMsg}>{this.state.errPassword}</Text>

                            <TouchableOpacity
                                onPress = {() => this.resetPasswordHanlder()} 
                                style={styles.btnApps}><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
                        </View>
                    </View>
                }
                
            </ScrollView>
        )
    }
}
