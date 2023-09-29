import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProgressChart } from "react-native-chart-kit";
export default function Circular({ percentage }) {
	const data = {
		data: [0.5],
	};
	return (
		<ProgressChart
			data={data}
			width={150}
			height={120}
			chartConfig={{
				backgroundGradientFrom: "#353531",
				backgroundGradientTo: "#353531",
				color: (opacity = 1) =>
					`rgba(255, 124, 0, ${opacity})`,
			}}
			style={{
				borderRadius: 20,
			}}
			hideLegend={true}
		/>
	);
}

const styles = StyleSheet.create({});
