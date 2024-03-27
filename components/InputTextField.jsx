import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react';

const InputTextField = ({PlaceHolderText}) => {
  const defaultPlaceHolderTextColor = "rgba(98, 98, 98, 0.5)";

  return (
    <View style={styles.inputTextField}>
      <TextInput style={styles.input} 
      placeholder={PlaceHolderText}
      placeholderTextColor={defaultPlaceHolderTextColor}
      />
    </View>
  )
}

export default InputTextField

const styles = StyleSheet.create({
    inputTextField: {
        width: 320,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        marginBottom: 10
    },
    input: {
        width: '90%',
        height: '90%',
        fontSize: 14,
        color: 'black',
        paddingLeft: 20,
    }

})