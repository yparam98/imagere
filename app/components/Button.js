import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";

class UtilityButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonTitle: this.props.title,
            icon: this.props.icon,
            color: this.props.color,
            pressAction: this.props.onPress
        };
    }

    render() {
        return (
            <TouchableOpacity style={{ borderWidth: 1, borderColor: "white", borderRadius: 10, margin: 5 }} onPress={this.state.pressAction}>
                <Text style={{ fontFamily: "Quicksand", fontSize: 16, color: "white", paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>{this.state.buttonTitle}</Text>
            </TouchableOpacity>
        )
    }
}

export default UtilityButton;