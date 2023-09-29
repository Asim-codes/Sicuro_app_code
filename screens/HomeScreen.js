import React, {
	useState,
	useEffect,
	useContext,
} from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Dimensions,
	Image,
} from "react-native";
import Notify from "../components/Notify";
import { auth, firestore, firebase } from "../firebase";
import {
	Input,
	Icon,
	IconButton,
	Stack,
	NativeBaseProvider,
	Box,
	Slider,
	Button,
} from "native-base";
import {
	MaterialIcons,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { format } from "date-fns";
import CheckRefernce from "../components/CheckRefernce";
import { LineChart } from "react-native-chart-kit";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sizes } from "../utils/theme";
import Steps from "../components/Pedometer";

const HomeScreen = ({ navigation }) => {
	const { state, setState } = useContext(AuthContext);
	const [mood, setMood] = useState("");
	const [todayMood, setTodayMood] = useState(false);
	const [todayStress, setTodayStress] = useState(false);
	const [onChangeStress, setOnChangeStress] = useState(5);
	const [activeMood, setActiveMood] = useState(null);
	const [showMood, setShowMood] = useState(false);
	const [showRef, setShowRef] = useState(false);
	const [reasons, setReasons] = useState({
		exercise: false,
		work: false,
		education: false,
		family: false,
		relationship: false,
		friends: false,
		health: false,
		mindfulness: false,
	});
	const [stressLevel, setStressLevel] = useState([
		0, 0, 0, 0, 0, 0, 0,
	]);

	//Slider time interval settings [show/hide]
	const [shouldDisplaySlider, setShouldDisplaySlider] =
		useState(false);

	useEffect(() => {
		const now = new Date();
		const hours = now.getHours();
		const isWithinTimeRange = hours >= 1 && hours < 24;
		if (isWithinTimeRange) {
			setShouldDisplaySlider(true);
			setShowMood(true);
		} else {
			setShouldDisplaySlider(false);
			setShowMood(false);
		}
	}, [state && state.user]);

	//Store the mood Number in a list
	const [moodNumbers, setMoodNumbers] = useState([
		0, 0, 0, 0, 0, 0, 0,
	]);
	const weekdays = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
	];
	//Chart Label Configs
	const [stressChartLabels, setStressChartLabels] =
		useState([
			"Sun",
			"Mon",
			"Tue",
			"Wed",
			"Thu",
			"Fri",
			"Sat",
		]);
	const [chartLabels, setChartLabels] = useState([
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
	]);
	useEffect(() => {
		getChartData();
		return () => {};
	}, [state && state.user]);
	const getChartData = () => {
		firestore
			.collection("Activity")
			.doc(state.user.uid)
			.onSnapshot((documentSnapshot) => {
				if (documentSnapshot.exists) {
					const moodData = documentSnapshot.data().mood;
					const stressData =
						documentSnapshot.data().stressLevel;
					moodData && manageMood(moodData);
					stressData && manageStress(stressData);
				}
			});
	};
	const manageStress = async (stressData) => {
		const stressNums = stressData.map((stress) => {
			return parseInt(
				stress.substring(0, stress.indexOf(" "))
			);
		});

		const stressDates = stressData.map((stress) => {
			var dayss = stress.substring(stress.indexOf(" ") + 1);
			var daysdate = new Date(dayss);
			return weekdays[daysdate.getDay()];
		});
		setStressLevel(stressNums.slice(-7)); // get the last 7 mood numbers
		setStressChartLabels(stressDates);
	};
	const manageMood = async (moodData) => {
		const moodNums = moodData.map(({ mood }) => {
			return parseInt(mood.substring(0, mood.indexOf(" ")));
		});
		const moodDates = moodData.map(({ mood }) => {
			var dayss = mood.substring(mood.indexOf(" ") + 1);
			var daysdate = new Date(dayss);
			return weekdays[daysdate.getDay()];
		});
		const sliced = moodNums.slice(-7);
		setMoodNumbers(sliced);
		setChartLabels(moodDates);
	};
	const handleReason = (val) => {
		let value;
		if (val == "Work") {
			value = reasons.work;
			setReasons({ ...reasons, work: !value });
		}
		if (val == "Education") {
			value = reasons.education;
			setReasons({ ...reasons, education: !value });
		}
		if (val == "Family") {
			value = reasons.family;
			setReasons({ ...reasons, family: !value });
		}
		if (val == "Relationship") {
			value = reasons.relationship;
			setReasons({ ...reasons, relationship: !value });
		}
		if (val == "Friends") {
			value = reasons.friends;
			setReasons({ ...reasons, friends: !value });
		}
		if (val == "Health") {
			value = reasons.health;
			setReasons({ ...reasons, health: !value });
		}
		if (val == "Exercise") {
			value = reasons.exercise;
			setReasons({ ...reasons, exercise: !value });
		}
		if (val == "Mindfulness") {
			value = reasons.mindfulness;
			setReasons({ ...reasons, mindfulness: !value });
		}
	};
	//Handle signing out
	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
				AsyncStorage.removeItem("sicuro_auth");
				setState({ ...state, user: null });
				navigation.navigate("Login");
			})
			.catch((error) => {
				alert(error);
			});
	};
	const handleMood = async (val) => {
		setActiveMood(val);
		var date = new Date();
		try {
			const newMoodData = "".concat(val, "  ", date);
			setMood(newMoodData);
			setShowRef(true);
		} catch (error) {
			console.log(error);
		}
	};
	const handleStress = async (v) => {
		try {
			var date = new Date();
			const newStressLevel = "".concat(
				Math.floor(v),
				"  ",
				date
			);
			const docRef = firestore
				.collection("Activity")
				.doc(state.user.uid);
			docRef.set(
				{
					stressLevel:
						firebase.firestore.FieldValue.arrayUnion(
							newStressLevel
						),
				},
				{ merge: true }
			);
			alert("Thanks for adding Stress Level");
			setShouldDisplaySlider(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleMoodAdd = () => {
		try {
			const moodData = { mood, reasons };
			const docRef = firestore
				.collection("Activity")
				.doc(state.user.uid);
			docRef.set(
				{
					mood: firebase.firestore.FieldValue.arrayUnion(
						moodData
					),
				},
				{ merge: true }
			);
			alert("Thanks for adding your mood");
			setShowRef(false);
			setShowMood(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<NativeBaseProvider>
			<View style={styles.container}>
				<Header handleSignOut={handleSignOut} />
				<ScrollView showsVerticalScrollIndicator={false}>
					<View>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								marginVertical: 10,
							}}
						>
							<Text style={styles.headerText}>
								Welcome,
								{state &&
									state.user &&
									state.user.displayName}{" "}
							</Text>
							<Notify />
						</View>
						{showMood && (
							<>
								<Text style={styles.header2Text}>
									How are you feeling today?
								</Text>
								<View style={styles.scroll_container}>
									<View style={styles.bg_mood_Card}>
										<IconButton
											icon={
												<Icon
													as={MaterialCommunityIcons}
													name="emoticon-frown"
												/>
											}
											borderRadius="full"
											_icon={
												activeMood == 0
													? {
															color: "#fff",
															size: 8,
													  }
													: { color: "#ffcb4c", size: 8 }
											}
											_hover={{
												bg: "coolGray.800:alpha.20",
											}}
											onPress={() => handleMood(0)}
											_pressed={{
												bg: "#ffcb4c",
												_ios: { _icon: { size: "2xl" } },
											}}
											_ios={{ icon: { size: "2xl" } }}
										/>
									</View>

									<View style={styles.bg_mood_Card}>
										<IconButton
											icon={
												<Icon
													as={MaterialCommunityIcons}
													name="emoticon-sad"
												/>
											}
											borderRadius="full"
											_icon={
												activeMood == 1
													? {
															color: "#fff",
															size: 8,
													  }
													: { color: "#ffcb4c", size: 8 }
											}
											_hover={{
												bg: "coolGray.800:alpha.20",
											}}
											onPress={() => handleMood(1)}
											_pressed={{
												bg: "#ffcb4c",
												_ios: { _icon: { size: "2xl" } },
											}}
											_ios={{ icon: { size: "2xl" } }}
										/>
									</View>

									<View style={styles.bg_mood_Card}>
										<IconButton
											icon={
												<Icon
													as={MaterialCommunityIcons}
													name="emoticon-neutral"
												/>
											}
											borderRadius="full"
											_icon={
												activeMood == 2
													? {
															color: "#fff",
															size: 8,
													  }
													: { color: "#ffcb4c", size: 8 }
											}
											_hover={{
												bg: "coolGray.800:alpha.20",
											}}
											onPress={() => handleMood(2)}
											_pressed={{
												bg: "#ffcb4c",
												_ios: { _icon: { size: "2xl" } },
											}}
											_ios={{ icon: { size: "2xl" } }}
										/>
									</View>

									<View style={styles.bg_mood_Card}>
										<IconButton
											icon={
												<Icon
													as={MaterialCommunityIcons}
													name="emoticon-happy"
												/>
											}
											borderRadius="full"
											_icon={
												activeMood == 3
													? {
															color: "#fff",
															size: 8,
													  }
													: { color: "#ffcb4c", size: 8 }
											}
											_hover={{
												bg: "coolGray.800:alpha.20",
											}}
											onPress={() => handleMood(3)}
											_pressed={{
												bg: "#ffcb4c",
												_ios: { _icon: { size: "2xl" } },
											}}
											_ios={{ icon: { size: "2xl" } }}
										/>
									</View>

									<View style={styles.bg_mood_Card}>
										<IconButton
											icon={
												<Icon
													as={MaterialCommunityIcons}
													name="emoticon-excited"
												/>
											}
											title="sad"
											borderRadius="full"
											_icon={
												activeMood == 4
													? {
															color: "#fff",
															size: 8,
													  }
													: { color: "#ffcb4c", size: 8 }
											}
											_hover={{
												bg: "coolGray.800:alpha.20",
											}}
											onPress={() => handleMood(4)}
											_pressed={{
												bg: "#ffcb4c",
												_ios: { _icon: { size: "2xl" } },
											}}
											_ios={{ icon: { size: "2xl" } }}
										/>
									</View>
								</View>
							</>
						)}
						{showRef && (
							<Box w="100%" bgColor={"red.200"} padding={5}>
								<View>
									<Text
										style={{
											fontSize: 16,
											fontWeight: "600",
										}}
									>
										What made your mood this way?
									</Text>
									<Text>Select as many you want</Text>
								</View>
								<View
									style={{ height: 520 }}
									showsVerticalScrollIndicator={false}
								>
									<CheckRefernce
										title={"Work"}
										image={require("../assets/images/moodRef/work.png")}
										handleReason={handleReason}
										selected={reasons.work}
									/>
									<CheckRefernce
										title={"Education"}
										image={require("../assets/images/moodRef/education.png")}
										handleReason={handleReason}
										selected={reasons.education}
									/>
									<CheckRefernce
										title={"Family"}
										image={require("../assets/images/moodRef/family.png")}
										handleReason={handleReason}
										selected={reasons.family}
									/>
									<CheckRefernce
										title={"Relationship"}
										image={require("../assets/images/moodRef/relationship.png")}
										handleReason={handleReason}
										selected={reasons.relationship}
									/>
									<CheckRefernce
										title={"Friends"}
										image={require("../assets/images/moodRef/friends.png")}
										handleReason={handleReason}
										selected={reasons.friends}
									/>
									<CheckRefernce
										title={"Health"}
										image={require("../assets/images/moodRef/health.png")}
										handleReason={handleReason}
										selected={reasons.health}
									/>
									<CheckRefernce
										title={"Exercise"}
										image={require("../assets/images/moodRef/exercise.png")}
										handleReason={handleReason}
										selected={reasons.exercise}
									/>
									<CheckRefernce
										title={"Mindfulness"}
										image={require("../assets/images/moodRef/mindfulness.png")}
										handleReason={handleReason}
										selected={reasons.mindfulness}
									/>
									<Button
										endIcon={
											<Icon
												as={
													<MaterialCommunityIcons name="check-circle" />
												}
												size={5}
												ml="2"
												color="green.400"
											/>
										}
										onPress={handleMoodAdd}
									>
										Done
									</Button>
								</View>
							</Box>
						)}
						<Box w="100%">
							{shouldDisplaySlider && (
								<>
									<Text style={styles.header2Text}>
										How stressful was work today?{" "}
									</Text>
									<Stack
										space={5}
										alignItems="center"
										alignSelf={"center"}
										w="90%"
										marginTop={5}
										marginBottom={5}
									>
										<Slider
											defaultValue={5}
											minValue={0}
											maxValue={10}
											micolorScheme="#5F9EA0"
											onChange={(v) => {
												setOnChangeStress(Math.floor(v));
											}}
											onChangeEnd={(v) => {
												if (v) {
													handleStress(v);
												}
											}}
										>
											<Slider.Track>
												{onChangeStress >= 7 ? (
													<Slider.FilledTrack bg="green.600" />
												) : onChangeStress >= 5 ? (
													<Slider.FilledTrack bg="orange.600" />
												) : onChangeStress >= 3 ? (
													<Slider.FilledTrack bg="gray.600" />
												) : (
													<Slider.FilledTrack bg="red.600" />
												)}
											</Slider.Track>
											<Slider.Thumb
												bg={
													onChangeStress >= 7
														? "green.600"
														: onChangeStress >= 5
														? "orange.600"
														: onChangeStress >= 3
														? "gray.600"
														: "red.600"
												}
											/>
										</Slider>
										<Text>{onChangeStress}</Text>
									</Stack>
								</>
							)}
						</Box>
						<Steps />
						<View style={styles.line_chart}>
							<Text style={styles.mood_head_text}>
								Mood Line Chart
							</Text>
							<LineChart
								data={{
									labels: chartLabels,
									datasets: [
										{
											data: moodNumbers,
										},
									],
								}}
								width={
									Dimensions.get("window").width * 0.97
								}
								height={200}
								yAxisInterval={1} // optional, defaults to 1
								chartConfig={{
									backgroundColor: "#e26a00",
									backgroundGradientFrom: "#fb8c00",
									backgroundGradientTo: "#ffa726",
									decimalPlaces: 0, // optional, defaults to 2dp
									color: (opacity = 1) =>
										`rgba(255, 255, 255, ${opacity})`,
									labelColor: (opacity = 1) =>
										`rgba(255, 255, 255, ${opacity})`,
									style: {
										borderRadius: 16,
									},
									propsForDots: {
										r: "6",
										strokeWidth: "2",
										stroke: "#ffa726",
									},
								}}
								bezier
								style={{
									marginVertical: 8,
									borderRadius: 16,
								}}
							/>
						</View>
						<View style={styles.stress_line_chart}>
							<Text style={styles.mood_head_text}>
								Stress Line Chart
							</Text>
							<LineChart
								data={{
									labels: stressChartLabels,
									datasets: [
										{
											data: stressLevel,
										},
									],
								}}
								width={
									Dimensions.get("window").width * 0.97
								}
								height={200}
								yAxisInterval={1} // optional, defaults to 1
								chartConfig={{
									backgroundColor: "#e26a00",
									backgroundGradientFrom: "#fb8c00",
									backgroundGradientTo: "#ffa726",
									decimalPlaces: 0, // optional, defaults to 2dp
									color: (opacity = 1) =>
										`rgba(255, 255, 255, ${opacity})`,
									labelColor: (opacity = 1) =>
										`rgba(255, 255, 255, ${opacity})`,
									style: {
										borderRadius: 16,
									},
									propsForDots: {
										r: "6",
										strokeWidth: "2",
										stroke: "#ffa726",
									},
								}}
								bezier
								style={{
									marginVertical: 8,
									borderRadius: 16,
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		</NativeBaseProvider>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		width: Sizes.width,
		height: Sizes.height,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 15,
		paddingVertical: 10,
	},
	line_chart: {
		height: 250,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	stress_line_chart: {
		height: 400,
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 50,
		
	},
	mood_head_text: {
		fontFamily: "quincy-bold",
		fontSize: 25,
		marginVertical: 15,
	},
	scroll_container: {
		marginVertical: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: 100,
	},
	button: {
		backgroundColor: "#0782F9",
		width: "60%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 40,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	headerText: {
		fontFamily: "quincy-bold",
		fontSize: 30,
		marginVertical: 10,
	},
	header2Text: {
		fontFamily: "quincy-bold",
		fontSize: 20,
		color: "white",
		marginTop: "3%",
		backgroundColor: "#5F9EA0",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 30,
		width: 320,
	},
	bg_mood_Card: {
		height: "70%",
		marginHorizontal: 7,
		marginVertical: 10,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		borderWidth: 3,
		backgroundColor: "#353531",
	},
	bg_black_Card: {
		borderWidth: 0,
		width: "90%",
		height: "25%",
		borderRadius: 10,
		backgroundColor: "#353531",
	},
});
