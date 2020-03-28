import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Button, InteractionManager, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import settingsPageStyles from '../assets/css/settingsPage_styles';

class About extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <ScrollView style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>Application Overview</Text>
                <Text style={{fontFamily: 'Quicksand', color: '#505050', padding: 20, margin: 20, fontSize: 24}}>
                    The Imagère application allows a user equipped with an Android 
                    cell or IOS phone to upload a picture of an animal and receive 
                    the probable categorization of the creature. The image below 
                    is an overview of the app.
                </Text>
                <Image  source={require('../assets/images/output-onlinepngtools.png') } style={settingsPageStyles.diagram} />
            </ScrollView>
            </SafeAreaView>
        )
    }
}

export default About;
