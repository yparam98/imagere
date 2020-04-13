import React, { PureComponent } from "react";
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity, ImageBackground } from "react-native";
import { Avatar, Icon } from 'react-native-elements';
import newsfeedPageStyles from "../assets/css/newsfeedPage_styles";
import moment from "moment";
import AsyncImage from "./ImageRenderer";

class NewsfeedPanel extends PureComponent {
    constructor(props) {
        super(props);
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
        this.props.handler(incomingItem);
    }

    render() {
        return (
            <View style={newsfeedPageStyles.newsfeedCardView}>
                <View style={newsfeedPageStyles.userTagDateContainer}>
                    <TouchableOpacity onPress={() => this.onUserNamePress(this.props.userObj.metadata.photographer)}>
                        <View style={newsfeedPageStyles.userTag}>
                            {
                                this.props.userObj.metadata.photographer.profilePicture ? (
                                    <Avatar rounded source={{ uri: "http://myvmlab.senecacollege.ca:6746/static/" + RegExp(/^[a-z]*\/(.*)/).exec(this.props.userObj.metadata.photographer.profilePicture)[1] }} size="small" activeOpacity={1.0} avatarStyle={newsfeedPageStyles.userImage} containerStyle={newsfeedPageStyles.userImage} placeholderStyle={{ backgroundColor: "rgba(0,0,0,0.0)" }} renderPlaceholderContent={() => <ActivityIndicator size="large" color="grey" />} />
                                ) : <Avatar rounded title={this.props.userObj.metadata.photographer.firstName.charAt(0) + this.props.userObj.metadata.photographer.lastName.charAt(0)} size="small" activeOpacity={0.7} avatarStyle={newsfeedPageStyles.userImage} containerStyle={newsfeedPageStyles.userImage} />
                            }
                            {this.getUsername(this.props.userObj.metadata.photographer)}
                        </View>
                    </TouchableOpacity>
                    {this.getLocation(this.props.userObj.metadata.locationTaken)}
                </View>
                <ImageBackground source={{ uri: "http://myvmlab.senecacollege.ca:6746/static/" + RegExp(/^[a-z]*\/(.*)/).exec(this.props.userObj.pathToPicture)[1] }} style={{ width: "100%" }} blurRadius={20}>
                    <AsyncImage incomingPictureURL={this.props.userObj.pathToPicture} incomingStyleObj={newsfeedPageStyles.speciesImage} />
                </ImageBackground>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row", alignSelf: "flex-start", margin: 5 }}>
                        <Text style={newsfeedPageStyles.identificationText}>{this.props.userObj.metadata.locationTaken}</Text>
                        {/* <Icon
                            name='thumb-up'
                            type='material'
                            color='darkgreen'
                            size={36}
                            containerStyle={{ margin: 5 }} />
                        <Icon
                            name='thumb-down'
                            type='material'
                            color='darkred'
                            size={36}
                            containerStyle={{ margin: 5 }} /> */}
                    </View>
                    <View style={{ flexDirection: "column", alignSelf: "flex-end" }}>
                        <Text style={newsfeedPageStyles.identificationText}>Identified as: {this.getIdentification(this.props.userObj.categorization.nnResult[0].label)}</Text>
                        {this.getPostDate(this.props.userObj.metadata.dateTaken)}
                    </View>
                </View>
            </View>
        )
    }
}

export default NewsfeedPanel;
