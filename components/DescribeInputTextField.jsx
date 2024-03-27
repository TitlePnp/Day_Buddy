import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react';

const DescriebInputTextField = ({ PlaceHolderText }) => {
  const defaultPlaceHolderTextColor = "rgba(98, 98, 98, 0.5)";

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.inputTextField}>
        <TextInput style={styles.input}
          placeholder={PlaceHolderText}
          placeholderTextColor={defaultPlaceHolderTextColor}
          multiline={true}
          blurOnSubmit={true}
          //onSubmitEditing={() => { Keyboard.dismiss() }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default DescriebInputTextField

const styles = StyleSheet.create({
  inputTextField: {
    width: 320,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: '90%',
    fontSize: 14,
    color: 'black',
    paddingLeft: 20,
    paddingTop: 20,
  }

})