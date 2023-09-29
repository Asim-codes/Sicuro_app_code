import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import {
	ExtraText,
	ExtraView,
	TextLink,
	TextLinkContent,
} from "../components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
	Input,
	Icon,
	IconButton,
	NativeBaseProvider,
	Box,
	Spinner,
} from "native-base";
import { Sizes } from "../utils/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { state, setState } = useContext(AuthContext);
	const navigation = useNavigation();

	//Loading fonts
	const [fontsLoaded] = useFonts({
		"quincy-regular": require("./../assets/fonts/quincy-text.otf"),
		"quincy-black": require("./../assets/fonts/quincy-black.otf"),
		"quincy-bold": require("./../assets/fonts/quincy-bold.otf"),
		"quincy-extrabold": require("./../assets/fonts/quincy-extrabold.otf"),
		"quincy-light": require("./../assets/fonts/quincy-light.otf"),
		"quincy-medium": require("./../assets/fonts/quincy-medium.otf"),
		"quincy-thin": require("./../assets/fonts/quincy-thin.otf"),
		"aileron-bold": require("./../assets/fonts/Aileron-Bold.otf"),
		"aileron-semibold": require("./../assets/fonts/Aileron-SemiBold.otf"),
		"aileron-thin": require("./../assets/fonts/Aileron-Thin.otf"),
	});

	useEffect(() => {
		async function prepare() {
			await SplashScreen.preventAutoHideAsync();
		}
		prepare();
	}, []);

	if (!fontsLoaded) {
		return undefined;
	} else {
		SplashScreen.hideAsync();
	}

	const handleLogin = () => {
		if (email == "" || password == "") {
			alert("Please provide all details");
			return;
		}
		setLoading(true);
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				const { uid, displayName, email } =
					userCredentials.user;
				const user = { uid, displayName, email };
				const stateData = { user };
				setState({ user: stateData.user });
				AsyncStorage.setItem(
					"sicuro_auth",
					JSON.stringify(stateData)
				);
				setLoading(false);
				navigation.navigate("Dashboard");
			})
			.catch((error) => {
				setLoading(false);
				alert(error.message);
			});
	};

	return (
		<NativeBaseProvider>
			<View style={styles.top_rounded_white}>
				<Text
					style={{
						fontFamily: "quincy-bold",
						fontSize: 55,
						color: "white",
						marginHorizontal: 10,
					}}
				>
					Sicuro.
				</Text>
				<Text
					style={{
						fontFamily: "quincy-thin",
						fontSize: 25,
						color: "white",
						marginHorizontal: 10,
					}}
				>
					Understanding you better
				</Text>
			</View>
			<Text
				style={{
					fontFamily: "aileron-bold",
					fontSize: 30,
					left: "-28%",
					marginBottom: "1%",
				}}
			>
				Login{" "}
			</Text>
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
					style={{
						width: "80%",
					}}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Email"
							value={email}
							onChangeText={(text) => setEmail(text)}
							style={styles.input}
						/>
						<TextInput
							placeholder="Password"
							value={password}
							onChangeText={(text) => setPassword(text)}
							style={styles.input}
							secureTextEntry
						/>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={handleLogin}
							style={styles.button}
							disabled={loading}
						>
							<Text style={styles.buttonText}>
								{loading ? (
									<Spinner color={"white"} />
								) : (
									"Login"
								)}
							</Text>
						</TouchableOpacity>

						<ExtraView>
							<ExtraText>
								Haven't Registered Yet?{" "}
							</ExtraText>
							<TextLink
								onPress={() => {
									navigation.navigate("Register");
								}}
							>
								<TextLinkContent> Sign up</TextLinkContent>
							</TextLink>
						</ExtraView>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</NativeBaseProvider>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	input: {
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	buttonContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	button: {
		backgroundColor: "#0782F9",
		width: "50%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	top_rounded_white: {
		backgroundColor: "#8FCCC0",
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,
		height: Sizes.height - 500,
		width: Sizes.width,
		resizeMode: "contain",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	},
});
