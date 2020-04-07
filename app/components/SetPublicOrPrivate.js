import React, { Component } from 'react';
import { TouchableOpacity, Text, View, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import viewPictureIdentificationStyles from '../assets/css/viewPictureIdentification_styles';
import settingsPageStyles from '../assets/css/settingsPage_styles';
import AsyncImage from './ImageRenderer';

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

    // componentDidMount() {
    //     console.log(this.state.picture);
    // }

    render() {
        return (
            <View style={viewPictureIdentificationStyles.container}>
                <View style={viewPictureIdentificationStyles.pictureContainer}>
                    <AsyncImage incomingPictureURL={this.state.picture.pathToPicture} incomingStyleObj={{ width: IMAGE_DIMENSIONS, height: IMAGE_DIMENSIONS, borderRadius: 10, }} />
                </View>
                <View style={viewPictureIdentificationStyles.buttonGroupStyle}>
                    <ButtonGroup
                        buttons={['Private', 'Public']}
                        selectedIndex={this.state.selectedIndex}
                        onPress={selectedIndex => {
                            this.setState({ selectedIndex });
                        }}
                        textStyle={{ fontFamily: 'Quicksand-Medium' }}
                    />
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
