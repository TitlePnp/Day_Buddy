import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import HomeScreen from './Page/HomeScreen';
import AddActivitieScreen from './Page/AddActivitieScreen';
import CarlendarScreen from './Page/CarlendarScreen';
import SignUpScreen from './Page/SignUpScreen';
import LoginScreen from './Page/LoginScreen';
import ForgotPasswordScreen from './Page/ForgotPasswordScreen';
import SplashScreen from './Page/SplashScreen';
import ActivitieListScreen from './Page/ActivitieListScreen';
import ProfileScreen from './Page/ProfileScreen';
import ActivitieDetailScreen from './Page/ActivitieDetailScreen';
import TagFilterScreen from './Page/TagFilterScreen';

import NotificationController from './components/NotificationController';

import TestScreen from './Page/Test';

const Stack = createStackNavigator();

export default function App() {
  ;

  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        NiramitRegular: require('./assets/Font/Niramit-Regular.ttf'),
        NiramiMedium: require('./assets/Font/Niramit-Medium.ttf'),
        NiramitBold: require('./assets/Font/Niramit-Bold.ttf'),
        NiramitSemiBold: require('./assets/Font/Niramit-SemiBold.ttf'),
        QuickSandRegular: require('./assets/Font/Quicksand-Regular.ttf'),
        QuickSandBold: require('./assets/Font/Quicksand-Bold.ttf'),
        LSregular: require('./assets/Font/LeagueSpartan-Regular.ttf'),
        LSbold: require('./assets/Font/LeagueSpartan-Bold.ttf'),
        LSsemibold: require('./assets/Font/LeagueSpartan-SemiBold.ttf'),
        LLSregular: require('./assets/Font/LilyScriptOne-Regular.ttf'),
      });

      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!isFontLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
        screenOptions={{
          presentation: 'card'
        }}>

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="AddActivitieScreen"
          component={AddActivitieScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="CarlendarScreen"
          component={CarlendarScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='TestScreen'
          component={TestScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='ForgotPasswordScreen'
          component={ForgotPasswordScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='ActivitieListScreen'
          component={ActivitieListScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='ProfileScreen'
          component={ProfileScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='NotificationController'
          component={NotificationController}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name='ActivitieDetailScreen'
          component={ActivitieDetailScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name='TagFilterScreen'
          component={TagFilterScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
