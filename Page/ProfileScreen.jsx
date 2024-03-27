import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Image, TouchableOpacity, TextInput } from 'react-native'
import { BlurView } from 'expo-blur'
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'

import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../Database/FirebaseDB";

import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import profileImage from '../assets/Image/Profile.jpg'
import backGround from '../assets/Image/FinalBackground.png'

import Navbar from '../widget/Navbar';
import UserNameController from '../components/UserNameController';

const ProfileScreen = ({ route }) => {
  const user_uid = route.params.userUID;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editmode, setEditMode] = useState(false);
  const [userStatus, setUserStatus] = useState(false);

  const navigation = useNavigation();

  const handleEditMode = () => {
    setEditMode(true);
  }

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.navigate('SplashScreen');
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  }

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  }


  useEffect(() => {
    if (user_uid === 'GestUser') {
      setUserStatus(true);
    }
    else {
      const dbRef = ref(db, `${user_uid}/userprofile`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setEmail(data.email);
          setPassword(data.passwordLength);
        }
        else if (!data) {
          setActivities([]);
        }
      });
    }
  }, [user_uid]);

  return (
    <ImageBackground source={backGround} style={styles.backgroundImage}>
      <SafeAreaView style={{ flex: 1 }}>
        <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 13, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
          <View style={{ flex: 1, /*backgroundColor: 'navy',*/ justifyContent: 'center', alignItems: 'center' }}>
            {userStatus ? <FontAwesome5 name='user-alt' size={125} color='black' style={[styles.circleImageProfile, { marginLeft: 5 }]} />
              :
              <Image source={profileImage} style={styles.circleImageProfile} />
            }

          </View>
          <View style={{ flex: 2, /*backgroundColor: 'cyan',*/ justifyContent: 'center' }}>
            <View style={{ flex: 1, /*backgroundColor: 'fuchsia',*/ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              {userStatus ? <Text style={{ fontFamily: 'LSsemibold', fontSize: 25 }}>GestUser</Text>
                :
                <>
                  <UserNameController userUID={user_uid} />
                  <TouchableOpacity onPress={handleEditMode}>
                    <FeatherIcon name='edit' size={10} color='black' style={{ marginLeft: 5 }} />
                  </TouchableOpacity>
                </>
              }

            </View>
            <View style={{ flex: 3 }}>
              {userStatus ?
                <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#9951BB' }]} onPress={handleLogin}>
                  <Text style={{ fontFamily: 'LSsemibold', color: 'white', fontSize: 25 }}>Login</Text>
                </TouchableOpacity>
                : [
                  <BlurView key="email" intensity={70} tint='light' style={[styles.inputBlurContainer, { flexDirection: 'column', marginTop: 15 }]}>
                    <Text style={{ fontFamily: 'LSregular', fontSize: 15, color: 'grey' }}>{email}</Text>
                  </BlurView>,
                  <BlurView key="password" intensity={70} tint='light' style={[styles.inputBlurContainer, { flexDirection: 'column', marginTop: 15 }]}>
                    <Text style={{ fontFamily: 'LSregular', fontSize: 15, color: 'grey' }}><Text style={{ fontFamily: 'LSregular', fontSize: 15, color: 'grey' }}>{'*'.repeat(password)}</Text></Text>
                  </BlurView>
                ]}
            </View>
          </View>
          <View style={{ flex: 2, /*backgroundColor: 'hotpink',*/ }}>
            {userStatus ? null
              :
              <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#FF4C4C' }]} onPress={handleLogOut}>
                <Text style={{ fontFamily: 'LSsemibold', color: 'white', fontSize: 25 }}>Logout</Text>
              </TouchableOpacity>
            }
          </View>
        </BlurView>
        <View style={{ flex: 1.2, /*backgroundColor: 'maroon',*/ marginLeft: 15, marginRight: 15 }}>
          <Navbar userUID={user_uid} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  blurContainer: {
    padding: 15,
    margin: 15,
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
})