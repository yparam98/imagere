import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { StackRouter } from 'react-navigation';
import SignUp from './SignUp';
import _ from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    // loginState: 0 => all good
    // loginState: 1 => account does not exist
    // loginState: 2 => password incorrect

    state = {
        // fontLoaded: false,
        usernameInvalid: false,
        passwordInvalid: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
        });

        this.setState({
            fontLoaded: true
        });
    }

    forgot_password_press() {
        ToastAndroid.show('forgot my password!', ToastAndroid.SHORT);
    }

    navigateToNewsfeed(myNavigate) {
        if (!this.state.usernameInvalid && !this.state.passwordInvalid) {
            myNavigate('Newsfeed');
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ImageBackground source={require('../assets/images/background.png')} style={styles.backgroundImage} blurRadius={5}>
                <StatusBar hidden={true} />
                <View style={styles.darker} >
                    {
                        this.state.fontLoaded ? (
                            <View style={styles.loginPageContent}>
                                <Image source={require('../assets/images/logo.png')} style={styles.logo} />

                                <TextInput style={
                                    _.merge({}, styles.inputField, this.state.usernameInvalid && styles.inputFieldError)
                                } placeholder={'username'} textContentType={'username'} />

                                <TextInput style={
                                    _.merge({}, styles.inputField, this.state.passwordInvalid && styles.inputFieldError)
                                } placeholder={'password'} textContentType={'password'} secureTextEntry={true} />

                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                    <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' style={styles.buttonPress} onPress={() => this.navigateToNewsfeed(navigate)}>
                                        <View style={styles.successButton}>
                                            <Text style={styles.buttonText}>login</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' style={styles.buttonPress} onPress={() => this.forgot_password_press()}>
                                        <View style={styles.helpButton}>
                                            <Text style={styles.buttonText}>forgot password?</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        flex: 1
    },
    inputField: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderColor: 'rgba(255,255,255,0.3)',
        paddingTop: 2,
        paddingBottom: 10,
        alignSelf: 'stretch',
        marginStart: 20,
        marginEnd: 20,
        marginBottom: 20,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderWidth: 5,
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    inputFieldError: {
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'rgba(255,0,0,0.3)'
    },
    textInputPrompt: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    successButton: {
        backgroundColor: 'rgba(0,255,0,0.4)',
        paddingTop: 2,
        paddingBottom: 5,
        paddingStart: 20,
        paddingEnd: 20,
        marginEnd: 20,
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(0,255,0,0.4)',
        borderWidth: 5
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
    }
});

export default Login;