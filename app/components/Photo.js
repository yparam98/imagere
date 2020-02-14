import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataURL: "http://myvmlab.senecacollege.ca:6746",
    };
  }

  componentDidMount() {
    // console.log("props: " + JSON.stringify(this.props));
  }

  onUpload() {
    var formData = new FormData();
    formData.append("uploadedImage", { uri: this.props.uri, type: "image/jpg" });
    formData.append("userId", this.props.userId);
    formData.append("locationTaken", this.props.device_location);

    fetch(this.state.dataURL + "/species/upload")

    // axios.post(this.state.dataURL + "/species/upload/", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // }).then(() => {
    //   console.log("success");
    // }).then((data) => {
    //   console.log("success with object: " + data)
    // }).catch(() => {
    //   console.log("error");
    // }).catch((err) => {
    //   console.log("error with message: " + err);
    // });
  }

  render() {
    return (
      <View>
        <Image source={{ uri: this.props.uri }} style={{ width: 305, height: 159 }} />
        <TouchableOpacity onPress={() => this.onUpload()}>
          <Text>Upload Picture</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Photo;