import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const index = ({ handleSignOut }) => {
	return (
		<View
			style={{
				marginBottom: 10,
				paddingVertical: 10,
				alignSelf: "flex-end",
			}}
		>
			<Icon
				as={<MaterialCommunityIcons name="logout" />}
				size={7}
				color="#5F9EA0"
				alignSelf={"flex-end"}
				onPress={handleSignOut}
			/>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({});
