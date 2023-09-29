import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import { Sizes } from "../utils/theme";
import DateBtns from "../components/Journal/DateBtns";
import Jcard from "../components/Journal/Jcard";
import { AuthContext } from "../context/AuthContext";
import { firestore } from "../firebase";
const Journal = ({ navigation }) => {
	const { state } = useContext(AuthContext);
	const [journals, setJournals] = useState([]);
	const [journalMenu, setJournalMenu] = useState([]);
	useEffect(() => {
		getJournals();
		return () => {};
	}, [state && state.user]);
	const getJournals = async () => {
		firestore
			.collection("Journal")
			.where("uid", "==", state.user.uid)
			.orderBy("createdAt", "desc")
			.limit(5)
			.onSnapshot((querySnapshot) => {
				let items = [];
				if (querySnapshot.size == 0) {
					return;
				}
				querySnapshot.forEach((doc) => {
					items.push({ key: doc.id, ...doc.data() });
				});
				setJournals(items);
				manageDates(items);
			});
	};
	const manageDates = (items) => {
		let menus = [];
		let previous = 0;
		items.map((val) => {
			const menu = {
				day: val.addMoment.day,
				date: val.addMoment.date,
				action: val.addMoment,
			};
			if (previous != menu.date) {
				menus.push(menu);
			}
			previous = menu.date;
		});
		setJournalMenu(menus);
	};
	const handleJournal = async (action) => {
		firestore
			.collection("Journal")
			.where("uid", "==", state.user.uid)
			.where("addMoment", "==", action)
			.orderBy("createdAt", "desc")
			.limit(5)
			.get()
			.then((querySnapshot) => {
				let items = [];
				if (querySnapshot.size == 0) {
					return;
				}
				querySnapshot.forEach((doc) => {
					items.push({ key: doc.id, ...doc.data() });
				});
				setJournals(items);
			})
			.catch((err) => console.log(err));
	};
	return (
		<View style={styles.container}>
			<View style={styles.screen_cover}>
				{Object.keys(journals).length == 0 ? (
					<View
						style={{
							height: Sizes.height - 400,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text>Nothing Added Yet. Share now!</Text>
					</View>
				) : (
					<>
						<View style={styles.button_cover}>
							{journalMenu.map((val, i) => (
								<DateBtns
									text1={val.day}
									text2={val.date}
									key={i}
									action={val.action}
									handleJournal={handleJournal}
								/>
							))}
						</View>
						<Text
							style={{
								marginVertical: 10,
								fontSize: 20,
							}}
						>
							Time to reflect
						</Text>
						<ScrollView
							style={{ height: 300 }}
							showsVerticalScrollIndicator={false}
						>
							{journals.map((val) => (
								<Jcard data={val} key={val.key} />
							))}
						</ScrollView>
					</>
				)}
				<TouchableOpacity
					onPress={() => navigation.navigate("AddJournal")}
				>
					<View style={styles.homeBtn}>
						<Text style={{ color: "white" }}>Add New</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Journal;

const styles = StyleSheet.create({
	container: {
		width: Sizes.width,
		height: Sizes.height,
		display: "flex",
		alignItems: "center",
		marginTop: 50,
	},
	screen_cover: {
		width: Sizes.width - 20,
	},
	button_cover: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	homeBtn: {
		marginTop: 10,
		backgroundColor: "gray",
		borderRadius: 50,
		padding: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});
