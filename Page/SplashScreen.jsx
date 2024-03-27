import { Text, StyleSheet, View, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../Database/FirebaseDB';
import React from 'react'

import backGround from '../assets/Image/FinalBackground.png'

const Splash = () => {

  const navigation = useNavigation();

  const handleGestUserLogin = () => {
    signInAnonymously(auth).then((userCredential) => {
      const userUID = 'GestUser';
      navigation.navigate('HomeScreen', { userUID: userUID });
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('Error signing in:', errorCode, errorMessage);
      });
  }

  return (
    <ImageBackground
      source={backGround}
      style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, margin: 15 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, /*backgroundColor: 'cyan'*/ }}>

          </View>
          <View style={{ flex: 2, /*backgroundColor: 'hotpink',*/ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'LLSregular', fontSize: 40 }}>DayBuddy</Text>
          </View>
          <View style={{ flex: 1, /*backgroundColor: 'royalblue',*/ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={handleGestUserLogin}>
                <Text style={{ fontFamily: 'LSsemibold', fontSize: 25 }}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1, /*backgroundColor: 'orange',*/ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{ fontFamily: 'LSregular', fontSize: 15, color: '#3156D9' }}>Login</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily: 'LSregular', fontSize: 20 }}>Or</Text>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={{ fontFamily: 'LSregular', fontSize: 15, color: '#3156D9' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, /*backgroundColor: 'brown',*/ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ fontFamily: 'LSsemibold', fontSize: 20 }}>Plan Your Day :')</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  buttonStyle: {
    flex: 1,
    margin: 20,
    height: 60,
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
});

export default Splash
