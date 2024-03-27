import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'

import backGround from '../assets/Image/FinalBackground.png'
import profileImage from '../assets/Image/Profile.jpg'
import HumidityIcon from '../assets/Icon/HumidityIcon.png'
import WindSpeedIcon from '../assets/Icon/WindIcon.png'
import AirQualityIcon from '../assets/Icon/AirQualityIcon.png'

import WeatherForecast from '../widget/WeatherForecast'
import DayQuote from '../widget/DayQuote'
import PieChart from '../widget/PieChart';
import ActivitiesCardView from '../components/ActivitiesCardView';
import Navbar from '../widget/Navbar';
import AlertBar from '../widget/AlertBar';
import WeatherConditonController from '../widget/WeatherConditonController';
import UserNameController from '../components/UserNameController';

const HomeScreen = ({ route }) => {

  const navigation = useNavigation();

  const userUID = route.params.userUID;
  console.log('HomeScreen: ', userUID);

  const [cityName, setCityName] = useState('Bangkok');
  const [days, setDays] = useState(1);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [warningMessage, setWarningMessage] = useState('');

  const handleWeatherDataReceived = (data) => {
    setWeatherData(data);
    setIsLoading(false);
    if (weatherData && (weatherData.weatherCondition === 1003)) {
      setWarningMessage('It is raining today, remember to bring an umbrella.');
    }
  };

  useEffect(() => {
    setIsLoading(true);
  }, [cityName, days]);

  return (
    <ImageBackground source={backGround} style={styles.backgroundImage}>
      <SafeAreaView style={{ flex: 1, margin: 15 }}>
        <BlurView intensity={80} tint='light' style={[styles.blurContainer, { flex: 2, /*backgroundColor: 'red'*/ flexDirection: 'row' }]}>
          <View style={[{ flex: 1, /*backgroundColor: 'lime',*/ justifyContent: 'center' }]}>
            <Image source={profileImage} style={styles.circleImageProfile} />
          </View>

          <View style={{ flex: 1.5, marginLeft: 5, justifyContent: 'center' }}>
            <DayQuote />
            <UserNameController userUID={userUID} />
          </View>

          <View style={[{ flex: 1, /*backgroundColor: 'red',*/ justifyContent: 'center', alignItems: 'center' }]}>
            <TouchableOpacity onPress={() => navigation.navigate('NotificationController', { userUID: userUID })}>
              <BlurView intensity={80} tint='light' style={[styles.pieChartBlurContainer, { width: 60, height: 60, /*backgroundColor: 'blue'*/ flexDirection: 'row' }]} >
                <MaterialIcons name="notifications" size={40} color={'#E8BF01'} style={{ opacity: 100 }} />
              </BlurView>
            </TouchableOpacity>
          </View>
        </BlurView>

        <View style={{ flex: 1, /*backgroundColor: 'cyan',*/ justifyContent: 'center' }}>
          <View style={[{ /*backgroundColor: 'red',*/ width: '100%', height: 23, borderRadius: 5, justifyContent: 'center' }]}>
            {weatherData && (
              <AlertBar weatherCondition={weatherData.weatherCondition} airQuality={weatherData.airQuality} temp={weatherData.temp} windSpeed={weatherData.windSpeed} />
            )}
          </View>
        </View>

        <BlurView intensity={80} tint='light' style={[styles.blurContainer, { flex: 3, /*backgroundColor: 'yellow',*/flexDirection: 'row' }]}>
          <WeatherForecast cityName={cityName} days={days} onWeatherDataReceived={handleWeatherDataReceived} />
          {weatherData && (
            <>
              <View style={{ flex: 1, /*backgroundColor: 'navy',*/ justifyContent: 'center', alignItems: 'center' }}>
                <WeatherConditonController weatherCondition={weatherData.weatherCondition} />
              </View>
              <View style={{ flex: 1.2, /*backgroundColor: 'yellow',*/ flexDirection: 'column' }}>
                <View style={{ flex: 1.5, /*backgroundColor: 'red',*/ alignItems: 'center' }}>
                  <Text style={{ color: 'black', fontSize: 35, fontFamily: 'LSsemibold' }}>{weatherData.location}</Text>
                  <Text style={{ color: 'black', fontSize: 40, fontFamily: 'LSsemibold', marginTop: 10, marginLeft: 10 }}>{weatherData.temp}°</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, alignItems: 'center', /*backgroundColor: 'green'*/ }}>
                    <Image style={styles.weatherDataIcon} source={AirQualityIcon} />
                    <Text style={styles.weatherDataContainer}>{weatherData.airQuality}</Text>
                  </View>
                  <View style={{ flex: 1,/* backgroundColor: 'lime',*/ alignItems: 'center' }}>
                    <Image style={styles.weatherDataIcon} source={HumidityIcon} />
                    <Text style={styles.weatherDataContainer}>{weatherData.humidity}</Text>
                  </View>
                  <View style={{ flex: 1, /*backgroundColor: 'orange',*/ alignItems: 'center' }}>
                    <Image style={styles.weatherDataIcon} source={WindSpeedIcon} />
                    <Text style={styles.weatherDataContainer}>{weatherData.windSpeed}</Text>

                  </View>
                </View>

              </View>
            </>
          )}
        </BlurView>

        <View style={{ flex: 0.3, /*backgroundColor: 'orange'*/ }}>

        </View>

        <BlurView intensity={80} tint='light' style={[styles.blurContainer, { flex: 4, /*backgroundColor: 'blue'*/ flexDirection: 'row' }]}>
          <View style={{ flex: 1, /*backgroundColor: 'plum',*/ justifyContent: 'center', alignItems: 'center' }}>
            <BlurView intensity={90} tint='light' style={[styles.pieChartBlurContainer, { width: '100%', height: '100%', /*backgroundColor: 'blue'*/ flexDirection: 'row' }]}>
              <PieChart userUID={userUID}/>
            </BlurView>

          </View>
          <View style={{ flex: 1, /*backgroundColor: 'royalblue'*/ }}>
            <View style={{ flex: 1, /*backgroundColor: 'red',*/ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('TagFilterScreen', { userUID: userUID, tag: 'Work' })}>
                <BlurView intensity={90} tint='light' style={[styles.tagBlurContainer, { width: 60, height: 60, /*backgroundColor: 'blue'*/ flexDirection: 'row' }]}>
                  <MaterialIcons name="work" size={40} color={'#FF5353'} style={{ opacity: 100 }} />
                </BlurView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('TagFilterScreen', { userUID: userUID, tag: 'Exercise' })}>
                <BlurView intensity={90} tint='light' style={[styles.tagBlurContainer, { width: 60, height: 60, /*backgroundColor: 'blue'*/ flexDirection: 'row' }]}>
                  <FontAwesome5Icon name="running" size={40} color={'#4A98F7'} />
                </BlurView>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => navigation.navigate('TagFilterScreen', { userUID: userUID, tag: 'Shopping'})}>
                <BlurView intensity={90} tint='light' style={[styles.tagBlurContainer, { width: 60, height: 60, /*backgroundColor: 'blue'*/ flexDirection: 'row' }]}>
                  <Fontisto name="shopping-basket" size={40} color={'#FF9F00'} style={{ opacity: 100 }} />
                </BlurView>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('TagFilterScreen', { userUID: userUID, tag: 'Reading' })}>
                <BlurView intensity={90} tint='light' style={[styles.tagBlurContainer, { width: 60, height: 60, /*backgroundColor: 'blue'*/ flexDirection: 'row' }]}>
                  <Ionicon name="book" size={40} color={'#6E04C1'} />
                </BlurView>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        <View style={{ flex: 0.3 }}>

        </View>

        <View style={{ flex: 4, /*backgroundColor: 'purple'*/ }}>
          <ActivitiesCardView userUID={userUID} />
        </View>

        <View style={{ flex: 0.3 }}>

        </View>

        <View style={{ flex: 1.5, /*backgroundColor: 'pink'*/ }}>
          <Navbar userUID={userUID} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  blurContainer: {
    padding: 15,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 25,
  },
  tagBlurContainer: {
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pieChartBlurContainer: {
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  blurCircle: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  circleImageProfile: {
    width: 85,
    height: 85,
    borderRadius: 60,
  },
  weatherDataContainer: {
    fontFamily: 'LSsemibold',
    fontSize: 13,
    marginTop: 5
  },
  weatherDataIcon: {
    width: 25,
    height: 25,
    marginTop: 10
  }
});