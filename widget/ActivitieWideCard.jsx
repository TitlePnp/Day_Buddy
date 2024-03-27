import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Materiallcons from 'react-native-vector-icons/MaterialIcons'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import TagColorList from './TagColorList'
import NotificationStatus from './NotificationStatus'
import DeleteActivitieController from '../components/DeleteActivitieController'

const ActivitieWideCard = ({ Name, Notification, Location, Time, Description, Tag, Date, UserUID }) => {

    const navigation = useNavigation();

    const user_UID = UserUID

    const handleDeleteActivitie = () => {
        console.log('Delete Activitie: ', Name);
        DeleteActivitieController(user_UID, Name)
    }

    return (
        <BlurView intensity={70} tint='light' style={[styles.activitieCardRec, { flexDirection: 'row' }]}>
            <View style={{ flex: 1, /*backgroundColor: 'red',*/ flexDirection: 'column' }}>
                <View style={{ flex: 1, /*backgroundColor: 'cyan',*/ justifyContent: 'flex-end' }}>
                    <TagColorList TagActivitie={Tag} />
                </View>
                <View style={{ flex: 1 }}>

                </View>
            </View>
            <View style={{ flex: 10 }}>
                <View style={{ flex: 3, /*backgroundColor: 'hotpink',*/ flexDirection: 'row' }}>
                    <View style={{ flex: 3, /*backgroundColor: 'olive',*/ flexDirection: 'column' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ActivitieDetailScreen', {name: Name, tag : Tag, location : Location, time : Time, description : Description, date : Date, userUID : user_UID})}>
                            <Text style={{ marginLeft: 10, marginTop: 20, fontFamily: 'LSbold', fontSize: 25 }}>
                                {Name.length > 18 ? Name.substring(0, 18) + '...' : Name}
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 10, marginTop: 5, fontFamily: 'LSregular', fontSize: 15 }}>
                            {Description.length > 35 ? Description.substring(0, 35) + '...' : Description}
                        </Text>
                    </View>
                </View>

                <View style={{ flex: 3, /*backgroundColor: 'maroon',*/ marginBottom: 5 }}>
                    <View style={{ flex: 1, /*backgroundColor: 'plum',*/ alignItems: 'center', flexDirection: 'row' }}>
                        <AntDesignIcon name="clockcircle" size={20} color={'black'} style={{ marginLeft: 5 }} />
                        <Text style={{ paddingLeft: 10, fontFamily: 'QuickSandBold' }}>{Time}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                        <IonicIcon name="calendar" size={20} color={'black'} style={{ marginLeft: 5 }} />
                        <Text style={{ paddingLeft: 10, fontFamily: 'QuickSandBold' }}>{Date}</Text>
                    </View>
                    <View style={{ flex: 1, /*backgroundColor: 'royalblue',*/ alignItems: 'center', flexDirection: 'row' }}>
                        <Materiallcons name="location-on" size={25} color={'black'} style={{ marginLeft: 3 }} />
                        <Text style={{ paddingLeft: 5, fontFamily: 'QuickSandBold' }}>{Location}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 3, alignItems: 'center', marginTop: 20, /*backgroundColor: 'orange'*/ }}>
                <NotificationStatus Notification={Notification} />
                <TouchableOpacity onPress={handleDeleteActivitie}>
                    <FontAwesome5Icon name="trash" size={20} color={'#D80000'} style={{ marginTop: 80 }} />
                </TouchableOpacity>
            </View>
        </BlurView>
    )
}

export default ActivitieWideCard

const styles = StyleSheet.create({
    activitieCardRec: {
        marginTop: 15,
        width: 330,
        height: 160,
        borderRadius: 10,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 25,
    },
    seperateLine: {
        width: '90%',
        height: 1,
        backgroundColor: 'gray',
    },
})