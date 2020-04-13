import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import settingsPageStyles from '../assets/css/settingsPage_styles';

const list = [
    {
        title: 'Update Profile Photo',
        backgroundColor: '#007AFF',
        icon: 'user-circle',
    },
    {
        title: 'Update User Information',
        backgroundColor: '#4CD964',
        icon: 'edit',
    },
    {
        title: 'Update Password',
        backgroundColor: '#000000',
        icon: 'asterisk',
    },
    {
        title: 'About',
        backgroundColor: '#FF9500',
        icon: 'info-circle',
    },
    {
        title: 'Disclaimer',
        backgroundColor: '#FF3B30',
        icon: 'exclamation-triangle',
    },
    {
        title: 'Contact Us',
        backgroundColor: '#6a0dad',
        icon: 'paper-plane',
    }
];

class Settings extends Component {
    async componentDidMount() {
        // console.log("test Settings:");
        // console.log(this.props.navigation.state.params.user);

        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });
    }

    on_option_press = (optionName) => {
        switch (optionName) {
            case 'Update Profile Photo':
                this.props.navigation.navigate('UpdateProfilePicture', { user: this.props.navigation.state.params.user });
                break;
            case 'Update User Information':
                this.props.navigation.navigate('UpdateUserInformation', { user: this.props.navigation.state.params.user });
                break;
            case 'Update Password':
                this.props.navigation.navigate('UpdatePassword', { user: this.props.navigation.state.params.user });
                break;
            case 'Disclaimer':
                this.props.navigation.navigate('Disclaimer');
                break;
            case 'About':
                this.props.navigation.navigate('About');
                break;
            case 'Contact Us':
                this.props.navigation.navigate('ContactUs', { user: this.props.navigation.state.params.user });
                break;                             
        }
    }

    renderItem = ({
        item: { title, backgroundColor, icon },
    }) => (
            <ListItem
                chevron
                key={title}
                leftIcon={{
                    type: 'font-awesome',
                    name: icon,
                    color: 'white',
                    iconStyle: {
                        padding: 5
                    },
                    containerStyle: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor,
                        width: 40,
                        height: 40,
                        borderRadius: 90,
                    },
                    size: 22,
                }}
                containerStyle={{ paddingVertical: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, borderRadius: 90, elevation: 1 }}
                title={title}
                titleStyle={{ fontFamily: 'Quicksand' }}
                onPress={this.on_option_press.bind(this, title)}
                underlayColor="#ffffff00"
            />
        );

    keyExtractor = (item, index) => index.toString();

    render() {
        return (
        <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'column', paddingTop: 20, paddingBottom: 20}}>
                <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => this.props.navigation.pop()}>
                <Image source={require("../assets/icons/ios_back_arrow.png")} style={settingsPageStyles.backIcon} />
            </TouchableOpacity>
            <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 34, textAlign: 'center', textAlignVertical: 'center'}}>Settings</Text>
            <FlatList
                keyExtractor={this.keyExtractor}
                contentContainerStyle={{ marginTop: 20 }}
                data={list}
                renderItem={this.renderItem}
            />
        </View>
        </SafeAreaView>
        );
    }
}

export default Settings;