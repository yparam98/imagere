import React, { Component, PureComponent } from 'react';
import { Image } from 'react-native-elements';
import axios from 'axios';
import Buffer from 'buffer';
import { ActivityIndicator, View } from 'react-native';
import newsfeedPageStyles from '../assets/css/newsfeedPage_styles';

class AsyncImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746",
            pictureURL: this.props.incomingPictureURL,
            styleObj: this.props.incomingStyleObj,
            pictureOBJ: '',
            imageLoaded: false
        };
    }

    async componentDidMount() {
        let pictureRAW = await axios.post(this.state.dataURL + "/retrieveFile", { "incomingURL": this.state.pictureURL }, { responseType: 'arraybuffer' });

        try {
            if (pictureRAW.data != null) {
                this.setState({
                    pictureOBJ: "data:image/jpg;base64," + Buffer.Buffer.from(pictureRAW.data, 'binary').toString('base64'),
                    imageLoaded: true
                });
            }
        }
        catch (errObj) {
            console.log("error: " + errObj);
            this.setState({
                pictureOBJ: "https://www.partitionwizard.com/images/uploads/articles/2019/04/your-pc-ran-into-problem/your-pc-ran-into-problem-thumbnail.jpg",
                imageLoaded: true
            });
        }
    }

    render() {
        return (
            <View>
                {
                    !this.state.imageLoaded ? (
                        <ActivityIndicator size={"small"} color={"darkgrey"} style={{ padding: 2 }} />
                    ) : <Image source={{ uri: this.state.pictureOBJ }} style={this.state.styleObj} containerStyle={this.state.styleObj} PlaceholderContent={<ActivityIndicator size={"small"} color={"white"} style={{ padding: 2 }} />} placeholderStyle={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
                }
            </View>
        )
    }
}

export default AsyncImage;