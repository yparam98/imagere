import React, { Component } from "react";
import { FlatList, View, TouchableHighlight, Text } from "react-native";
import newsfeedPageStyles from "../assets/css/newsfeedPage_styles";
import axios from "axios";

class NewsfeedRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myData: this.props.newsfeedData
        };
    }

    getPostDate(incomingDate) {
        return <Text style={newsfeedPageStyles.dateText}>{moment.unix(incomingDate).fromNow()}</Text>
    }

    async getSpeciesPicture(incomingPictureURL) {
        let speciesPicture = "";

        try {
            let imageSrc = await axios.post(this.state.dataURL + "/retrieveFile", { "incomingURL": incomingProfilePicURL }, { responseType: 'arraybuffer' });
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
        let profilePicture = "";

        try {
            let imageSrc = await axios.post(this.state.dataURL + "/retrieveFile", { "incomingURL": incomingProfilePicURL }, { responseType: 'arraybuffer' });
            profilePicture: "data:image/jpg;base64," + Buffer.Buffer.from(imageSrc.data, 'binary').toString('base64');
        } catch (error) {
            profilePicture: "https://www.retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg";
        }

        return <Image source={{ uri: profilePicture }} style={newsfeedPageStyles.userImage} />
    }

    getUsername(incomingUserName) {
        return <Text style={newsfeedPageStyles.userName}>{incomingUserName}</Text>
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
                                {this.getUserProfilePic(item.metadata.photographer.profilePicture)}
                                {this.getUsername(item.metadata.photographer.firstName + item.metadata.photographer.lastName)}
                            </View>
                        </TouchableHighlight>
                        {this.getLocation(item.metadata.locationTaken)}
                    </View>
                    {this.getSpeciesPicture(item.photoURL)}
                    <Text style={newsfeedPageStyles.identificationText}>Identified as: {this.getIdentification(item.categorization.nnResult[0].label)}</Text>
                    {this.getPostDate(item.metadata.dateTaken)}
                </View>
            } keyExtractor={item => item._id} />
        )
    }
}

