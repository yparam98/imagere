import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, ToastAndroid, TouchableHighlight, StatusBar, Platform, RefreshControl } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { StackRouter } from 'react-navigation';
import SignUp from './SignUp';
import axios from 'axios';
import moment from 'moment';

class NewsfeedPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myData: [],
            myNav: this.props.navigation
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

    getPostDate(incomingDate) {
        return <Text style={styles.dateText}>{moment.unix(incomingDate).fromNow()}</Text>
    }

    getSpeciesPicture(incomingPictureURL) {
        return <Image source={{ uri: incomingPictureURL }} style={styles.speciesImage} />
    }

    getIdentification(incomingIdentification) {
        return <Text style={{ fontFamily: "Quicksand-Bold" }}>{incomingIdentification}</Text>
    }

    getUserProfilePic(incomingProfilePicURL) {
        return <Image source={{ uri: incomingProfilePicURL }} style={styles.userImage} />
    }

    getUsername(incomingUserName, incomingItem) {
        return <Text style={styles.userName} onPress={() => this.onUserNamePress(incomingItem)}>{incomingUserName}</Text>
    }

    getLocation(incomingLocation) {
        return <Text style={styles.locationText}>{incomingLocation}</Text>
    }

    onUserNamePress (incomingItem) {
        this.state.myNav('Profile', {user: incomingItem});
    }

    renderNewsfeed() {
        return this.state.myData.map((item, key) => {
            return (
                <View style={styles.newsfeedCardView} key={key}>
                    <View style={styles.userTagDateContainer}>
                        <View style={styles.userTag}>
                            {this.getUserProfilePic(item.userPicURL)}
                            {this.getUsername(item.userName, item)}
                        </View>
                        {this.getLocation(item.locationTaken)}
                    </View>
                    {this.getSpeciesPicture(item.photoURL)}
                    <Text style={styles.identificationText}>Identified as: {this.getIdentification(item.identification)}</Text>
                    {this.getPostDate(item.timestamp)}
                </View>
            )
        });
    }

    render() {
        return (
            <View>
                {this.renderNewsfeed()}
            </View>
        )
    }
}
class Newsfeed extends Component {
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
            fontLoaded: true
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View>
                {
                    this.state.fontLoaded ? (
                        <View style={styles.newsfeedView}>
                            <View style={styles.topBlackBackground}>
                                <Image source={require("../assets/icons/ic_launcher4x.png")} style={styles.topBarLogo} />
                                <Text style={styles.regularText}>newsfeed</Text>
                            </View>
                            <ScrollView style={styles.scrollingNewsPane} showsVerticalScrollIndicator={false}>
                                <NewsfeedPane navigation={navigate}/>
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
    newsfeedView: {
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
    scrollingNewsPane: {
        alignContent: "center"
    },
    newsfeedCardView: { // need to scale to device specs
        backgroundColor: "white",
        margin: 5,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        elevation: 3,
        alignContent: "center",
        borderRadius: 5
    },
    userTagDateContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    userTag: {
        borderRadius: 50,
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 0,
        backgroundColor: "black",
        flexDirection: "row",
        alignItems: "center"
    },
    userName: {
        fontFamily: "Quicksand",
        color: "white",
        padding: 5,
        marginBottom: "0.5%"
    },
    userImage: {
        width: 952 / 25,
        height: 651 / 25,
        borderRadius: 50,
        margin: 3
    },
    speciesImage: {
        width: 632 / 1.45,
        height: 419 / 1.45,
        alignSelf: "center"
    },
    identificationText: {
        alignSelf: "flex-end",
        padding: 10,
        fontFamily: "Quicksand"
    },
    dateText: {
        alignSelf: "flex-end",
        padding: 10,
        fontFamily: "Quicksand",
        fontSize: 10,
        color: "grey"
    },
    locationText: {
        fontFamily: "Quicksand-Medium",
        fontSize: 12
    }
});

export default Newsfeed;