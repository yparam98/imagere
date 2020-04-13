import React, { PureComponent } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar, Platform, RefreshControl, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import _ from 'lodash';
import moment from 'moment';
import profilePageStyles from '../assets/css/profilePage_styles';
import axios from 'axios';
import Buffer from 'buffer';
import { LinearGradient } from 'expo-linear-gradient';
import UtilityButton from './Button';
import { Icon, Avatar, Overlay } from 'react-native-elements'; 
import AsyncImage from './ImageRenderer';
import SetPublicOrPrivate from './SetPublicOrPrivate';

class Profile extends PureComponent {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            myUser: this.props.userData,
            dataURL: "http://myvmlab.senecacollege.ca:6746/",
            selector: parseInt(Math.random() * 10),
            selectedPhoto: '',
            overlayVisible: false,
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
            ],
            // newPictures: [],
            privatePhotos: [],
            publicPhotos: [],
        };
    }

    handler() {
        this.setState({
            overlayVisible: false,
        });
        this.fetchData();
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
        
        this.fetchData();

        this.setState({
            fontLoaded: true,
        });
    }

    async fetchData() {
        let privateArr = [];
        let publicArr = [];

        await axios.get(
            this.state.dataURL + "user/pictures/" + this.state.myUser._id
        ).then((incomingData) => {
            privateArr = _.filter(incomingData.data, (element) => {
                return !element.metadatas.public
            }).reverse();
            publicArr = _.filter(incomingData.data, (element) => {
                return element.metadatas.public
            }).reverse();
        });

        this.setState({
            privatePhotos: privateArr,
            publicPhotos: publicArr,
        });
    }

    on_settings_press() {
        this.props.navigationModule.navigate('Settings', { navigation: this.props.navigationModule, user: this.state.myUser });
    }

    renderProfilePicture() {
        <Avatar rounded title="YP" size="xlarge" activeOpacity={0.7} avatarStyle={profilePageStyles.userImage} containerStyle={profilePageStyles.userImage} />

    }

    renderDescription() {
        return (
            <View style={{ borderColor: "white", borderWidth: 0.75, margin: 15, borderRadius: 90, width: "90%", alignSelf: "center" }}>
                <Text style={_.merge({}, profilePageStyles.helperTextView, { alignSelf: "center", fontSize: 18 })}>{this.state.myUser.description}</Text>
            </View>
        )
    }

    renderSettingsIcon() {
        return (
            <Icon name="settings" type="material" reverse raised containerStyle={{ alignSelf: "flex-end", position: "absolute", padding: 10 }} onPress={() => this.on_settings_press()} />
        )
    }

    photoOptions(incomingPhoto) {
        this.setState({
            selectedPhoto: incomingPhoto,
            overlayVisible: true,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.fontLoaded ? (
                        <View style={profilePageStyles.profileView}>
                            <ScrollView style={profilePageStyles.scrollingProfilePage} showsVerticalScrollIndicator={false}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ marginBottom: 180, flex: 1 }}>
                                        <LinearGradient colors={this.state.backgroundImg[this.state.selector]} style={{ padding: "2%" }}>
                                            {this.renderSettingsIcon()}
                                            {
                                                this.state.myUser.profilePicture ? (
                                                    <Avatar
                                                        rounded source={{ uri: this.state.dataURL + "static/" + RegExp(/^[a-z]*\/(.*)/).exec(this.state.myUser.profilePicture)[1] }}
                                                        size="xlarge"
                                                        activeOpacity={1.0}
                                                        avatarStyle={profilePageStyles.userImage}
                                                        containerStyle={profilePageStyles.userImage}
                                                        placeholderStyle={{ backgroundColor: "rgba(0,0,0,0.0)" }}
                                                        renderPlaceholderContent={() => <ActivityIndicator size="large" color="grey" />} />
                                                ) : <Avatar rounded title={this.state.myUser.firstName.charAt(0) + this.state.myUser.lastName.charAt(0)} size="xlarge" activeOpacity={0.7} avatarStyle={profilePageStyles.userImage} containerStyle={profilePageStyles.userImage} />
                                            }
                                            <Text style={profilePageStyles.userName}>{this.state.myUser.firstName} {this.state.myUser.lastName}</Text>
                                            <View style={{ borderBottomColor: "white", borderBottomWidth: 0.35, margin: 20 }} />
                                            {this.renderDescription()}
                                        </LinearGradient>

                                        {/* <Text style={profilePageStyles.subTextView}>pending approval</Text>
                                        <FlatList
                                            data={this.state.newPictures}
                                            horizontal={true}
                                            renderItem={({ item }) =>
                                                <TouchableOpacity onPress={() => { this.photoOptions(item) }}>
                                                    <AsyncImage incomingPictureURL={item.pathToPicture} incomingStyleObj={{ width: 256, height: 144, margin: 2 }} />
                                                </TouchableOpacity>
                                            }
                                            keyExtractor={item => item.metadatas._id} /> */}

                                        <Text style={profilePageStyles.subTextView}>private</Text>
                                        <FlatList
                                            data={this.state.privatePhotos}
                                            horizontal={true}
                                            extraData={this.state.privatePhotos}
                                            renderItem={({ item }) =>
                                                <TouchableOpacity onPress={() => { this.photoOptions(item) }}>
                                                    <AsyncImage incomingPictureURL={item.pathToPicture} incomingStyleObj={{ width: 256, height: 144, margin: 2 }} />
                                                </TouchableOpacity>
                                            }
                                            keyExtractor={item => item.metadatas._id} />

                                        <Text style={profilePageStyles.subTextView}>public</Text>
                                        <FlatList
                                            data={this.state.publicPhotos}
                                            horizontal={true}
                                            extraData={this.state.publicPhotos}
                                            renderItem={({ item }) =>
                                                <TouchableOpacity onPress={() => { this.photoOptions(item) }}>
                                                    <AsyncImage incomingPictureURL={item.pathToPicture} incomingStyleObj={{ width: 256, height: 144, margin: 2 }} />
                                                </TouchableOpacity>
                                            }
                                            keyExtractor={item => item.metadatas._id} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    ) : null
                }
                <Overlay
                    isVisible={this.state.overlayVisible}
                    onBackdropPress={() => { this.setState({ overlayVisible: false }) }}
                    animationType={"slide"}
                    transparent={true}
                    width={"90%"}
                    height={"80%"}
                    overlayBackgroundColor={"rgba(0,0,0,0.5)"}>
                    <SetPublicOrPrivate picture={this.state.selectedPhoto} handler={this.handler}/>
                </Overlay>
            </View>
        );
    }
}

export default Profile;
