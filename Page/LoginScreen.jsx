import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Database/FirebaseDB';
import Checkbox from 'expo-checkbox';

import Ionicons from 'react-native-vector-icons/Ionicons';

import backGround from '../assets/Image/FinalBackground.png'

const LoginScreen = () => {
  const navigation = useNavigation();

  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (email === '' && password === '') {
      setErrorMessage('Please fill Email and Password');
      return;
    }
    if (email === '') {
      setErrorMessage('Please fill Email');
      return;
    }
    if (password === '') {
      setErrorMessage('Please fill Password');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const userUID = email.replace(/[@]/g, '_at_')
        //                       .replace(/[.]/g, '_dot_')
        //                       .replace(/[#]/g, '_hash_')
        //                       .replace(/[$]/g, '_dollar_')
        //                       .replace(/\[/g, '_openbracket_')
        //                       .replace(/\]/g, '_closebracket_');

        const userUID = userCredential.user.uid;
        navigation.navigate('HomeScreen', { userUID: userUID })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error signing in:', errorCode, errorMessage);
        if (errorCode === 'auth/invalid-login-credentials') {
          setErrorMessage('Invalid Email or Password, please try again');
        }
      });
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Forgot password');
  };

  return (
    <ImageBackground source={backGround} style={styles.backgroundImage}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 1, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
            <View style={{ flex: 1, /*backgroundColor: 'pink',*/ /*alignItems: 'center'*/flexDirection: 'row' }}>
              <View style={{ flex: 1, marginTop: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('SplashScreen')}>
                  <Ionicons name="chevron-back" size={35} color="black" style={{ /*backgroundColor: 'blue'*/ }}/>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 6, }}>
                <Text style={{ fontFamily: 'LLSregular', fontSize: 35, marginTop: 10, /*backgroundColor: 'red',*/ alignSelf: 'center', marginRight: 50 }}>Login</Text>
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
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                  />
                </BlurView>
                <View style={{ flex: 1, /*backgroundColor: 'peru',*/ flexDirection: 'row', }}>
                  <View style={{ flex: 1, /*backgroundColor: 'yellow',*/ marginLeft: 25, alignItems: 'flex-start', flexDirection: 'row' }}>
                    <Checkbox
                      style={[{ transform: [{ scale: 0.9, }], marginTop: 10 }]}
                      value={stayLoggedIn}
                      onValueChange={setStayLoggedIn}
                    />
                    <Text style={{ fontFamily: 'LSregular', marginLeft: 5, marginTop: 15 }}>Stay Login</Text>
                  </View>
                  <View style={{ flex: 1, /*backgroundColor: 'salmon',*/ marginRight: 20 }}>
                    <TouchableOpacity style={{ marginTop: 17, alignItems: 'flex-end' }} onPress={handleForgotPassword}>
                      <Text style={{ fontFamily: 'LSregular', fontSize: 15, color: '#3156D9' }}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {errorMessage ? <Text style={[styles.errorMessage, { alignSelf: 'center' }]}>{errorMessage}</Text> : null}
              </View>
              <View style={{ flex: 2.5, /*backgroundColor: 'olive'*/ }}>
                <View style={{ flex: 1, /*backgroundColor: 'royalblue'*/ }}>
                  <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
                    <Text style={{ fontFamily: 'LSsemibold', fontSize: 25 }}>Login</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 3, /*backgroundColor: 'seagreen',*/ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ fontFamily: 'LSregular', fontSize: 15 }}>Don’t have an account? </Text>
                  <TouchableOpacity style={{ alignSelf: 'baseline' }} onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={{ fontFamily: 'LSregular', fontSize: 15, color: '#3156D9', }}>Sign Up</Text>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'LSregular'
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