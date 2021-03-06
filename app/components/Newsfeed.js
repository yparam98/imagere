import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import newsfeedPageStyles from '../assets/css/newsfeedPage_styles';
import NewsfeedPanel from './NewsfeedPanel';
import { Overlay } from 'react-native-elements';
import ProfileSampler from './ProfileSampler';

class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            dataLoaded: false,
            newsfeedDataObj: undefined,
            myData: [],
            myNav: this.props.navigation,
            overlayVisible: false,
            selectedUser: {},
        }
    }

    handler(user) {
        this.setState({
            selectedUser: user,
            overlayVisible: true,
        });
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

        this.fetchData();

        this.setState({
            fontLoaded: true,
        });
    }
    
    async fetchData() {
        var index = 0;
        var dataArr = [];

        await axios.get('http://myvmlab.senecacollege.ca:6746/newsfeed')
            .then((response) => {
                response.data.reverse();

                for (let pictureObj of response.data) {
                    index = index + 1;

                    // pictureObj != undefined
                    // pictureObj != undefined
                    // pictureObj.metadata != undefined
                    // pictureObj.categorization != undefined
                    // pictureObj.categorization.nnResult[0].label != undefined
                    // pictureObj.metadata.photographer != null
                    // dataArr.push(pictureObj);

                    if (pictureObj != undefined) {
                        if (pictureObj.metadata != undefined) {
                            if (pictureObj.metadata.photographer != undefined) {
                                if (pictureObj.metadata.public == true) {
                                    if (pictureObj.categorization != undefined) {
                                        if (pictureObj.categorization.nnResult[0] != undefined) {
                                            if (pictureObj.categorization.nnResult[0].label != undefined) {
                                                dataArr.push(pictureObj);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            .catch((err) => {
                console.log("error retrieving data from API: " + err);
            });

        this.setState({
            dataLoaded: true,
            myData: dataArr,
        });
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={newsfeedPageStyles.newsfeedView}>
                    <View>
                        <FlatList
                            data={this.state.myData}
                            initialNumToRender={5}
                            showsVerticalScrollIndicator={false}
                            refreshing={!this.state.dataLoaded}
                            onRefresh={() => {
                                this.setState({ dataLoaded: false });
                                this.fetchData();
                            }}
                            extraData={this.state.myData}
                            renderItem={({ item }) =>
                                <NewsfeedPanel userObj={item} handler={this.handler} />
                            }
                            keyExtractor={item => item._id} />

                        <Overlay
                            isVisible={this.state.overlayVisible}
                            onBackdropPress={() => { this.setState({ overlayVisible: false }) }}
                            animationType={"slide"}
                            transparent={true}
                            width={"90%"}
                            height={"90%"}
                            overlayBackgroundColor={"rgb(0,0,0)"}>
                            <ProfileSampler myUser={this.state.selectedUser} />
                        </Overlay>
                    </View>
                </View>
            </View>
        );
    }
}

export default Newsfeed;