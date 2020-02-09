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
            // <ImageBackground source={require('../assets/images/landingPageBackground.png')} style={landingPageStyles.backgroundImage} blurRadius={2}>
            //     <StatusBar hidden={true} />
            //     <View style={landingPageStyles.darker} >
            //         {
            //             this.state.fontLoaded ? (
            //                 <View style={landingPageStyles.landingPageContent}>
            //                     <Image source={require('../assets/images/logo.png')} style={landingPageStyles.logo} />
            //                     <View style={landingPageStyles.buttons}>
            //                         <TouchableHighlight style={landingPageStyles.buttonPress} >
            //                             <View style={landingPageStyles.loginButton}>
            //                                 <Text style={landingPageStyles.buttonText}>I have an account!</Text>
            //                             </View>
            //                         </TouchableHighlight>
            //                         <TouchableHighlight style={landingPageStyles.buttonPress} o>
            //                             <View style={landingPageStyles.signupButton}>
            //                                 <Text style={landingPageStyles.buttonText}>I don't have an account!</Text>
            //                             </View>
            //                         </TouchableHighlight>
            //                     </View>
            //                 </View>
            //             ) : null
            //         }
            //     </View>
            // </ImageBackground>
            //
            //
            //
            // <ImageBackground source={require('../assets/images/landingPageBackground.png')} style={landingPageStyles.backgroundImage} blurRadius={2}>
            //     {
            //         this.state.fontLoaded ? (
            //             <View style={{ flex: 1 }}>
            //                 <View style={landingPageStyles.darkenedContainer}>
            //                     <View style={landingPageStyles.logoContainer}>
            //                         <Image source={require('../assets/images/logo.png')} style={landingPageStyles.logo} />
            //                     </View>
            //                     <View style={landingPageStyles.buttons}>
            //                         <TouchableOpacity style={landingPageStyles.loginButton} onPress={this.on_login_press}>
            //                             <Text style={landingPageStyles.buttonText}>LOG IN</Text>
            //                         </TouchableOpacity>
            //                         <TouchableOpacity style={landingPageStyles.signupButton} onPress={this.on_signup_press}>
            //                             <Text style={landingPageStyles.buttonText}>SIGN UP</Text>
            //                         </TouchableOpacity>
            //                     </View>
            //                 </View>
            //             </View>
            //         ) : null
            //     }
            // </ImageBackground>

            <View style={{flex: 1}}>
                <StatusBar hidden={true} />
                <View style={{ flex: 1 }}>
                    {
                        this.state.fontLoaded ? (
                            <LinearGradient colors={['#000046', '#1CB5E0']} style={{ flex: 1, flexDirection: "column" }}>
                                <View style={{ backgroundColor: "rgba(0,0,0,0.0)", flex: 2 }}>
                                    <Image source={require("../assets/images/logo.png")} style={{ width: 649 / 3.5, height: 840 / 3.5, alignSelf: "center", margin: 30 }} />
                                </View>
                                <View style={{ flex: 1, flexDirection: "column", backgroundColor: "rgba(0,0,0,0.0)", alignSelf: "stretch", margin: 10 }}>
                                    <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(100,0,0,0.5)", borderRadius: 22.5, margin: 15, alignSelf: "stretch", alignItems: "center", justifyContent: "center", display: "flex" }} onPress={() => this.on_login_press()}>
                                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 36, color: "white" }}>login</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(0,0,100,0.5)", borderRadius: 22.5, margin: 15, alignSelf: "stretch", alignItems: "center", justifyContent: "center", display: "flex" }} onPress={() => this.on_signup_press()}>
                                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 36, color: "white" }}>sign up</Text>
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        ) : null
                    }
                </View>
            </View>

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
        }
    },
    {
        headerMode: 'none',
        mode: 'modal'
    }
);

const MainAppNavigator = createAppContainer(MainNavigator);

export default MainAppNavigator;