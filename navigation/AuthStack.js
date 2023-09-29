import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
	MaterialIcons,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";

//Screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ReportScreen from "../screens/ReportScreen";
import SymptomScreen from "../screens/SymptomScreen";
import AddSymptom from "../screens/AddSymptom";
import FinalRegisterScreen from "../screens/FinalRegisterScreen";
import { AuthContext } from "../context/AuthContext";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Journal from "../screens/Journal";
import AddJournal from "../screens/AddJournal";
import MonthlyReport from "../screens/MonthlyReport";

//Screen names
const homeName = "Home";
const journal = "Journal";
const addJournal = "AddJournal";
const reportName = "Report";
const SymptomName = "Symptoms";
const monthlyReport = "MonthlyReport";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					let rn = route.name;

					if (rn === homeName) {
						iconName = focused
							? "home-variant"
							: "home-outline";
					} else if (rn === journal) {
						iconName = focused
							? "newspaper-variant"
							: "newspaper-variant-outline";
					} else if (rn === reportName) {
						iconName = focused
							? "clipboard-list"
							: "clipboard-list-outline";
					} else if (rn === SymptomName) {
						iconName = focused
							? "emoticon-sick"
							: "emoticon-outline";
					}
					// You can return any component that you like here!
					return (
						<MaterialCommunityIcons
							name={iconName}
							size={size}
							color={color}
						/>
					);
				},
			})}
		>
			<Tab.Screen
				name={homeName}
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen name={journal} component={Journal} />
			<Tab.Screen
				name={reportName}
				component={ReportScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name={SymptomName}
				component={SymptomScreen}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};

const AuthStack = () => {
	const { state } = useContext(AuthContext);
	const authenticated = state && state.user ? true : false;
	//Load fonts
	const [fontsLoaded] = useFonts({
		"quincy-regular": require("./../assets/fonts/quincy-text.otf"),
		"quincy-black": require("./../assets/fonts/quincy-black.otf"),
		"quincy-bold": require("./../assets/fonts/quincy-bold.otf"),
		"quincy-extrabold": require("./../assets/fonts/quincy-extrabold.otf"),
		"quincy-light": require("./../assets/fonts/quincy-light.otf"),
		"quincy-medium": require("./../assets/fonts/quincy-medium.otf"),
		"quincy-thin": require("./../assets/fonts/quincy-thin.otf"),
	});
	//Check if fonts are loaded or not
	if (!fontsLoaded) {
		return null;
	} else {
		SplashScreen.hideAsync();
	}
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{authenticated == false ? (
				<>
					<Stack.Screen
						name="Login"
						component={LoginScreen}
					/>
					<Stack.Screen
						name="Register"
						component={RegisterScreen}
					/>
					<Stack.Screen
						name="FinalRegister"
						component={FinalRegisterScreen}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name="Dashboard"
						component={TabNavigator}
					/>
					<Stack.Screen
						name={addJournal}
						component={AddJournal}
					/>
					<Stack.Screen
						name={monthlyReport}
						component={MonthlyReport}
					/>
					<Stack.Screen
						name={"AddSymptom"}
						component={AddSymptom}
						options={{ headerShown: true }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default AuthStack;
