import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Button, InteractionManager, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import profilePageStyles from '../assets/css/profilePage_styles';
import settingsPageStyles from '../assets/css/settingsPage_styles';

class Disclaimer extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <ScrollView style={settingsPageStyles.settingOptionContainer}>
                <Text style={settingsPageStyles.headingStyle}>DISCLAIMER</Text>
                <Text style={{fontFamily: 'Quicksand', color: '#505050', fontWeight: 'bold', textAlign: 'center', padding: 10}}>Last updated February 09, 2020</Text>
                <Text style={settingsPageStyles.subHeadingStyle}>APPLICATION DISCALIMER</Text>
                <Text style={{fontFamily: 'Quicksand', color: '#505050', padding: 20, margin: 20, fontSize: 24}}>
                    The information provided by Imagère (“we,” “us” or “our”) on
                    our mobile application is for general informational purposes 
                    only. All information on the Site and our mobile application 
                    is provided in good faith, however we make no representation 
                    or warranty of any kind, express or implied, regarding the 
                    accuracy, adequacy, validity, reliability, availability or 
                    completeness of any information on the Site or our mobile 
                    application. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY 
                    TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT 
                    OF THE USE OF THE SITE OR OUR MOBILE APPLICATION OR RELIANCE ON
                    ANY INFORMATION PROVIDED ON THE SITE AND OUR MOBILE APPLICATION. 
                    YOUR USE OF THE SITE AND OUR MOBILE APPLICATION AND YOUR RELIANCE 
                    ON ANY INFORMATION ON THE SITE AND OUR MOBILE APPLICATION IS SOLELY
                    AT YOUR OWN RISK.
                </Text>
            </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Disclaimer;