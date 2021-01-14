import React from 'react';
import { scale } from 'react-native-size-matters';
import {
	GestureResponderEvent,
	StyleProp,
	StyleSheet,
	TouchableHighlight,
	View,
	ViewStyle,
} from 'react-native';

interface BannerProps{
    asTouchable?: boolean;
    children?: React.ReactNode;
    elevated: boolean | 'very';
    onClick: (event: GestureResponderEvent) => void;
    shadowPosition: "top" | "bottom";
    style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8A65D",
        zIndex: 1,
    },
    content: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
    },
});

function elevationShadowStyle(
	elevation: number,
	position: ShadowPosition = 'bottom'
): ViewStyle {
	return {
		elevation,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: scale((position === 'bottom' ? 1 : -1) * elevation),
		},
		shadowOpacity: 0.3,
		shadowRadius: scale(0.8 * elevation),
	};
}

export function Banner({
    asTouchable,
    children,
    elevated,
    onClick,
    shadowPosition = "bottom",
    style,
}: BannerProps): React.ReactElement {
    const Wrapper: any = asTouchable ? TouchableHighlight : View;

    return (
        <Wrapper 
            onPress={asTouchable ? onClick : undefined}
            style={[
                styles.container,
                elevated === true
                    ? elevationShadowStyle(2, shadowPosition)
                    : null,
                elevated === 'very'
                    ? elevationShadowStyle(10, shadowPosition)
                    : null,
            ]}
            underlayColor={asTouchable ? "#F8A65D" : undefined}
        >
            <View
                pointerEvents={asTouchable ? 'none' : 'auto'}
                style={[styles.content, style]}
            >
                {children}
            </View>    
        </Wrapper>
    );
}

type ShadowPosition = 'top' | 'bottom';

