import React from 'react';
import { Image, ImageRequireSource, StyleSheet, TextInput } from 'react-native';

import * as theme from '../../../Util/theme';
import { Banner } from '../../../Components';
import { scale } from 'react-native-size-matters';

interface SearchHeaderProps {
	onChangeSearch?: (text: string) => void;
	search: string;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.primaryColor,
		padding: scale(10),
	},
	content: {
		...theme.withPadding,
		alignItems: 'center',
		flexDirection: 'row',
		height: 48,
	},
	input: {
		...theme.text,
		color: 'white',
		flexGrow: 1,
		fontSize: 13,
	},
});

export function SearchHeader(props: SearchHeaderProps): React.ReactElement {
	const { onChangeSearch, search } = props;

	return (
		<Banner elevated shadowPosition="bottom">
			<TextInput
				autoFocus
				onChangeText={onChangeSearch}
				placeholder={'Search your location'}
				placeholderTextColor="rgba(255, 255, 255, 0.6)"
				style={styles.input}
				underlineColorAndroid="transparent"
				value={search}
			/>
		</Banner>
	);
}

