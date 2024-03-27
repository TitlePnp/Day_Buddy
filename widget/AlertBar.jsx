import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const AlertBar = ({ weatherCondition, airQuality, temp, windSpeed }) => {

  const [alertStatus, setAlertStatus] = useState(false);
  const [AlertBarText, setAlertBarText] = useState('');

  console.log('weatherCondition:', weatherCondition);
  console.log('airQuality:', airQuality);
  console.log('temp:', temp);

  useEffect(() => {
    const airQualityInt = parseInt(airQuality);

    if (weatherCondition === 'Rain') {
      setAlertBarText("ระวังอาจมีฝนตก ควรพกร่มหามีกิจกรรมข้างนอก");
      setAlertStatus(true);
    }
    else if (weatherCondition === 'Light rain ') {
      setAlertBarText("มีฝนตกเล็กน้อย ควรพกร่มหากีกิจกรรมข้างนอก");
      setAlertStatus(true);
    }
    else if (airQualityInt > 101) {
      setAlertBarText("คุณภาพอากาศไม่ดี ควรเลือกกิจกรรมในร่ม");
      setAlertStatus(true);
    }
    else if (temp > 35) {
      setAlertBarText("อากาศร้อนมาก ควรเลือกกิจกรรมในร่ม");
      setAlertStatus(true);
    }
    else if (windSpeed > 25) {
      setAlertBarText("มีลมพัดแรง ควรสวมเสื้อที่หนาหรือเสื้อกันลมและเลือกกิจกรรมในร่ม");
      setAlertStatus(true);
    }
    else if ( weatherCondition === 'Light rain' && airQualityInt > 101 && temp > 35 && windSpeed > 25){
      setAlertBarText("มีฝนตกเล็กน้อย คุณภาพอากาศไม่ดี อากาศร้อนมาก มีลมพัดแรง ควรหลีกเลี่ยงกิจกรรมข้างนอก");
      setAlertStatus(true);
    }
    else {
      setAlertBarText("");
      setAlertStatus(false);
    }
  }, [weatherCondition, airQuality]);

  return (
    alertStatus ?
      <View style={[styles.container, { flexDirection: 'row', alignItems: 'center' }]}>
        <MaterialCommunityIcons name='alert-circle' size={20} color='#FDBF00' style={{ marginLeft: 10 }} />
        <Text style={{ marginLeft: 10, color: 'white', fontFamily: 'LSsemibold' }}>{AlertBarText}</Text>
      </View>
      : null
  )
}

export default AlertBar

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: '100%',
    height: '120%',
    backgroundColor: '#E33F3F'
  }
})