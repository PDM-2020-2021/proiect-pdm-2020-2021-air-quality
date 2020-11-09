import * as React from 'react';
import {useState} from 'react';
import { TextInput, Button } from 'react-native-paper';
import {View, Text} from 'react-native'
import Header from './Header'

export default Search = () => {
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const fetchCities = (text) =>{
        fetch("https://community-open-weather-map.p.rapidapi.com/find?q=london&cnt=0&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric", {
            "method": "GET",
            "headers": {
            "x-rapidapi-key": "f31c0ab941mshc3fb123d7f90d4ep107022jsn22ae5fd52036",
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        .then(response => {
            console.log(response.body);
        })
        .catch(err => {
            console.error(err);
        });
    }
  return (
    <View style={{flex: 1}}>
        <Header name="Search Screen"/>
        <TextInput
            label="City name"
            theme={{colors:{primary:"#00aaff"}}}
            value={city}
            onChangeText={text=>fetchCities(text)}
        />
        <Button 
            icon="content-save"
            mode="contained"
            theme={{colors:{primary:"#00aaff"}}}
            style={{margin:20}}
            onPress={() => console.log("Pressed")}>
            <Text style={{color:"white"}}>Press Here</Text>
        </Button>
    </View>
  );
}