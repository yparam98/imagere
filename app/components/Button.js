import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

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
            <TouchableOpacity style={{ borderWidth: 0, backgroundColor: this.state.color, borderRadius: 45, margin: 5, flexDirection: "row", justifyContent: "center" }} onPress={this.state.pressAction}>
                <Text style={{ fontFamily: "Quicksand", fontSize: 18, color: "white", paddingTop: 5, paddingBottom: 5, paddingLeft: 15, paddingRight: 7 }}>
                    {this.state.buttonTitle}
                </Text>
                <Icon name={this.state.icon} color="white" size={18} containerStyle={{ justifyContent: "center", paddingRight: 8 }} />
            </TouchableOpacity>
        )
    }
}

export default UtilityButton;