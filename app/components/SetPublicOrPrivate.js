import React, { Component } from 'react';
import { TouchableOpacity, Text, View, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
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
                    />
                    <Button
                        buttonStyle={{ backgroundColor: "darkred", margin: 1, paddingLeft: 20, paddingRight: 20 }}
                        containerStyle={{ backgroundColor: "black", marginLeft: 9, marginRight: 9, marginBottom: 10, marginTop: 20 }}
                        titleStyle={{ fontFamily: "Quicksand-Medium" }}
                        title={"Delete"}
                        onPress={() => {
                            Axios.delete("http://myvmlab.senecacollege.ca:6746/user/picture/" + this.state.picture._id);
                            this.props.handler();
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
