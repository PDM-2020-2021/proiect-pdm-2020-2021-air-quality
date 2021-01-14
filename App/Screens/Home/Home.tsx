import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, ScrollViewProps, View, Dimensions, Text, Image } from 'react-native';
import { RootStackParams } from '../routeParams';
import { scale } from 'react-native-size-matters';
import { SmokeVideo } from './SmokeVideo';
import * as theme from '../../Util/theme';
import { FontAwesome5, Feather , Entypo} from '@expo/vector-icons';
import { BackButton } from '../../Components';
import Button from './Button/Button';
// import BackButton from './BackButton/BackButton';



interface HomeProps {
	navigation: StackNavigationProp<RootStackParams, 'Home'>;
	route: RouteProp<RootStackParams, 'Home'>;
}

const token = "adb43f2960e85cf986e280a857611b76b2d22315";

const THRESHOLD = {
	FIRST: 0.2,
	SECOND: 1,
	THIRD: 4,
	FOURTH: 14,
};

const SIZES = {
	BIG: 180,
	MEDIUM: 90,
	SMALL: 41,
};

function getCigarettesMargin(count: number): number {
	return scale(
		count <= THRESHOLD.THIRD ? 9 : count <= THRESHOLD.FOURTH ? 6 : 3
	);
}

function getCigarettesHeight(count: number): number {
	return scale(
		count <= THRESHOLD.FIRST
			? SIZES.BIG
			: count <= THRESHOLD.SECOND
			? SIZES.MEDIUM
			: count <= THRESHOLD.THIRD
			? SIZES.BIG
			: count <= THRESHOLD.FOURTH
			? SIZES.MEDIUM
			: SIZES.SMALL
	);
}

function getDynamicMaxCigarettes(count: number): number {
	const CIGARETTE_ASPECT_RATIO = 21 / 280; // taken from the @shootismoke/ui lib
	const height = getCigarettesHeight(count);
	const width = height * CIGARETTE_ASPECT_RATIO;
	const margin = getCigarettesMargin(count);
	const componentWidth =
		Dimensions.get('window').width -
		theme.withPadding.paddingHorizontal * 2;
	// componentWidth * 2 because we want to show cigarettes in two rows
	const r = Math.floor((componentWidth * 2) / (width + margin));
	return r;
}

const styles = StyleSheet.create({
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	cigarettes: {
		padding: scale(10),
		margin: scale(15),
	},
	container: {
		flexGrow: 1,
	},
	footer: {
		marginBottom: theme.spacing.big,
	},
	scroll: {
		flex: 1,
		padding: scale(10),
		margin: scale(15),
		flexDirection: 'row'
	},
	withMargin: {
		marginTop: theme.spacing.normal,
	},
	title: {
		marginTop: theme.spacing.normal,
		width: '100%',
		height: '25%',
		textAlign: 'center',
		fontSize: scale(30),
		color: "green",
		flex: 1,
	},
	title_view: {
		marginBottom: scale(20),
		paddingTop: scale(10)
	},
	backButton: {
		...theme.withPadding,
		marginVertical: theme.spacing.normal,
	},
});


export declare type Frequency = 'daily' | 'weekly' | 'monthly';

interface Cigarettes {
    count: number;
    exact: boolean;
    frequency: Frequency;
}

interface AqiData{
	station: string;
	aqi: number;
	date: string;
	nuber_of_stations: number;
	count: number;
}


