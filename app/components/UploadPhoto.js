import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as Font from 'expo-font';
import { TouchableHighlight } from 'react-native-gesture-handler';
import uploadPhotoStyles from '../assets/css/uploadPhoto_styles';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';
import * as LocationModule from 'expo-location';
import * as PermissionsModule from 'expo-permissions';
import Axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import Photo from './Photo';


class UploadPhoto extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            specPhoto: "",
            device_location: ""
        }
    }

    handler(photo) {
        this.setState({
            specPhoto: photo,
            device_location: "",
        });
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
            currentView: "newsfeed"
        });
    }

    sendPhoto() {

    }

    uploadPhoto = async () => {
        this.getLocation();

        let options = { base64: true };
        let taken_photo = await ImagePicker.launchImageLibraryAsync();

        if (taken_photo.uri != undefined) {
            this.setState({
                specPhoto: taken_photo
            });
        }
    }

    openCamera = async () => {
        this.getLocation();

        let options = { base64: true, skipProcessing: true };
        let taken_photo = await ImagePicker.launchCameraAsync();

        if (taken_photo.uri != undefined) {
            this.setState({
                specPhoto: taken_photo
            });
        }
    }

    getLocation = async () => {
        let { status } = await PermissionsModule.askAsync(PermissionsModule.LOCATION);
        let location = await LocationModule.getCurrentPositionAsync({});


        //Google Geocoding API to get location from Device GPS module

        Axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            location.coords.latitude + "," + location.coords.longitude +
            `&key=${GOOGLE_MAPS_API_KEY}`
        ).then((response) => {
            var locationStr = response.data.plus_code.compound_code;
            this.setState({
                device_location: locationStr.substring(locationStr.indexOf(' ') + 1, locationStr.length)
            });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.fontLoaded ? this.state.specPhoto == "" && this.state.device_location == "" ? (
                        <View style={uploadPhotoStyles.uploadPictureView}>
                            <TouchableOpacity style={_.merge({}, uploadPhotoStyles.touchCardStyle, { backgroundColor: "darkorange" })} onPressIn={() => this.uploadPhoto()}>
                                <View>
                                    <Image source={require('../assets/icons/upload_icon_white.png')} style={uploadPhotoStyles.cameraIconStyle} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={_.merge({}, uploadPhotoStyles.touchCardStyle, { backgroundColor: "purple" })} onPressIn={() => this.openCamera()}>
                                <View>
                                    <Image source={require('../assets/icons/camera_icon_white.png')} style={uploadPhotoStyles.cameraIconStyle} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : <Photo uri={this.state.specPhoto.uri} device_location={this.state.device_location} userObj={this.props.userData} handler={this.handler} /> : null
                }
            </View>
        );
    }
}
export default UploadPhoto;