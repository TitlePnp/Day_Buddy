import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TagColorList = ({ TagActivitie }) => {
  return (
    <View style={[styles.tagBar, {backgroundColor: 
      TagActivitie === 'Work' ? '#FF5353' : 
      TagActivitie === 'Hangout' ? '#4CAF50' : 
      TagActivitie === 'Reading' ? '#6E04C1' : 
      TagActivitie === 'Exercise' ? '#4A98F7' : 
      TagActivitie === 'Deadlines' ? '#FF7000' : 
      TagActivitie === 'Sleeping' ? '#290080' : 
      TagActivitie === 'Shopping' ? '#FF9F00' : 
      TagActivitie === 'Travel' ? '#F040DE' : 
      TagActivitie === 'Other' ? 'black' : 'gray'
    }]}>
      
    </View>
  )
}

export default TagColorList

const styles = StyleSheet.create({
    tagBar: {
        width: '30%',
        height: '80%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }
})