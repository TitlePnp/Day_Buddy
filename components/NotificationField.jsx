import { StyleSheet, Text, View, Switch } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'

const NotificationField = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [chosenDate, setChosenDate] = useState(new Date());

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || chosenDate;
        setChosenDate(currentDate);
    };

    return (
        <View style={styles.notificationStyle}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, }}>
                    <IonicIcon name="notifications" size={30} color="black" />
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <View style={{ flex: 2.8, alignItems: 'flex-start'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Choose Date and Time</Text>
                <DateTimePicker
                    value={chosenDate}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}

                />
            </View>
        </View>
    )
}

export default NotificationField

const styles = StyleSheet.create({
    notificationStyle: {
        width: 320,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 10,
        padding: 20
    },
})