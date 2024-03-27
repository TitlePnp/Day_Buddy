import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
// import WeatherForecast from './WeatherForecast'

const Test = () => {
  return (
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, marginLeft: 15, marginRight: 15}}>
            <ScrollView style={{flex: 1, backgroundColor: 'gray'}}>
              <View style={{flex: 1, backgroundColor: 'pink', flexDirection: 'row'}}>
                <View style={{flex: 1, backgroundColor: 'orange'}}>
                  <View style={styles.testCircle}>

                  </View>
                </View>
                <View style={{flex: 1, backgroundColor: 'navy'}}>

                </View>
              </View>
              <View style={{flex: 1, backgroundColor: 'cyan'}}>
                <Text>Test</Text>
              </View>
              <View style={{flex: 1, backgroundColor: 'green', flexDirection:'row'}}>
                <View style={{flex: 1, backgroundColor: 'purple'}}>
                  <View style={{flex: 1}}>
                    <View style={styles.testCircle}></View>
                  </View>
                </View>
                <View style={{flex: 1, backgroundColor: 'red'}}>

                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
  )
}

export default Test

const styles = StyleSheet.create({
  testCircle: {
    width: 500,
    height: 300,
    borderRadius: 10,
    backgroundColor: 'white',
  }
})