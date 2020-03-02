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
                <Image source={{ uri: this.props.inSpeciesPic }} style={profilePageStyles.userImage} resizeMode="contain" />
                <FlatList data={this.state.myResults.nnResult} renderItem={({ item }) =>
                    <View style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", margin: 10, padding: 15, elevation: 3, borderRadius: 15, alignContent: "center" }}>
                        <Text style={{ fontFamily: "Quicksand", fontSize: 20 }}>Name: {item.label}</Text>
                        <Text style={{ fontFamily: "Quicksand", fontSize: 20 }}>Possibility: {item.percentile}</Text>
                    </View>
                } keyExtractor={item => Math.random() * 2} />
            </View>
        );
    }
}

export default ResultsView;

// {
//     "nnResult": [
//         {
//             "label": "German_shepherd",
//             "percentile": "91.2"
//         },
//         {
//             "label": "malinois",
//             "percentile": "0.9"
//         },
//         {
//             "label": "bulletproof_vest",
//             "percentile": "0.5"
//         },
//         {
//             "label": "Airedale",
//             "percentile": "0.3"
//         },
//         {
//             "label": "muzzle",
//             "percentile": "0.1"
//         }
//     ],
//     "pictureId": "5e5c6a0cea3d4c91a231a841"
// }