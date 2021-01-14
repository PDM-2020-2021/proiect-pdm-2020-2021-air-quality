
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
// import {  } from 'react-native-paper';
import { mdiCloudSearch } from '@mdi/js';
import { BackButton, ListSeparator } from '../../Components';
import * as theme from '../../Util/theme';
import { RootStackParams } from '../routeParams';
import { SearchHeader } from './SearchHeader';
import { Home } from '../Home';

// Timeout to detect when user stops typing
let typingTimeout: number | null = null;



interface SearchProps {
	navigation: StackNavigationProp<RootStackParams, 'Search'>;
}

const styles = StyleSheet.create({
	backButton: {
		...theme.withPadding,
		marginVertical: theme.spacing.normal,
	},
	container: {
		flexGrow: 1,
	},
	list: {
		flex: 1,
	},
	noResults: {
		...theme.text,
		...theme.withPadding,
		marginTop: theme.spacing.normal,
	},
});

function renderSeparator(): React.ReactElement {
	return <ListSeparator />;
}

export function Search(props: SearchProps): React.ReactElement {
	// const {
	// 	navigation: { goBack },
	// } = props;
	const { navigation } = props;
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [location, setLocation ] = useState('');
	const [data, setData ] = useState('');
	
	function handleChangeSearch(s: string): void {
		setSearch(s);

		if (!s) {
			return;
		}

		setLoading(true);

		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
	}

	function handleItemClick(item: string): void {
		setLocation(item);
		console.log("Location set to: " + item);
	}

	function goBack(): void{
		//TO DO
	}

	function renderEmptyList(
		loading: boolean,
		search: string,
	): React.ReactElement | null {
		if (loading) {
			return <Text style={styles.noResults}>Waiting for results...</Text>;
		}
		return <Text style={styles.noResults}>Waiting for results.</Text>;
	}

	function handleSearchButton(): void {
		navigation.push('Home', {location: search});
	  }

	return (
		<View style={styles.container}>
			<SearchHeader onChangeSearch={handleChangeSearch} search={search} />
			<Button title="search" onPress={handleSearchButton}></Button>
		</View>
	);
}