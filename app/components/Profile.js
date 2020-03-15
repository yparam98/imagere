import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar, Platform, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import _ from 'lodash';
import profilePageStyles from '../assets/css/profilePage_styles';
import axios from 'axios';
import Buffer from 'buffer';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';;

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            myUser: this.props.user,
            myProfilePicture: "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg",
            selector: parseInt(Math.random() * 10),
            backgroundImg: [
                ['#659999', '#f4791f'],
                ['#00B4DB', '#0083B0'],
                ['#108dc7', '#ef8e38'],
                ['#0B486B', '#F56217'],
                ['#ff4b1f', '#1fddff'],
                ['#FEAC5E', '#C779D0', '#4BC0C8'],
                ['#00d2ff', '#3a7bd5'],
                ['#114357', '#F29492'],
                ['#67B26F', '#4ca2cd'],
                ['#12c2e9', '#c471ed', '#f64f59']
            ]
        };
    }

    async componentDidMount() {
        //console.log("Test ProfilePage");
        //console.log(this.props.user);

        try {
            let imageSrc = await axios.post(this.state.dataURL + "/retrieveFile", { "incomingURL": this.state.myUser.profilePicture }, { responseType: 'arraybuffer' });

            this.setState({
                myProfilePicture: "data:image/jpg;base64," + Buffer.Buffer.from(imageSrc.data, 'binary').toString('base64')
            });
        } catch (error) {
            this.setState({
                myProfilePicture: "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg"
            });
        }
    }

    on_settings_press() {
        // console.log(this.props);
        // console.log("settings page clicked");
        //console.log(this.props.user);
        this.props.navMod.navigate('Settings', { navigation: this.props.navMod, user: this.props.user });
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
            <View style={{ borderColor: "white", borderWidth: 0.75, margin: 15, borderRadius: 90, width: "90%", alignSelf: "center" }}>
                <Text style={_.merge({}, profilePageStyles.helperTextView, { alignSelf: "center", fontSize: 18 })}>{this.state.myUser.description}</Text>
            </View>
        )
    }

    renderPencilIcon() {
        return (
            <Icon name="settings" type="material" reverse raised containerStyle={{ alignSelf: "flex-end", position: "absolute", padding: 10 }} onPress={() => this.on_settings_press()} />
        )
    }


    renderProfilePage() {
        return (
            <View>
                <View style={{ marginBottom: 180 }}>
                    <LinearGradient colors={this.state.backgroundImg[this.state.selector]} style={{ padding: "2%" }}>
                        {this.renderPencilIcon()}
                        {this.renderProfilePicture()}
                        <Text style={profilePageStyles.userName}>{this.state.myUser.firstName} {this.state.myUser.lastName}</Text>
                        <View style={{ borderBottomColor: "white", borderBottomWidth: 0.35, margin: 20 }} />
                        {this.renderDescription()}
                    </LinearGradient>

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
                                <ProfilePage user={this.state.userdata} navMod={this.props.navigationModule} />
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