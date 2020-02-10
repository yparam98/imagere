import { StyleSheet } from "react-native";

const profilePageStyles = StyleSheet.create({
    profileView: {
        // flex: 1
    },
    topBlackBackground: {
        backgroundColor: 'black',
        flexDirection: 'row',
        padding: 10,
        justifyContent: "space-between",
        elevation: 5,
        // height: 500
    },
    topBarLogo: {
        width: 144 / 3,
        height: 144 / 3,
        alignSelf: 'flex-start'
    },
    bottomNavBar: {
        backgroundColor: 'purple',
        flexDirection: 'row',
        padding: 0,
        justifyContent: "space-between",
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0
    },
    scrollingProfilePage: {
        alignContent: "center",
        // backgroundColor: "#003a5c"
    },
    userName: {
        fontFamily: "Quicksand-Medium",
        fontSize: 35,
        color: "white",
        padding: 5,
        marginBottom: "0.5%",
        alignSelf: "center"
    },
    userImage: {
        width: 651 / 5,
        height: 651 / 5,
        borderRadius: 90,
        margin: 10,
        alignSelf: "center"
    },
    helperTextView: {
        fontFamily: "Quicksand",
        fontSize: 12,
        color: "white",
        padding: 5,
        margin: 10,
        alignSelf: "flex-start"
    }
});

export default profilePageStyles;