import { StyleSheet } from "react-native";

const landingPageStyles = StyleSheet.create({
    landingPageContent: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    backgroundImage: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: "cover",
        position: "absolute"
    },
    logo: {
        width: 649 / 3.25,
        height: 840 / 3.25,
        justifyContent: 'flex-start',
        alignSelf: "center",
        marginTop: "2%"
    },
    darker: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        flex: 1
    },
    loginButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingTop: 2,
        paddingBottom: 10,
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 5
    },
    signupButton: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        paddingTop: 2,
        paddingBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 5
    },
    buttonText: {
        fontFamily: 'Quicksand',
        fontSize: 34,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    buttons: {
        alignSelf: 'stretch',
        margin: 4
    },
    buttonPress: {
    }
});

export default landingPageStyles;