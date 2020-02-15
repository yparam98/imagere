import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Button } from "react-native";
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
    try {
      var formData = new FormData();
      formData.append("pathToPicture", { uri: this.props.uri, name: "uploadedPhotoTest.jpg", type: "image/jpg" });
      formData.append("userId", this.props.userId);
      formData.append("locationTaken", this.props.device_location);

      fetch(this.state.dataURL + "/species/upload/", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }).then((res) => {
        console.log(res);
      }).then(() => {
        console.log("success");
      }).catch((err) => {
        console(err);
      }).catch(() => {
        console.log("failed");
      });
    } catch (error) {
      console.log("errmsg: " + error);
    }
    

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
      <View style={{ flex: 1 }}>
        <Image source={{ uri: this.props.uri }} style={{ height: 500, aspectRatio: 0.80, alignSelf: "center", margin: 50 }} resizeMode="contain" />
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => this.onUpload()}>
          <Text style={{ fontFamily: "Quicksand", fontSize: 34, borderWidth: 1, borderColor: "black", borderRadius: 10, padding: 10, margin: 20 }}>Upload Picture</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Photo;