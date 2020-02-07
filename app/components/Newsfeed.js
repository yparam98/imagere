import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, FlatList } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import moment from 'moment';
import newsfeedPageStyles from '../assets/css/newsfeedPage_styles';

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
        return <Text style={newsfeedPageStyles.dateText}>{moment.unix(incomingDate).fromNow()}</Text>
    }

    getSpeciesPicture(incomingPictureURL) {
        return <Image source={{ uri: incomingPictureURL }} style={newsfeedPageStyles.speciesImage} />
    }

    getIdentification(incomingIdentification) {
        return <Text style={{ fontFamily: "Quicksand-Bold" }}>{incomingIdentification}</Text>
    }

    getUserProfilePic(incomingProfilePicURL) {
        return <Image source={{ uri: incomingProfilePicURL }} style={newsfeedPageStyles.userImage} />
    }

    getUsername(incomingUserName, incomingItem) {
        return <Text style={newsfeedPageStyles.userName}>{incomingUserName}</Text>
    }

    getLocation(incomingLocation) {
        return <Text style={newsfeedPageStyles.locationText}>{incomingLocation}</Text>
    }

    onUserNamePress(incomingItem) {
        this.props.navigation.navigate('ProfileSampler', { myUser: incomingItem, navigation: this.props.navigation });
    }

    renderNewsfeed() {
        return (
            <FlatList data={this.state.myData} renderItem={({ item }) =>
                <View style={newsfeedPageStyles.newsfeedCardView}>
                    <View style={newsfeedPageStyles.userTagDateContainer}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' onPress={() => this.onUserNamePress(item)}>
                            <View style={newsfeedPageStyles.userTag}>
                                {this.getUserProfilePic(item.userPicURL)}
                                {this.getUsername(item.userName, item)}
                            </View>
                        </TouchableHighlight>
                        {this.getLocation(item.locationTaken)}
                    </View>
                    {this.getSpeciesPicture(item.photoURL)}
                    <Text style={newsfeedPageStyles.identificationText}>Identified as: {this.getIdentification(item.identification)}</Text>
                    {this.getPostDate(item.timestamp)}
                </View>
            } keyExtractor={item => item._id} />
        )
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
        // this.state = {
        // currentUser
        // }
    }

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {

        // console.log(this.props.navigation.getParam(currentUser, ""));

        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        this.setState({
            fontLoaded: true,
            // currentUser: this.props.navigation.getParam(currentUser, "")
        });
    }

    render() {
        return (
            <View style={newsfeedPageStyles.newsfeedView}>
                {
                    this.state.fontLoaded ? (
                        <NewsfeedPane navigation={this.props.navigation} />
                        // <FlatList style={newsfeedPageStyles.scrollingNewsPane} showsVerticalScrollIndicator={false}>
                        //     <NewsfeedPane navigation={this.props.navigation} />
                        //     {/* <Text>{JSON.stringify(this.state.currentUser)}</Text> */}
                        // </FlatList>
                    ) : null
                }
            </View>
        );
    }
}

export default Newsfeed;