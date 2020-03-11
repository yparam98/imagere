import React, { Component } from 'react';
import { Image } from 'react-native-elements';
import { ActivityIndicator, View } from 'react-native';

class AsyncImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureURL: "http://myvmlab.senecacollege.ca:6746/retrieveFile?incomingURL=" + this.props.incomingPictureURL,
            styleObj: this.props.incomingStyleObj,
        };
    }

    componentDidMount() {
        console.log(this.state.pictureURL);
    }

    render() {
        return (
            <View>
                <Image source={{ uri: this.state.pictureURL }} style={this.state.styleObj} containerStyle={this.state.styleObj} PlaceholderContent={<ActivityIndicator size={"small"} color={"grey"} />} placeholderStyle={{ backgroundColor: "rgba(0,0,0,0.0)" }} />
            </View>
        )
    }
}

export default AsyncImage;