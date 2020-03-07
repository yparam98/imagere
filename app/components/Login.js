import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { StackRouter } from 'react-navigation';
import SignUp from './SignUp';
import _ from 'lodash';
import axios from 'axios';
import loginPageStyles from '../assets/css/loginPage_styles';
import sharedStyles from '../assets/css/shared_styles';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            username: "",
            password: "",
            currentUser: ""
        };
    }

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
            fontLoaded: true,
            usernameInvalid: false,
            passwordInvalid: false
        });
    }

    forgot_password_press() {
        ToastAndroid.show('forgot my password!', ToastAndroid.SHORT);
    }

    loginAuthenticated(myNavigate) {
        myNavigate('UserExperience', { currentUser: this.state.currentUser });
    }

    onLogin(myNavigate) {
        // loginState: 0 => all good
        // loginState: 1 => account does not exist
        // loginState: 2 => password incorrect
        // loginState: 3 => missing credentials

        // this.loginAuthenticated(myNavigate);

        // BYPASSING LOGIN AUTHENTICATION... UNCOMMENT BEFORE PRODUCTION!!!

        axios.post(
            this.state.dataURL + "/logout"
        ).then(() => {
            axios.post(this.state.dataURL + "/login", {
                "logEmail": this.state.username,
                "logPassword": this.state.password
            }).then((response) => {
                if (response.data.loginState != 0) {
                    throw (response.data.loginState);
                }
                else {
                    if (response.data.curUser != null || response.data.curUser != undefined) {
                        this.setState({
                            currentUser: response.data.curUser
                        });

                        this.loginAuthenticated(myNavigate);
                    }
                }
            }).catch((err) => {
                if (err == 1) {
                    this.setState({
                        usernameInvalid: true,
                        passwordInvalid: true
                    });
                    // ToastAndroid.show("account does not exist!", ToastAndroid.SHORT);
                } else if (err == 2) {
                    this.setState({
                        usernameInvalid: false,
                        passwordInvalid: true
                    });
                    // ToastAndroid.show("password incorrect!", ToastAndroid.SHORT);
                } else if (err == 3) {
                    this.setState({
                        usernameInvalid: true,
                        passwordInvalid: true
                    });
                    // ToastAndroid.show("missing credentials!", ToastAndroid.SHORT);
                } else {
                    console.log("log in not working...");
                }
            });
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ImageBackground source={require('../assets/images/background.png')} style={sharedStyles.backgroundImage} blurRadius={5}>
                <StatusBar hidden={true} />
                <View style={sharedStyles.darker} >
                    {
                        this.state.fontLoaded ? (
                            <View style={sharedStyles.pageContent}>
                                <Image source={require('../assets/images/logo.png')} style={sharedStyles.logo} />

                                <TextInput id={"usernameEntry"} style={
                                    _.merge({}, loginPageStyles.inputField, this.state.usernameInvalid && loginPageStyles.inputFieldError)
                                } placeholder={'email'} textContentType={'username'} onChangeText={(text) => this.setState({ username: text })} maxLength={35} />

                                <TextInput id={"passwordEntry"} style={
                                    _.merge({}, loginPageStyles.inputField, this.state.passwordInvalid && loginPageStyles.inputFieldError)
                                } placeholder={'password'} textContentType={'password'} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} maxLength={25} />

                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                                    <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' style={loginPageStyles.buttonPress} onPress={() => this.onLogin(navigate)}>
                                        <View style={loginPageStyles.successButton}>
                                            <Text style={loginPageStyles.buttonText}>login</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' style={loginPageStyles.buttonPress} onPress={() => this.forgot_password_press()}>
                                        <View style={loginPageStyles.helpButton}>
                                            <Text style={loginPageStyles.buttonText}>forgot password?</Text>
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

export default Login;