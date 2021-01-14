import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RootStackParams } from './routeParams';
import { Loading } from './Loading';
import { Home } from './Home';
import { Search } from './Search';
import * as theme from '../Util/theme';

/**
 * The main stack navigator, for the app.
 */
const RootStack = createStackNavigator<RootStackParams>();

/**
 * A stack navigator for the error case.
 */
const ErrorStack = createStackNavigator();

/**
 * Shared navigator screen options across different screens.
 */
const navigationOptions = {
	headerMode: 'none' as const,
};


function renderScreen(): React.ReactElement {
    // return <Search />;c
    // if (error) {
	// 	return (
	// 		<ErrorStack.Navigator
	// 			initialRouteName="Error"
	// 			{...navigationOptions}
	// 		>
	// 			<ErrorStack.Screen component={ErrorScreen} name="Error" />
	// 			<ErrorStack.Screen component={Search} name="Search" />
	// 		</ErrorStack.Navigator>
	// 	);
	// }

	return (
		<RootStack.Navigator initialRouteName="Search" {...navigationOptions}>
			{/* <RootStack.Screen component={About} name="About" /> */}
			{/* <RootStack.Screen component={Details} name="Details" /> */}
			<RootStack.Screen component={Home} name="Home" options={{ headerTitle: 'Home' }}/>
			<RootStack.Screen component={Search} name="Search" />
		</RootStack.Navigator>
	);
}

export function Screens(): React.ReactElement {
	// const { api } = useContext(ApiContext);
	// const { error } = useContext(ErrorContext);

	return (
		<View style={theme.fullScreen}>
			<StatusBar style="auto" animated={true} translucent={true} />
			<NavigationContainer>
				{renderScreen()}
			</NavigationContainer>
		</View>
	);
}


