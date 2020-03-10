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
            <TouchableOpacity style={{ borderWidth: 0, backgroundColor: this.state.color, borderRadius: 45, margin: 5, flexDirection: "row", alignSelf:"auto" }} onPress={this.state.pressAction}>
                <Icon name={this.state.icon} color="white" size={18} containerStyle={{ justifyContent: "center", paddingLeft: 8 }} />
                <Text style={{ fontFamily: "Quicksand", fontSize: 18, color: "white", paddingTop: 5, paddingBottom: 5, paddingLeft: 7, paddingRight: 15 }}>
                    {this.state.buttonTitle}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default UtilityButton;