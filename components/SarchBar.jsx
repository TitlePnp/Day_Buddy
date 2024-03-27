import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { getDatabase, ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { db } from "../Database/FirebaseDB";

const SearchBar = ({ userUID }) => {

  console.log('SearchBar userUID: ', userUID);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const db = getDatabase();
  const dbRef = ref(db, `${userUID}/activities`);
  const q = query(dbRef, orderByChild('name'), equalTo(searchTerm));

  useEffect(() => {
    const unsubscribe = onValue(q, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const activities = snapshot.val();
          setSearchResults(activities); // Update search results
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    });
  
    return () => unsubscribe();
  }, [searchTerm]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <FontAwesome5 name="search" size={18} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search...."
          placeholderTextColor="grey"
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
        />
      </BlurView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    width: '100%',
    height: '50%',
  },
  icon: {
    marginLeft: 10,
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'LSregular',
    color: 'black',
    opacity: 0.5,
    paddingLeft: 5,

  },
});

export default SearchBar;