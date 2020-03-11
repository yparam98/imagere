import React, { Component } from "react";
import { FlatList, View, TouchableHighlight, Text, Image } from "react-native";
import newsfeedPageStyles from "../assets/css/newsfeedPage_styles";
import axios from "axios";
import moment from "moment";
import { Buffer } from "buffer";

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

    async getSpeciesPicture(incomingPictureURL) {
        let speciesPicture = "";

        try {
            let imageSrc = await axios.post("http://myvmlab.senecacollege.ca:6746" + "/retrieveFile", { "incomingURL": incomingProfilePicURL }, { responseType: 'arraybuffer' });
            speciesPicture: "data:image/jpg;base64," + Buffer.Buffer.from(imageSrc.data, 'binary').toString('base64');
        } catch (error) {
            speciesPicture: "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg";
        }

        return <Image source={{ uri: speciesPicture }} style={newsfeedPageStyles.speciesImage} />
    }

    getIdentification(incomingIdentification) {
        return <Text style={{ fontFamily: "Quicksand-Bold" }}>{incomingIdentification}</Text>
    }

    async getUserProfilePic(incomingProfilePicURL) {
        // let profilePicture = "";

        // if (!incomingProfilePicURL.profilePicture || incomingProfilePicURL.profilePicture == null) {
        //     profilePicture: "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg";
        // }
        // else {
        //     console.log(incomingProfilePicURL.profilePicture);
        //     try {
        //         let imageSrc = await axios.post("http://myvmlab.senecacollege.ca:6746" + "/retrieveFile", { "incomingURL": incomingProfilePicURL.profilePicture }, { responseType: 'arraybuffer' });
        //         profilePicture: "data:image/jpg;base64," + Buffer.Buffer.from(imageSrc.data, 'binary').toString('base64');
        //     } catch (error) {
        //         profilePicture: "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg";
        //     }
        // }

        // console.log("profilePicture uri: " + profilePicture);

        return <Image source={{ uri: "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg" }} style={newsfeedPageStyles.userImage} />
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
        this.props.navigation.navigate('ProfileSampler', { myUser: incomingItem, navigation: this.props.navigation });
    }

    render() {
        return (
            <FlatList data={this.state.myData} renderItem={({ item }) =>
                <View style={newsfeedPageStyles.newsfeedCardView}>
                    <View style={newsfeedPageStyles.userTagDateContainer}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.0)' onPress={() => this.onUserNamePress(item)}>
                            <View style={newsfeedPageStyles.userTag}>
                                {this.getUserProfilePic(item.metadata.photographer)}
                                {this.getUsername(item.metadata.photographer)}
                            </View>
                        </TouchableHighlight>
                        {this.getLocation(item.metadata.locationTaken)}
                    </View>
                    {/* {this.getSpeciesPicture(item.photoURL)} */}
                    <Text style={newsfeedPageStyles.identificationText}>Identified as: {this.getIdentification(item.categorization.nnResult[0].label)}</Text>
                    {this.getPostDate(item.metadata.dateTaken)}
                </View>
            } keyExtractor={item => item._id} />
        )
    }
}

export default NewsfeedRenderer;
