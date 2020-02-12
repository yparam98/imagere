import { StyleSheet } from "react-native";

const signupPageStyles = StyleSheet.create({
    regularInputField: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    passwordInputField: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    textInputPrompt: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    buttonPress: {

    },
    buttonText: {
        fontFamily: 'Quicksand',
        fontSize: 14,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    helperText: {
        fontFamily: 'Quicksand',
        fontSize: 12,
        textAlign: "left",
        color: 'white',
        marginLeft: 20,
        marginBottom: 10
    },
    pickerContainer: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignSelf: 'stretch',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 5
    },
    pickerStyle: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    signupButton: {
        backgroundColor: 'rgba(0,255,0,0.4)',
        paddingTop: 2,
        paddingBottom: 5,
        paddingStart: 20,
        paddingEnd: 20,
        marginEnd: 20,
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(0,255,0,0.4)',
        borderWidth: 5,
        alignSelf: "center"
    },
});

export default signupPageStyles;