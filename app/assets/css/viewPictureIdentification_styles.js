import { StyleSheet } from "react-native";

const viewPictureIdentificationStyles = StyleSheet.create({
    headingStyle: {
        fontFamily: 'Quicksand-Medium', 
        fontSize: 34, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        marginBottom: 10
    },
    container: {
        flexDirection: 'column', 
        flex: 1, 
        backgroundColor: 'rgb(33,33,33)',
        paddingTop: 20, 
    },
    backIcon: {
        width: 512 / 15,
        height: 512 / 15,
        alignSelf: 'flex-start'
    },
    pictureContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 25
    },
    resultsContainer:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
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
        alignItems: 'center'
    }
});

export default viewPictureIdentificationStyles;