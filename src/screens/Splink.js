import React, { Component } from "react";
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { styles } from '../styles';
import FaceBook from 'react-native-vector-icons/Foundation';
// import Google from 'react-native-vector-icons/FontAwesome';
import { LoginManager, LoginButton, AccessToken } from "react-native-fbsdk";
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from "react-native-gesture-handler";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const win = Dimensions.get('window');
const { width, height } = Dimensions.get('window')
const ratio = win.width / 180;

class Splink extends Component {

  async componentDidMount() {
    let token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token !== null ? 'App' : 'Auth');
    this.setupGoogleSignIn();
  }

  setupGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.configure({
        ClientId:
          "442517210907-5382t2gv5rb45rsg1tfme6etn02d10ev.apps.googleusercontent.com",
        forceConsentPrompt: false
      });
    } catch (err) {
      Alert.alert("Play service error" + err.code, err.message);
    }
  };

  fbLogin = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }


  onPressGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      AsyncStorage.setItem("currentUserId", userInfo.user.id);
      AsyncStorage.setItem("currentUserName", userInfo.user.name);
      AsyncStorage.setItem("currentUserEmail", userInfo.user.email);
      AsyncStorage.setItem("currentUserPhoto", userInfo.user.photo);
    } catch (error) {
      console.log("error", error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Cancelled", "Sign in is cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Progress", "Sign in is progresses");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Service", "PLAY_SERVICES_NOT_AVAILABL");
      } else {
        Alert.alert("Error" + " " + error.code, error.message);
      }
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.splash}>
          <Image style={{ width: width, height: height }} source={require("../assets/splink2.jpg")} />
          <View style={styles.splink}>
            <TouchableOpacity style={styles.splinkBtnAppsLogin} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.splinkBtnText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.splinkBtnAppsJoinNow}>
              <Text style={styles.splinkBtnTextJoinNow} onPress={() => this.props.navigation.navigate('Register')}>Join Now</Text>
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', paddingHorizontal: 50, marginVertical: 10 }}>
              <Text style={{ fontSize: 12, textAlign: "center", color: '#808080', fontWeight: '600' }}>Sign up to Findit! with your social media account or fill the details below</Text>
            </View>

            <View>
              <TouchableOpacity style={styles.socialLoginFacebook} onPress={() => this.fbLogin()}>
                <View style={styles.iconContainer}>
                  <FaceBook name="social-facebook" size={40} color="#ffffff" />
                </View>
                <Text style={styles.socialLoginBtnText}>Login with Facebook</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.socialLoginGoogle} onPress={() => this.signIn()}>
                            <View style={styles.iconContainer}>
                                <Google name="google" size={30} color="#4285F4"/>
                            </View>
                            <Text style={styles.socialLoginBtnText}><Text style={{color:"#000000",fontWeight:'200'}}>Login with Google</Text></Text>
                        </TouchableOpacity> */}


              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => this.onPressGoogleSignIn()}
              //disabled={this.state.isSigninInProgress} 
              />

            </View>

          </View>
        </View>
      </ScrollView>
    );
  }
}


const stylesImg = StyleSheet.create({
  imageStyle: {
    width: win.width,
    height: 362 * ratio,
  }
});

export default Splink;
