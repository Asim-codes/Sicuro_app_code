import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { NativeBaseProvider } from "native-base";
import { Sizes } from "../utils/theme";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LineChart } from "react-native-chart-kit";
import { useEffect } from "react";
import { firestore } from "../firebase";
const chartLabels = ["week1", "week2", "week3", "week4"];
const moodNumbers = [2, 4, 6, 6];
const stressNumbers = [1, 3, 7, 7];
const MonthlyReport = ({ navigation }) => {
	const { state } = useContext(AuthContext);
	const [active, setActive] = useState("mood");
	const [chartData, setChartData] = useState([0, 0]);
	const [moodData, setMoodData] = useState([0, 0]);
	const [stressData, setStressData] = useState([0, 0]);
	const [moodAv, setMoodAv] = useState(0);
	const [stressAv, setStressAv] = useState(0);
	const [journalAv, setJournalAv] = useState(0);
	useEffect(() => {
		getData();
		getJournalCount();
		return () => {};
	}, [state && state.user]);
	const getJournalCount = async () => {
		firestore
			.collection("Journal")
			.where("uid", "==", state.user.uid)
			.where("addMoment.month", "==", 4)
			.get()
			.then((querySnapshot) => {
				const size = querySnapshot.size;
				setJournalAv(size);
			})
			.catch((err) => console.log(err));
	};
	const getData = async () => {
		firestore
			.collection("Activity")
			.doc(state.user.uid)
			.get()
			.then((documentSnapshot) => {
				if (documentSnapshot.exists) {
					const moodData = documentSnapshot.data().mood;
					const stressData =
						documentSnapshot.data().stressLevel;
					moodData && manageMood(moodData);
					stressData && manageStress(stressData);
				}
			})
			.catch((err) => console.log(err));
	};
	const manageMood = async (moodData) => {
		let moodNums = [];
		for (let index = 0; index < moodData.length; index++) {
			if (index >= 30) {
				return;
			}
			const nums = parseInt(
				moodData[index].mood.substring(
					0,
					moodData[index].mood.indexOf(" ")
				)
			);
			moodNums.push(nums);
		}
		setMoodData(moodNums);
		setChartData(moodNums);
		const average =
			moodNums.reduce((a, b) => a + b, 0) / moodNums.length;
		setMoodAv(average.toFixed(2));
	};
	const manageStress = async (stressData) => {
		let stressNums = [];
		for (
			let index = 0;
			index < stressData.length;
			index++
		) {
			if (index >= 30) {
				return;
			}
			const stnums = parseInt(
				stressData[index].substring(
					0,
					stressData[index].indexOf(" ")
				)
			);
			stressNums.push(stnums);
		}
		setStressData(stressNums);
		const average =
			stressNums.reduce((a, b) => a + b, 0) /
			stressNums.length;
		setStressAv(average.toFixed(2));
	};
	const handleChart = async (act) => {
		if (act == "mood") {
			setActive("mood");
			setChartData(moodData);
		}
		if (act == "stress") {
			setActive("stress");
			setChartData(stressData);
		}
	};
	return (
		<NativeBaseProvider>
			<View style={styles.top_rounded_white}>
				<View>
					<Text
						style={{
							fontFamily: "quincy-bold",
							fontSize: 50,
							color: "white",
							marginHorizontal: 10,
						}}
					>
						April
					</Text>
					<Text
						style={{
							fontFamily: "quincy-thin",
							fontSize: 30,
							color: "white",
							marginHorizontal: 10,
						}}
					>
						Insights
					</Text>
				</View>
				<Image
					source={require("../assets/images/headers/Report.png")}
					style={{ width: 90, height: 90 }}
				/>
			</View>
			<View style={styles.screen_cover}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.line_chart}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-around",
							}}
						>
							<TouchableOpacity
								onPress={() => handleChart("mood")}
							>
								<Text
									style={
										active == "mood"
											? styles.active
											: styles.mood_head_text
									}
								>
									Mood
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => handleChart("stress")}
							>
								<Text
									style={
										active == "stress"
											? styles.active
											: styles.mood_head_text
									}
								>
									Stress
								</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text
									style={
										active == "walk"
											? styles.active
											: styles.mood_head_text
									}
								>
									Walk
								</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text
									style={
										active == "sleep"
											? styles.active
											: styles.mood_head_text
									}
								>
									Sleep
								</Text>
							</TouchableOpacity>
						</View>
						<LineChart
							data={{
								datasets: [
									{
										data: chartData,
									},
								],
							}}
							width={Dimensions.get("window").width * 0.94}
							height={170}
							yAxisInterval={1} // optional, defaults to 1
							chartConfig={{
								backgroundColor: "#8FCCC0",
								backgroundGradientFrom: "#8FCCC0",
								backgroundGradientTo: "#8FCCC0",
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
								borderRadius: 16,
							}}
						/>
					</View>
					<View style={styles.card}>
						<Text style={styles.bottom_text}>
							Your were mostly in mood of level {moodAv}{" "}
							this month
						</Text>
					</View>
					<View style={styles.card}>
						<Text style={styles.bottom_text}>
							Your were mostly in level {stressAv} stress
							this month
						</Text>
					</View>
					<View style={styles.card}>
						<Text style={styles.bottom_text}>
							Your journaled {journalAv} times
						</Text>
					</View>
					<View style={styles.card}>
						<Text style={styles.bottom_text}>
							Your are not sleeping good enough. Walks count
							is good enough
						</Text>
					</View>
				</ScrollView>
				<TouchableOpacity
					onPress={() => navigation.navigate("Report")}
				>
					<View
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 10,
						}}
					>
						<Text
							style={{
								borderWidth: 1,
								borderColor: "gray",
								color: "gray",
								borderRadius: 50,
								padding: 10,
							}}
						>
							Go To Reports
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</NativeBaseProvider>
	);
};

export default MonthlyReport;

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
		borderRadius: 20,
		padding: 10,
		marginVertical: 3,
	},
	screen_cover: {
		width: Sizes.width - 20,
		alignSelf: "center",
		marginVertical: 10,
	},
	line_chart: {
		height: 250,
	},
	active: {
		fontFamily: "quincy-bold",
		color: "gray",
		fontSize: 15,
		marginVertical: 15,
		textAlign: "center",
		borderRadius: 50,
		padding: 10,
		backgroundColor: "#123",
	},
	mood_head_text: {
		fontFamily: "quincy-bold",
		color: "gray",
		fontSize: 15,
		marginVertical: 15,
		textAlign: "center",
		borderRadius: 50,
		padding: 10,
		backgroundColor: "white",
	},
	bottom_text: {
		color: "gray",
		fontSize: 13,
	},
});
