import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onUpload() {
    var formData = new FormData();
    formData.append("uploadedImage", {
      uri: this.props.uri,
      type: "image/jpg"
    });
    formData.append("userId",this.props.userId);
    formData.append("locationTaken",this.props.device_location);
    axios.post("http://172.20.10.4:3000/species/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  render() {
      console.log(this.props);
    return (
      <View>
        <Image source={{ uri: this.props.uri }} style={{ width: 305, height: 159 }}/>
        <TouchableOpacity onPress={() => this.onUpload()}>
          <Text>Upload Picture</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Photo;