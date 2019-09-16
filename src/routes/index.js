import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer,createSwitchNavigator } from "react-navigation";


import Icon from 'react-native-vector-icons/FontAwesome';
import MyAccount from 'react-native-vector-icons/MaterialCommunityIcons'


import Splash from "../screens/Splash";
import Splink from "../screens/Splink";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Forgot from "../screens/Forgot";
import ChangePass from "../screens/ChangePass";
import DealLanding from "../screens/DealLanding";
import FoodandDrink from "../screens/FoodandDrink";
import TermsAndCondition from "../screens/TermsAndCondition"
import Accounts_Detail from '../screens/Accounts_Detail';
import ContactUs from '../screens/ContactUs'
import FoodAndDrinkDetails from '../screens/FoodAndDrinkDetails';
import ResetPassword from '../screens/ResetPassword';
import Voucher from '../screens/Voucher';
import Header from '../screens/Header';
import AuthLoading from '../screens/AuthLoading';
import Reset from '../screens/ResetPassword'

const TabNavigator = createBottomTabNavigator(
    {
        // Login: {
        //     screen: Login,
        //     navigationOptions: {
        //         tabBarLabel: "Login",
        //         tabBarIcon: ({ tintColor }) => (<Icon name="user" size={20} color={tintColor} />)
        //     },
        // },
        // Register: {
        //     screen: Register,
        //     navigationOptions: {
        //         tabBarLabel: "Register",
        //         tabBarIcon: ({ tintColor }) => (<Icon name="user-plus" size={20} color={tintColor} />)
        //     },
        // },
        DealLanding: {
            screen: DealLanding,
            navigationOptions: {
                tabBarLabel: "Deal",
                tabBarIcon: ({ tintColor }) => (<Icon name="th" size={20} color={tintColor} />)
            },
        },
        // TermsAndCondition:{
        //     screen: TermsAndCondition,
        //     navigationOptions: {
        //         tabBarLabel: "TermsAndCondition",
        //         tabBarIcon: ({ tintColor }) => (<Icon name="user" size={20} color={tintColor} />)
        //     },
        // },
        Accounts_Detail:{
            screen: Accounts_Detail,
            navigationOptions: {
                tabBarLabel: "My Account",
                tabBarIcon: ({ tintColor }) => (<MyAccount name="account" size={20} color={tintColor} />)
            },
        },
        // Notification:{
        //     // screen: Notification,
        //     navigationOptions: {
        //         tabBarLabel: "Notification",
        //         tabBarIcon: ({ tintColor }) => (<Icon name="user" size={20} color={tintColor} />)
        //     },
        // },
        // ContactUs:{
        //     screen: ContactUs,
        //     navigationOptions: {
        //         tabBarLabel: "ContactUs",
        //         tabBarIcon: ({ tintColor }) => (<Icon name="user" size={20} color={tintColor} />)
        //     },
        // },
        // FoodAndDrinkDetails:{
        //     screen: FoodAndDrinkDetails,
        //     navigationOptions: {
        //         tabBarLabel: "FoodAndDrinkDetails",
        //         tabBarIcon: ({ tintColor }) => (<Icon name="user" size={20} color={tintColor} />)
        //     },
        // }

    },
    {
        order: ['Accounts_Detail','DealLanding'],
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#00aeac',
            inactiveTintColor: '#222222',
            style: {
                paddingBottom: '10',
                paddingTop: '10',
                backgroundColor: 'white',
            }
        },
    },
);

const AppStack = createStackNavigator(
    {

        Accounts_Detail: TabNavigator,
        ChangePass: ChangePass,
        ResetPassword: ResetPassword,
        DealLanding: DealLanding,
        FoodandDrink: FoodandDrink, 
        TermsAndCondition: TermsAndCondition,
        FoodAndDrinkDetails: FoodAndDrinkDetails,
        Voucher: Voucher,
        ContactUs: ContactUs, 
        
    },
    {
        headerMode: "none"
    }
    
);

const AuthStack = createStackNavigator(
    {
        
        Splink: Splink,
        Login : Login,
        Register: Register,
        Forgot: Forgot,
        ResetPassword: Reset,
        Header : Header,
    },
    {
        initialRouteName: 'Splink',
        headerMode: "none"
    }
)



export const AppContainer = createAppContainer(createSwitchNavigator(
    {
        Splash: Splash,
        App : AppStack,
        Auth : AuthStack
    },
    {
        initialRouteName: 'Splash',
        headerMode: "none"
    }
));
