import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import * as Font from 'expo-font';
import Newsfeed from './Newsfeed';
import ViewPager from '@react-native-community/viewpager';
import Profile from './Profile';
import UploadPhoto from './UploadPhoto';
import userExperienceStyles from '../assets/css/userExperience_styles';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

class UserExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderPos: ["newsfeed", "camera", "my profile"],
            navMod: this.props.navigation.state.params,
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            currentUserObject: this.props.navigation.state.params.currentUser,
        }
    }

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {

        // console.log(this.props.navigation.getParam(currentUser, ""));

        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        this.setState({
            fontLoaded: true,
            currentView: "newsfeed"
        });
    }

    on_logout_press() {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout of Image Recognition?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout', onPress: () => {
                        axios.post(
                            this.state.dataURL + "/logout"
                        ).then(() => {
                            this.props.navigation.popToTop();
                        });
                    }
                },
            ]
        );
    }

    renderViews() {
        return (
            <ViewPager style={{ flex: 1 }} initialPage={0} ref={(viewpager) => { this.viewpager = viewpager }}
                onPageSelected={(e) => {
                    this.setState({ currentView: this.state.sliderPos[e.nativeEvent.position] })
                }}>
                <View key="1">
                    <Newsfeed navigation={this.props.navigation} />
                </View>
                <View key="2">
                    <UploadPhoto userData={this.state.currentUserObject} navigationModule={this.props.navigation} />
                </View>
                <View key="3">
                    <Profile userData={this.state.currentUserObject} navigationModule={this.props.navigation} />
                </View>
            </ViewPager>
        )
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.fontLoaded ? (
                        <View style={userExperienceStyles.userExperienceView}>
                            <View style={userExperienceStyles.topBlackBackground} >
                                <TouchableHighlight onPress={() => this.on_logout_press()}>
                                    <Image source={require("../assets/icons/ic_launcher4x.png")} style={userExperienceStyles.topBarLogo} />
                                </TouchableHighlight>
                                <Text style={userExperienceStyles.regularText}>{this.state.currentView}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                {this.renderViews()}
                            </View>
                            <View style={userExperienceStyles.bottomNavBar}>
                                <TouchableHighlight onPress={() => this.viewpager.setPage(0)}>
                                    <Image source={require("../assets/icons/newsfeed_icon_large.png")} style={userExperienceStyles.bottomNavBarButton} />
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => this.viewpager.setPage(1)}>
                                    <Image source={require("../assets/icons/camera_icon_large.png")} style={userExperienceStyles.bottomNavBarButton} />
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => this.viewpager.setPage(2)}>
                                    <Image source={require("../assets/icons/person_icon_large.png")} style={userExperienceStyles.bottomNavBarButton} />
                                </TouchableHighlight>
                            </View>
                        </View>
                    ) : null
                }
            </View>
        );
    }
}

export default UserExperience;