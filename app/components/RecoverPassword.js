import React, { PureComponent } from 'react';
import { Text, View, Linking, } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import { Input, Button } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';

class RecoverPassword extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataURL: "http://myvmlab.senecacollege.ca:6746/static/",
            overlayVisible: true,
            userEnteredEmail: "",
            emailFilled: false,
        };
    }

    sendResetEmail() {
        axios.post(
            this.state.dataURL + "/email/user/resetPassword",
            {

            }
        ).then(() => {
            this.viewpager.setPage(1);
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ViewPager style={{ flex: 1 }} initialPage={0} ref={(viewpager) => { this.viewpager = viewpager }} scrollEnabled={false}>
                    <View key="1" style={{ flex: 1 }}>
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 18, marginBottom: 5 }}>I forgot my password!</Text>
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 12 }}>Not to worry! We'll get you through this ;)</Text>
                        <Input
                            placeholder={"first, enter your email"}
                            leftIcon={{ type: 'material', name: 'mail' }}
                            leftIconContainerStyle={{ margin: 10 }}
                            autoCompleteType={"email"}
                            containerStyle={{ marginTop: 25, marginBottom: 25 }}
                            onChangeText={(inputText) => { this.setState({ emailFilled: true }); this.setState({ userEnteredEmail: inputText }); }}
                        />
                        <Button
                            title={"Next"}
                            type={"outline"}
                            buttonStyle={{ alignSelf: "center" }}
                            titleStyle={{ fontFamily: "Quicksand-Medium", fontSize: 16 }}
                            disabled={!this.state.emailFilled}
                            onPress={() => {
                                this.sendResetEmail();
                            }} />
                    </View>
                    <View key="2">
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 18, marginBottom: 5 }}>We sent you an email...</Text>
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 12 }}>Got it?</Text>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Button
                                title={"Yup"}
                                type={"clear"}
                                buttonStyle={{ alignSelf: "center", margin: 15 }}
                                titleStyle={{ fontFamily: "Quicksand-Medium", fontSize: 18, color: "darkgreen" }}
                                onPress={() => {
                                    this.viewpager.setPage(2);
                                }} />
                            <Button
                                title={"Nope"}
                                type={"clear"}
                                buttonStyle={{ alignSelf: "center", margin: 15 }}
                                titleStyle={{ fontFamily: "Quicksand-Medium", fontSize: 18, color: "darkred" }}
                                onPress={() => {
                                    this.viewpager.setPage(0);
                                }} />
                        </View>
                    </View>
                    <View key="3">
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 18, marginBottom: 5 }}>Awesome!</Text>
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 12 }}>Click the link in the email and it'll navigate you through resetting your password!</Text>
                        <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 12, marginTop: 15 }}>Once you're done, try and log in again. If you still can't login, send us an email and we'll see what's going on our end.</Text>
                        <Button
                            title={"Email us!"}
                            type={"clear"}
                            buttonStyle={{ alignSelf: "center", margin: 15 }}
                            titleStyle={{ fontFamily: "Quicksand-Medium", fontSize: 14, color: "green" }}
                            onPress={() => {
                                Linking.openURL("mailto:prj666_201@myseneca.ca");
                            }} />

                    </View>
                </ViewPager>
            </View>
        )
    }
};

export default RecoverPassword;