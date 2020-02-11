import { StyleSheet } from "react-native";

const settingsPageStyles = StyleSheet.create({
    utilityButton: {
        backgroundColor: '#000000',
        margin: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row'
    },
    headingStyle: {
        fontFamily: 'Quicksand', 
        fontSize: 34, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontWeight: 'bold',
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
    }
});

export default settingsPageStyles;