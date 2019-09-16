import React, { Component } from "react";
import { View, TextInput, TouchableOpacity, Text, ScrollView, Image,AsyncStorage,ActivityIndicator } from "react-native";
import { styles } from '../styles';
import Header from './Header';
// import console = require("console");

class ChangePass extends Component {
    constructor(props){
        super(props)
        this.state={
            token : '',
            oldPassword : '',
            newPassword : '',
            confirmPassword : '',
            errOldPassword : '',
            errNewPassword : '',
            errConfirmPasssword : '',
            loading : false

        }
    }

    async componentDidMount(){
        let token = await AsyncStorage.getItem('token');

        this.setState({token : token})

    }
    allInputFields = (text,field) => {
        if(field == 'oldPassword'){
            this.setState({oldPassword : text})
        }
        if(field == 'newPassword'){
            this.setState({newPassword : text})
        }
        if(field == 'confirmPassword'){
            this.setState({confirmPassword : text})
        }
    }
    
    passwordChangeHandler = () => {

        this.state.oldPassword == "" ? this.setState({errOldPassword : 'Please enter old password'}) : this.setState({errOldPassword: ''})

        this.state.newPassword == "" ? this.setState({errNewPassword : 'Please enter new password'}) : this.setState({errNewPassword: ''})

        this.state.confirmPassword == "" ? this.setState({errConfirmPasssword : 'Please enter confirm password'}) : this.setState({errConfirmPasssword : ''})
       
        if(this.state.newPassword == this.state.oldPassword && (this.state.oldPassword !== "" && this.state.newPassword !== "")) {

            this.setState({errNewPassword : `Old password and new password should not be same`});

        }

        if(this.state.newPassword !== this.state.confirmPassword && (this.state.newPassword !== "" && this.state.confirmPassword !== "")){

            this.setState({errConfirmPasssword : `New password and Confrim password do not match`})

        }
        
        if(this.state.oldPassword !== this.state.newPassword &&(this.state.oldPassword !== "" && this.state.newPassword !== "" && this.state.confirmPassword !== "") && (this.state.newPassword == this.state.confirmPassword)){

            this.setState({loading : true})

            let form = new FormData();

            form.append('token',this.state.token);
    
            form.append('oldpass',this.state.oldPassword);
            
            form.append('newpass',this.state.newPassword);    
            
            fetch('https://findit.com.mt/api/changepass',{method:'POST',contentType: "multipart/form-data", body: form})
                .then(res => res.json())
                .then(res => {
                console.log(res);

                if(res.message == "Old password is wrong"){

                    alert('Old password is wrong')

                }

                if(res.message == "Password is updated"){

                    this.setState({loading : false});

                    alert("Password is updated");

                    this.props.navigation.navigate('Accounts_Detail');

                }
            })

        }

        
    }
    render() {
        return (
        <>
            { this.state.loading ? <ActivityIndicator style={{alignSelf:'center',marginVertical:150}} size="large"/> :
            <ScrollView style={styles.container}>
            
                <Header />
                <Text style={styles.HeaderText}>Change My <Text style={styles.boldText}>Password?</Text></Text>
                <Text style={styles.bodyText}>To Change your password fill in the details below and click change password:</Text>
                <View style={styles.loginContent}>
                    <View>
                        <TextInput style={styles.inputs} secureTextEntry={true} placeholder="Old Password" onChangeText={(text) => this.allInputFields(text,'oldPassword')}/>    
                        <Text style={styles.errMsg}>{this.state.errOldPassword}</Text>
                    </View>
                    <View>
                        <TextInput style={styles.inputs} secureTextEntry={true} placeholder="New Password" onChangeText={(text) => this.allInputFields(text,'newPassword')}/>
                        <Text style={styles.errMsg}>{this.state.errNewPassword}</Text>
                    </View>
                    <View>
                        <TextInput style={styles.inputs} secureTextEntry={true} placeholder="Confirm New Password"  onChangeText={(text) => this.allInputFields(text,'confirmPassword')}/>
                        <Text style={styles.errMsg}>{this.state.errConfirmPasssword}</Text>
                    </View>
                
                    <TouchableOpacity style={styles.btnApps} onPress={() => this.passwordChangeHandler()}><Text style={styles.btnText}>Change Password</Text></TouchableOpacity>
                </View>
            </ScrollView> 
            }
        </>
        );
    }
}

export default ChangePass;
