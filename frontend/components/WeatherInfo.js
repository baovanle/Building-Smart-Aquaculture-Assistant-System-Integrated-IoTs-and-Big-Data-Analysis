import React from 'react'
import { View, Text , StyleSheet , Image} from 'react-native'
import {colors} from '../utils/index'

const {PRIMARY_COLOR , SECONDARY_COLOR} = colors

export default function WeatherInfo({currentWeather , currentWeatherDetails}) {
    
    // const { current: {temp}, weather: [details], name} = currentWeatherDetails;
    const { current: {temp}, timezone, current: {weather}} = currentWeatherDetails;
        // console.log(weather[0])
        const { icon , main , description} = weather[0]
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`        
    return (
        <View style={styles.weatherInfo}>
            {/* <Text>{timezone}</Text> */}
            <Text>Outdoor Weather</Text>
            <Image style = {styles.weatherIcon} source={{uri: iconUrl}} />
            <Text style = {styles.textPrimary} >{temp}°</Text>
            <Text style = {styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },
    weatherIcon:{
        width: 100,
        height: 100
    },
    weatherDescription: {
        textTransform: 'capitalize'
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },
})