import React, { Component } from 'react';
import { Text, View, ScrollView, Image, InteractionManager, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import _ from 'lodash';
import * as Font from 'expo-font';
import settingsPageStyles from '../assets/css/settingsPage_styles';

class UpdateUserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            firstName: this.props.navigation.state.params.user.firstName,
            lastName: this.props.navigation.state.params.user.lastName,
            description: this.props.navigation.state.params.user.description,
            myUser: this.props.navigation.state.params.user,
            firstNameValid: false,
            lastNameValid: false
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });
    }

    saveInfo() {
        this.setState({
            firstNameValid: this.state.firstName == "",
            lastNameValid: this.state.lastName == "",
        });

        if(this.state.firstName != "" && this.state.lastName != ""){
            axios.post(this.state.dataURL + "/update/user", {
                "newFirstName": this.state.firstName,
                "newLastName": this.state.lastName,
                "newDescription": this.state.description,
                "id": this.state.myUser._id
            }).then((response) => {
                ToastAndroid.show("Info Saved Successfully!", ToastAndroid.SHORT);
            }).catch((err) => {
                ToastAndroid.show("Error Saving Info!", ToastAndroid.SHORT);
            }); 
        }
    }

    render() {
        return (
            <ScrollView style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>Update User Information</Text>
                <Text style={settingsPageStyles.label}>First Name</Text>              
                <TextInput id={"firstNameEntry"} style={
                _.merge({}, settingsPageStyles.inputField, this.state.firstNameValid && settingsPageStyles.inputFieldError)
                } placeholder={'First Name'} textContentType={'givenName'} onChangeText={(text) => this.setState({ firstName: text })} maxLength={25} value={this.state.firstName}/>
                <Text style={settingsPageStyles.label}>Last Name</Text>
                <TextInput id={"lastNameEntry"} style={
                _.merge({}, settingsPageStyles.inputField, this.state.lastNameValid && settingsPageStyles.inputFieldError)
                } placeholder={'Last Name'} textContentType={'familyName'} onChangeText={(text) => this.setState({ lastName: text })} maxLength={25} value={this.state.lastName}/>
                <Text style={settingsPageStyles.label}>Description</Text>
                <TextInput id={"descriptionEntry"} style={ settingsPageStyles.textField } 
                placeholder={'Description'} textContentType={'none'} onChangeText={(text) => this.setState({ description: text })} maxLength={256} multiline value={this.state.description}/>
                <TouchableOpacity style={settingsPageStyles.utilityButton} onPress={() => this.saveInfo()}>
                    <Icon name='save' type='font-awesome' size={30} reverse/>
                    <Text style={{ color: "white", fontSize: 20 }}>Save Info</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default UpdateUserInformation;