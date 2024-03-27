import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

const DefaultActivitieCard = ({ userUID }) => {
    const navigation = useNavigation();
    console.log('DefaultActivitieCard: ', userUID);
    return (
        <BlurView intensity={70} tint='light' style={[styles.activitieCardRec, { flexDirection: 'column', /*backgroundColor: 'red',*/ alignItems: 'center' }]}>
            <TouchableOpacity onPress={() => navigation.navigate('AddActivitieScreen', { userUID: userUID })}>
                <Ionicons name="add-circle" size={50} color={'black'} style={{marginLeft: 30}} />
                <Text style={{fontFamily: 'LSsemibold', fontSize: 20}}>Add Activity!</Text>
            </TouchableOpacity>
        </BlurView>
    )
}

export default DefaultActivitieCard

const styles = StyleSheet.create({
    activitieCardRec: {
        width: 250,
        height: 160,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 25,
    },
})