import React, { Component } from 'react';
import { Text, View, Image, Button, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import profilePageStyles from '../assets/css/profilePage_styles';
import settingsPageStyles from '../assets/css/settingsPage_styles';
import base64Utility from 'base-64';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

class UpdateProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // photo: "https://avatars3.githubusercontent.com/u/44414281?s=460&v=4",
           photo: "",
        }
    }

    async componentDidMount() {
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
                photo: taken_photo
            });
        }
    }

    renderCamera = async () => {
        let options = { base64: true };
        let taken_photo = await ImagePicker.launchCameraAsync();

        this.setState({
            photo: taken_photo
        });
    }

    uploadPhoto = async () => {
        let options = { base64: true };
        let taken_photo = await ImagePicker.launchImageLibraryAsync();

        this.setState({
            photo: taken_photo
        });
    }

    render() {
        return (
            <View style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>Update Profile Picture</Text>
                <Image source={{ uri: this.state.photo.uri }} style={profilePageStyles.userImage} />
                <TouchableOpacity style={settingsPageStyles.utilityButton} onPress={() => this.renderCamera()}>
                    <Icon name='camera-retro' type='font-awesome' size={30} reverse/>
                    <Text style={{ color: "white", fontSize: 20 }}>Take a photo!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={settingsPageStyles.utilityButton} onPress={() => this.uploadPhoto()}>
                    <Icon name='upload' type='font-awesome' size={30} reverse/>
                    <Text style={{ color: "white", fontSize: 20 }}>Upload photo.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default UpdateProfilePicture;