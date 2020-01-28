import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar, Platform, RefreshControl } from 'react-native';
import { TextInput, ScrollView, FlatList } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { StackRouter } from 'react-navigation';
import SignUp from './SignUp';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myUser: this.props.user
        };
    }

    componentDidMount() {
        axios.get('https://lonetech.ca/api/prj666')
            .then((response) => {
                this.setState({ myData: response.data });
            })
            .catch(() => {
                console.log("error retrieving data from API!")
            });
    }

    renderProfilePic() {

    }

    renderNewPics() {
        return this.state.myUser.newPhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderPrivatePics() {
        return this.state.myUser.privatePhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderPublicPics() {
        return this.state.myUser.publicPhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderDescription() {
        return (
            <View style={{ borderColor: "black", borderWidth: 2, margin: 5, borderRadius: 90, width: "90%", alignSelf: "center" }}>
                <Text style={_.merge({}, styles.helperTextView, { alignSelf: "center", fontSize: 18 })}>{this.state.myUser.description}</Text>
            </View>
        )
    }

    renderPencilIcon() {
        return (
            <Image source={{ uri: "https://image.flaticon.com/icons/png/512/61/61456.png" }} style={{ width: 20, height: 20, alignSelf: "flex-end", padding: 10, position: "absolute" }} />
        )
    }


    renderProfilePage() {
        return (
            <View style={{ marginBottom: 180, marginStart: 5, marginTop: 5, marginEnd: 5 }}>
                {this.renderPencilIcon()}
                <Image source={{ uri: this.state.myUser.userPicURL }} style={styles.userImage} />
                <Text style={styles.userName}>{this.state.myUser.userName}</Text>
                <Text style={styles.helperTextView}>description</Text>
                {this.renderDescription()}
                <Text style={styles.helperTextView}>new</Text>
                <ScrollView nestedScrollEnabled={true} horizontal={true}>
                    {this.renderNewPics()}
                </ScrollView>
                <Text style={styles.helperTextView}>private</Text>
                <ScrollView nestedScrollEnabled={true} horizontal={true}>
                    {this.renderPrivatePics()}
                </ScrollView>
                <Text style={styles.helperTextView}>public</Text>
                <ScrollView nestedScrollEnabled={true} horizontal={true}>
                    {this.renderPublicPics()}
                </ScrollView>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.renderProfilePage()}
            </View>
        )
    }
}
class Profile extends Component {
    constructor(props) {
        super(props);
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
            userdata: this.props.navigation.state.params.user
        });
    }

    render() {
        return (
            <View>
                {
                    this.state.fontLoaded ? (
                        <View style={styles.profileView}>
                            <View style={styles.topBlackBackground}>
                                <Image source={require("../assets/icons/ic_launcher4x.png")} style={styles.topBarLogo} />
                                <Text style={styles.regularText}>profile</Text>
                            </View>
                            <ScrollView style={styles.scrollingProfilePage} showsVerticalScrollIndicator={false}>
                                <ProfilePage user={this.state.userdata} />
                                {/* <Text>{this.state.userdata.userName}</Text> */}
                            </ScrollView>
                            {/* <View style={styles.bottomNavBar}>
                                <Text>Footer</Text>
                            </View> */}
                        </View>
                    ) : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    profileView: {
        // flex: 1
    },
    topBlackBackground: {
        backgroundColor: 'black',
        flexDirection: 'row',
        padding: 10,
        justifyContent: "space-between",
        elevation: 5,
        // height: 500
    },
    topBarLogo: {
        width: 144 / 3,
        height: 144 / 3,
        alignSelf: 'flex-start'
    },
    regularText: {
        fontFamily: 'Quicksand',
        fontSize: 30,
        color: 'white',
        alignSelf: 'center'
    },
    bottomNavBar: {
        backgroundColor: 'purple',
        flexDirection: 'row',
        padding: 0,
        justifyContent: "space-between",
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0
    },
    scrollingProfilePage: {
        alignContent: "center",
        // backgroundColor: "#003a5c"
    },
    userName: {
        fontFamily: "Quicksand",
        fontSize: 48,
        color: "black",
        padding: 5,
        marginBottom: "0.5%",
        alignSelf: "center"
    },
    userImage: {
        width: 651 / 4,
        height: 651 / 4,
        borderRadius: 90,
        borderColor: "black",
        borderWidth: 5,
        margin: 10,
        alignSelf: "center"
    },
    helperTextView: {
        fontFamily: "Quicksand",
        fontSize: 12,
        color: "black",
        padding: 5,
        margin: 10,
        alignSelf: "flex-start"
    }
});

export default Profile;