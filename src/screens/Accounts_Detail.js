import React, { Component } from 'react'
import { Text, View, ScrollView,CheckBox,Switch,TouchableOpacity,TextInput,ActivityIndicator,Dimensions,BackHandler,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from '../styles';
import Header from './Header';
import AsyncStorage from '@react-native-community/async-storage';


const{width,height} = Dimensions.get('screen')

export default class Accounts_Detail extends Component {

    constructor(props){
        super(props)
        this.state = {
            fname : '',
            lname : '',
            email : '',
            checkBox1 : false,
            checkBox2 : false,
            activeSwitch1 :  false,
            activeSwitch2 : false,
            errFname :'',
            errLname : '',
            errEmail : '',
            id: '',
            token : '',
            datas : {},
            expire : '',
            loading :  false,
            count_exit:0
        }

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    allInputField = (text,field) =>{
        if(field == 'fname'){
            this.setState({fname : text})
        }
        else if(field == 'lname'){
            this.setState({lname : text})
        }
        else if(field == 'email'){
            this.setState({email : text})
        }
    }

    componentDidMount(){

        this.setState({loading : !(this.state.loading)})

        console.log(`loading ${this.state.loading}`)

      //  BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        // this.handleBackPress()


       



        this.init();

    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount(){

        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);

        // this.handleBackPress()
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    handleBackButtonClick() {
        



        if (this.props.navigation.isFocused()) {
            Alert.alert(
            "Exit App",
            "Do you want to exit?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => BackHandler.exitApp() }
            ],
            { cancelable: false }
            );
        }

        this.props.navigation.goBack(null);
        return true;
    }



    handleBackPress = () => {

        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
              {text: 'No', onPress: () => alert(this.constructor.name), style: 'cancel'},
              {text: 'Yes', onPress: () => {
                  alert(this.constructor.name)
              }},
            ],
            { cancelable: false }
        );

        // return true;
        //alert(this.constructor.name)
        return true;


    }

    init = async() => {

        let token = await AsyncStorage.getItem('token');

        this.setState({token : token});

        var form = new FormData();

        form.append('token',token);

        fetch('https://findit.com.mt/api/profile',{method:'POST',contentType: "multipart/form-data", body: form})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            let fname = res.data.name.split(' ').slice(0, -1).join(' ');
            let lname = res.data.name.split(' ').slice(-1).join(' ');
            let email = res.data.username;
            this.setState({fname: fname,lname: lname,email: email});
            
        })
    
    
        var form1 = new FormData();
        form1.append('token',token);

        fetch('https://findit.com.mt/api/getsubscription',{method:'POST',contentType: "multipart/form-data", body: form1})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({datas : res.data})
            
            if(res.data !== null){
                console.log('inside res.data');

                let date = res.data.enddate.split(' ').slice(0, -1).join(' ');

                this.setState({expire : date})
            }
            
            if(res.message == "There is no susbcription"){

                console.log('inside res.message');

                alert('There is no subscription');

                this.setState({loading : false})

                this.setState({expire : 'Not valid'});


            }
            if(res.message == "Subscription is founded"){
              
                this.setState({loading : false});

                this.setState({activeSwitch1 : true});

            }
        })
    

    }


    

    async handlePress(){


        this.state.fname === "" ? this.setState({errFname : 'Please enter firstname'}) : this.setState({errFname : ''})
        this.state.lname === "" ? this.setState({errLname: 'Please enter lastname'}) : this.setState({errLname: ''})
        // this.state.email === "" ? this.setState({errEmail: 'Please enter email'}) : this.setState({errEmail: ''});
        if(this.state.fname !== "" && this.state.lname !== ""){

            this.setState({loading : true});

            let update = true;
            let token = await AsyncStorage.getItem('token');
            var form = new FormData()
            form.append('token',token);
            form.append('firstname',this.state.fname);
            form.append('lastname',this.state.lname);
            form.append('update',update);
      
            console.log('form'+JSON.stringify(form))

        
            fetch('https://findit.com.mt/api/profile',{method:'POST',contentType: "multipart/form-data", body: form})
            .then(res => res.json())
            .then(res => {
                console.log(`response : ${JSON.stringify(res)}`);
    
                this.setState({loading : false});
    
                alert(res.message);
    
            })
        }

    }

    addSubscription = () => {
        this.setState({activeSwitch1 : true});

        var form = new FormData();

        // console.log(`switch ${this.state.activeSwitch1}`)

        console.log(`token ${this.state.token}`)

        form.append('token',this.state.token);

        fetch('https://findit.com.mt/api/addsubscription',({method:'POST',contentType: "multipart/form-data", body: form}))
        .then(res => res.json())
        .then(res => {

            console.log(res);

            // alert(res.message);
           
        })


        console.log(`get sub`);

        fetch('https://findit.com.mt/api/getsubscription',{method:'POST',contentType: "multipart/form-data", body: form})
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({datas : res.data})
            
            if(res.data !== null){
                console.log('inside res.data');

                let date = res.data.enddate.split(' ').slice(0, -1).join(' ');

                this.setState({expire : date})
            }
            
            if(res.message == "Subscription is founded"){
              
                this.setState({loading : false});

                this.setState({activeSwitch1 : true});

            }
        })


        
    }

    changePassword = () =>{
        this.props.navigation.navigate('ChangePass')
    }

    render() {
        return (
        <>
        { this.state.loading == true ? <ActivityIndicator style={{alignSelf:'center',marginVertical:150}} size="large"/> :
            <ScrollView>
                <Header/>
                <View style={{marginHorizontal:20,color:'black'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={styles.accountDetailsHeaderText}>
                        <Icon name="account" size={30}/>
                        <Text style={{fontWeight:'bold',marginHorizontal:10}}>Account</Text>
                        <Text>Details</Text>  
                      </Text>
                    </View>
                    <View>
                        <Text style={styles.accountDetailsHeaderText}>Hello,{`${this.state.fname} ${this.state.lname}`}</Text>
                        <Text style={{fontSize: width*0.037,color:'#808080'}}>Your Account details below,update your account information please select Save Changes</Text>
                    </View>
                    <View style={{marginTop:10,marginBottom:10}}>
                        <View>
                            <Text style={styles.accountDetailsInputText}>First Name:</Text>
                            <View style={styles.accountDetailsInputBox}>  
                                <TextInput 
                                    style={{padding:10,fontSize:18}}
                                    value={this.state.fname}
                                    onChangeText={(text)=>this.allInputField(text,'fname')}/>
                            </View>
                            <Text style={styles.errMsg}>{this.state.errFname}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={styles.accountDetailsInputText}>Last Name:</Text>
                            <View style={styles.accountDetailsInputBox}>  
                                <TextInput 
                                    style={{padding:10,fontSize:18}}
                                    value={this.state.lname}
                                    onChangeText={(text)=>this.allInputField(text,'lname')}/>
                            </View>
                            <Text style={styles.errMsg}>{this.state.errLname}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={styles.accountDetailsInputText}>Email:</Text>
                            <View style={styles.accountDetailsInputBox}>  
                                <TextInput 
                                    style={{padding:10,fontSize:18}}
                                    value={this.state.email}
                                    onChangeText={() => {alert('Email updation is not allowed')}}
                                    />
                            </View>
                            <Text style={styles.errMsg}>{this.state.errEmail}</Text>
                        </View>
                    </View>
                    <View>
                        {/* <View style={{flexDirection:'row'}}>
                            <CheckBox 
                                value={this.state.checkBox1} 
                                onValueChange={() => this.setState({checkBox1 : !(this.state.checkBox1)})}/>
                            <Text style={{marginVertical: 5,paddingRight:5, fontSize:width*0.030 }}>Yes, send me offers and information from findit.com.mit</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <CheckBox
                                value={this.state.checkBox2} 
                                onValueChange={() => this.setState({checkBox2 : !(this.state.checkBox2)})}/>
                            <Text style={{marginVertical: 5,paddingRight:5,fontSize:width*0.030}}>I would like to receive promotional offers from third-parties</Text>
                        </View> */}
                    </View>
                    <View style={{marginTop:10,backgroundColor:"#f4f4f4"}}>
                        <View style={{borderBottomWidth:1,borderBottomColor:'#e2e2e2'}}>
                            <Text style={{fontSize:30,color:'#b83a84',paddingTop:20,paddingLeft:20}}>My Subscription:</Text>
                            <Text style={{flexDirection:'row',paddingLeft:20}}>
                                <Text style={{fontSize:20}}>Subscription type:</Text>
                                <Text style={{fontSize:20,fontWeight:'bold'}}>Monthly</Text>
                            </Text>
                        </View>
                        <View style={{borderBottomWidth:1,borderBottomColor:'#e2e2e2',flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text style={{paddingTop:20,paddingLeft:20}}>
                                    <Text style={{fontSize:20}}>Subscription status:</Text>
                                    {
                                        this.state.activeSwitch1 ? <Text style={{fontSize:20,color:'green',fontWeight:'bold'}}>Active</Text> : <Text style={{fontSize:20,color:'red',fontWeight:'bold'}}>Inactive</Text>
                                    }
                                </Text>
                                <Text style={{flexDirection:'row',paddingLeft:20}}>
                                    <Text style={{fontSize:15}}>Expires on: </Text>
                                    <Text style={{fontSize:15,paddingLeft:5}}>{this.state.expire}</Text>
                                </Text>
                            </View>
                            <View style={{marginVertical:30}}>
                                <Switch
                                    value={this.state.activeSwitch1}
                                    onValueChange={()=>this.addSubscription()}
                                    backgroundActiveColor = 'green'
                                    backgroundInActiveColor = 'red'
                                />
                            </View>
                        </View>
                        {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Text style={{paddingTop:20,paddingLeft:20}}>
                                    <Text style={{fontSize:20}}>Auto Renewal:</Text>
                                    {
                                        this.state.activeSwitch2 ? <Text style={{fontSize:20,color:'green',fontWeight:'bold'}}>Active</Text> : <Text style={{fontSize:20,color:'red',fontWeight:'bold'}}>Inactive</Text>
                                    }
                                </Text>
                            </View>
                            <View style={{marginVertical:20}}>
                                <Switch
                                    value={this.state.activeSwitch2}
                                    onValueChange={()=>this.setState({activeSwitch2 : !(this.state.activeSwitch2)})}
                                    backgroundActive = 'green'
                                    backgroundInActive = 'red'
                                />
                            </View>
                        </View> */}
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={styles.accountDetailsLoginButton} 
                            onPress={()=>this.handlePress()}>
                                <Text style={styles.btnText}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={styles.accountDetailsChangePasswordButton}
                        onPress={() => this.changePassword()}><Text style={styles.btnText}>Change Password</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        }
        </>
        )
    }
}
