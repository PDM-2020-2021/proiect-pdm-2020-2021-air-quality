import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import * as theme from '../../Util/theme';
import { Background } from './Background';

let longWaitingTimeout: number | null = null;

const styles = StyleSheet.create({
	dots: {
		color: theme.primaryColor,
	},
	text: {
		...theme.title,
		fontSize: 18,
		textAlign: 'center',
	},
});

function renderCough(index: number): React.ReactElement {
	return (
		<Text key={index}>
			{'loading'}
			<Text style={styles.dots}>...</Text>
		</Text>
	);
}

function renderText(longWaiting: boolean): React.ReactElement {
	let coughs = 1; // Number of times to show "Cough..."

	return (
		<Text>
			Air Quality
			<Text style={styles.dots}>...</Text>
			{Array.from({ length: coughs }, (_, index) => index + 1).map(
				renderCough
			)}
		</Text>
	);
}

function clearLongWaiting(): void {
	if (longWaitingTimeout) {
		clearTimeout(longWaitingTimeout);
		longWaitingTimeout = null;
	}
}

export function Loading(): React.ReactElement {
	const [longWaiting, setLongWaiting] = useState(false); 

	useEffect(() => {
		setTimeout(() => {
			setLongWaiting(true);
		}, 2000);

		return clearLongWaiting;
	}, []);
	return (
		<Background style={theme.withPadding}>
			<Text style={styles.text}>{renderText(longWaiting)}</Text>
		</Background>
	);
}
