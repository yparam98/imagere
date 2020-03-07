import { StyleSheet } from "react-native";

const loginPageStyles = StyleSheet.create({
    inputField: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderColor: 'rgba(255,255,255,0.3)',
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderWidth: 0,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    inputFieldError: {
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'rgba(255,0,0,0.3)'
    },
    textInputPrompt: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    successButton: {
        backgroundColor: 'rgba(0,255,0,0.4)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingStart: 25,
        paddingEnd: 25,
        marginEnd: 20,
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(0,255,0,0.4)',
        borderWidth: 0
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
    helpButton: {
        backgroundColor: 'rgba(255,0,0,0.4)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingStart: 25,
        paddingEnd: 25,
        marginEnd: 20,
        alignSelf: 'flex-end',
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(255,0,0,0.4)',
        borderWidth: 0
    },
});

export default loginPageStyles;