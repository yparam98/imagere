import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar, Platform, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import _ from 'lodash';
import profilePageStyles from '../assets/css/profilePage_styles';
import axios from 'axios';
import Buffer from 'buffer';
import { Icon } from 'react-native-elements';;
//
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            myUser: this.props.user,
            myProfilePicture: "",
            profilePictureLoaded: false
        };
    }

    async componentDidMount() {
        let imageSrc = await axios.post(this.state.dataURL + "/retrieveFile", { "incomingURL": this.state.myUser.profilePicture }, { responseType: 'arraybuffer' });

        this.setState({
            profilePictureLoaded: true,
            myProfilePicture: "data:image/jpg;base64," + Buffer.Buffer.from(imageSrc.data, 'binary').toString('base64')
        });
    }
    on_settings_press() {
        this.props.navigation.navigate('Settings', { navigation: this.props.navigation});
    }
    renderProfilePicture() {
        return <Image source={{ uri: this.state.myProfilePicture }} style={profilePageStyles.userImage} />
    }

    renderNewPics() {
        return this.state.myUser.newPhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderPrivatePics() {
        return this.state.myUser.privatePhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderPublicPics() {
        return this.state.myUser.publicPhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderDescription() {
        return (
            <View style={{ borderColor: "black", borderWidth: 2, margin: 5, borderRadius: 90, width: "90%", alignSelf: "center" }}>
                <Text style={_.merge({}, profilePageStyles.helperTextView, { alignSelf: "center", fontSize: 18 })}>{this.state.myUser.description}</Text>
            </View>
        )
    }

    renderPencilIcon() {
        return (
            <Icon name="settings" type="material" reverse raised containerStyle={{alignSelf: "flex-end", position: "absolute", padding: 10 }} onPress={this.on_settings_press}/>
        )
    }


    renderProfilePage() {
        return (
            <View>
                {
                    this.state.profilePictureLoaded ? (
                        <View style={{ marginBottom: 180, marginStart: 5, marginTop: 5, marginEnd: 5 }}>
                            {this.renderProfilePicture()}
                            <Text style={profilePageStyles.userName}>{this.state.myUser.firstName} {this.state.myUser.lastName}</Text>
                            <Text style={profilePageStyles.helperTextView}>description</Text>
                            {this.renderDescription()}

                            {/* <Text style={profilePageStyles.helperTextView}>new</Text>
                        <ScrollView nestedScrollEnabled={true} horizontal={true}>
                            {this.renderNewPics()}
                        </ScrollView>
                        <Text style={profilePageStyles.helperTextView}>private</Text>
                        <ScrollView nestedScrollEnabled={true} horizontal={true}>
                            {this.renderPrivatePics()}
                        </ScrollView>
                        <Text style={profilePageStyles.helperTextView}>public</Text>
                        <ScrollView nestedScrollEnabled={true} horizontal={true}>
                            {this.renderPublicPics()}
                        </ScrollView> */}
                        </View>
                    ) : null
                }
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.renderProfilePage()}
            </View>
        )
    }
}
class Profile extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        // console.log(this.props.userData);

        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        this.setState({
            fontLoaded: true,
            // userdata: this.props.navigation.state.params.user,
            userdata: this.props.userData
        });
    }

    render() {
        return (
            <View>
                {
                    this.state.fontLoaded ? (
                        <View style={profilePageStyles.profileView}>
                            <ScrollView style={profilePageStyles.scrollingProfilePage} showsVerticalScrollIndicator={false}>
                                <ProfilePage user={this.state.userdata} />
                                {/* <Text>{this.state.userdata.firstName}</Text> */}
                            </ScrollView>
                        </View>
                    ) : null
                }
            </View>
        );
    }
}

export default Profile;
