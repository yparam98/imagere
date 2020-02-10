import React, { Component } from 'react';
import { Text, View, Image, Button, InteractionManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import _ from 'lodash';
import * as Font from 'expo-font';
import profilePageStyles from '../assets/css/profilePage_styles';
import { LinearGradient } from 'expo-linear-gradient';

class ProfileSampler extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        myUser: this.props.navigation.state.params.myUser,
        myNav: this.props.navigation.state.params.navigation,
        visibleModal: true,
        selector: parseInt(Math.random() * 10),
        backgroundImg: [
            ['#659999', '#f4791f'],
            ['#00B4DB', '#0083B0'],
            ['#108dc7', '#ef8e38'],
            ['#0B486B', '#F56217'],
            ['#ff4b1f', '#1fddff'],
            ['#FEAC5E', '#C779D0', '#4BC0C8'],
            ['#00d2ff', '#3a7bd5'],
            ['#114357', '#F29492'],
            ['#67B26F', '#4ca2cd'],
            ['#12c2e9', '#c471ed', '#f64f59']
        ]
    }

    componentDidMount() {
        Font.loadAsync({
            'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
            'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
            'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
        });

        this.setState({
            fontLoaded: true,
        });
    }

    renderProfilePic() {

    }

    renderNewPics() {
        return this.state.myUser.newPhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderPrivatePics() {
        return this.state.myUser.privatePhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderPublicPics() {
        return this.state.myUser.publicPhotos.map((item, key) => {
            return (
                <Image source={{ uri: item }} style={{ width: 256, height: 144, margin: 10 }} key={key} />
            )
        });
    }

    renderDescription() {
        return (
            <View style={{ borderColor: "white", borderWidth: 0.75, margin: 15, borderRadius: 90, width: "90%", alignSelf: "center" }}>
                <Text style={_.merge({}, profilePageStyles.helperTextView, { alignSelf: "center", fontSize: 18 })}>{this.state.myUser.description}</Text>
            </View>
        )
    }

    renderPencilIcon() {
        return (
            <Image source={{ uri: "https://image.flaticon.com/icons/png/512/61/61456.png" }} style={{ margin: 10, width: 20, height: 20, alignSelf: "flex-end", padding: 10, position: "absolute" }} />
        )
    }

    toggleModal() {
        this.setState({ visibleModal: !this.state.visibleModal });
        InteractionManager.runAfterInteractions(() => {
            this.state.myNav.pop();
        });
    }

    render() {
        return (
            <Modal style={{ margin: 0 }} isVisible={this.state.visibleModal} hasBackdrop={false} coverScreen={true} animationOut={"bounceOut"} onBackButtonPress={() => this.toggleModal()}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <LinearGradient colors={this.state.backgroundImg[this.state.selector]} style={{ padding: "2%" }}>
                        {/* {this.renderPencilIcon()} */}
                        <Image source={{ uri: this.state.myUser.userPicURL }} style={profilePageStyles.userImage} />
                        <Text style={profilePageStyles.userName}>{this.state.myUser.userName}</Text>
                        <View style={{ borderBottomColor: "white", borderBottomWidth: 0.35, margin: 20 }} />
                        {this.renderDescription()}
                    </LinearGradient>
                    <ScrollView style={{ alignContent: "center" }} showsVerticalScrollIndicator={false}>
                        <Text style={profilePageStyles.helperTextView}>new</Text>
                        <ScrollView nestedScrollEnabled={true} horizontal={true}>
                            {this.renderNewPics()}
                        </ScrollView>
                        <Text style={profilePageStyles.helperTextView}>private</Text>
                        <ScrollView nestedScrollEnabled={true} horizontal={true}>
                            {this.renderPrivatePics()}
                        </ScrollView>
                        <Text style={profilePageStyles.helperTextView}>public</Text>
                        <ScrollView nestedScrollEnabled={true} horizontal={true}>
                            {this.renderPublicPics()}
                        </ScrollView>
                    </ScrollView>

                    {/* <Button title="Close" onPress={() => this.toggleModal()} /> */}

                </View>
            </Modal>
        )
    }
};

export default ProfileSampler;