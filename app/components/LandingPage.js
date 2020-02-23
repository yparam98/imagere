import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, Button, Alert, TouchableHighlight, ToastAndroid, StatusBar, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import SignUp from './SignUp';
import Newsfeed from './Newsfeed';
import Profile from './Profile';
import UserExperience from './UserExperience';
import UploadPhoto from './UploadPhoto';
import ProfileSampler from './ProfileSampler';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import landingPageStyles from '../assets/css/landingPage_styles';
import UpdateProfilePicture from './UpdateProfilePicture';
import Disclaimer from './Disclaimer'
import About from './About';
import ContactUs from './ContactUs';
import Settings from './Settings';
import UpdateUserInformation from './UpdateUserInformation';
import UpdatePassword from './UpdatePassword';

class LandingPage extends Component {

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        this.setState({
            fontLoaded: true
        });
    }

    on_login_press = () => {
        this.props.navigation.navigate('Login');
    }

    on_signup_press = () => {
        this.props.navigation.navigate('SignUp');
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/landingPageBackground.png')} style={landingPageStyles.backgroundImage} blurRadius={2}>
                <StatusBar hidden={true} />
                <View style={landingPageStyles.darker} >
                    {
                        this.state.fontLoaded ? (
                            <View style={landingPageStyles.landingPageContent}>
                                <Image source={require('../assets/images/logo.png')} style={landingPageStyles.logo} />
                                <View style={landingPageStyles.buttons}>
                                    <TouchableHighlight style={landingPageStyles.buttonPress} onPress={() => this.on_login_press()}>
                                        <View style={landingPageStyles.loginButton}>
                                            <Text style={landingPageStyles.buttonText}>login</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={landingPageStyles.buttonPress} onPress={() => this.on_signup_press()}>
                                        <View style={landingPageStyles.signupButton}>
                                            <Text style={landingPageStyles.buttonText}>sign up</Text>
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
            navigationOptions: { headerShown: false }
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
        },
        UserExperience: {
            screen: UserExperience,
            navigationOptions: { headerShown: false }
        },
        UploadPhoto: {
            screen: UploadPhoto,
            navigationOptions: { headerShown: false }
        },
        ProfileSampler: {
            screen: ProfileSampler,
            navigationOptions: { headerShown: false }
        },
        Settings: {
            screen: Settings,
            navigationOptions: { headerShown: false }
        },
        UpdateProfilePicture: {
            screen: UpdateProfilePicture,
            navigationOptions: { headerShown: false }
        },
        Disclaimer: {
            screen: Disclaimer,
            navigationOptions: { headerShown: false }
        },
        About: {
            screen: About,
            navigationOptions: { headerShown: false }
        },
        ContactUs: {
            screen: ContactUs,
            navigationOptions: { headerShown: false }
        },
        UpdateUserInformation: {
            screen: UpdateUserInformation,
            navigationOptions: { headerShown: false }
        },
        UpdatePassword: {
            screen: UpdatePassword,
            navigationOptions: { headerShown: false }
        }
    },
    {
        headerMode: 'none',
        mode: 'modal'
    }
);

const MainAppNavigator = createAppContainer(MainNavigator);

export default MainAppNavigator;