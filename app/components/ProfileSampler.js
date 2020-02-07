import React, { Component } from 'react';
import { Text, View, Image, Button, InteractionManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import _ from 'lodash';
import * as Font from 'expo-font';
import profilePageStyles from '../assets/css/profilePage_styles';

class ProfileSampler extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        myUser: this.props.navigation.state.params.myUser,
        myNav: this.props.navigation.state.params.navigation,
        visibleModal: true
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
            <View style={{ borderColor: "black", borderWidth: 2, margin: 5, borderRadius: 90, width: "90%", alignSelf: "center" }}>
                <Text style={_.merge({}, profilePageStyles.helperTextView, { alignSelf: "center", fontSize: 18 })}>{this.state.myUser.description}</Text>
            </View>
        )
    }

    renderPencilIcon() {
        return (
            <Image source={{ uri: "https://image.flaticon.com/icons/png/512/61/61456.png" }} style={{ width: 20, height: 20, alignSelf: "flex-end", padding: 10, position: "absolute" }} />
        )
    }

    toggleModal() {
        this.setState({ visibleModal: !this.state.visibleModal });
        InteractionManager.runAfterInteractions(()=>{
            this.state.myNav.pop();
        });
    }

    render() {
        return (
            <Modal isVisible={this.state.visibleModal} hasBackdrop={false} coverScreen={true} animationOut={"bounceOut"}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <ScrollView style={{ alignContent: "center" }} showsVerticalScrollIndicator={false}>
                        {this.renderPencilIcon()}
                        <Image source={{ uri: this.state.myUser.userPicURL }} style={profilePageStyles.userImage} />
                        <Text style={profilePageStyles.userName}>{this.state.myUser.userName}</Text>
                        <Text style={profilePageStyles.helperTextView}>description</Text>
                        {this.renderDescription()}
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

                    <Button title="Close" onPress={() => this.toggleModal()} />

                </View>
            </Modal>
        )
    }
};

export default ProfileSampler;