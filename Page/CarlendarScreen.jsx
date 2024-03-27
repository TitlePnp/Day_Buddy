import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, TouchableOpacity, FlatList } from 'react-native'
import { BlurView } from 'expo-blur'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Calendar } from 'react-native-calendars';

import { getDatabase, ref, onValue } from "firebase/database";

import backGround from '../assets/Image/FinalBackground.png'
import Navbar from '../widget/Navbar';
import CalendarActicitieCardView from '../components/CalendarActivitieCardView';

const CarlendarScreen = ({ route }) => {
  const user_uid = route.params.userUID;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);

  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, `${user_uid}/activities/`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const markedDates = transformDataToMarkedDates(data);
      setMarkedDates(markedDates);
    });
  }, []);

  function transformDataToMarkedDates(data) {
    const markedDates = {};
    const activities = Object.values(data);

    for (const activity of activities) {
      const date = activity.date.split('T')[0];

      if (!markedDates[date]) {
        markedDates[date] = {
          dots: []
        };
      }
      if (markedDates[date].dots.length < 3) {
        markedDates[date].dots.push({
          key: activity.title,
          color: getColorForTag(activity.tag),
          selectedDotColor: 'blue'
        });
      }
    }
    return markedDates;
  }

  function getColorForTag(tag) {
    // Return a color based on the tag
    switch (tag) {
      case 'Work':
        return '#FF5353';
      case 'Hangout':
        return '#4CAF50';
      case 'Reading':
        return '#6E04C1';
      case 'Exercise':
        return '#4A98F7';
      case 'Deadlines':
        return '#FF7000';
      case 'Sleeping':
        return '#290080';
      case 'Shopping':
        return '#FF9F00';
      case 'Travel':
        return '#F040DE';
      case 'Other':
        return 'black';
      default:
        return 'gray';
    }
  }

  return (
    <ImageBackground source={backGround} style={styles.backgroundImage}>
      <SafeAreaView style={{ flex: 1 }}>
        <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 6, /*backgroundColor: 'red'*/ flexDirection: 'column', alignItems: 'center' }]}>
          <Calendar
            style={{
              borderRadius: 20,
              width: 375,
              height: 320
            }}
            markingType={'multi-dot'}
            markedDates={markedDates}
            onDayPress={(day) => {
              const date = new Date(day.year, day.month - 1, day.day);
              const formattedString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
              console.log(formattedString); // Log the selected day in "YYYY-MM-DD" format
              setSelectedDate(formattedString);
            }}
          />
        </BlurView>
        <BlurView intensity={60} tint='light' style={[styles.listBlurContainer, { flex: 6, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
          <CalendarActicitieCardView userUID={user_uid} dateToShow={selectedDate} />
        </BlurView>
        <View style={{ flex: 1.2, /*backgroundColor: 'maroon',*/ marginLeft: 15, marginRight: 15 }}>
          <Navbar userUID={user_uid} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default CarlendarScreen

const styles = StyleSheet.create({
  blurContainer: {
    margin: 15,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 25,
  },
  listBlurContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 25,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})