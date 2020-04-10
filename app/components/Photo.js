import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Button, ActivityIndicator, Platform, Vibration } from "react-native";
import axios from "axios";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants';
import ResultsView from "./ResultsDisplay";
import UtilityButton from "./Button";

class Photo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataURL: "http://myvmlab.senecacollege.ca:6746",
			resultsObj: "",
			submitted: false,
			expoPushToken: '',
			notification: {},
			notificationSent: false,
			errorQ: false,
		};
	}

	registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			token = await Notifications.getExpoPushTokenAsync();
			this.setState({
				expoPushToken: token,
			});
		} else {
			alert("Must use physical device for Push Notifications");
		}

		if (Platform.OS === 'android') {
			Notifications.createChannelAndroidAsync('default', {
				name: 'default',
				sound: true,
				priority: 'max',
				vibrate: [0, 250, 250, 250],
			});
		}
	};

	componentDidMount() {
		this.setState({
			resultsObj: "",
			submitted: false,
		});
		this.registerForPushNotificationsAsync();
		this._notificationSubscription = Notifications.addListener(this._handleNotification);
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

	_handleNotification = notification => {
		Vibration.vibrate();
		this.setState({
			notification: notification,
		});
	};

	sendPushNotification = async () => {
		this.setState({
			submitted: true
		});

		try {
			var formData = new FormData();
			formData.append("speciesPicture", { uri: this.props.uri, name: "uploadedPhoto.jpg", type: "image/jpg" });
			formData.append("userId", this.props.userObj._id);
			formData.append("device_location", this.props.device_location);

			await axios({
				method: 'post',
				url: this.state.dataURL + "/species/upload/",
				data: formData,
				headers: { "Content-Type": "multipart/form-data" }
			}).then((incomingResponse) => {
				const message = {
					to: this.state.expoPushToken,
					sound: 'default',
					title: 'Your image has been recognized',
					body: this.getIdentification(incomingResponse.data.nnResult[0].label),
					data: {
						data: this.getIdentification(incomingResponse.data.nnResult[0].label) + incomingResponse.data.nnResult[0].percentile
					},
					_displayInForeground: true,
				};

				const response = fetch('https://exp.host/--/api/v2/push/send', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Accept-encoding': 'gzip, deflate',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(message),
				});

				this.setState({
					resultsObj: incomingResponse.data,
					notificationSent: true,
				});
			}).catch((errObj) => {
				console.log("unable to parse recognition!");
				this.setState({
					errorQ: true,
				});
			});
		} catch (error) {
			console.log("unable to recognize image!");
			this.setState({
				errorQ: true,
			});
		}
	}

	render() {
		return (
			<View style={{ flex: 0 }}>
				{
					!this.state.submitted ? (
						<View>
							<View style={{ alignItems: "center" }}>
								<Image source={{ uri: this.props.uri }} style={{ height: 400, aspectRatio: 0.80, margin: 10 }} resizeMode="contain" />
								<UtilityButton title={"Upload Photo"} icon={"cloud-upload"} color={"black"} onPress={() => this.sendPushNotification()} />
							</View>
						</View>
					) : <View>
							{
								this.state.resultsObj == "" ? (
									<View style={{ alignSelf: "center"}}>
										{
											this.state.errorQ ? (
												<View style={{margin: 10, alignItems: "center"}}>
													<UtilityButton title={"Try again"} icon={"refresh"} color={"black"} onPress={() => this.props.handler("")} />
													<Text style={{ fontFamily: "Quicksand-Medium", fontSize: 14, margin: 15, color: "grey" }}>Unable to process identification :(</Text>
												</View>
											) : <View>
													<View style={{ padding: 25 }}><ActivityIndicator size="large" color="grey" /></View>
													<Text style={{ fontFamily: "Quicksand-Medium", fontSize: 14, margin: 15, color: "grey" }}>We'll send you a notification when your image is ready ;)</Text>
												</View>
										}
									</View>
								) : <ResultsView inResultsObj={this.state.resultsObj} inSpeciesPic={this.props.uri} handler={this.props.handler} userData={this.props.userObj} />
							}
						</View>
				}
			</View>
		);
	}
}

export default Photo;