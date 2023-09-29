import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";

const Jcard = ({ data }) => {
	const secs = data.createdAt.seconds - 18000;
	return (
		<View style={styles.card}>
			<View style={styles.card_top}>
				<Text style={styles.top_text}>{data.feel}</Text>
			</View>
			<View style={styles.card_bottom}>
				<Text style={styles.bottom_text}>
					Added At:{" "}
					{moment(secs * 1000, "x").format(
						"DD MMM YYYY hh:mm a"
					)}
				</Text>
			</View>
		</View>
	);
};

export default Jcard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		marginVertical: 5,
	},
	card_top: {
		marginBottom: 10,
	},
	bottom_text: {
		color: "gray",
		fontSize: 12,
		alignSelf: "flex-end",
		fontWeight: "600",
	},
	top_text: {
		color: "gray",
		fontSize: 15,
	},
});
