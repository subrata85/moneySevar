import React, { Component } from 'react'
import { Text,ScrollView,View,Dimensions,ActivityIndicator,Image,Picker,StyleSheet } from 'react-native'
import { styles } from '../styles';
import { TextInput } from 'react-native-gesture-handler';
import Icon from  'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';


import Header from './Header';

const {height,width} = Dimensions.get("screen")
export default class TermsAndCondition extends Component {
    constructor(props){
        super(props);
        this.loadData();
        this.state = {
            token : '',
            selectedText : '',
        }
    }

    loadData = async() => {
        const token = await AsyncStorage.getItem('token');
        this.setState({token : token})
        if(token == null){
            this.props.navigation.replace('Login')
        }
    }
    render() {
        return (
        <>
        { this.state.token == null ? <ActivityIndicator />
            :
            <ScrollView style={styles.container}>
                <Header/>
                <View style={{marginHorizontal: 10}}>
                    <Text style={styles.termsAndConditionHeaderText}>
                        <Text style={styles.boldText}>Corporate</Text>
                    </Text>
                    <View style={styles.termsAndConditionInputBox}>
                        {/* <TextInput placeholder="Terms and Conditions" style={{color:'#000000'}} />
                        <Text style={{marginVertical:10}}>
                            <Icon name="arrow-drop-down" size={20} />
                        </Text> */}

                        <Picker  style={stylesImg.selectedBox}>
                            <Picker.Item label="1.Introduction" value="" />
                            <Picker.Item label="2.Description of Website" value="" />
                            <Picker.Item label="3.Specific Responsibilities of Subscribers" value="" />
                            <Picker.Item label="4.Copyright and Liability" value="" />
                            <Picker.Item label="5.Indemnity and Waiver" value="" />
                            <Picker.Item label="6.Privacy and Data Protection" value="" />
                        </Picker>


                    </View>
                    <View style={{width:width}}>
                        <View style={{borderBottomWidth:1, borderColor:'#DCDCDC'}}></View>
                    </View>
                    <View>
                        <Text style={styles.termsAndConditionHeaderText}>Terms and Conditions</Text>
                        <View>
                            <Text style={styles.termsAndConditionSectionText}>1.Introduction</Text>
                            <View>
                                <View style={{marginVertical:5}}><Text style={{color:"#808080"}}>Terms of Use (the “Terms of Use”) will apply to each subscriber (“You”) who wishes to use the www.findit.com.mt Website (the "Website"). </Text></View>

                                <View style={{marginVertical:5}}><Text style={{color:"#808080"}}>This Website is owned and operated by Findit Limited (“Us” “We”), a company registered in Malta.</Text></View>

                                <View style={{marginVertical:5}}><Text style={{color:"#808080"}}>You must comply and adhere to these Terms of Use in order to access and use the Website.</Text></View>

                                <View style={{marginVertical:5}}><Text style={{color:"#808080"}}>By using this Website, you accept these Terms and Conditions.</Text></View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.termsAndConditionSectionText}>2.Description of Website</Text>
                            <Text style={{color : '#808080'}}>
                                This Website gives you the opportunity to look up and search information related to certain goods, products, services and activities.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.termsAndConditionSectionText}>3.Specific Responsibilities of Subscribers</Text>
                            <Text style={{color : '#808080'}}>
                                You agree not to use the Website for any illegal or immoral purposes.   
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.termsAndConditionSectionText}>4.Copyright and Liability</Text>
                            <View>
                                <View style={{marginTop:5}}><Text  style={{color : '#808080'}} >The content of this Website (the “Material”) is the copyright of Untangled Media Limited, or its licensors.  You may download, store and use Material for your own personal use.  You may not republish, retransmit, redistribute or otherwise make Material available to any other party or make the same available on any other website, on-line service or bulletin board of your own or of any other party or make the same available in hard copy or on any other media without our express prior written consent. Without prejudice to the generality of the foregoing, you may not in any manner make use of the Material for commercial purposes.</Text></View>
                                <View style={{marginVertical:5}}><Text  style={{color : '#808080'}} >Nothing on this Website constitutes advice, nor does the transmission, downloading or sending of any information or Material create any contractual relationship. We give you no warranty and make no representation as to the accuracy, veracity or completeness of any Material and it is therefore your responsibility to investigate and verify the accuracy of any Material prior to making any decision based on the Material. We are not agents for the persons/companies whose details appear on the Website, and we no warranty whatsoever in their regard or in regard to any goods, services or products sold or otherwise provided by them.</Text></View>
                                <View style={{marginVertical:5}}><Text  style={{color : '#808080'}} >The Website is provided by us on an “AS IS” basis with any faults or failings and without any representation, warranty or guarantee whatsoever, express or implied, including without limitation any implied warranty of accuracy, completeness, quality, merchantability, fitness for a particular purpose or non-infringement.</Text></View>
                                <View style={{marginVertical:5}}><Text  style={{color : '#808080'}} >WE ACCEPT NO LIABILITY OR RESPONSIBILITY WHATSOEVER FOR ANY LOSS OR DAMAGE SUFFERED BY ANY YOU AS A RESULT OF YOUR USE OF THIS WEBSITE OR THE MATERIAL.  BY CONTINUING TO USE THIS WEBSITE YOU ARE DEEMED TO ACCEPT THE ABOVE TERMS AND CONDITIONS.</Text></View>
                                <View style={{marginVertical:5}}><Text  style={{color : '#808080'}} >In no event will we be liable for any injury, loss, claim, damages or any special, incidental, consequential, exemplary or punitive damages of any kind arising out of or in connection with your access to, or use of the Website or the Material, whether based in contract, tort and whether negligent or otherwise, even if we have been advised of the possibility of such damages. In the event that this exclusion of liability is held by a court of competent jurisdiction to be unlawful, but that liability may be lawfully limited, our aggregate total liability to you for all such damages and losses shall be limited to Euro 100.</Text></View>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.termsAndConditionSectionText}>5.Indemnity and Waiver</Text>
                            <Text style={{color : '#808080'}}>
                                    You agree to indemnify us and keep us indemnified as well as our successors and assigns, and our directors, officers, employees and agents (collectively the "Website Owner") from and against any and all liability, damages, losses, claims (including reasonable legal fees) resulting in any way from your use of the Website and the Material.
                                    You agree to waive any right to bring any claim or action against the Website Owners for any loss, damage or injury arising from use of the Website or any Material.                             
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.termsAndConditionSectionText}>6.Privacy and Data Protection</Text>
                            <Text style={{color : '#808080'}}>
                                <Text style={{marginVertical:5}}>Your privacy is important to us so we only use the information you provide when using this Website to:</Text>
                                <Text style={{marginVertical:5}}>a.Answer your enquiries or to assist us in improving our service to you;</Text>

                                <Text style={{marginVertical:5}}>b.To send you information about goods, products, services, activities about which you have elected to receive information.</Text>

                                <Text style={{marginVertical:5}}>We do not share this information with any third party except to the extent necessary to answer your enquiry if that enquiry requires the involvement of a third party or if we believe that you are involved in any illegal or harmful conduct or if we are required to do so by law or we believe that such action is necessary to (1) comply with the law or with legal process; (2) protect and defend our rights and property or that of our customers; (3) prevent fraud; (4) protect against abuse, misuse or unauthorized use of our website; or (5) protect the personal safety or property of our customers or the public.</Text>
                            </Text>
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
        }
        </>
        )
    }
}

const stylesImg = StyleSheet.create({
    imageStyle: {
        // alignItems: "center",
        width: 150,
        height: 150,
        marginBottom: 30,
        padding:10,

    },
    textStyle:{
        textAlign:'center',
        color:"#fff",
        marginVertical:30,
        lineHeight : 25,
        fontSize:16,
        textTransform:'capitalize',
        fontWeight:'500'
    },
    selectedBox:{
        justifyContent : 'flex-start',
        marginLeft:15,
        color : 'white',
        height : 50,
        width: 350
    }
});