import { StyleSheet, Dimensions } from "react-native";
// import Accounts_Detail from "../screens/Accounts_Detail";
const img = Dimensions.get('window')
const { width, height } = Dimensions.get('screen')
export const styles = StyleSheet.create({
    splash: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    container: {
        height: height,
        width: width,
        color: "#000000"
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#333333',
    },
    headLogo: {
        width: 160,
    },
    HeaderText: {
        paddingTop: 30,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        fontSize: 30,
        color: '#b83a84',
        textAlign: 'center'
    },
    buttonsNav: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
    },
    inputs: {
        height: 58,
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 4,
        padding: 20,
        color: '#000000',
        borderRadius: 0,
        borderColor: "#dddddd",
        borderWidth: 1,
        fontSize: 16,
    },
    errMsg: {
        flex: 1,
        color: "#a00",
        marginBottom: 10
    },
    loginContent: {
        paddingTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 40,
        flex: 1,
        justifyContent: 'center'
    },
    images: {
        flex: 1
    },
    textHead: {
        paddingBottom: 4
    },
    HeadingLine: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#000000',
        fontSize: 24,
        fontWeight: '300',
        paddingTop: 30,
    },
    headingLogo: {
        width: 160,
    },
    boldText: {
        fontWeight: '600',
    },
    bodyText: {
        flex: 1,
        textAlign: 'center',
        color: '#555555',
        fontSize: 12,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 0,
        lineHeight: 16
    },
    bodyTextBold: {
        flex: 1,
        textAlign: 'center',
        color: '#555555',
        fontSize: 13,
        marginBottom: 0,
        marginTop: 16,
        fontWeight: '600'
    },
    bodyTextLast: {
        flex: 1,
        textAlign: 'center',
        color: '#555555',
        fontSize: 12,
        fontWeight: '400',
        marginTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 40,
        lineHeight: 22
    },
    frmTxt: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        color: '#555555',
        // fontSize: 14,
        fontWeight: '400',
        marginTop: 0,
    },
    splLink: {
        color: '#9f3b81',
        fontSize: width * 0.037
    },
    btnApps: {
        backgroundColor: '#9f3b81',
        borderRadius: 0,
        marginVertical: 20
    },
    btnText: {
        fontSize: width * 0.070,
        fontWeight: '400',
        color: '#ffffff',
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        // fontFamily: 'Roboto'

    },
    checkboxStyle: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 0,
    },
    checkTxt: {
        marginTop: 8,
        fontSize: 12,
    },
    Landingcover: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 20,
        paddingBottom: 20
    },
    itemLanding: {
        width: '31%',
        backgroundColor: '#f9f9f9',
        marginHorizontal: '1.15%',
        marginBottom: 10,
        padding: 10,
    },
    LandingImgCov: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LandingIcon: {
        width: 70,
    },
    landingIcText: {
        flex: 1,
        textAlign: 'center',
        color: '#9f3b81',
        fontSize: 12,
        marginTop: 10,
    },
    listWrapper: {
        flex: 1,
        backgroundColor: "#ededed",
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
    itemInner: {
        flex: 1,
        marginBottom: 16
    },
    itemImag: {
        width: '100%',
        flex: 1
    },
    descItem: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "#ffffff",
        justifyContent: 'space-between'
    },
    HeadListItm: {
        color: '#9f3b81',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 0,
    },
    bodyListItm: {
        fontSize: 14,
        color: "#555555",
        marginTop: -15
    },
    vouture: {
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#9f3b81",
        color: "#ffffff",
        fontSize: 16,
        borderRadius: 3,
        marginTop: 8,
    },
    // Terms and Cond.
    termsAndConditionContainer: {
        color: "#000000",
    },
    termsAndConditionInputBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#DCDCDC'
    },
    termsAndConditionHeaderText: {
        paddingTop: 30,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        fontSize: 30,
        color: '#b83a84',
        textAlign: 'left',
        fontFamily: 'Times New Roman'
    },
    termsAndConditionSectionText: {
        paddingTop: 30,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        fontSize: 20,
        color: '#b83a84',
        textAlign: 'left'
    },
    //
    accountDetailsHeaderText: {
        paddingTop: 30,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        fontSize: 30,
        color: '#b83a84',
        textAlign: 'left',
        fontFamily: 'Times New Roman'
    },
    accountDetailsInputBox: {
        borderWidth: 1,
        borderColor: '#e2e2e2'
    },
    accountDetailsInputText: {
        color: '#808080',
        fontSize: 20,
        marginBottom: 5
    },
    accountDetailsLoginButton: {
        backgroundColor: '#9f3b81',
        borderRadius: 0,
        marginTop: 20
    },
    accountDetailsChangePasswordButton: {
        backgroundColor: '#5a5a5a',
        borderRadius: 0,
        marginTop: 5
    },
    //
    contactUsHeader: {
        paddingTop: 30,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
        fontSize: 30,
        color: '#b83a84',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        fontWeight: 'bold'
    },
    contactUsFormHeading: {
        marginTop: 20,
        fontSize: 20,
        color: '#b83a84',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        fontWeight: '500'
    },
    //
    foodAndDrink2Heading: {
        marginTop: 20,
        fontSize: 40,
        color: '#b83a84',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        fontWeight: '500'
    },
    foodAndDrinkDescDetials: {
        marginVertical: 2,
        paddingLeft: 20
    },
    circle: {
        width: 90,
        height: 90,
        borderRadius: 90 / 2,
        backgroundColor: '#f0f0f0',
        marginRight: 10
    },
    //splink - secreen
    splink: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    splinkBtnAppsLogin: {
        backgroundColor: '#9f3b81',
        borderRadius: 10,
        // marginVertical: 20
        marginTop: 20,
        marginBottom: 10,
        marginTop: '40%'
    },
    splinkBtnText: {
        fontSize: width * 0.060,
        fontWeight: '400',
        color: '#ffffff',
        textAlign: 'center',
        paddingHorizontal: '30%',
        paddingVertical: 12,
    },
    splinkBtnAppsJoinNow: {
        backgroundColor: '#3F3F3F',
        borderRadius: 10,
        // marginVertical: 20
    },
    splinkBtnTextJoinNow: {
        fontSize: width * 0.060,
        fontWeight: '400',
        color: '#ffffff',
        textAlign: 'center',
        paddingHorizontal: '25%',
        paddingVertical: 12,
    },
    socialLoginFacebook: {
        // flex : 1,
        width: '80%',
        flexDirection: 'row',
        backgroundColor: '#3b5998',
        borderRadius: 5,
        //marginVertical: 10,
        paddingHorizontal: 17,
        justifyContent: "flex-start"
    },
    socialLoginBtnText: {
        fontSize: width * 0.037,
        fontWeight: '400',
        color: '#ffffff',
        textAlign: 'center',
        // paddingHorizontal:30,
        paddingVertical: 12,
    },
    iconContainer: {
        justifyContent: 'center',
        marginRight: 5
    },
    socialLoginGoogle: {
        width: width * .6,
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
        // marginTop: '-2%',
        paddingHorizontal: 30
    },

    //

    modalText: {
        marginVertical: 15,
        fontSize: 28,
        fontWeight: '400',
        marginLeft: 10
    },

    voucherText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#ffffff',
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
    }
});