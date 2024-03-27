import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'


const CalendarActivitieCard = ({ Name, Tag, UserUID, Time, Date, Location, Description}) => {
    const [tagColor, setTagColor] = useState('grey');
    const user_UID = UserUID;
    console.log('CalendarActivitieCard:', user_UID);

    const navigation = useNavigation();

    useEffect(() => {
        switch(Tag) {
            case 'Work':
                setTagColor('#FF5353');
                break;
            case 'Hangout':
                setTagColor('#4CAF50');
                break;
            case 'Reading':
                setTagColor('#6E04C1');
                break;
            case 'Exercise':
                setTagColor('#4A98F7');
                break;
            case 'Deadlines':
                setTagColor('#FF7000');
                break;
            case 'Sleeping':
                setTagColor('#290080');
                break;
            case 'Shopping':
                setTagColor('#FF9F00');
                break;
            case 'Travel':
                setTagColor('#F040DE');
                break;
            case 'Other':
                setTagColor('black');
                break;
            default:
                setTagColor('gray');
        }
    }, [Tag]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate('ActivitieDetailScreen', {name: Name, tag : Tag, location : Location, time : Time, description : Description, date : Date, userUID : user_UID})}>
            <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 1, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ flex: 0.8, alignItems: 'center',alignSelf: 'center' }}>
                        <Text style={{fontFamily: 'LSsemibold', fontSize: 20}}>{Time}</Text>
                    </View>
                    <View style={{flex: 0.05, backgroundColor: tagColor, height: '80%', alignSelf: 'center', borderRadius: 25}}>

                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontFamily: 'LSsemibold'}}>{Name}</Text>
                    </View>
                    <View style={{flex: 0.5, /*backgroundColor: 'red',*/ justifyContent: 'center'}}>
                        <Ionicons name='chevron-forward' size={40} color='black' style={{alignSelf: 'center'}}/>
                    </View>
                </View>
            </BlurView>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CalendarActivitieCard

const styles = StyleSheet.create({
    blurContainer: {
        width: '95%',
        height: 80,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 25,
    },
})