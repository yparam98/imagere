import React, { Component } from 'react';
import { Text, View, Image, Button, InteractionManager, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import profilePageStyles from '../assets/css/profilePage_styles';
import settingsPageStyles from '../assets/css/settingsPage_styles';
import base64Utility from 'base-64';
import axios from 'axios';
import Buffer from 'buffer';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import UtilityButton from './Button';

class UpdateProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // photo: "https://avatars3.githubusercontent.com/u/44414281?s=460&v=4",
            photo: "",
            profilePictureLoaded: false,
            myProfilePicture: "https://image.flaticon.com/icons/svg/1077/1077114.svg",
            myUser: this.props.navigation.state.params.user,
            dataURL: "http://myvmlab.senecacollege.ca:6746"
        }
    }

    async componentDidMount() {
        //console.log("test updateProfilePicture:");
        //console.log(this.props);

        let imageSrc = await axios.post(this.state.dataURL + "/retrieveFile", { "incomingURL": this.state.myUser.profilePicture }, { responseType: 'arraybuffer' });

        this.setState({
            profilePictureLoaded: true,
            myProfilePicture: "data:image/jpg;base64," + Buffer.Buffer.from(imageSrc.data, 'binary').toString('base64')
        });

        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        await Camera.requestPermissionsAsync();
    }

    snap = async () => {
        if (this.camera) {
            let taken_photo = await this.camera.takePictureAsync(options);

            this.setState({
                photo: taken_photo,
                myProfilePicture: taken_photo.uri
            });
        }
    }

    renderCamera = async () => {
        let options = { base64: true };
        let taken_photo = await ImagePicker.launchCameraAsync();

        this.setState({
            photo: taken_photo,
            myProfilePicture: taken_photo.uri
        });
    }

    uploadPhoto = async () => {
        let options = { base64: true };
        let taken_photo = await ImagePicker.launchImageLibraryAsync();

        this.setState({
            photo: taken_photo,
            myProfilePicture: taken_photo.uri
        });
    }

    savePhoto() {
        let formData = new FormData();

        formData.append("profilePicture", { uri: this.state.photo.uri, name: this.state.myUser._id + ".jpg", type: "image/jpg" });
        formData.append("user_id", this.state.myUser._id);

        fetch(this.state.dataURL + "/add/user/profilePic", {
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        }).then((response) => {
            ToastAndroid.show("Photo saved successfully!", ToastAndroid.SHORT);
        }).catch((err) => {
            ToastAndroid.show("Photo did not save successfully!", ToastAndroid.SHORT);
        });
    }

    render() {
        return (
            <View style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>Update Profile Picture</Text>
                <Image source={{ uri: this.state.myProfilePicture }} style={profilePageStyles.userImage} />
                <View style={{ alignItems: "stretch", margin: 40 }}>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity style={{ borderWidth: 0, backgroundColor: "purple", borderRadius: 45, margin: 5, flexDirection: "row", justifyContent: "center" }} onPress={() => this.renderCamera()}>
                            <Text style={{ fontFamily: "Quicksand", fontSize: 32, color: "white", paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 7 }}>Take a photo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity style={{ borderWidth: 0, backgroundColor: "darkorange", borderRadius: 45, margin: 5, flexDirection: "row", justifyContent: "center" }} onPress={() => this.uploadPhoto()}>
                            <Text style={{ fontFamily: "Quicksand", fontSize: 32, color: "white", paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 7 }}>Upload a photo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 10 }}>
                        <TouchableOpacity style={{ borderWidth: 0, backgroundColor: "teal", borderRadius: 45, margin: 5, flexDirection: "row", justifyContent: "center" }} onPress={() => this.savePhoto()}>
                            <Text style={{ fontFamily: "Quicksand", fontSize: 32, color: "white", paddingTop: 20, paddingBottom: 20, paddingLeft: 15, paddingRight: 7 }}>Save Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default UpdateProfilePicture;