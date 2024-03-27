import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Database/FirebaseDB';
import { BlurView } from 'expo-blur';
import { db } from '../Database/FirebaseDB';
import { ref, set } from 'firebase/database'

import Ionicons from 'react-native-vector-icons/Ionicons';

import backGround from '../assets/Image/FinalBackground.png'

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    if (email === '') {
      setErrorMessage('Please fill Email');
      return;
    }
    if (username === '') {
      setErrorMessage('Please fill Username');
      return;
    }
    if (password === '') {
      setErrorMessage('Please fill Password');
      return;
    }
    if (confirmPassword === '') {
      setErrorMessage('Please fill Confirm Password');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        // const userUID = email.replace(/[@]/g, '_at_')
        //                       .replace(/[.]/g, '_dot_')
        //                       .replace(/[#]/g, '_hash_')
        //                       .replace(/[$]/g, '_dollar_')
        //                       .replace(/\[/g, '_openbracket_')
        //                       .replace(/\]/g, '_closebracket_');

        const userUID = userCredential.user.uid;

        set(ref(db, `${userUID}/userprofile/`), {
          username: username,
          email: email,
          passwordLength: password.length,
        });

        navigation.navigate('HomeScreen', { userUID: userUID });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error signing up:', errorCode, errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
          setErrorMessage('Email already exists');
        }
        else if (errorCode === 'auth/invalid-email') {
          setErrorMessage('Invalid Email');
        }
      });
  };

  return (
    <ImageBackground source={backGround} style={styles.backgroundImage}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 1, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
            <View style={{ flex: 1, /*backgroundColor: 'pink',*/ flexDirection : 'row' }}>
              <View style={{ flex: 1, marginTop: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SplashScreen')}>
                  <Ionicons name="chevron-back" size={35} color="black" style={{ /*backgroundColor: 'blue'*/ }} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 6, }}>
                <Text style={{ fontFamily: 'LLSregular', fontSize: 35, marginTop: 10, /*backgroundColor: 'red',*/ alignSelf: 'center', marginRight: 50 }}>SignUp</Text>
              </View>
            </View>
            <View style={{ flex: 6, /*backgroundColor: 'green',*/  marginTop: 0 }}>
              <View style={{ flex: 1, /*backgroundColor: 'navy'*/ }}>
                <BlurView intensity={70} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column', }]}>
                  <TextInput
                    style={{ fontFamily: 'LSregular', fontSize: 15 }}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}

                  />
                </BlurView>
                <BlurView intensity={70} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column', marginTop: 15 }]}>
                  <TextInput
                    style={{ fontFamily: 'LSregular', fontSize: 15, borderWidth: 0, marginTop: 0 }}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                </BlurView>
                <BlurView intensity={70} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column', marginTop: 15 }]}>
                  <TextInput
                    style={{ fontFamily: 'LSregular', fontSize: 15, borderWidth: 0, marginTop: 0 }}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                  />
                </BlurView>
                <BlurView intensity={70} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column', marginTop: 15 }]}>
                  <TextInput
                    style={{ fontFamily: 'LSregular', fontSize: 15, borderWidth: 0, marginTop: 0 }}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                  />
                </BlurView>

                {errorMessage ? <Text style={[styles.errorMessage, { alignSelf: 'center' }]}>{errorMessage}</Text> : null}
              </View>
              <View style={{ flex: 1.4, /*backgroundColor: 'olive'*/ }}>
                <View style={{ flex: 1, /*backgroundColor: 'royalblue'*/ }}>
                  <TouchableOpacity style={styles.buttonStyle} onPress={handleSignUp}>
                    <Text style={{ fontFamily: 'LSsemibold', fontSize: 25 }}>SignUp</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 3, /*backgroundColor: 'seagreen',*/ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                  <Text style={{ fontFamily: 'LSregular', fontSize: 15 }}>Already have an account? </Text>
                  <TouchableOpacity style={{ alignSelf: 'baseline' }} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{ fontFamily: 'LSregular', fontSize: 15, color: '#3156D9', }}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginTop: 15,
    fontFamily: 'LSregular',
    fontSize: 15
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  blurContainer: {
    margin: 15,
    padding: 15,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 25,
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
});