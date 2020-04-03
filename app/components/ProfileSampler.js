import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, ImageBackground, StyleSheet } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import * as Font from 'expo-font';
import profilePageStyles from '../assets/css/profilePage_styles';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncImage from './ImageRenderer';
import { Avatar } from 'react-native-elements';

class ProfileSampler extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        dataURL: "http://myvmlab.senecacollege.ca:6746/static/",
        myUser: this.props.myUser,
        visibleModal: true,
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
        ],
        pictureData: []
    }

    async componentDidMount() {
        Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        await axios.get(
            "http://myvmlab.senecacollege.ca:6746/user/pictures/" + this.state.myUser._id
        ).then((incomingData) => {
            this.setState({
                pictureData: _.filter(incomingData.data, (element) => {
                    return !element.metadatas.public // right now it renders EVERYTHING!! CHANGE TO PUBLIC ONCE PRIVATE/PUBLIC IS UP!!
                }).reverse(),
                fontLoaded: true,
            });
        });
    }

    renderDescription() {
        return (
            <View style={{ borderColor: "white", borderWidth: 0.75, margin: 15, borderRadius: 90, width: "90%", alignSelf: "center" }}>
                <Text style={_.merge({}, profilePageStyles.helperTextView, { alignSelf: "center", fontSize: 18 })}>{this.state.myUser.description}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <LinearGradient colors={this.state.backgroundImg[this.state.selector]} style={{ padding: "2%", flexDirection: "row", justifyContent: "space-between" }}>
                    {
                        this.state.myUser.profilePicture ? (
                            <Avatar rounded source={{ uri: this.state.dataURL + RegExp(/^[a-z]*\/(.*)/).exec(this.state.myUser.profilePicture)[1] }} size="small" activeOpacity={1.0} avatarStyle={profileSamplerStyles.userImage} containerStyle={profileSamplerStyles.userImage} placeholderStyle={{ backgroundColor: "rgba(0,0,0,0.0)" }} renderPlaceholderContent={() => <ActivityIndicator size="large" color="grey" />} />
                        ) : <Avatar rounded title={this.state.myUser.firstName.charAt(0) + this.state.myUser.lastName.charAt(0)} size="small" activeOpacity={0.7} avatarStyle={profileSamplerStyles.userImage} containerStyle={profileSamplerStyles.userImage} />
                    }
                    <Text style={profileSamplerStyles.userName}>{this.state.myUser.firstName + " " + this.state.myUser.lastName}</Text>
                    {/* <View style={{ borderBottomColor: "white", borderBottomWidth: 0.35, margin: 20 }} /> */}
                    {/* {this.renderDescription()} */}
                </LinearGradient>
                <FlatList
                    data={this.state.pictureData}
                    contentContainerStyle={{ alignItems: "center" }}
                    renderItem={({ item }) =>
                        <ImageBackground source={{ uri: "http://myvmlab.senecacollege.ca:6746/static/" + RegExp(/^[a-z]*\/(.*)/).exec(item.pathToPicture)[1] }} style={{ width: "100%", alignItems: "center", margin: 2 }} blurRadius={25}>
                            <AsyncImage incomingPictureURL={item.pathToPicture} incomingStyleObj={{ aspectRatio: 1, width: "100%", alignSelf: "center", }} />
                        </ImageBackground>
                    }
                    keyExtractor={item => item.metadatas._id} />
            </View>
        )
    }
};

const profileSamplerStyles = StyleSheet.create({
    userImage: {
        width: 651 / 10,
        height: 651 / 10,
        borderRadius: 90,
        marginTop: 10,
        alignSelf: "center",
        overflow: "hidden",
        position: "relative"
    },
    userName: {
        fontFamily: "Quicksand-Medium",
        fontSize: 30,
        color: "white",
        alignSelf: "center",
    },
});

export default ProfileSampler;