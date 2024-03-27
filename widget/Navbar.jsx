import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const Navbar = ({ userUID }) => {
  const navigation = useNavigation()
  console.log('Navbar: ', userUID)

  return (
    <BlurView intensity={80} tint='light' style={[styles.blurContainer, { flex: 2, flexDirection: 'row' }]}>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('HomeScreen', {userUID : userUID})}>
        <MaterialCommunityIcons name="home-circle" size={35} color={'black'} style={{ opacity: 100 }} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('ActivitieListScreen', {userUID : userUID})}>
        <EntypoIcon name="list" size={35} color={'black'} style={{ opacity: 100 }} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1.5, alignItems: 'center'}} onPress={() => navigation.navigate('AddActivitieScreen', {userUID : userUID})}>
        <AntDesignIcon name="pluscircle" size={40} color={'black'} style={{ opacity: 100 }} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('CarlendarScreen', {userUID : userUID})}>
        <Ionicons name="calendar" size={35} color={'black'} style={{ opacity: 100 }} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.navigate('ProfileScreen', {userUID : userUID})}>
        <FontAwesomeIcon name="user" size={35} color={'black'} style={{ opacity: 100 }} />
      </TouchableOpacity>
    </BlurView>
  )
}

export default Navbar

const styles = StyleSheet.create({
  blurContainer: {
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  }
})