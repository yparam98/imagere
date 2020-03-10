import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, StatusBar, Picker, Button, ToastAndroid } from 'react-native';
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import ViewPager from '@react-native-community/viewpager';
import signupPageStyles from '../assets/css/signUpPage_styles';
import sharedStyles from '../assets/css/shared_styles';
import loginPageStyles from '../assets/css/loginPage_styles';
import _ from 'lodash';
import { Camera } from 'expo-camera';
import axios, { post } from 'axios';
import moment from 'moment';
import base64Utility from 'base-64';
import * as ImagePicker from 'expo-image-picker';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            firstName: "",
            lastName: "",
            emailAddr: "",
            password: "",
            confirmPassword: "",
            description: "",
            photo: "",
            securityQuestions: [
                {
                    question: "",
                    answer: ""
                }
            ],
            firstNameInvalid: false,
            lastNameInvalid: false,
            emailAddrInvalid: false,
            passwordInvalid: false,
            confirmPasswordInvalid: false,
            descriptionInvalid: false,
        }
    }

    state = {
        fontLoaded: false,
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
        });

        await Camera.requestPermissionsAsync();


        this.setState({
            fontLoaded: true
        });
    }

    onSignup() {

        axios.post(this.state.dataURL + "/add/user/", {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "emailAddress": this.state.emailAddr,
            "description": this.state.description,
            "profilePicture": "",
            "password": this.state.confirmPassword,
            "accountCreationDate": moment(Date.now()).format('LLL'),
            "accountVerified": false
        }).then((response) => {
            if (response.data.user_id) {
                let formData = new FormData();

                formData.append("profilePicture", { uri: this.state.photo.uri, name: response.data.user_id + ".jpg", type: "image/jpg" });
                formData.append("user_id", response.data.user_id);

                fetch(this.state.dataURL + "/add/user/profilePic", {
                    method: "post",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: formData,
                }).then((response) => {
                    ToastAndroid.show("Account successfully created!", ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login', this.props.navigation);
                }).catch((err) => {
                    ToastAndroid.show("Account not created!", ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login', this.props.navigation);
                });
            }
            else {
                ToastAndroid.show("Account not created!", ToastAndroid.SHORT);
                this.props.navigation.navigate('Login', this.props.navigation);
            }
        }).catch((err) => {
            ToastAndroid.show(err.badServer, ToastAndroid.SHORT);
            this.props.navigation.navigate('Login', this.props.navigation);
        });
    }

    snap = async () => {
        // console.log("picture taken!");
        if (this.camera) {

            let taken_photo = await this.camera.takePictureAsync(options);
            // console.log(taken_photo.base64);

            this.setState({
                photo: taken_photo
            });
        }
    }

    renderCamera = async () => {
        // <Camera type={Camera.Constants.Type.front} style={{ height: 400, aspectRatio: 0.80, alignSelf: "center", justifyContent: "flex-end" }} ref={ref => { this.camera = ref; }}>
        //     <Text style={{ color: "white", fontSize: 10, alignSelf: "center" }}>click anywhere to take a photo!</Text>
        // </Camera>
        let options = { base64: true };
        let taken_photo = await ImagePicker.launchCameraAsync();

        this.setState({
            photo: taken_photo
        });
    }

    uploadPhoto = async () => {
        // console.log("upload photo pressed");
        let options = { base64: true };
        let taken_photo = await ImagePicker.launchImageLibraryAsync();

        this.setState({
            photo: taken_photo
        });
    }

    skipPhoto() {

    }

    renderFirstSlide() {
        return (
            <View>
                <Text style={signupPageStyles.helperText}>Login Information: </Text>
                <Text style={signupPageStyles.helperText}>(this is what you will use to sign in)</Text>
                <TextInput style={_.merge({}, signupPageStyles.regularInputField, this.state.emailAddrInvalid && loginPageStyles.inputFieldError)} placeholder={'email'} textContentType={'username'} onChangeText={(text) => this.setState({ emailAddr: text })} />
                <TextInput style={_.merge({}, signupPageStyles.regularInputField, this.state.passwordInvalid && loginPageStyles.inputFieldError)} placeholder={'password'} textContentType={'password'} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
                <TextInput style={_.merge({}, signupPageStyles.regularInputField, this.state.confirmPasswordInvalid && loginPageStyles.inputFieldError)} placeholder={'confirm password'} textContentType={'password'} secureTextEntry={true} onChangeText={(text) => this.setState({ confirmPassword: text })} />
            </View>
        )
    }

    renderSecondSlide() {
        return (
            <View>
                <Text style={signupPageStyles.helperText}>Who are you?</Text>
                <TextInput style={_.merge({}, signupPageStyles.regularInputField, this.state.firstNameInvalid && loginPageStyles.inputFieldError)} placeholder={'first name'} textContentType={'username'} onChangeText={(text) => this.setState({ firstName: text })} />
                <TextInput style={_.merge({}, signupPageStyles.regularInputField, this.state.lastNameInvalid && loginPageStyles.inputFieldError)} placeholder={'last name'} textContentType={'username'} onChangeText={(text) => this.setState({ lastName: text })} />
            </View>
        )
    }

    renderThirdSlide() {
        const profilePicture =
            <TouchableOpacity onPress={() => this.uploadPhoto()}>
                <Image source={{ uri: this.state.photo.uri }} style={{ height: 400, aspectRatio: 0.80, alignSelf: "center" }} />
            </TouchableOpacity>;
        const takeProfilePicture =
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <TouchableOpacity style={sharedStyles.utilityButton} onPress={() => this.renderCamera()}>
                    <Text style={{ color: "white", fontSize: 20 }}>Take a photo!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={sharedStyles.utilityButton} onPress={() => this.uploadPhoto()}>
                    <Text style={{ color: "white", fontSize: 20 }}>Upload photo.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={sharedStyles.utilityButton} onPress={() => this.skipPhoto()}>
                    <Text style={{ color: "white", fontSize: 20 }}>Skip for now...</Text>
                </TouchableOpacity>
            </View>;

        return (
            <View ref={ref => { this.profilePictureTakerView = ref; }}>
                <Text style={signupPageStyles.helperText}> Let's start a profile for you...</Text>
                <Text style={signupPageStyles.helperText}>Enter a short description about yourself:</Text>
                <TextInput style={_.merge({}, signupPageStyles.regularInputField, this.state.descriptionInvalid && loginPageStyles.inputFieldError)} placeholder={'description'} textContentType={'username'} onChangeText={(text) => this.setState({ description: text })} />
                <Text style={signupPageStyles.helperText}>Lets get a selfie for the profile: </Text>
                <View style={{ marginTop: 0 }}>
                    {this.state.photo == "" ? takeProfilePicture : profilePicture}
                </View>
            </View>
        )
    }

    renderFourthSlide() {
        return (
            <View>
                <Text style={signupPageStyles.helperText}>Lets secure your account</Text>
                <TextInput style={signupPageStyles.regularInputField} placeholder={'security question'} textContentType={'username'} />
                <TextInput style={signupPageStyles.passwordInputField} placeholder={'security question answer'} textContentType={'password'} secureTextEntry={true} />

                <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' style={loginPageStyles.buttonPress} onPress={() => this.onSignup()}>
                    <View style={signupPageStyles.signupButton}>
                        <Text style={loginPageStyles.buttonText}>sign up</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    userInputIsValid(incomingPos) {
        // BYPASSING VALIDATION! DISABLE BEFORE PRODUCTION!!
        // 
        if (incomingPos == 0) {
            // console.log("first position reached");
            this.setState({
                emailAddrInvalid: this.state.emailAddr == "",
                passwordInvalid: this.state.password == "",
                confirmPasswordInvalid: this.state.confirmPassword == "" || this.state.password != this.state.confirmPassword
            });
            return this.state.emailAddrInvalid || this.state.passwordInvalid || this.state.confirmPasswordInvalid ? false : true;
        } else if (incomingPos == 1) {
            // console.log("second position reached!");
            this.setState({
                firstNameInvalid: this.state.firstName == "",
                lastNameInvalid: this.state.lastName == "",
            });
            return this.state.firstNameInvalid || this.state.lastNameInvalid ? false : true;
        } else if (incomingPos == 2) {
            this.setState({
                descriptionInvalid: this.state.description == ""
            });
            return this.state.descriptionInvalid ? false : true;
        } else if (incomingPos == 3) {
            // this.setState({
            //     : emailAddr = "",
            //     passwordInvalid: password = "",
            //     confirmPasswordInvalid: confirmPassword = ""
            // });
            // return emailAddrInvalid || passwordInvalid || confirmPasswordInvalid ? true : false;
            return true;
        }

        // return true;
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/background.png')} style={sharedStyles.backgroundImage} blurRadius={5}>
                <StatusBar hidden={true} />
                <View style={sharedStyles.darker} >
                    {
                        this.state.fontLoaded ? (
                            <View style={sharedStyles.pageContent}>
                                <Image source={require('../assets/images/logo.png')} style={sharedStyles.logo} />

                                {/* multi screen signup */}
                                <ViewPager style={{ flex: 1 }} initialPage={0} ref={(viewpager) => { this.viewpager = viewpager }}
                                    onPageScroll={(e) => {
                                        // console.log(e.nativeEvent.offset);
                                        if (e.nativeEvent.offset >= 0.05) {
                                            if (!this.userInputIsValid(e.nativeEvent.position)) {
                                                this.viewpager.setPage(e.nativeEvent.position)
                                            }
                                        }
                                    }}>
                                    <View key="1">
                                        {this.renderFirstSlide()}
                                    </View>
                                    <View key="2">
                                        {this.renderSecondSlide()}
                                    </View>
                                    <View key="3">
                                        {this.renderThirdSlide()}
                                    </View>
                                    <View key="4">
                                        {this.renderFourthSlide()}
                                    </View>
                                </ViewPager>
                                <Text style={{fontFamily: "Quicksand", fontSize: 8, color: "white", alignSelf: "center"}}>(slide to go to next page) →</Text>
                            </View>
                        ) : null
                    }
                </View>
            </ImageBackground>
        );
    }
}

export default SignUp;