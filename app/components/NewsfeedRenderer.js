import React, { PureComponent } from "react";
import { FlatList, View, TouchableHighlight, Text, ActivityIndicator, BackHandler, TouchableOpacity, ImageBackground } from "react-native";
import { Image, Overlay, Avatar } from 'react-native-elements';
import newsfeedPageStyles from "../assets/css/newsfeedPage_styles";
import axios from "axios";
import moment from "moment";
import { Buffer } from "buffer";
import AsyncImage from "./ImageRenderer";
import ProfileSampler from "./ProfileSampler";
import profilePageStyles from "../assets/css/profilePage_styles";

class NewsfeedRenderer extends PureComponent {
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
        let identification = incomingIdentification;

        if (incomingIdentification.search('_') != -1) {
            identification = incomingIdentification.replace('_', ' ');
        }

        let capitalizedFirstLetter = identification.charAt(0).toUpperCase();
        identification = capitalizedFirstLetter.concat(identification.slice(1, identification.length));


        return <Text style={{ fontFamily: "Quicksand-Bold" }}>{identification}</Text>
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
            <FlatList data={this.state.myData} initialNumToRender={5} showsVerticalScrollIndicator={false} renderItem={({ item }) =>
                <View style={newsfeedPageStyles.newsfeedCardView}>
                    <View style={newsfeedPageStyles.userTagDateContainer}>
                        <TouchableOpacity onPress={() => this.onUserNamePress(item.metadata.photographer)}>
                            <View style={newsfeedPageStyles.userTag}>
                                {
                                    item.metadata.photographer.profilePicture ? (
                                        <Avatar rounded source={{ uri: "http://myvmlab.senecacollege.ca:6746/static/" + RegExp(/^[a-z]*\/(.*)/).exec(item.metadata.photographer.profilePicture)[1] }} size="small" activeOpacity={1.0} avatarStyle={newsfeedPageStyles.userImage} containerStyle={newsfeedPageStyles.userImage} placeholderStyle={{ backgroundColor: "rgba(0,0,0,0.0)" }} renderPlaceholderContent={() => <ActivityIndicator size="large" color="grey" />} />
                                    ) : <Avatar rounded title={item.metadata.photographer.firstName.charAt(0) + item.metadata.photographer.lastName.charAt(0)} size="small" activeOpacity={0.7} avatarStyle={newsfeedPageStyles.userImage} containerStyle={newsfeedPageStyles.userImage} />
                                }
                                {this.getUsername(item.metadata.photographer)}
                            </View>
                        </TouchableOpacity>
                        {this.getLocation(item.metadata.locationTaken)}
                    </View>
                    <ImageBackground source={{ uri: "http://myvmlab.senecacollege.ca:6746/static/" + RegExp(/^[a-z]*\/(.*)/).exec(item.pathToPicture)[1] }} style={{ width: "100%" }} blurRadius={30}>
                        <AsyncImage incomingPictureURL={item.pathToPicture} incomingStyleObj={newsfeedPageStyles.speciesImage} />
                    </ImageBackground>
                    <Text style={newsfeedPageStyles.identificationText}>Identified as: {this.getIdentification(item.categorization.nnResult[0].label)}</Text>
                    {this.getPostDate(item.metadata.dateTaken)}
                </View>
            } keyExtractor={item => item._id} />
        )
    }
}

export default NewsfeedRenderer;
