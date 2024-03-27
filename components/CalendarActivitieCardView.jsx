import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getDatabase, ref, onValue } from "firebase/database"
import CalendarActivitieCard from '../widget/CalendarActivitieCard'

const CalendarActicitieCardView = ({ userUID, dateToShow }) => {
    const user_uid = userUID;
    const date = dateToShow;
    console.log('CalendarViewCard:', user_uid)
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, `${user_uid}/activities/`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            console.log('CalendarViewCard:', data);
            const filteredActivities = Object.values(data).map(activity => {
                const activityDate = new Date(activity.date);
                const formattedActivityDate = `${activityDate.getFullYear()}-${(activityDate.getMonth() + 1).toString().padStart(2, '0')}-${activityDate.getDate().toString().padStart(2, '0')}`;
                const formattedActivityTime = `${activityDate.getHours().toString().padStart(2, '0')}:${activityDate.getMinutes().toString().padStart(2, '0')}`; // Added this line
                return {
                    ...activity,
                    time: formattedActivityTime, // Add time property to the activity object
                    date: formattedActivityDate // Add date property to the activity object
                };
            }).filter(activity => activity.date === date);
            console.log('CalendarViewCard:', filteredActivities); // Log the filtered activities
            setActivities(filteredActivities);
        });
    }, [user_uid, date]);

    const renderItem = ({ item }) => {

        return (
            <View style={{ marginRight: 15 }}>
                <CalendarActivitieCard key={item.title} Name={item.title} UserUID={user_uid} Tag={item.tag} 
                Time={item.time} Location={item.location} Date={item.date} Description={item.description}/>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={activities}
                horizontal={false}
                renderItem={renderItem}
                keyExtractor={(item) => item.title}
            />
        </SafeAreaView>
    )
}

export default CalendarActicitieCardView

const styles = StyleSheet.create({})