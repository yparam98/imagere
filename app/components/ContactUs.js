import React, { Component } from 'react';
import { Text, View, ToastAndroid, ScrollView, Image, Button, InteractionManager, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import axios from 'axios';
import settingsPageStyles from '../assets/css/settingsPage_styles';
import UtilityButton from './Button';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            firstName: this.props.navigation.state.params.user.firstName,
            lastName: this.props.navigation.state.params.user.lastName,
            email: this.props.navigation.state.params.user.emailAddress,
            feedback: "",
            feedbackValid: false
        };
    }

    componentDidMount() {

    }

    sendFeedback() {
        this.setState({
            feedbackValid: this.state.feedback == "" || this.state.feedback.trim() == ""
        });

        if(!this.state.feedbackValid){
            axios.post(this.state.dataURL + "/email/user/feedback", {
                "userEmail": this.state.email,
                "userFirstName": this.state.firstName,
                "userLastName": this.state.lastName,
                "feedback": this.state.feedback
            }).then((response) => {
                ToastAndroid.show("Feedback Sent Successfully!", ToastAndroid.SHORT);
            }).catch((err) => {
                ToastAndroid.show("Feedback could not be sent!", ToastAndroid.SHORT);
            }); 

            this.setState({
                feedback: ""
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <ScrollView style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>Contact Us</Text>
                <Text style={settingsPageStyles.subHeadingStyle}>We'd love to hear from you.</Text>
                <TextInput id={"feedbackEntry"} style={_.merge({margin: 20}, settingsPageStyles.textField, this.state.feedbackValid && settingsPageStyles.inputFieldError)}
                placeholder={'Feedback'} textContentType={'none'} numberOfLines={5} onChangeText={(text) => this.setState({ feedback: text })} maxLength={256} multiline value={this.state.feedback}/>
                <View style={{alignItems: "center", margin: 10}}>
                    <UtilityButton title={"Send Feedback"} icon={"forum"} color={"black"} onPress={() => this.sendFeedback()} />
                </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}

export default ContactUs;