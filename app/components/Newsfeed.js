import React, { Component, PureComponent } from 'react';
import { Text, View, Image, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import moment from 'moment';
import newsfeedPageStyles from '../assets/css/newsfeedPage_styles';
import NewsfeedRenderer from './NewsfeedRenderer';

class NewsfeedPane extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            newsfeedDataObj: undefined,
            myData: [],
            myNav: this.props.navigation,
        };
    }

    initializeData = async () => {
        await axios.get('http://myvmlab.senecacollege.ca:6746/newsfeed')
            .then((response) => {
                for (let pictureObj of response.data) {
                    if (pictureObj != undefined && pictureObj.metadata != undefined && pictureObj.categorization != undefined) {
                        if (pictureObj.metadata.photographer != null) {
                            this.state.myData.push(pictureObj);
                        }
                    }
                }
                this.setState({
                    dataLoaded: true
                });
            })
            .catch((err) => {
                console.log("error retrieving data from API: " + err);
            });
    }

    renderNewsfeed = async () => {
        await this.initializeData();
    }

    render() {
        if (!this.state.dataLoaded) {
            this.renderNewsfeed();
        }

        return (
            <View>
                {
                    !this.state.dataLoaded ? (
                        <View style={{ padding: 25, alignSelf: "center" }}><ActivityIndicator size="large" color="purple" /></View>
                    ) : <NewsfeedRenderer newsfeedData={this.state.myData} />
                }
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

        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        this.setState({
            fontLoaded: true,
        });
    }

    render() {
        return (
            <View style={newsfeedPageStyles.newsfeedView}>
                {
                    this.state.fontLoaded ? (
                        <NewsfeedPane navigation={this.props.navigation} />
                    ) : null
                }
            </View>
        );
    }
}

export default Newsfeed;