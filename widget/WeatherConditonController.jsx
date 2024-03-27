import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import SunnyCondition from '../assets/WeatherCondition/SunnyCondition.png'
import PartlyCondition from '../assets/WeatherCondition/PartlyCloudCondition.png'
import OvercastCondition from '../assets/WeatherCondition/OvercastCondition.png'
import PatchyLightRainWithThunderCondition from '../assets/WeatherCondition/PatchyLightRainWithThunderCondition.png'
import LightRain from '../assets/WeatherCondition/LightRainCondition.png'
import Clear from '../assets/WeatherCondition/ClearCondition.png'

const WeatherConditonController = ({ weatherCondition }) => {
  return (
    <View>
      {weatherCondition === 'Sunny' && <Image source={SunnyCondition} />}
      {weatherCondition === 'Partly cloudy' && <Image source={PartlyCondition} />}
      {weatherCondition === 'Overcast' && <Image source={OvercastCondition} />}
      {weatherCondition === 'Patchy light rain with thunder' && <Image source={PatchyLightRainWithThunderCondition} />}
      {weatherCondition === 'Light rain' && <Image source={LightRain} />}
      {weatherCondition === 'Clear' && <Image source={Clear} />}
    </View>
  )
}

export default WeatherConditonController

const styles = StyleSheet.create({})