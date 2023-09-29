import styled from "styled-components";
import {
	Dimensions,
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;
const DIMENSIONS = Dimensions.get("window");

export const Colors = {
	primary: "#ece8f8",
	secondary: "#c1ccec",
	secondaryIsh: "#bbade6",
	tertiary: "#c6da86",
	darkLight: "#a9a9a9",
	brandCol: "#694bc8",
};

const {
	primary,
	secondary,
	tertiary,
	darkLight,
	brandCol,
} = Colors;

export const StyledContainer = styled.View`
	flex: 1;
	padding: 25px;
	padding-top: 50px;
	background-color: ${primary};
`;

export const StyledQuestionContainer = styled.View`
	flex: 1;
	padding-top: 25px;
	border-radius: 10px;
	background-color: ${brandCol};
`;

export const InnerContainer = styled.View`
	flex: 1;
	width: 100%;
	padding-top: ${StatusBarHeight + 40};
	align-items: center;
	background-color: ${secondary};
`;

export const StyledButton = styled.TouchableOpacity`
	padding: 15px;
	background-color: ${brandCol};
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	margin-vertical: 5px;
	height: 60px;
`;

export const StyledButtonText = styled.Text`
	color: ${primary};
	font-size: 16px;
	font-weight: bold;
`;

export const StyledTextInputLabel = styled.Text`
	color: ${tertiary};
	font-size: 13px;
	text-align: left;
	font-weight: bold;
`;

export const StyledCardQuestionSectionView = styled.View`
	margin-left: ${DIMENSIONS.width / 3};
	margin-right: ${DIMENSIONS.width / 3};
	margin-top: ${DIMENSIONS.height / 70};

	font-size: 15px;
	width: ${DIMENSIONS.width / 1.35};
`;

export const StyledQuestionStackButton = styled.TouchableOpacity`
	padding: 15px;
	background-color: ${brandCol};
	justify-content: center;
	width: ${DIMENSIONS.width / 2.155};
	align-items: center;
	border-radius: 10px;
	margin-vertical: 10px;
	height: 45px;
`;

export const ExtraView = styled.View`
	display: flex;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	padding: 10px;
`;

export const ExtraText = styled.Text`
	justify-content: center;
	align-items: center;
	font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
`;

export const TextLinkContent = styled.Text`
	color: ${darkLight};
	font-size: 15px;
	text-decoration: underline;
`;

const Styles = StyleSheet.create({
	card: {
		paddingTop: StatusBarHeight,
		height: null,
		width: null,
		flex: 1,
		resizeMode: "cover",
		// borderWidth: 2,
		borderColor: tertiary,
		borderRadius: 10,
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: secondary,
		overflow: "hidden",
		padding: 35,
	},
	cardTextMain: {
		textAlign: "left",
		fontSize: 20,
		backgroundColor: "transparent",
	},
	cardTextSecondary: {
		textAlign: "left",
		fontSize: 23,
		color: Colors.brandCol,
		fontWeight: "bold",
		backgroundColor: "transparent",
	},
	errorText: {
		color: "#FF0000",
	},
});

export { Styles };
