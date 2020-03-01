import { StyleSheet } from "react-native";

const settingsPageStyles = StyleSheet.create({
    utilityButton: {
        backgroundColor: '#000000',
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row'
    },
    headingStyle: {
        fontFamily: 'Quicksand-Medium', 
        fontSize: 34, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        marginBottom: 10
    },
    settingOptionContainer: {
        flexDirection: 'column', 
        flex: 1, 
        marginTop: 20
    },
    subHeadingStyle: {
        fontFamily: 'Quicksand', 
        fontSize: 28, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontWeight: 'bold'
    },
    diagram: {
        alignSelf: "center",
        marginTop: "2%",
    },
    inputField: {
        backgroundColor: '#F0F0F0',
        borderColor: '#000000',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 10,
        marginEnd: 10,
        shadowRadius: 5,
        shadowColor: '#F0F0F0',
        borderRadius: 50,
        borderWidth: 2.5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'black'
    },
    inputFieldError: {
        backgroundColor: '#FF0000',
        borderColor: '#FF0000'
    },
    label: {
        fontFamily: 'Quicksand', 
        color: '#505050', 
        margin: 20, 
        fontSize: 24
    },
    textField: {
        backgroundColor: '#F0F0F0',
        borderColor: '#000000',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 10,
        marginEnd: 10,
        shadowRadius: 5,
        shadowColor: '#F0F0F0',
        borderRadius: 20,
        borderWidth: 2.5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'black'
    },
    passwordInputField: {
        backgroundColor: '#F0F0F0',
        borderColor: '#000000',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 10,
        marginEnd: 10,
        marginTop: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: '#F0F0F0',
        borderRadius: 50,
        borderWidth: 2.5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'black'
    },
    backIcon: {
        width: 512 / 15,
        height: 512 / 15,
        alignSelf: 'flex-start'
    },
});

export default settingsPageStyles;