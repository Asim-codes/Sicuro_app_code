import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Circular from "../Charts/Circular";
import { Sizes } from "../../utils/theme";
import { Pedometer } from "expo-sensors";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Steps = () => {
	const { state } = useContext(AuthContext);
	const [isPedometerAvailable, setIsPedometerAvailable] =
		useState("checking");
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const [pastStepCount, setPastStepCount] = useState(0);
	const [currentStepCount, setCurrentStepCount] =
		useState(0);
	const subscribe = async () => {
		const isAvailable = await Pedometer.isAvailableAsync();
		setIsPedometerAvailable(String(isAvailable));

		if (isAvailable) {
			return Pedometer.watchStepCount((result) => {
				setCurrentStepCount(result.steps);
			});
		}
	};
	// useEffect(() => {
	// const subscription = subscribe();
	// return () =>
	// subscription && subscription.remove();
	// }, [state && state.user]);
	return (
		<View>
			{/* <View style={styles.container}>
				<Text>
					Pedometer is Available
					{isPedometerAvailable}
				</Text>
				<Text>
					Steps taken in the last 24 hours: {pastStepCount}
				</Text>
				<Text>
					Walk! And watch this go up: {currentStepCount}
				</Text>
			</View> */}
			<View style={styles.circular_cont}>
				<View style={styles.circle_card}>
					<Text style={styles.circle_text}>Sleep</Text>
					<View>
						<Circular />
					</View>
				</View>
				<View style={styles.circle_card}>
					<Text style={styles.circle_text}>Walk</Text>
					<View>
						<Circular />
					</View>
				</View>
			</View>
		</View>
	);
};

export default Steps;

const styles = StyleSheet.create({
	circular_cont: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		width: Sizes.width,
	},
	circle_card: {
		backgroundColor: "#353531",
		borderRadius: 20,
		padding: 10,
		flex: 1,
		marginHorizontal: 5,
	},
	circle_text: {
		color: "#5F9EA0",
		fontFamily: "aileron-bold",
		fontSize: 20,
	},
});
