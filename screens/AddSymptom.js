import React, { useState } from "react";
import {
	View,
	Button,
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";
import { auth, firestore, firebase } from "../firebase";
import Tags from "../components/Tags";
import {
	NativeBaseProvider,
	Slider,
	Box,
	Stack,
} from "native-base";
import { useFonts } from "expo-font";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddSymptom = ({ navigation }) => {
	const { state } = useContext(AuthContext);
	const [selectedTags, setSelectedTags] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleTagPress = (title) => {
		const symptoms = { tag: title, severity: 0 };
		let updatedTags;
		if (selectedTags.find((t) => t.tag === symptoms.tag)) {
			// Deselect tag
			updatedTags = selectedTags.filter(
				(t) => t.tag !== symptoms.tag
			);
		} else {
			// Select tag
			updatedTags = [...selectedTags, symptoms];
		}
		setSelectedTags(updatedTags);
	};
	const handleSliderChange = (sev, tag) => {
		const updatedTags = [...selectedTags];
		const tagIndex = updatedTags.findIndex(
			(t) => t.tag === tag
		);
		updatedTags[tagIndex].severity = sev;
		setSelectedTags(updatedTags);
	};

	const handleConfirmClick = () => {
		if (Object.keys(selectedTags).length == 0) {
			alert("Please add symptoms");
			return;
		}
		setLoading(true);
		var currentTime = new Date();
		currentTime.setTime(
			currentTime.getTime() + 5 * 60 * 60 * 1000
		);
		const symps = {
			selectedTags,
			createdAt: currentTime,
			uid: state && state.user && state.user.uid,
		};
		const docRef = firestore.collection("Symptom");
		docRef.add(symps);
		setLoading(false);
		alert("Thanks for adding symptoms");
		navigation.navigate("Symptoms");
	};
	const sympTags = [
		"Fever",
		"Chills",
		"Coughing",
		"Shortness of breath",
		"Sore throat",
		"Loss of taste or smell",
		"Body aches",
		"Fatigue",
		"Headache",
		"Nausea or vomiting",
		"Diarrhea",
		"Hot flashes",
		"Mood changes",
		"Insomnia",
		"Difficulty concentrating",
		"Muscle weakness",
		"Delayed speech and language skills",
		"Social difficulties",
		"Impulsivity",
		"Chronic pain",
		"Skin rash or hives",
		"Swollen lymph nodes",
		"Weight loss or gain",
		"Hair loss",
		"Dry mouth or eyes",
		"Blurred vision",
		"Dizziness or lightheadedness",
		"Fainting",
		"Irregular heartbeat",
		"Chest pain",
		"Night sweats",
		"Rapid heartbeat",
		"Joint pain",
		"Stomach pain",
		"Constipation",
		"Frequent urination",
		"Tinnitus (ringing in the ears)",
		"Sensitivity to light or sound",
		"Numbness or tingling in the hands or feet",
		"Difficulty swallowing",
	];
	return (
		<NativeBaseProvider>
			<View style={{ marginBottom: 10 }}>
				<Text style={styles.header2Text}>
					Choose your symptoms:
				</Text>
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{ height: 150, marginVertical: 10 }}
				>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							marginVertical: 10,
							flexWrap: "wrap",
						}}
					>
						{sympTags.map((val, i) => (
							<Tags
								handleTagPress={handleTagPress}
								title={val}
								key={i}
								selectedTags={selectedTags}
							/>
						))}
					</View>
				</ScrollView>
			</View>
			<ScrollView
				style={{
					margin: 10,
				}}
				showsVerticalScrollIndicator={false}
			>
				{Object.keys(selectedTags).length == 0 ? (
					<View
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 100,
						}}
					>
						<Text>No Symptoms Added</Text>
					</View>
				) : (
					selectedTags.map((val, i) => (
						<View style={styles.card} key={i}>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<Text>{val.tag}</Text>
								<Text>{val.severity}</Text>
							</View>
							<View>
								<Box alignItems="center" w="100%">
									<Slider
										maxW="500"
										defaultValue={0}
										minValue={0}
										maxValue={10}
										step={1}
										onChangeEnd={(v) => {
											if (v) {
												handleSliderChange(v, val.tag);
											}
										}}
									>
										<Slider.Track>
											{val.severity >= 7 ? (
												<Slider.FilledTrack bg="green.600" />
											) : val.severity >= 5 ? (
												<Slider.FilledTrack bg="orange.600" />
											) : val.severity >= 3 ? (
												<Slider.FilledTrack bg="gray.600" />
											) : (
												<Slider.FilledTrack bg="red.600" />
											)}
										</Slider.Track>
										<Slider.Thumb
											bg={
												val.severity >= 7
													? "green.600"
													: val.severity >= 5
													? "orange.600"
													: val.severity >= 3
													? "gray.600"
													: "red.600"
											}
										/>
									</Slider>
								</Box>
							</View>
						</View>
					))
				)}
			</ScrollView>
			<TouchableOpacity onPress={handleConfirmClick}>
				<View>
					<Text style={styles.submitBtn}>Submit</Text>
				</View>
			</TouchableOpacity>
		</NativeBaseProvider>
	);
};

export default AddSymptom;
const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		marginVertical: 10,
	},
	submitBtn: {
		margin: 20,
		backgroundColor: "gray",
		borderRadius: 50,
		padding: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		width: 100,
		alignSelf: "center",
		color: "white",
	},
	header2Text: {
		fontFamily: "quincy-bold",
		fontSize: 20,
		color: "black",
		marginTop: "3%",
		marginLeft: "3%",
	},
});
