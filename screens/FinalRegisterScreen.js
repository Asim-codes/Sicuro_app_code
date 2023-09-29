import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
	Image,
} from "react-native";
import { auth, firestore, db } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import {
	Input,
	Icon,
	Select,
	CheckIcon,
	Center,
	NativeBaseProvider,
	Spinner,
} from "native-base";
import {
	MaterialIcons,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Font } from "expo";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { Sizes } from "../utils/theme";

const FinalRegisterScreen = ({ navigation, route }) => {
	const { setState } = useContext(AuthContext);
	const [livingArea, setLivingArea] = useState("");
	const [housing, setHousing] = useState("");
	const [educationLevel, setEducationLevel] = useState("");
	const [industry, setIndustry] = useState("");
	const [mentalIlness, setMentalIlness] = useState("");
	const [loading, setLoading] = useState(false);
	const {
		fullName,
		email,
		password,
		age,
		ethnicity,
		gender,
		weight,
		height,
	} = route.params;

	const handleSignUp = async () => {
		if (
			livingArea == "" ||
			mentalIlness == "" ||
			housing == "" ||
			educationLevel == "" ||
			industry == ""
		) {
			alert("Please provide all details");
			return;
		}
		setLoading(true);
		const { user } = auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				const userId = auth.currentUser?.uid;
				firestore.collection("Users").doc(userId).set({
					role: "User",
					userId,
					fullName,
					email,
					password,
					gender,
					weight,
					age,
					height,
					livingArea,
					educationLevel,
					industry,
					mentalIlness,
					ethnicity,
					housing,
				});
				const user = {
					uid: userId,
					displayName: fullName,
					email,
				};
				const stateData = { user };
				setState({ user: stateData.user });
				AsyncStorage.setItem(
					"sicuro_auth",
					JSON.stringify(stateData)
				);
				setLoading(false);
				userCredentials.user.updateProfile({
					displayName: fullName,
				});
				navigation.navigate("Dashboard");
			})
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
	};

	return (
		<NativeBaseProvider>
			<View style={styles.container}>
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

				<ScrollView style={styles.inputContainer}>
					<Select
						selectedValue={livingArea}
						minWidth="200"
						placeholder="Type of living area"
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						_selectedItem={{
							endIcon: <CheckIcon size="2" />,
						}}
						mt={5}
						onValueChange={(itemValue) =>
							setLivingArea(itemValue)
						}
					>
						<Select.Item label="Urban" value="U" />
						<Select.Item label="Suburban" value="SB" />
						<Select.Item label="Rural" value="R" />
					</Select>

					<Select
						selectedValue={housing}
						minWidth="200"
						placeholder="Type of housing"
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						_selectedItem={{
							endIcon: <CheckIcon size="2" />,
						}}
						mt={5}
						onValueChange={(itemValue) =>
							setHousing(itemValue)
						}
					>
						<Select.Item
							label="Public housing"
							value="Pub"
						/>
						<Select.Item
							label="Private rental apartment"
							value="PriRA"
						/>
						<Select.Item
							label="Private permanant apartment"
							value="PriPA"
						/>
						<Select.Item
							label="Studio apartment"
							value="SRA"
						/>
						<Select.Item label="House" value="H" />
						<Select.Item label="Mansion" value="M" />
						<Select.Item label="Others" value="others" />
					</Select>

					<Select
						selectedValue={educationLevel}
						minWidth="200"
						placeholder="Education level"
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						_selectedItem={{
							endIcon: <CheckIcon size="2" />,
						}}
						mt={5}
						onValueChange={(itemValue) =>
							setEducationLevel(itemValue)
						}
					>
						<Select.Item label="Secondary" value="sec" />
						<Select.Item
							label="Post-secondary non-teritiaty"
							value="post-sec"
						/>
						<Select.Item
							label="Bachelor's"
							value="bachelor"
						/>
						<Select.Item label="Master's" value="master" />
						<Select.Item
							label="Doctoral"
							value="doctoral"
						/>
						<Select.Item label="Others" value="others" />
					</Select>

					<Select
						selectedValue={industry}
						minWidth="200"
						placeholder="Working industry"
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						_selectedItem={{
							endIcon: <CheckIcon size="2" />,
						}}
						mt={5}
						onValueChange={(itemValue) =>
							setIndustry(itemValue)
						}
					>
						<Select.Item label="Student" value="student" />
						<Select.Item
							label="Advertising & Marketing"
							value="advertising & marketing"
						/>
						<Select.Item
							label="Aerospace"
							value="aerospace"
						/>
						<Select.Item
							label="Agriculture"
							value="agriculture"
						/>
						<Select.Item
							label="Computer & Technology"
							value="technology"
						/>
						<Select.Item
							label="Construction"
							value="construction"
						/>
						<Select.Item
							label="Education"
							value="education"
						/>
						<Select.Item label="Energy" value="energy" />
						<Select.Item
							label="Entertainment"
							value="entertainment"
						/>
						<Select.Item
							label="Engineering"
							value="engineering"
						/>
						<Select.Item label="Fashion" value="fashion" />
						<Select.Item
							label="Finance & Economics"
							value="finance & economics"
						/>
						<Select.Item
							label="Food & Beverage"
							value="F & B"
						/>
						<Select.Item
							label="Health care"
							value="health care"
						/>
						<Select.Item
							label="Hospitality"
							value="hospitality"
						/>
						<Select.Item
							label="Manufacturing"
							value="manufacturing"
						/>
						<Select.Item
							label="Media & News"
							value="media & news"
						/>
						<Select.Item
							label="Pharmaceutical"
							value="pharma"
						/>
						<Select.Item
							label="Telecommunications"
							value="telecom"
						/>
						<Select.Item label="Technology" value="tech" />
						<Select.Item
							label="Transportation"
							value="transportation"
						/>
						<Select.Item
							label="Wholesale & Retail"
							value="retail"
						/>
						<Select.Item label="Others" value="others" />
					</Select>

					<Select
						selectedValue={mentalIlness}
						minWidth="200"
						placeholder="Diagnosed Mental Health Issues"
						marginTop={3}
						bgColor={"white"}
						borderRadius={10}
						borderWidth={1}
						_selectedItem={{
							endIcon: <CheckIcon size="2" />,
						}}
						mt={5}
						onValueChange={(itemValue) =>
							setMentalIlness(itemValue)
						}
					>
						<Select.Item label="None" value="none" />
						<Select.Item
							label="Anxiety disorders"
							value="anxiety"
						/>
						<Select.Item
							label="Bipolar affective disorders"
							value="bipolar"
						/>
						<Select.Item
							label="Dissociative disorders"
							value="dissaociative"
						/>
						<Select.Item
							label="Eating disorders"
							value="eating"
						/>
						<Select.Item
							label="Paranoia"
							value="paranoia"
						/>
						<Select.Item
							label="Post-traumatic stress disorder"
							value="ptsd"
						/>
						<Select.Item
							label="Psychosis"
							value="psychosis"
						/>
						<Select.Item
							label="Schizopherenia"
							value="schizo"
						/>
						<Select.Item
							label="Obessive-compulsive disorders"
							value="OCD"
						/>
						<Select.Item label="Others" value="others" />
					</Select>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={handleSignUp}
							style={styles.button}
							disabled={loading}
						>
							<Text style={styles.buttonText}>
								{loading ? (
									<Spinner color="white" />
								) : (
									"Register"
								)}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={styles.buttonOutlineSecond}
						>
							<Text style={styles.buttonOutlineText}>
								Back
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("Login")}
							style={styles.buttonOutline}
						>
							<Text style={styles.buttonOutlineTextSecond}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</NativeBaseProvider>
	);
};

export default FinalRegisterScreen;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
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
	buttonOutlineSecond: {
		borderColor: "orange",
		borderWidth: 1,
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
	buttonOutlineTextSecond: {
		color: "red",
		fontWeight: "700",
		fontSize: 16,
	},
	buttonOutlineText: {
		color: "orange",
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
