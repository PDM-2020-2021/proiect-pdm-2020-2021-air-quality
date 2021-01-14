import Constants from 'expo-constants';
import { Platform, ViewStyle } from 'react-native';
import { scale } from 'react-native-size-matters';

export type ShadowPosition = 'top' | 'bottom';

export const backgroundColor = '#FAFAFC';
export const iconBackgroundColor = '#EBE7DD';
export const primaryColor = '#F8A65D';
export const textColor = '#44464A';
export const secondaryTextColor = '#8B909A';
export const spacing = {
	tiny: scale(5),
	mini: scale(10),
	small: scale(15),
	normal: scale(20),
	big: scale(36),
};

const fixTextMargin = {
	...Platform.select({
		ios: {
			marginTop: scale(3),
		},
	}),
};

export const fullScreen = {
	backgroundColor,
	flexGrow: 1,
	paddingTop: Constants.statusBarHeight,
};


export const text = {
	color: secondaryTextColor,
	fontSize: scale(15),
	letterSpacing: scale(0.85),
	lineHeight: scale(15),
	textAlign: 'center'
};

export const text_data = {
	color: textColor,
	fontSize: scale(16),
	letterSpacing: scale(0.85),
	lineHeight: scale(15.5),
	textAlign: 'center'
};

export const title = {
	letterSpacing: scale(3.14),
	lineHeight: scale(18),
	color: textColor,
	fontSize: scale(12),
	...fixTextMargin,
};

export const title_Home = {
	// marginTop: scale(20),
	letterSpacing: scale(3.14),
	lineHeight: scale(28),
	color: textColor,
	fontSize: scale(20),
	textAlign: 'center',
	...fixTextMargin,
};


export const withLetterSpacing = {
	letterSpacing: scale(2),
};

export const withPadding = {
	paddingHorizontal: spacing.normal,
};
