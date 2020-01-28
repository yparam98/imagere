import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { StackRouter } from 'react-navigation';

class SignUp extends Component {

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
        });

        this.setState({
            fontLoaded: true
        });
    }

    forgot_password_press = () => {
        ToastAndroid.show('forgot my password!', ToastAndroid.SHORT);
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage} blurRadius={5}>
                <StatusBar hidden={true} />
                <View style={styles.darker} >
                    {
                        this.state.fontLoaded ? (
                            <View style={styles.loginPageContent}>
                                <Image source={require('../assets/images/logo.png')} style={styles.logo} style={styles.logo} />

                                <Text style={styles.helperText}>The Socials</Text>
                                <TextInput style={styles.regularInputField} placeholder={'email'} textContentType={'username'}/>
                                <TextInput style={styles.regularInputField} placeholder={'display name'} textContentType={'username'} />

                                <Text style={styles.helperText}>The Securities</Text>
                                <TextInput style={styles.passwordInputField} placeholder={'password'} textContentType={'password'} secureTextEntry={true} />
                                <TextInput style={styles.passwordInputField} placeholder={'confirm password'} textContentType={'password'} secureTextEntry={true} />
                                <TextInput style={styles.regularInputField} placeholder={'security question'} textContentType={'username'} />
                                <TextInput style={styles.passwordInputField} placeholder={'security question answer'} textContentType={'password'} secureTextEntry={true} />

                                {/* <TouchableHighlight underlayColor='none' style={ styles.buttonPress} onPress={this.forgot_password_press}>
                                    <View style={styles.helpButton}>
                                        <Text style={styles.buttonText}>forgot password?</Text>
                                    </View>
                                </TouchableHighlight> */}
                            </View>
                        ) : null
                    }
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    loginPageContent: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        flexDirection: "column",
        justifyContent: 'flex-start'
    },
    backgroundImage: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: "cover",
        position: "absolute"
    },
    logo: {
        top: 10,
        marginBottom: 50,
        alignSelf: 'center',
        width: 595 / 6,
        height: 842 / 6,
        justifyContent: 'flex-start'
    },
    darker: {
        backgroundColor: 'rgba(0,0,0,0.65)',
        flex: 1
    },
    regularInputField: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    passwordInputField: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(255,255,255,0.3)',
        borderWidth: 5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    textInputPrompt: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    helpButton: {
        backgroundColor: 'rgba(255,0,0,0.4)',
        paddingTop: 2,
        paddingBottom: 5,
        paddingStart: 20,
        paddingEnd: 20,
        marginEnd: 20,
        alignSelf: 'flex-end',
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(255,0,0,0.4)',
        borderWidth: 5
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
    helperText: {
        fontFamily: 'Quicksand',
        fontSize: 12,
        textAlign: "left",
        color: 'white',
        marginLeft: 20,
        marginBottom: 10
    }
});

export default SignUp;