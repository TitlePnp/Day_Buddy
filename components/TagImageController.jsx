import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons'

const TagImageController = ({ tag }) => {

    const renderIcon = () => {
        switch (tag) {
            case 'Work':
                return <MaterialIcons name="work" size={35} color={'#FF5353'} style={{ opacity: 100 }} />;
            case 'Hangout':
                return <Fontisto name="hangout" size={35} color={'#4CAF50'} style={{ opacity: 100 }} />;
            case 'Reading':
                return <Ionicon name="book" size={35} color={'#6E04C1'} />
            case 'Exercise':
                return <FontAwesome5Icon name="running" size={35} color={'#4A98F7'} />;
            case 'Deadlines':
                return <MaterialCommunityIcons name="fire-alert" size={35} color={'#FF7000'} />;
            case 'Sleeping':
                return <MaterialCommunityIcons name="power-sleep" size={35} color={'#290080'} />;
            case 'Shopping':
                return <Fontisto name="shopping-basket" size={35} color={'#FF9F00'} />;
            case 'Travel':
                return <FontAwesomeIcon name="plane" size={40} color={'#F040DE'} />;
            case 'Other':
                return <MaterialCommunityIcons name="dots-horizontal-circle" size={35} color={'black'} />;
            default:
                // Return default icon
                break;
        }
    };
    return (
        <View>
            {renderIcon()}
        </View>
    )
}

export default TagImageController