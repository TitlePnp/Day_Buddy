import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { fetchWeatherForecast } from '../API/Weather';

const WeatherForecast = ({ cityName, days, onWeatherDataReceived }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherForecast({ cityName, days });
      setWeatherData(data);
      setLocation(data.location.name);
      setTemp(data.current.temp_c);
      setHumidity(data.current.humidity);
      setWindSpeed(data.current.wind_kph);
      setWeatherCondition(data.current.condition.code);
      setAirQuality(data.current.air_quality.pm2_5);
      onWeatherDataReceived({
        location: data.location.name,
        temp: data.current.temp_c,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        weatherCondition: data.current.condition.text,
        airQuality: data.current.air_quality.pm2_5,
      });
    };
    fetchData();
  }, [cityName, days]);

  if (!weatherData) {
    return <Text style={{color: 'white', fontSize: 25, alignSelf: 'center', fontFamily: 'QuickSandBold'}}>Loading...</Text>;
  }

  return (
    <>
    </>
  );
};

export default WeatherForecast;

const styles = StyleSheet.create({
  locationText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  tempText: {
    fontSize: 30,
    color: 'white',
  },
  humidityCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});