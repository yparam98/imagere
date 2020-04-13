import React, { Component } from 'react';
import { TouchableOpacity, Text, View, SafeAreaView, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import viewPictureIdentificationStyles from '../assets/css/viewPictureIdentification_styles';
import settingsPageStyles from '../assets/css/settingsPage_styles';
import AsyncImage from './ImageRenderer';
import Axios from 'axios';

const SCREEN_WIDTH_SIZE = Dimensions.get('window').width;

const IMAGE_DIMENSIONS = SCREEN_WIDTH_SIZE - 80;

export default class SetPublicOrPrivate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            picture: this.props.picture,
        };
    }

    componentDidMount() {
        this.setState({
            selectedIndex: this.state.picture.metadatas.public ? 1 : 0,
        });
    }

    togglePublicPrivate() {

        // U just need to send the picture metadata id and a boolean indicating whether the picture is public to the route

        // public is 1
        // private is 0
        
        var toggleStat;

        if (this.state.selectedIndex == 1)
        {
            this.setState({
                selectedIndex: 0
            });

            toggleStat = false;
        }
        else
        {
            this.setState({
                selectedIndex: 1
            });

            toggleStat = true;
        }

        Axios.post("http://myvmlab.senecacollege.ca:6746/user/metadata/setPublicOrPrivate", {
            "id": this.state.picture.metadatas._id,
            "setPublic": toggleStat
        }).then(()=>{
            // console.log("success");
        }).catch((err)=>{
            // console.log("ate shit: " + err);
        });
    }

    render() {
        return (
            <View style={viewPictureIdentificationStyles.container}>
                <View style={viewPictureIdentificationStyles.pictureContainer}>
                    <AsyncImage incomingPictureURL={this.state.picture.pathToPicture} incomingStyleObj={{ width: IMAGE_DIMENSIONS, height: IMAGE_DIMENSIONS }} />
                </View>
                <View style={viewPictureIdentificationStyles.buttonGroupStyle}>
                    <ButtonGroup
                        buttons={['Private', 'Public']}
                        selectedIndex={this.state.selectedIndex}
                        textStyle={{ fontFamily: 'Quicksand-Medium' }}
                        onPress={()=>{
                            this.togglePublicPrivate();
                            this.props.handler();
                        }}
                    />
                    <Button
                        buttonStyle={{ backgroundColor: "darkred", margin: 1, paddingLeft: 20, paddingRight: 20 }}
                        containerStyle={{ backgroundColor: "black", marginLeft: 9, marginRight: 9, marginBottom: 10, marginTop: 20 }}
                        titleStyle={{ fontFamily: "Quicksand-Medium" }}
                        title={"Delete"}
                        onPress={() => {
                            Alert.alert(
                                "Delete Confirmation",
                                "Are you sure you want to delete this?",
                                [
                                    {
                                        text: "Yes", onPress: () => {
                                            Axios.delete("http://myvmlab.senecacollege.ca:6746/user/picture/" + this.state.picture._id);
                                            this.props.handler();
                                        }
                                    },
                                    {
                                        text: "No", onPress: () => {
                                            this.props.handler();
                                        }
                                    }
                                ]
                            )
                        }} />
                </View>
                {/* <ScrollView style={{ flex: 1 }}>
          {this.state.user..map(function (result, key) {
            return <View key={key} style={viewPictureIdentificationStyles.resultsContainer}>
              <Text style={viewPictureIdentificationStyles.resultLabel}>
                {result.label}
              </Text>
              <Text style={viewPictureIdentificationStyles.probabilityLabel}>
                {result.percentile}%
                          </Text>
            </View>;
          })}
        </ScrollView> */}
            </View>
        );
    }
}
