import React, { Component } from 'react';
import {TouchableOpacity, Text, View, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import _ from 'lodash';
import * as Font from 'expo-font';
import viewPictureIdentificationStyles from '../assets/css/viewPictureIdentification_styles';
import settingsPageStyles from '../assets/css/settingsPage_styles';

const SCREEN_WIDTH_SIZE = Dimensions.get('window').width;

const IMAGE_DIMENSIONS = SCREEN_WIDTH_SIZE - 80;

export default class SetPublicOrPrivate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedIndex: 0,
        results: [
          {label: 'Golden Retriever', percentile: '84.23'},
          {label: 'Golden Poodle', percentile: '17.12'},
          {label: 'American Spaniel', percentile: '10.0'}
        ]
    };
  
  }
  render() {
    return (
        <View style={viewPictureIdentificationStyles.container}>
          <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => this.props.navigation.pop()}>
            <Image source={require("../assets/icons/ios_back_arrow_white.png")} style={settingsPageStyles.backIcon} />
          </TouchableOpacity>
          
          <View style={viewPictureIdentificationStyles.pictureContainer}>
            <Image
              source={{uri: 'https://www.thefamilypethospital.com/sites/default/files/styles/large/adaptive-image/public/golden-retriever-dog-breed-info.jpg?itok=5g5ejXaU'}}
              style={{
                width: IMAGE_DIMENSIONS,
                height: IMAGE_DIMENSIONS,
                borderRadius: 10,
              }}
            />
          </View>
          <View style={viewPictureIdentificationStyles.buttonGroupStyle}>
          <ButtonGroup
              buttons={['Private', 'Public']}
              selectedIndex={this.state.selectedIndex}
              onPress={selectedIndex => {
                this.setState({ selectedIndex });
              }}
              textStyle={{fontFamily: 'Quicksand-Medium'}}
            />
            </View>
            <ScrollView style={{ flex: 1 }}>
              {this.state.results.map(function(result, key){
                return <View key={key} style={viewPictureIdentificationStyles.resultsContainer}>
                          <Text style={viewPictureIdentificationStyles.resultLabel}>
                            {result.label}
                          </Text>
                          <Text style={viewPictureIdentificationStyles.probabilityLabel}>
                            {result.percentile}%
                          </Text> 
                        </View>;
              })} 
            </ScrollView>
        </View>
    );
  }
}
