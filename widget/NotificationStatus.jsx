import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const NotificationStatus = ({ Notification }) => {
  return (
    <View>
      {Notification ? (
        <MaterialIcons name="notifications" size={30} color={'#E3BD00'} />
      ) : (
        <MaterialIcons name="notifications-off" size={30} color={'red'} />
      )}
    </View>
  )
}

export default NotificationStatus

const styles = StyleSheet.create({})