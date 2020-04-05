import { StyleSheet } from "react-native";

const newsfeedPageStyles = StyleSheet.create({
    newsfeedView: {
        // flex: 3,
        backgroundColor: "rgb(15,15,15)"
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
    scrollingNewsPane: {
        alignContent: "center"
    },
    newsfeedCardView: { // need to scale to device specs
        backgroundColor: "black",
        margin: 5,
        elevation: 3,
        // alignContent: "center",
        // flexDirection: "column",
        // flexWrap: "nowrap",
    },
    userTagDateContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,       
        borderWidth: 1 
    },
    userTag: {
        borderRadius: 50,
        backgroundColor: "rgb(20,20,20)",
        flexDirection: "row",
        alignItems: "center"
    },
    userName: {
        fontFamily: "Quicksand",
        color: "white",
        paddingTop: 5,
        paddingBottom: 5,
        paddingStart: 7,
        paddingEnd: 5,
        marginBottom: "2%"
    },
    userImage: {
        height: "100%",
        aspectRatio: 1,
        borderRadius: 90,
        margin: 0,
        overflow: "hidden"
    },
    speciesImage: {
        aspectRatio: 1,
        width: "100%",
        // height: 1088,
    },
    identificationText: {
        padding: 10,
        fontFamily: "Quicksand",
        color: "white"
    },
    dateText: {
        padding: 10,
        fontFamily: "Quicksand",
        fontSize: 10,
        color: "grey",
        alignSelf: "flex-end"
    },
    locationText: {
        fontFamily: "Quicksand-Medium",
        fontSize: 12
    }
});

export default newsfeedPageStyles;       