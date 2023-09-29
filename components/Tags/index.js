import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

const Tags = ({ title, handleTagPress, selectedTags }) => {
	const [active, setActive] = useState(false);
	useEffect(() => {
		if (selectedTags.find((t) => t.tag === title)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [selectedTags]);

	return (
		<TouchableOpacity onPress={() => handleTagPress(title)}>
			<View style={active ? styles.active_tag : styles.tag}>
				<Text
					style={
						active
							? styles.active_tag_content
							: styles.tag_content
					}
				>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Tags;

const styles = StyleSheet.create({
	tag: {
		backgroundColor: "white",
		borderRadius: 50,
		paddingHorizontal: 10,
		paddingVertical: 10,
		margin: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	active_tag: {
		backgroundColor: "#8FCCC0",
		borderRadius: 50,
		paddingHorizontal: 10,
		paddingVertical: 10,
		margin: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	active_tag_content: {
		color: "white",
		fontSize: 15,
	},
	tag_content: {
		color: "gray",
		fontSize: 15,
	},
});
