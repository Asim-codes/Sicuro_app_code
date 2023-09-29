import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import {
	Input,
	Icon,
	Select,
	CheckIcon,
	NativeBaseProvider,
} from "native-base";
import {
	MaterialIcons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Sizes } from "../utils/theme";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [age, setAge] = useState(new Date());
	const [gender, setGender] = useState("");
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");
	const [ethnicity, setEthnicity] = useState("");
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setAge(currentDate);
	};
	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: age,
			onChange,
			mode: currentMode,
			is24Hour: true,
		});
	};
	const showDatepicker = () => {
		showMode("date");
	};
	const handleNext = async () => {
		if (
			fullName == "" ||
			email == "" ||
			password == "" ||
			!age ||
			ethnicity == "" ||
			gender == "" ||
			weight == "" ||
			height == ""
		) {
			alert("Please provide all details");
			return;
		}
		const data = {
			fullName,
			email,
			password,
			age: `${age}`,
			ethnicity,
			gender,
			weight,
			height,
		};
		navigation.navigate("FinalRegister", data);
	};

	return (
		<NativeBaseProvider>
			<View
				style={styles.top_rounded_green}
				behavior="padding"
			>
				<Text
					style={[
						styles.top_rounded_white,
						styles.headerText,
					]}
				>
					{" "}
					Register{" "}
				</Text>
				<Text style={{ color: "white", fontSize: 13 }}>
					Your data will not be shared with third parties
				</Text>
			</View>
			<KeyboardAvoidingView
				style={{
					width: Sizes.width - 10,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				behavior={
					Platform.OS === "ios" ? "padding" : "height"
				}
			>
				<ScrollView
					style={styles.inputContainer}
					showsVerticalScrollIndicator={false}
				>
					<Input
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						value={fullName}
						onChangeText={(fullName) =>
							setFullName(fullName)
						}
						variant="outline"
						w={{ base: "100%", md: "25%" }}
						InputLeftElement={
							<Icon
								as={<MaterialIcons name="person" />}
								size={5}
								ml="2"
								color="muted.400"
							/>
						}
						placeholder="Name"
					/>

					<Input
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						value={email}
						onChangeText={(text) => setEmail(text)}
						variant="outline"
						w={{ base: "100%", md: "25%" }}
						InputLeftElement={
							<Icon
								as={<MaterialIcons name="email" />}
								size={5}
								ml="2"
								color="muted.400"
							/>
						}
						placeholder="Email"
					/>

					<Input
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry
						variant="outline"
						w={{ base: "100%", md: "25%" }}
						InputLeftElement={
							<Icon
								as={<MaterialIcons name="lock" />}
								size={5}
								ml="2"
								color="muted.400"
							/>
						}
						placeholder="Password"
					/>
					<TouchableOpacity onPress={showDatepicker}>
						<View
							colorScheme="dark"
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								borderWidth: 1,
								borderColor: "lightgray",
								borderRadius: 10,
								paddingHorizontal: 10,
								paddingVertical: 12,
								marginTop: 10,
								backgroundColor: "white",
							}}
						>
							<Text
								style={{ color: "#A9A9A9", fontSize: 12 }}
							>
								Date of Birth
							</Text>
							<Text
								style={{ color: "#A9A9A9", fontSize: 12 }}
							>
								{age.toLocaleDateString()}
							</Text>
							<Icon
								as={<MaterialIcons name="calendar-today" />}
								size={5}
								ml="2"
								color="#A9A9A9"
							/>
						</View>
					</TouchableOpacity>
					<Select
						selectedValue={gender}
						minWidth="200"
						placeholder="Sex"
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						_selectedItem={{
							endIcon: <CheckIcon size="2" />,
						}}
						mt={5}
						onValueChange={(itemValue) =>
							setGender(itemValue)
						}
					>
						<Select.Item label="Male" value="M" />
						<Select.Item label="Female" value="F" />
					</Select>

					<Select
						selectedValue={ethnicity}
						minWidth="200"
						placeholder="Ethnicity"
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						_selectedItem={{
							endIcon: <CheckIcon size="2" />,
						}}
						mt={5}
						onValueChange={(itemValue) =>
							setEthnicity(itemValue)
						}
					>
						<Select.Item label="Albanian" value="Albanian" />
						<Select.Item label="Arab" value="Arab" />
						<Select.Item label="Bengali" value="Bengali" />
						<Select.Item label="Chinese" value="Chinese" />
						<Select.Item label="French" value="French" />
						<Select.Item label="German" value="German" />
						<Select.Item label="Indian" value="Indian" />
						<Select.Item label="Italian" value="Italian" />
						<Select.Item label="Japanese" value="Japanese" />
						<Select.Item label="Korean" value="Korean" />
						<Select.Item label="Malay" value="Malay" />
						<Select.Item label="Pakistani" value="Pakistani" />
						<Select.Item label="Polish" value="Polish" />
						<Select.Item label="Russian" value="Russian" />
						<Select.Item label="Spanish" value="Spanish" />
						<Select.Item label="Turkish" value="Turkish" />
						<Select.Item label="Vietnamese" value="Vietnamese" />
						<Select.Item label="White" value="White" />
						<Select.Item label="Other" value="F" />
					</Select>

					<Input
						keyboardType="numeric"
						maxLength={3}
						value={weight}
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						onChangeText={(text) => setWeight(text)}
						variant="outline"
						w={{ base: "100%", md: "25%" }}
						InputLeftElement={
							<Icon
								as={
									<MaterialCommunityIcons name="weight-kilogram" />
								}
								size={5}
								ml="2"
								color="muted.400"
							/>
						}
						placeholder="Weight (KG)"
					/>

					<Input
						keyboardType="numeric"
						maxLength={3}
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						value={height}
						onChangeText={(text) => setHeight(text)}
						variant="outline"
						w={{ base: "100%", md: "25%" }}
						InputLeftElement={
							<Icon
								as={
									<MaterialCommunityIcons name="human-male-height" />
								}
								size={5}
								ml="2"
								color="muted.400"
							/>
						}
						placeholder="Height (CM)"
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={handleNext}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Next</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Login")}
							style={styles.buttonOutline}
						>
							<Text style={styles.buttonOutlineText}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</NativeBaseProvider>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	inputContainer: {
		width: "80%",
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 10,
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 20,
	},
	button: {
		backgroundColor: "#8FCCC0",
		flex: 1,
		marginHorizontal: 5,
		padding: 5,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonOutline: {
		borderColor: "red",
		borderWidth: 1,
		flex: 1,
		marginHorizontal: 5,
		padding: 5,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	buttonOutlineText: {
		color: "red",
		fontWeight: "700",
		fontSize: 16,
	},
	card: {
		borderWidth: 0,
		width: 312,
		height: 50,
		borderColor: "white",
		borderRadius: 10,
		backgroundColor: "white",
		marginTop: 10,
	},
	image: {
		width: "100%",
		height: 200,
		resizeMode: "contain",
		position: "relative",
		top: 0,
	},
	top_rounded_green: {
		backgroundColor: "#8FCCC0",
		width: Sizes.width,
		height: Sizes.height - 700,
		borderRadius: 25,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {
		fontFamily: "quincy-light",
		fontSize: 40,
		color: "white",
		marginBottom: "1%",
	},
});
