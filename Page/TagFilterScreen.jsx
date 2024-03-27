import { StyleSheet, Text, View, SafeAreaView, ImageBackground, ScrollView, TouchableWithoutFeedback, dismissKeyboard } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'

import backGround from '../assets/Image/FinalBackground.png'
import SearchBar from '../components/SarchBar'
import ActivitiesWideCardView from '../components/ActivitiesWideCardView'
import Navbar from '../widget/Navbar'

const TagFilterScreen = ({ route }) => {
  const user_uid = route.params.userUID;
  const tag = route.params.tag;

  return (
    <ImageBackground source={backGround} style={styles.backgroundImage}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={{ flex: 1 }}>
          <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 10, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
            <View style={{ flex: 1, /*backgroundColor: 'red'*/ }}>
              <SearchBar userUID={user_uid} />
            </View>
            <View style={{ flex: 8, /*backgroundColor: 'navy'*/ }}>
              <ActivitiesWideCardView userUID={user_uid} tag={tag}/>
            </View>
          </BlurView>
          <View style={{ flex: 1, /*backgroundColor: 'maroon',*/ marginLeft: 15, marginRight: 15 }}>
            <Navbar userUID={user_uid} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default TagFilterScreen

const styles = StyleSheet.create({
  blurContainer: {
    margin: 15,
    padding: 15,
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