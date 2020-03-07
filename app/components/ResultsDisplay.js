import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Button, FlatList } from "react-native";
import profilePageStyles from "../assets/css/profilePage_styles";

class ResultsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myResults: this.props.inResultsObj
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: "rgb(0,0,0)" }}>
                <TouchableOpacity onPress={()=> this.props.navigationModule.goBack()}>
                    <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 10, color: "white", alignSelf: "center", borderColor: "white", borderRadius: 5, padding: 10, borderWidth: 1 }}>Try again!</Text>
                </TouchableOpacity>
                <Image source={{ uri: this.props.inSpeciesPic }} style={{ width: 651 / 5, height: 651 / 5, borderRadius: 15, margin: 10, alignSelf: "center" }} resizeMode="contain" />
                <View>
                    {
                        this.state.myResults != "PICTURE_EXISTS" ? (
                            <FlatList data={this.state.myResults.nnResult} renderItem={({ item }) =>
                                <View style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", margin: 10, padding: 15, elevation: 3, borderRadius: 15, alignContent: "center" }}>
                                    <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 20 }}>Name: <Text style={{ fontFamily: "Quicksand", fontSize: 20 }}>{item.label}</Text></Text>
                                    <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 20 }}>Possibility: <Text style={{ fontFamily: "Quicksand", fontSize: 20 }}>{item.percentile}</Text></Text>
                                </View>
                            } keyExtractor={item => Math.random() * 2} />
                        ) : <Text style={{ fontFamily: "Quicksand", fontSize: 20, color: "white", alignSelf: "center", padding: 25 }}>Picture has already been identified...</Text>
                    }
                </View>
            </View>
        );
    }
}

export default ResultsView;