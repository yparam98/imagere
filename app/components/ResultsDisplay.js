import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Button, FlatList, ScrollView } from "react-native";
import profilePageStyles from "../assets/css/profilePage_styles";
import { SafeAreaView } from "react-navigation";
import UtilityButton from "./Button";
import UploadPhoto from "./UploadPhoto";

class ResultsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myResults: this.props.inResultsObj,
        };
    }

    getIdentification(incomingIdentification) {
        let identification = incomingIdentification;

        if (incomingIdentification.search('_') != -1) {
            identification = incomingIdentification.replace('_', ' ');
        }

        let capitalizedFirstLetter = identification.charAt(0).toUpperCase();
        identification = capitalizedFirstLetter.concat(identification.slice(1, identification.length));


        return identification;
    }

    render() {
        return (
            <View style={{ flex: 0 }}>
                <View style={{ backgroundColor: "rgb(33,33,33)", flex: 0, height: "100%" }}>
                    <View style={{ marginLeft: 25, marginRight: 25, flex: 1 }}>
                        <View style={{ alignItems: "center", margin: 2 }}>
                            <UtilityButton title={"Try again"} icon={"refresh"} color={"black"} onPress={() => this.props.handler("")} />
                        </View>
                        <Image source={{ uri: this.props.inSpeciesPic }} style={{ width: "100%", aspectRatio: 1.5, borderRadius: 15, margin: 5, alignSelf: "center" }} resizeMode="contain" />
                        <View style={{ flex: 1 }}>
                            {
                                this.state.myResults != "PICTURE_EXISTS" ? (
                                    <View style={{ flex: 1 }}>
                                        <FlatList data={this.state.myResults.nnResult} showsVerticalScrollIndicator={true} renderItem={({ item }) =>
                                            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.0)", marginTop: 5, marginBottom: 5, padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 25, color: "white", alignSelf: "flex-start" }}>{this.getIdentification(item.label)}</Text>
                                                <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 25, alignSelf: "flex-end", color: "rgb(134,221,147)" }}>{item.percentile}%</Text>
                                            </View>
                                        } keyExtractor={item => toString(Math.random() * 2)} />
                                    </View>
                                ) : <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 25, color: "white", alignSelf: "center", padding: 25 }}>Picture has already been identified...</Text>
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default ResultsView;