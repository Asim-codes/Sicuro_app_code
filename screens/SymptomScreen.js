import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import {
	Box,
	Icon,
	NativeBaseProvider,
	Slider,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Sizes } from "../utils/theme";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LineChart } from "react-native-chart-kit";
import { useEffect } from "react";
import { firestore } from "../firebase";
import moment from "moment";

const SymptomScreen = ({ navigation }) => {
	const { state } = useContext(AuthContext);
	const [symptoms, setSymptoms] = useState([]);
	useEffect(() => {
		getSymptoms();
		return () => {};
	}, [state && state.user]);
	const getSymptoms = async () => {
		firestore
			.collection("Symptom")
			.where("uid", "==", state.user.uid)
			.orderBy("createdAt", "desc")
			.limit(5)
			.onSnapshot((querySnapshot) => {
				let items = [];
				if (querySnapshot.size == 0) {
					return;
				}
				querySnapshot.forEach((doc) => {
					items.push(...doc.data().selectedTags);
				});
				setSymptoms(items);
			});
	};
	return (
		<NativeBaseProvider>
			<View style={styles.top_rounded_white}>
				<View
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							fontFamily: "quincy-bold",
							fontSize: 40,
							color: "white",
							marginHorizontal: 10,
						}}
					>
						Symptoms
					</Text>
					<Image
						source={require("../assets/images/headers/Symptoms.png")}
						style={{ width: 100, height: 100 }}
					/>
				</View>
			</View>
			<View style={styles.screen_cover}>
				<TouchableOpacity
					onPress={() => navigation.navigate("AddSymptom")}
				>
					<View
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 10,
						}}
					>
						<View
							style={{
								borderRadius: 50,
								padding: 10,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#191970",
							}}
						>
							<Icon
								as={
									<MaterialCommunityIcons name="newspaper" />
								}
								size={5}
								mr="2"
								color="white"
							/>
							<Text style={{ color: "white" }}>
								Add New Symptoms
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
			{/* <Text>{JSON.stringify(symptoms, null, 4)}</Text> */}
			<View style={styles.screen_cover}>
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: "#191970",
							fontSize: 15,
							fontWeight: "600",
						}}
					>
						{moment().format("MMM DD YYYY")}
					</Text>
					<Text style={{ color: "gray", fontSize: 13 }}>
						How are you feeling Today?
					</Text>
				</View>
				<ScrollView
					style={{
						height: 350,
						marginVertical: 10,
					}}
					showsVerticalScrollIndicator={false}
				>
					{Object.keys(symptoms).length == 0 ? (
						<View
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								marginTop: 100,
							}}
						>
							<Text>No Symptom Added Today</Text>
						</View>
					) : (
						symptoms.map((val, i) => (
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
											defaultValue={5}
											minValue={0}
											maxValue={10}
											step={1}
											isDisabled={true}
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
			</View>
		</NativeBaseProvider>
	);
};

export default SymptomScreen;

const styles = StyleSheet.create({
	top_rounded_white: {
		backgroundColor: "#8FCCC0",
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
		height: Sizes.height - 600,
		width: Sizes.width,
		resizeMode: "contain",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	card: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		marginVertical: 10,
	},
	screen_cover: {
		width: Sizes.width - 20,
		alignSelf: "center",
		marginVertical: 10,
	},
	bottom_text: {
		color: "gray",
		fontSize: 13,
	},
});
