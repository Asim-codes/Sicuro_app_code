import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function Notify() {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current =
			Notifications.addNotificationReceivedListener(
				(notification) => {
					setNotification(notification);
				}
			);

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				}
			);
		showNotify();
		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(
				responseListener.current
			);
		};
	}, []);
	const showNotify = async () => {
		const now = new Date();
		const hours = now.getHours();
		const isWithinTimeRange = hours >= 20 && hours < 24;
		if (isWithinTimeRange) {
			await schedulePushNotification();
		}
	};
	return <></>;
}

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "Reminder! 📬",
			body: "Remember to track your mood and stress levels and write journals ! Awareness is key!",
		},
		trigger: { seconds: 2 },
	});
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync(
			"default",
			{
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			}
		);
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } =
				await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert(
				"Failed to get push token for push notification!"
			);
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync())
			.data;
	} else {
		alert(
			"Must use physical device for Push Notifications"
		);
	}

	return token;
}