export function Home(props: HomeProps): React.ReactElement {
	const scroll = useRef<ScrollView>(null);
	const {
		navigation: { goBack },
		route,
	} = props;
	console.log("Props: " + route.params?.location);
	const frequency = "daily";
	
	const[converted, setConverted] = useState<boolean>(false);

	// const[cigarettes_bloc, setCigarettes_bloc] = useState();

    const [cigarettes, setCigarettes] = useState<Cigarettes>({
        count: 3,
        exact: true,
        frequency: "daily"
	});
	
	const [aqiData, setAqiData ] = useState<AqiData>({
		station: "",
		aqi: 0,
		date: "",
		nuber_of_stations: 0,
		count: 0
	});

    // useEffect(() => {
    //     setCigarettes({
    //         count: 3 * (frequency === 'daily' ? 1 : frequency === 'weekly' ? 7 : 30),
    //         exact: frequency === 'daily',
	// 		frequency,
	// 	},);
	// }, [frequency]);
	

	function getApiData(location?: String): void{
		try{
			let variable_loc = String(location);
			if(aqiData.station.includes(variable_loc))
				return;
			else{
			fetch('http://api.waqi.info/search/?token=' + token + '&keyword=' + location)
				.then(item => item.json())
				.then(cityData => {
				console.log('http://api.waqi.info/search/?token=' + token + '&keyword=' + location)
				setAqiData({
						station: cityData.data[0]?.station.name,
						aqi: cityData.data[0]?.aqi,
						date: cityData.data[0]?.time.stime,
						nuber_of_stations: cityData.data?.length,
						count: Math.round(cityData.data[0]?.aqi * 0.85 / 100 * 100) /100 ,
					});
					// console.log(cigarettes.count);
					// converAqiIndexToCigarettes();
					// console.log(cigarettes.count);

				});
			}
		} catch {
			console.log('Error')
		}
		
	}

	
	getApiData(route.params?.location);
	
	// cigarettes_count * (frequency === 'daily' ? 1 : frequency === 'weekly' ? 7 : 30)
	function converAqiIndexToCigarettes(): void{
		let cigarettes_per_100_index = 0.85;
		let cigarettes_count = (aqiData.aqi * cigarettes_per_100_index) / 100;
		setCigarettes({
			count: 12,
			exact: frequency === 'daily',
			frequency,
		});
		console.log("Coaieeee" + cigarettes.count);
	}

	function renderCigarettes(){
		console.log("renderCigarettes" + aqiData.count);
		if (aqiData.count < 1){
			return(<Image 
				source={require("../../../assets/images/butt.png")}
				style={styles.cigarettes}
				/>);
			}
		if(aqiData.count < 2){
			return(
				<View>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
				</View>
				);	
		}
			
		if(aqiData.count < 3){
			return(
				<View>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
				</View>
			);	
		}
		if(aqiData.count < 4){
			return(
				<ScrollView>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt.png")}
					style={styles.cigarettes}
					/>
				</ScrollView>
			);
		}
		if(aqiData.count < 5){
			return(
				<ScrollView contentContainerStyle={styles.scroll} horizontal ref={scroll} showsHorizontalScrollIndicator={false} style={styles.container}>
					<Image 
					source={require("../../../assets/images/butt-vertical.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt-vertical.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt-vertical.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt-vertical.png")}
					style={styles.cigarettes}
					/>
					<Image 
					source={require("../../../assets/images/butt-vertical.png")}
					style={styles.cigarettes}
					/>
				</ScrollView>
			);
		}
		return(<ScrollView contentContainerStyle={styles.scroll} horizontal ref={scroll} showsHorizontalScrollIndicator={false} style={styles.container}>
			<Image 
			source={require("../../../assets/images/butt-vertical.png")}
			style={styles.cigarettes}
			/>
			<Image 
			source={require("../../../assets/images/butt-vertical.png")}
			style={styles.cigarettes}
			/>
			<Image 
			source={require("../../../assets/images/butt-vertical.png")}
			style={styles.cigarettes}
			/>
			<Image 
			source={require("../../../assets/images/butt-vertical.png")}
			style={styles.cigarettes}
			/>
			<Image 
			source={require("../../../assets/images/butt-vertical.png")}
			style={styles.cigarettes}
			/>
			<Image 
			source={require("../../../assets/images/butt-vertical.png")}
			style={styles.cigarettes}
			/>
		</ScrollView>);
	}

	function setFrequencyDaly(): void{
		setAqiData({
			station: aqiData.station,
			aqi: aqiData.aqi,
			date: aqiData.date,
			nuber_of_stations: aqiData.nuber_of_stations,
			count: Math.round( aqiData.aqi * 0.85 / 100 * 100) /100 ,
		});
	}
	function setFrequencyWeekly(): void{
		setAqiData({
			station: aqiData.station,
			aqi: aqiData.aqi,
			date: aqiData.date,
			nuber_of_stations: aqiData.nuber_of_stations,
			count: 7 * Math.round( aqiData.aqi * 0.85 / 100 * 100) /100 ,
		});
	}
	function setFrequencyMonthly(): void{
		setAqiData({
			station: aqiData.station,
			aqi: aqiData.aqi,
			date: aqiData.date,
			nuber_of_stations: aqiData.nuber_of_stations,
			count: 30 * Math.round( aqiData.aqi * 0.85 / 100 * 100) /100 ,
		});
	}

	try {
		var station___ = aqiData.station.trim();
	}
	catch{
		var station___ = "";
	}

	if(station___ == ""){
		return(<View style={styles.container}>
			<SmokeVideo cigarettes={cigarettes.count} />
			<BackButton onPress={goBack} style={styles.backButton} />
			<Text style={styles.title}>Oooppsss...!!</Text>
			<ScrollView>
				<Text style={theme.text_data}>Looks like we couldn't find any data about your city!</Text>
			</ScrollView>
			<ScrollView>
				<Text style={theme.text_data}>Please press BACK button in order to change the location!</Text>
			</ScrollView>
			
		</View>);
	}
	else{
		return (
			<View style={styles.container}>
				<SmokeVideo cigarettes={cigarettes.count} />
				
				<ScrollView>
					<BackButton onPress={goBack} style={styles.backButton} />
					<Text style={styles.title}>{aqiData.station}</Text>
					<Text style={theme.text}>Look like you smoke</Text>
					<Text style={theme.text_data}>{aqiData.count}</Text>
					<Text style={theme.text}>cigarettes</Text>
					
					{renderCigarettes()}
					
					<ScrollView contentContainerStyle={styles.scroll} horizontal ref={scroll} showsHorizontalScrollIndicator={false} style={styles.container}>
						{/* <Button title="daily" onPress={setFrequencyDaly}></Button>
						<Button title="weekly" onPress={setFrequencyWeekly}></Button>
						<Button title="monthly" onPress={setFrequencyMonthly}></Button> */}
						<Button	text='daily' onPress={setFrequencyDaly}/>
						<Button	text='weekly' onPress={setFrequencyWeekly}/>
						<Button	text='monthly' onPress={setFrequencyMonthly}/>


					</ScrollView>

					{/* Station */}
					<ScrollView contentContainerStyle={styles.scroll} horizontal ref={scroll} showsHorizontalScrollIndicator={false} style={styles.container}>
						<Entypo name="location" size={24} color="black" />
						<Text style={theme.text}> Station: </Text>
						<ScrollView showsHorizontalScrollIndicator={false}><Text style={theme.text_data}>{aqiData.station}</Text></ScrollView>
					</ScrollView>

					{/* Air quality */}
					<ScrollView contentContainerStyle={styles.scroll} horizontal ref={scroll} showsHorizontalScrollIndicator={false} style={styles.container}>
						<Entypo name="air" size={24} color="black" />
						<Text style={theme.text}> Aqi index: </Text>
						<Text style={theme.text_data}>{aqiData.aqi}</Text>
					</ScrollView>

					{/* Time */}
					<ScrollView contentContainerStyle={styles.scroll} horizontal ref={scroll} showsHorizontalScrollIndicator={false} style={styles.container}>
						<FontAwesome5 name="calendar-times" size={24} color="black" />
						<Text style={theme.text}> Date: </Text>
						<Text style={theme.text_data}>{aqiData.date}</Text>
					</ScrollView>

					{/* Number of stations in that zone */}
					<ScrollView contentContainerStyle={styles.scroll} horizontal ref={scroll} showsHorizontalScrollIndicator={false} style={styles.container}>
						<Entypo name="location" size={24} color="black" />	
						<Feather name="more-horizontal" size={24} color="black" />
						<Text style={theme.text}> Number of stations founded: </Text>
						<Text style={theme.text_data}>{aqiData.nuber_of_stations}</Text>
					</ScrollView>
				</ScrollView>				
			</View>
		);
	}
}