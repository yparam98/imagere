import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
    pageContent: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start'
    },
    backgroundImage: {
        flex: 1,
        height: '100%',
        width: '100%',
        // resizeMode: "cover",
        position: "absolute"
    },
    logo: {
        top: 10,
        marginBottom: 50,
        alignSelf: 'center',
        width: 649 / 6,
        height: 840 / 6,
        justifyContent: 'flex-start'
    },
    darker: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        flex: 1
    },
    utilityButton: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        margin: 10,
        padding: 20,
        alignSelf: "center",
        borderRadius: 5
    }
});

export default sharedStyles;