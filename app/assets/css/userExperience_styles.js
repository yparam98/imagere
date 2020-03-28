import { StyleSheet } from "react-native";

const userExperienceStyles = StyleSheet.create({
    userExperienceView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start'
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
    regularText: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        color: 'white',
        alignSelf: 'center'
    },
    utilityText: {
        fontFamily: 'Quicksand',
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
    bottomNavBar: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        position: 'relative',
        bottom: 0,
        padding: 10
    },
    bottomNavBarButton: {
        width: 30,
        height: 30
    },
});

export default userExperienceStyles;