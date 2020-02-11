import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Button, InteractionManager, Alert, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import settingsPageStyles from '../assets/css/settingsPage_styles';

class About extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });
    }

    render() {
        return (
            <ScrollView style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>Contact Us</Text>
                <Text style={settingsPageStyles.subHeadingStyle}>We'd love to hear from you.</Text>
                <Text style={{fontFamily: 'Quicksand', color: '#505050', padding: 20, margin: 20, fontSize: 24}}>
                    Please email all inquiries to prj666_201a01@myseneca.ca.  
                </Text>
            </ScrollView>
        )
    }
}

export default About;