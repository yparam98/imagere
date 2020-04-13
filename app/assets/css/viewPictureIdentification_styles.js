import { StyleSheet } from "react-native";

const viewPictureIdentificationStyles = StyleSheet.create({
    headingStyle: {
        fontFamily: 'Quicksand-Medium', 
        fontSize: 34, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        marginBottom: 0
    },
    container: {
        flexDirection: 'column', 
        flex: 1, 
        backgroundColor: 'rgb(15,15,15)',
        paddingTop: 0, 
    },
    backIcon: {
        width: 512 / 15,
        height: 512 / 15,
        alignSelf: 'flex-start'
    },
    pictureContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 0
    },
    resultsContainer:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 0,
        marginHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultLabel: {
        flex: 3,
        fontSize: 24,
        color: 'white',
        fontFamily: 'Quicksand-Medium',
        textAlign: 'left'
    },
    probabilityLabel: {
        flex: 1,
        fontSize: 24,
        color: 'rgb(134,221,147)',
        fontFamily: 'Quicksand-Medium',
        textAlign: 'right'
    },
    buttonGroupStyle: { 
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 40,
        alignItems: 'stretch'
    }
});

export default viewPictureIdentificationStyles;