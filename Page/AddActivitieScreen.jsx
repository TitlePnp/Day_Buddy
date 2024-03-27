import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,
  Modal, FlatList, Pressable, SafeAreaView, ImageBackground, ScrollView, Switch
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { db } from '../Database/FirebaseDB';
import { ref, set, onValue } from 'firebase/database'
import { BlurView } from 'expo-blur';
import Navbar from '../widget/Navbar';
import DateTimePicker from '@react-native-community/datetimepicker';

import backGround from '../assets/Image/FinalBackground.png'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons'
import TagImageController from '../components/TagImageController';


const AddActivitieScreen = ({ route }) => {
  const user_uid = route.params.userUID;

  const navigation = useNavigation();

  const [isToggled, setIsToggled] = useState(false);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [notificationDescribe, setNotificationDescribe] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [tag, setTag] = useState('Work')
  const [showModal, setShowModal] = useState(false)

  const tags = ['Work', 'Hangout', 'Reading', 'Exercise', 'Deadlines', 'Sleeping', 'Shopping', 'Travel', 'Other']

  const handleAddActivitie = () => {
    set(ref(db, `${user_uid}/activities/` + title), {
      title: title,
      description: description,
      location: location,
      notification: isToggled,
      date: date.toISOString(),
      tag: tag,
    });
    if (isToggled) {
      set(ref(db, `${user_uid}/activities/` + title + '/notification'), {
        notificationDescribe: notificationDescribe,
        date: date.toISOString(),
      });

      set(ref(db, `${user_uid}/notifications/` + date), {
        title: title,
        notificationDescribe: notificationDescribe,
        date: date.toISOString(),
      });
    }


    setTitle('')
    setDescription('')
    setLocation('')
    setDate(new Date())
    setIsToggled(false)
    setNotificationDescribe('')
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(true);
    setDate(currentDate);
  };

  const handleTagChange = (selectedTag) => {
    setTag(selectedTag)
    setShowModal(false)
  }

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ImageBackground source={backGround} style={styles.backgroundImage}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={{ flex: 1 }}>
          <BlurView intensity={60} tint='light' style={[styles.blurContainer, { flex: 10, /*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
            <ScrollView style={{ flex: 1, /*backgroundColor: 'red'*/ }}>
              <View style={{ /*backgroundColor: 'lightblue',*/ justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={styles.title}>Add Activity</Text>
              </View>
              <View style={{ /*backgroundColor: 'hotpink',*/ flexDirection: 'row' }}>
                <View style={{ flex: 1, }}>
                  <TouchableOpacity style={{}} onPress={handleModal}>
                    <BlurView intensity={60} tint='light' style={[styles.tagBlurContainer, { flex: 1, /*backgroundColor: 'red',*/ flexDirection: 'column', alignItems: 'center' }]}>
                      <TagImageController tag={tag} />
                    </BlurView>
                  </TouchableOpacity>
                </View>
                <Modal visible={showModal} transparent={true} animationType="slide">
                  <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <FlatList
                      data={tags}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <BlurView intensity={60} tint='light' style={styles.tagListBlurContainer}>
                          <Pressable style={styles.modalItem} onPress={() => handleTagChange(item)}>
                            <Text style={styles.modalText}>{item}</Text>
                          </Pressable>
                        </BlurView>
                      )}
                    />
                  </SafeAreaView>
                </Modal>
                <View style={{ flex: 4, /*backgroundColor: 'cyan',*/ justifyContent: 'center' }}>
                  <BlurView intensity={60} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
                    <TextInput
                      style={{ fontFamily: 'LSregular', fontSize: 17 }}
                      placeholder="Name Activity"
                      value={title}
                      onChangeText={(text) => setTitle(text)}
                    />
                  </BlurView>
                </View>
              </View>
              <View style={{ /*backgroundColor: 'green',*/ marginTop: 15 }}>
                <BlurView intensity={60} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
                  <TextInput
                    style={{ fontFamily: 'LSregular', fontSize: 17 }}
                    placeholder="Location"
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                  />
                </BlurView>
              </View>
              <View style={{ /*backgroundColor: 'navy',*/ marginTop: 15 }}>
                <BlurView intensity={60} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column' }]}>
                  <TextInput
                    style={{ height: 100, fontFamily: 'LSregular', fontSize: 17 }}
                    placeholder="Description this activity......"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline
                  />
                </BlurView>
                <BlurView intensity={60} tint='light' style={[styles.dateBlurContainer, {/*backgroundColor: 'red'*/marginTop: 15 }]}>
                  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowDatePicker(true)}>
                    <View style={{ flex: 1, /*backgroundColor: 'red'*/ }}>
                      <FeatherIcon name="calendar" size={40} color={'black'} style={{ opacity: 100 }} />
                    </View>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                      {showDatePicker ? (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode="datetime"
                          is24Hour={true}
                          display="calendar"
                          onChange={handleDateChange}
                        />
                      ) : (
                        <Text style={{ fontFamily: 'LSsemibold', fontSize: 15, marginTop: 5 }}>Date and Time</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </BlurView>
              </View>
              <View style={{ /*backgroundColor: 'blue'*/ }}>
                <BlurView intensity={60} tint='light' style={[styles.notificationBlurContainer, { flex: 1,/*backgroundColor: 'red'*/ flexDirection: 'column', marginTop: 15, }]}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, /*backgroundColor: 'red',*/ justifyContent: 'center' }}>
                      <Text style={{ fontFamily: 'LSsemibold', fontSize: 20 }}>Notification</Text>
                    </View>
                    <View style={{ flex: 1, /*backgroundColor: 'lightblue',*/ justifyContent: 'center', alignItems: 'flex-end' }}>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isToggled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setIsToggled(!isToggled)}
                        value={isToggled}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1, /*backgroundColor: 'pink'*/ }}>
                    {isToggled &&
                      <>
                        <BlurView intensity={60} tint='light' style={[styles.inputBlurContainer, {/*backgroundColor: 'red'*/ flexDirection: 'column', marginTop: 15 }]}>
                          <TextInput
                            style={{ height: 100, fontFamily: 'LSregular', fontSize: 17 }}
                            placeholder="Notification Description......"
                            value={notificationDescribe}
                            onChangeText={(text) => setNotificationDescribe(text)}
                            multiline
                          />
                        </BlurView>
                      </>
                    }
                  </View>

                </BlurView>

                <TouchableOpacity style={styles.buttonStyle} onPress={handleAddActivitie}>
                  <Text style={{ fontFamily: 'LSsemibold', fontSize: 25 }}>Add Activity</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </BlurView>
          <View style={{ flex: 1, /*backgroundColor: 'maroon',*/ marginLeft: 15, marginRight: 15 }}>
            <Navbar userUID={user_uid} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default AddActivitieScreen

const styles = StyleSheet.create({
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
  tagBlurContainer: {
    height: 48,
    padding: 5,
    marginRight: 10,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
  },
  tagListBlurContainer: {
    padding: 10,
    marginTop: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
  },
  inputBlurContainer: {
    padding: 15,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  dateBlurContainer: {
    padding: 15,
    textAlign: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  notificationBlurContainer: {
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  title: {
    fontSize: 35,
    fontFamily: 'LLSregular',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonStyle: {
    margin: 20,
    height: 50,
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