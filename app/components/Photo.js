import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import axios from "axios";
import ResultsView from "./ResultsDisplay";

class Photo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataURL: "http://myvmlab.senecacollege.ca:6746",
			resultsObj: "",
			submitted: false
		};
	}

	async onUpload() {
		this.setState({
			submitted: true
		});

		try {
			var formData = new FormData();
			formData.append("speciesPicture", { uri: this.props.uri, name: "uploadedPhoto.jpg", type: "image/jpg" });
			formData.append("userId", this.props.userId);
			formData.append("locationTaken", this.props.device_location);

			axios({
				method: 'post',
				url: this.state.dataURL + "/species/upload/",
				data: formData,
				headers: { "Content-Type": "multipart/form-data" }
			}).then((incomingResponse) => {
				this.setState({
					resultsObj: incomingResponse.data
				});
			}).catch((errObj) => {
				console.log(errObj);
			});
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{
					!this.state.submitted ? (
						<View>
							<Image source={{ uri: this.props.uri }} style={{ height: 400, aspectRatio: 0.80, alignSelf: "center", margin: 10 }} resizeMode="contain" />
							<TouchableOpacity style={{ alignSelf: "center" }} onPress={() => this.onUpload()}>
								<Text style={{ fontFamily: "Quicksand", fontSize: 34, borderWidth: 1, borderColor: "black", borderRadius: 10, padding: 10, margin: 20 }}>Upload Picture</Text>
							</TouchableOpacity>
						</View>
					) : <View>
							{
								this.state.resultsObj == "" ? (
									<View style={{ padding: 25, alignSelf: "center" }}><ActivityIndicator size="large" color="purple" /></View>
								) : <ResultsView inResultsObj={this.state.resultsObj} inSpeciesPic={this.props.uri} navigationModule={this.props.navigationModule}/>
							}
						</View>
				}
			</View>
		);
	}
}

export default Photo;