import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const index = ({
	title,
	image,
	handleReason,
	selected,
}) => {
	return (
		<TouchableOpacity onPress={() => handleReason(title)}>
			<View
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					backgroundColor: "#5F9EA0",
					marginVertical: 5,
				}}
			>
				{selected ? (
					<Icon
						as={
							<MaterialCommunityIcons name="check-circle" />
						}
						size={7}
						ml="2"
						color="green.400"
					/>
				) : (
					<Icon
						as={<MaterialCommunityIcons name="circle" />}
						size={7}
						ml="2"
						color="muted.400"
					/>
				)}
				<Text>{title}</Text>
				<Image
					source={image}
					style={{ width: 50, height: 50 }}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default index;

const styles = StyleSheet.create({});
