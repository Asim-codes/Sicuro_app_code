import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";

const DateBtns = ({
	text1,
	text2,
	handleJournal,
	action,
}) => {
	return (
		<TouchableOpacity onPress={() => handleJournal(action)}>
			<View style={[styles.container]}>
				<Text style={styles.btnText1}>{text1}</Text>
				<Text style={styles.btnText2}>{text2}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default DateBtns;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 5,
		width: 60,
		backgroundColor: "lightgray",
		borderRadius: 10,
		marginHorizontal: 2,
	},
	active_container: {
		display: "flex",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 5,
		width: 60,
		backgroundColor: "lightgray",
		borderRadius: 10,
		marginHorizontal: 2,
		borderWidth: 2,
		borderColor: "green",
	},
	btnText1: {
		color: "gray",
	},
	btnText2: {
		color: "gray",
		fontSize: 18,
	},
});
