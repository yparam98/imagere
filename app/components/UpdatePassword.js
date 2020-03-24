import React, { Component } from 'react';
import { Text, View, ScrollView, Image, InteractionManager, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import _ from 'lodash';
import * as Font from 'expo-font';
import settingsPageStyles from '../assets/css/settingsPage_styles';
import UtilityButton from './Button';

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            myUser: this.props.navigation.state.params.user,
            currentPasswordValid: false,
            newPasswordValid: false,
            validationErrors: ""
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });
    }

    savePassword() {
        let specialFormat = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        let lowercaseFormat = /[a-z]/;
        let uppercaseFormat = /[A-Z]/;
        let numberFormat = /[0-9]/;
        let passwordsMatch = (this.state.newPassword == this.state.confirmNewPassword);
        let hasSpecialCharacters = specialFormat.test(this.state.newPassword);
        let hasLowercaseCharacters = lowercaseFormat.test(this.state.newPassword);
        let hasUppercaseCharacters = uppercaseFormat.test(this.state.newPassword);
        let hasMinimumLength = (this.state.newPassword.length > 7);
        let hasNumber = numberFormat.test(this.state.newPassword);

        if(this.state.currentPassword == "" || this.state.newPassword == "" || this.state.confirmNewPassword == ""){
            this.setState({
                validationErrors: "Fields cannot be empty.",
                newPasswordValid: this.state.newPassword == "" || this.state.confirmNewPassword == "" ,
                currentPasswordValid: this.state.currentPassword == ""
            });
        }
        else if(passwordsMatch && hasSpecialCharacters && hasUppercaseCharacters && hasLowercaseCharacters && hasMinimumLength && hasNumber){
            this.setState({
                validationErrors: "",
                newPasswordValid: false
            });

            axios.post(this.state.dataURL + "/update/user/password", {
                "id": this.state.myUser._id,
                "currentPassword": this.state.currentPassword,
                "newPassword": this.state.newPassword
            }).then((response) => {
                ToastAndroid.show("Password Updated Successfully!", ToastAndroid.SHORT);
            }).catch((err) => {
                ToastAndroid.show("Error Updating Password!", ToastAndroid.SHORT);
            }); 
        }else{
            this.setState({
                validationErrors: "The password must have a minimum length of 8 characters with at least one lower case letter, one upper case letter, one number, and a special character.",
                newPasswordValid: true
            });
        }
    }

    render() {
        return (
            <View style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>Update Password</Text>
                <TextInput id={"currentPasswordEntry"} style={
                _.merge({}, settingsPageStyles.passwordInputField, this.state.currentPasswordValid && settingsPageStyles.inputFieldError)
                } placeholder={'Current Password'} textContentType={'password'} onChangeText={(text) => this.setState({ currentPassword: text })} secureTextEntry={true} maxLength={25} />
                <TextInput id={"newPasswordEntry"} style={
                _.merge({}, settingsPageStyles.passwordInputField, this.state.newPasswordValid && settingsPageStyles.inputFieldError)
                } placeholder={'New Password'} textContentType={'password'} onChangeText={(text) => this.setState({ newPassword: text })} secureTextEntry={true} maxLength={25} />
                <TextInput id={"confirmNewPasswordEntry"} style={
                _.merge({}, settingsPageStyles.passwordInputField, this.state.newPasswordValid && settingsPageStyles.inputFieldError)
                } placeholder={'Confirm New Password'} textContentType={'password'} onChangeText={(text) => this.setState({ confirmNewPassword: text })} secureTextEntry={true} maxLength={25} />
                <Text style={{fontFamily: 'Quicksand', color: '#505050', fontWeight: 'bold', textAlign: 'center', padding: 10}}>{this.state.validationErrors}</Text>
                {/* <TouchableOpacity style={settingsPageStyles.utilityButton} onPress={() => this.savePassword()}>
                    <Icon name='save' type='font-awesome' size={30} reverse/>
                    <Text style={{ color: "white", fontSize: 20 }}>Save Password</Text>
                </TouchableOpacity> */}
                <View style={{alignItems: "flex-end", margin: 10}}>
                    <UtilityButton title={"Save Password"} icon={"save"} color={"black"} onPress={() => this.savePassword()} />
                </View>
            </View>
        )
    }
}

export default UpdatePassword;