import { StyleSheet } from "react-native";

const landingPageStyles = StyleSheet.create({
    landingPageContent: {
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    backgroundImage: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: "cover"
    },
    logo: {
        width: 649 / 3.5,
        height: 840 / 3.5,
        justifyContent: 'flex-start',
        alignSelf: "center",
        marginTop: "7%"
    },
    darkenedContainer: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        flex: 1
    },
    logoContainer: {
        flex: 3
    },
    loginButton: {
        backgroundColor: 'rgba(63, 41, 2, 0.62)',
        // backgroundColor: 'rgba(0,0,0,0.25)',
        flex: 1,
        justifyContent: "center",
    },
    signupButton: {
        backgroundColor: 'rgba(45, 2, 63, 0.62)',
        // backgroundColor: 'rgba(255,255,255,0.15)',
        flex: 1,
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    buttons: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: "column"
    },
    buttonPress: {
    }
});

export default landingPageStyles;