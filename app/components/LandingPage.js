import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, Button, Alert, TouchableHighlight, ToastAndroid, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import SignUp from './SignUp';
import Newsfeed from './Newsfeed';
import Profile from './Profile';
import * as Font from 'expo-font';


class LandingPage extends Component {

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

    on_login_press = () => {
        // ToastAndroid.show('login button pressed', ToastAndroid.SHORT);
        this.props.navigation.navigate('Login');
    }

    on_signup_press = () => {
        // ToastAndroid.show('signup button pressed', ToastAndroid.SHORT);
        this.props.navigation.navigate('SignUp');
    }

    render() {
        // const { navigate } = this.props.navigation;

        return (
            <ImageBackground source={require('../assets/images/landingPageBackground.png')} style={styles.backgroundImage} blurRadius={2}>
                <StatusBar hidden={true} />
                <View style={styles.darker} >
                    {
                        this.state.fontLoaded ? (
                            <View style={styles.landingPageContent}>
                                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                                <View style={styles.buttons}>
                                    <TouchableHighlight style={styles.buttonPress} onPress={this.on_login_press}>
                                        <View style={styles.loginButton}>
                                            <Text style={styles.buttonText}>I have an account</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={styles.buttonPress} onPress={this.on_signup_press}>
                                        <View style={styles.signupButton}>
                                            <Text style={styles.buttonText}>I don't have an account</Text>
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

const MainNavigator = createStackNavigator(
    {
        LandingPage: {
            screen: LandingPage,
            navigationOptions: {
                headerShown: false
            }
        },
        Login: {
            screen: Login,
            navigationOptions: { headerShown: false }
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: { headerShown: false }
        },
        Newsfeed: {
            screen: Newsfeed,
            navigationOptions: { headerShown: false }
        },
        Profile: {
            screen: Profile,
            navigationOptions: { headerShown: false }
        }
    },
);

const MainAppNavigator = createAppContainer(MainNavigator);

const styles = StyleSheet.create({
    landingPageContent: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        flex: 1,
        flexDirection: "column",
        justifyContent: 'space-between'
    },
    backgroundImage: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: "cover",
        position: "absolute"
    },
    logo: {
        width: 595 / 2.6,
        height: 842 / 2.6,
        justifyContent: 'flex-start'
    },
    darker: {
        backgroundColor: 'rgba(0,0,0,0.55)',
        flex: 1
    },
    loginButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingTop: 2,
        paddingBottom: 10,
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 5
    },
    signupButton: {
        backgroundColor: 'rgba(0,0,0,0.0)',
        paddingTop: 2,
        paddingBottom: 10,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.7)',
        borderRadius: 50,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 5
    },
    buttonText: {
        fontFamily: 'Quicksand',
        fontSize: 34,
        textAlign: "center",
        textAlignVertical: "center",
        color: 'white'
    },
    buttons: {
        alignSelf: 'stretch',
        margin: 4
    },
    buttonPress: {
    }
});

export default MainAppNavigator;