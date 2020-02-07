import { StyleSheet } from "react-native";

const uploadPhotoStyles = StyleSheet.create({
    uploadPictureView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "lightgrey"
    },
    cameraIconStyle: {
        width: 100,
        height: 100,
        alignSelf: "center",
        margin: 10
    },
    touchCardStyle: {
        backgroundColor: "rgba(255,255,255,1.0)",
        flex: 1,
        justifyContent: "center",
        borderRadius: 0,
        borderWidth: 0,
        borderColor: "black",
    },
    regularText: {
        fontFamily: 'Quicksand',
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
        margin: 10
    },
    backgroundDarken: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        flex: 1,
        justifyContent: "center"
    }
});

export default uploadPhotoStyles;