import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Image,
} from "react-native";
import { Icon, NativeBaseProvider } from "native-base";
import { Sizes } from "../utils/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ReportScreen = ({ navigation }) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
        "July",
        "August",
        "September",
        "October",
		"November",
        "December",
	];
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
						Report
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
			<View style={styles.container}>
				<View style={styles.screen_cover}>
					<ScrollView
						style={{
							height: 400,
							marginVertical: 10,
						}}
						showsVerticalScrollIndicator={false}
					>
						{months.map((val, i) => (
							<TouchableOpacity
								key={i}
								onPress={() =>
									navigation.navigate("MonthlyReport")
								}
							>
								<View style={styles.card}>
									<Text style={styles.card_top}>{val}</Text>
									<View style={styles.card_bottom}>
										<Text
											style={{
												fontSize: 15,
												color: "gray",
												marginRight: 5,
											}}
										>
											Summary of Well Being Report
										</Text>

										<Icon
											as={
												<MaterialCommunityIcons name="arrow-right-bold" />
											}
											size={5}
											color="gray"
										/>
									</View>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</View>
		</NativeBaseProvider>
	);
};

export default ReportScreen;
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
	container: {
		width: Sizes.width,
		height: Sizes.height,
		display: "flex",
		alignItems: "center",
		marginTop: 25,
	},
	screen_cover: {
		width: Sizes.width - 20,
	},
	card: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		marginVertical: 5,
	},
	card_top: {
		marginBottom: 10,
		fontSize: 20,
		color: "dimgray",
	},
	card_bottom: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
});
