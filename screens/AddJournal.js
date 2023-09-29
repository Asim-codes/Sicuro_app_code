import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useContext } from "react";
import { Sizes } from "../utils/theme";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { firestore } from "../firebase";
import firebase from "../firebase";
import moment from "moment";
const AddJournal = ({ navigation }) => {
	const { state } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const [feel, setFeel] = useState("");
	const weekdays = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thur",
		"Fri",
		"Sat",
	];
	const handleFeel = async () => {
		try {
			setLoading(true);
			var currentTime = new Date();
			currentTime.setTime(
				currentTime.getTime() + 5 * 60 * 60 * 1000
			);
			var date = moment().date();
			var dayNum = moment().day();
			var day = weekdays[dayNum];
			var month = moment().month();
			var year = moment().year();
			const addMoment = {
				date,
				month: month + 1,
				year,
				day,
			};
			const newFeel = {
				feel,
				uid: state && state.user && state.user.uid,
				addMoment,
				createdAt: currentTime,
			};
			const docRef = firestore.collection("Journal");
			docRef.add(newFeel);
			setLoading(false);
			alert("Thanks for sharing your feelings!");
			navigation.navigate("Journal");
		} catch (error) {
			setLoading(false);
			alert(error.message);
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.screen_cover}>
				<Text
					style={{
						fontSize: 25,
						color: "black",
						fontWeight: "600",
					}}
				>
					Write what you feel
				</Text>
				<Text style={styles.top_text}>
					What are you grateful for?
				</Text>
				<Text style={styles.top_text}>
					Did you learn something new about yourself?
				</Text>
				<Text style={styles.top_text}>
					What does your future self look like?
				</Text>
				<Text style={styles.top_text}>
					or just write what every you feel like.
				</Text>
			</View>
			<View style={styles.screen_cover}>
				<View style={{ marginVertical: 20 }}>
					<TextInput
						editable
						multiline
						numberOfLines={5}
						maxLength={250}
						onChangeText={(text) => setFeel(text)}
						value={feel}
						style={styles.feel}
						selectionColor={"gray"}
					/>
				</View>
			</View>
			<View style={styles.screen_cover}>
				<TouchableOpacity
					disabled={loading}
					onPress={handleFeel}
				>
					<View style={styles.homeBtn}>
						<Text style={{ color: "white" }}>
							{loading ? "Adding..." : "Submit"}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
				>
					<View style={styles.homeBtn}>
						<Text style={{ color: "white" }}>Back</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default AddJournal;

const styles = StyleSheet.create({
	container: {
		width: Sizes.width,
		height: Sizes.height,
		display: "flex",
		alignItems: "center",
		marginTop: 50,
	},
	screen_cover: {
		width: Sizes.width - 20,
	},
	feel: {
		borderWidth: 1,
		borderColor: "gray",
		borderRadius: 10,
		padding: 10,
		height: 200,
		color: "gray",
		fontSize: 20,
	},
	top_text: {
		color: "gray",
		fontSize: 15,
		marginVertical: 5,
	},
	homeBtn: {
		marginTop: 10,
		backgroundColor: "gray",
		borderRadius: 50,
		padding: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
