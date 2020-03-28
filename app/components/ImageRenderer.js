import React, { Component } from 'react';
import { Image } from 'react-native-elements';
import { ActivityIndicator, View } from 'react-native';

class AsyncImage extends Component {
    constructor(props) {
        super(props);
        var url = RegExp(/^[a-z]*\/(.*)/).exec(this.props.incomingPictureURL)[1]
        this.state = {
            pictureURL: "http://myvmlab.senecacollege.ca:6746/static/" + url,
            styleObj: this.props.incomingStyleObj,
        };
    }

    render() {
        return (
            <View>
                <Image source={{ uri: this.state.pictureURL }} style={this.state.styleObj} containerStyle={this.state.styleObj} PlaceholderContent={<ActivityIndicator size={"small"} color={"grey"} />} placeholderStyle={{ backgroundColor: "rgba(0,0,0,0.0)" }} resizeMode={"contain"}/>
            </View>
        )
    }
}

export default AsyncImage;