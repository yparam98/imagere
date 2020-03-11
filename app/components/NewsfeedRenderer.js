import React, { Component } from "react";
import { FlatList, View, TouchableHighlight, Text, ActivityIndicator, BackHandler, TouchableOpacity } from "react-native";
import { Image, Overlay } from 'react-native-elements';
import newsfeedPageStyles from "../assets/css/newsfeedPage_styles";
import axios from "axios";
import moment from "moment";
import { Buffer } from "buffer";
import AsyncImage from "./ImageRenderer";
import ProfileSampler from "./ProfileSampler";
import profilePageStyles from "../assets/css/profilePage_styles";

class NewsfeedRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myData: this.props.newsfeedData.reverse()
        };
    }

    getPostDate(incomingDate) {
        return <Text style={newsfeedPageStyles.dateText}>{moment(incomingDate).fromNow()}</Text>
    }

    getIdentification(incomingIdentification) {
        return <Text style={{ fontFamily: "Quicksand-Bold" }}>{incomingIdentification}</Text>
    }

    getUsername(incomingUserName) {
        let firstName = "";
        let lastName = "";

        if (incomingUserName.firstName != null) {
            firstName = incomingUserName.firstName;
        }

        if (incomingUserName.lastName != null) {
            lastName = incomingUserName.lastName;
        }

        return <Text style={newsfeedPageStyles.userName}>{firstName + " " + lastName}</Text>
    }

    getLocation(incomingLocation) {
        return <Text style={newsfeedPageStyles.locationText}>{incomingLocation}</Text>
    }

    onUserNamePress(incomingItem) {

        // <Overlay isVisible={visibleAttr} windowBackgroundColor="rgba(255, 255, 255, .5)" onBackdropPress={visibleAttr = false}>
        //     <Text>Hello from overlay!</Text>
        //     {/* <ProfileSampler myUser={incomingItem}/> */}
        // </Overlay>
        this.props.navigation.navigate('ProfileSampler', { myUser: incomingItem, navigation: this.props.navigation });
    }

    render() {
        return (
            <FlatList data={this.state.myData} initialNumToRender={5} renderItem={({ item }) =>
                <View style={newsfeedPageStyles.newsfeedCardView}>
                    <View style={newsfeedPageStyles.userTagDateContainer}>
                        <TouchableOpacity onPress={() => this.onUserNamePress(item.metadata.photographer)}>
                            <View style={newsfeedPageStyles.userTag}>
                                <AsyncImage incomingPictureURL={item.metadata.photographer.profilePicture} incomingStyleObj={newsfeedPageStyles.userImage} />
                                {this.getUsername(item.metadata.photographer)}
                            </View>
                        </TouchableOpacity>
                        {this.getLocation(item.metadata.locationTaken)}
                    </View>
                    <AsyncImage incomingPictureURL={item.pathToPicture} incomingStyleObj={newsfeedPageStyles.speciesImage} />
                    <Text style={newsfeedPageStyles.identificationText}>Identified as: {this.getIdentification(item.categorization.nnResult[0].label)}</Text>
                    {this.getPostDate(item.metadata.dateTaken)}
                </View>
            } keyExtractor={item => item._id} />
        )
    }
}

export default NewsfeedRenderer;
