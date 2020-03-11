import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, FlatList, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';
import moment from 'moment';
import newsfeedPageStyles from '../assets/css/newsfeedPage_styles';

class NewsfeedPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            newsfeedDataObj: undefined,
            myData: [],
            myNav: this.props.navigation,
            // pictureID: "",
            // picturePath: "",
            // metadata: {
            //     id: "",
            //     dateTaken: "",
            //     locationTaken: "",
            //     photographer: {
            //         id: "",
            //         firstName: "",
            //         lastName: "",
            //         description: "",
            //         profilePicture: ""
            //     },
            // },
        };
    }

    async componentDidMount() {
        // await axios.get('http://myvmlab.senecacollege.ca:6746/newsfeed')
        //     .then((response) => {
        //         // console.log(response.data);
        //         for (let pictureObj of response.data) {
        //             if (pictureObj != undefined && pictureObj.metadata != undefined && pictureObj.categorization != undefined) {
        //                 console.log(pictureObj.categorization.nnResult[0].label);
        //                 this.state.myData.push(pictureObj);
        //             }
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("error retrieving data from API: " + err);
        //     });
    }

    async initializeData() {
        await axios.get('http://myvmlab.senecacollege.ca:6746/newsfeed')
            .then((response) => {
                // console.log(response.data);
                for (let pictureObj of response.data) {
                    if (pictureObj != undefined && pictureObj.metadata != undefined && pictureObj.categorization != undefined) {
                        this.state.myData.push(pictureObj);
                    }
                }
            })
            .catch((err) => {
                console.log("error retrieving data from API: " + err);
            });
    }

    async renderNewsfeed() {
        await this.initializeData().then(() => {
            this.setState({
                dataLoaded: true
            });
        });
    }

    render() {
        this.renderNewsfeed();
        return (
            <View>
                {
                    !this.state.dataLoaded ? (
                        <View style={{ padding: 25, alignSelf: "center" }}><ActivityIndicator size="large" color="purple" /></View>
                    ) : 
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

        // console.log(this.props.navigation.getParam(currentUser, ""));

        await Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        this.setState({
            fontLoaded: true,
            // currentUser: this.props.navigation.getParam(currentUser, "")
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

/*

  {
        "_id": "5e587ae4af5cbe617197cab0",
        "pathToPicture": "images/speciesPictures/e5d98ed3c599293e6533d1d597e973221f46aed544601219695c6c80c75c7ccb.jpg",
        "approval": false,
        "metadata": null,
        "__v": 0
    },
    {
        "_id": "5e5c63a4ea3d4c91a231a811",
        "pathToPicture": "images/speciesPictures/913a7a4e5136a9bf3d07e43b4e219a178236790acd4d228b99691759c1d7a721.jpg",
        "approval": false,
        "metadata": {
            "public": false,
            "_id": "5e5c63a4ea3d4c91a231a810",
            "dateTaken": "2020-03-02T01:38:44.356Z",
            "locationTaken": "Toronto",
            "photographer": {
                "accountVerified": false,
                "passwordResetToken": "JLAPHICJPNOFJEMC",
                "_id": "5e2e75cc06b77c26821a813d",
                "firstName": "Sukhbeer",
                "lastName": "Dhillon",
                "emailAddress": "ssdhillon20@myseneca.ca",
                "securityQuestions": [
                    {
                        "_id": "5e2e75cc06b77c26821a813e",
                        "question": "Where am I?"
                    }
                ],
                "__v": 0,
                "description": "Student Developer",
                "profilePicture": "images/profilePictures/35f5fd1a4661b49c87ce76fad088bfbeec973ee90f90f06ba843adcec34b1249.jpg",
                "tokenExpiryDate": "2020-03-11T21:29:00.000Z"
            },
            "__v": 0
        },
        "__v": 0,
        "categorization": {
            "_id": "5e5c63bfea3d4c91a231a812",
            "nnResult": [
                {
                    "_id": "5e5c63bfea3d4c91a231a817",
                    "label": "Shih-Tzu",
                    "percentile": 79.4
                },
                {
                    "_id": "5e5c63bfea3d4c91a231a816",
                    "label": "Lhasa",
                    "percentile": 2.4
                },
                {
                    "_id": "5e5c63bfea3d4c91a231a815",
                    "label": "affenpinscher",
                    "percentile": 1.6
                },
                {
                    "_id": "5e5c63bfea3d4c91a231a814",
                    "label": "Pekinese",
                    "percentile": 1
                },
                {
                    "_id": "5e5c63bfea3d4c91a231a813",
                    "label": "Tibetan_terrier",
                    "percentile": 0.7
                }
            ],
            "picture": "5e5c63a4ea3d4c91a231a811",
            "__v": 0
        }
    }

*/