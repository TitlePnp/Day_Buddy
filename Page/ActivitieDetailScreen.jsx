import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'

import { getDatabase, ref, update } from "firebase/database";
import { db } from "../Database/FirebaseDB";

import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Materiallcons from 'react-native-vector-icons/MaterialIcons'
import IonicIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import backGround from '../assets/Image/FinalBackground.png'

import Navbar from '../widget/Navbar';

const ActivitieDetailScreen = ({ route }) => {

    const [tagWidth, setTagWidth] = useState(0);
    const [tagColor, setTagColor] = useState('red');

    const user_uid = route.params.userUID;

    console.log('Detail UserUID: ', user_uid);


    const Name = route.params.name;
    const Tag = route.params.tag;
    const Location = route.params.location;
    const Time = route.params.time;
    const Description = route.params.description;
    const Date = route.params.date;

    useEffect(() => {
        setTagWidth(Tag.length * 10);
    }, [Tag]);

    useEffect(() => {
        let color;
        switch (Tag) {
            case 'Work':
                color = '#FF5353';
                break;
            case 'Hangout':
                color = '#4CAF50';
                break;
            case 'Reading':
                color = '#6E04C1';
                break;
            case 'Exercise':
                color = '#4A98F7';
                break;
            case 'Deadlines':
                color = '#FF7000';
                break;
            case 'Sleeping':
                color = '#290080';
                break;
            case 'Shopping':
                color = '#FF9F00';
                break;
            case 'Travel':
                color = '#F040DE';
                break;
            case 'Other':
                color = 'black';
                break;
            default:
                color = 'gray';
        }
        setTagColor(color);
    }, [Tag]);

    const navigation = useNavigation();

    const handleEdit = () => {
        const dbRef = ref(db, `${user_uid}/activities`);
        const updatedData = {
            name: Name,
            tag: Tag,
            location: Location,
            time: Time,
            description: Description,
            date: Date,
        };

        update(dbRef, updatedData)
        .then(() => {
          console.log('Data updated successfully');
          // Navigate to another screen or update the state to reflect the change
        })
        .catch((error) => {
          console.error('Error updating data: ', error);
        });
    }
    return (
        <ImageBackground source={backGround} style={styles.backgroundImage}>
            <SafeAreaView style={{ flex: 1 }}>
                <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 13, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
                    <View style={{ flex: 0.7, /*backgroundColor: 'red'*/ }}>
                        <BlurView intensity={70} tint='light' style={[styles.nameBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column', marginTop: 15, alignItems: 'center' }]}>
                            <Text style={{ fontFamily: 'LSbold', fontSize: 35 }}>{Name}</Text>
                        </BlurView>
                    </View>
                    <View style={{ flex: 0.3, /*backgroundColor: 'greenyellow',*/ alignItems: 'center' }}>
                        <View style={[styles.tagRec, { justifyContent: 'center', alignItems: 'center', width: tagWidth, backgroundColor: tagColor }]}>
                            <Text style={{ fontFamily: 'LSsemibold' }}>{Tag}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, /*backgroundColor: 'indigo'*/ }}>
                        <BlurView intensity={60} tint='light' style={[styles.dateBlurContainer, { flex: 1,/*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
                            <View style={{ flex: 1, /*backgroundColor: 'red',*/ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesignIcon name="clockcircle" size={20} color={'black'} style={{ marginLeft: 5 }} />
                                <Text style={{ paddingLeft: 10, fontFamily: 'QuickSandBold' }}>{Time}</Text>
                            </View>
                            <View style={{ flex: 1, /*backgroundColor: 'lightblue',*/ flexDirection: 'row', alignItems: 'center' }}>
                                <IonicIcon name="calendar" size={20} color={'black'} style={{ marginLeft: 5 }} />
                                <Text style={{ paddingLeft: 10, fontFamily: 'QuickSandBold' }}>{Date}</Text>
                            </View>
                            <View style={{ flex: 1, /*backgroundColor: 'lime',*/ flexDirection: 'row', alignItems: 'center' }}>
                                <Materiallcons name="location-on" size={25} color={'black'} style={{ marginLeft: 3 }} />
                                <Text style={{ paddingLeft: 5, fontFamily: 'QuickSandBold' }}>{Location}</Text>
                            </View>
                        </BlurView>
                    </View>
                    <View style={{ flex: 2, /*backgroundColor: 'magenta',*/ marginTop: 15 }}>
                        <BlurView intensity={60} tint='light' style={[styles.describeBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
                            <Text style={{ fontFamily: 'LSsemibold', fontSize: 20 }}>{Description}</Text>
                        </BlurView>
                    </View>
                    <View style={{ flex: 1, /*backgroundColor: 'mediumpurple'*/ }}>
                        <TouchableOpacity style={[styles.buttonStyle,]} onPress={handleEdit}>
                            <Text style={{ fontFamily: 'LSsemibold', fontSize: 25 }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
                <View style={{ flex: 1.2, /*backgroundColor: 'maroon',*/ marginLeft: 15, marginRight: 15 }}>
                    <Navbar userUID={user_uid} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ActivitieDetailScreen

const styles = StyleSheet.create({
    blurContainer: {
        padding: 15,
        margin: 15,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 25,
    },
    dateBlurContainer: {
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 15,
    },
    describeBlurContainer: {
        height: 200,
        padding: 15,
        textAlign: 'center',
        overflow: 'hidden',
        borderRadius: 25,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    circleImageProfile: {
        width: 125,
        height: 125,
        borderRadius: 80,
    },
    inputBlurContainer: {
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 15,
    },
    nameBlurContainer: {
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 15,
    },
    buttonStyle: {
        margin: 20,
        height: 55,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#323232",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },
    tagRec: {
        height: 20,
        borderRadius: 15,
    }
})