import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from "react";

import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../Database/FirebaseDB";

import ActivitieWideCard from '../widget/ActivitieWideCard';

const ActivitiesWideCardView = ({ userUID, tag }) => {
  const [activities, setActivities] = useState([]);
  const [tagFilter, setTagFilter] = useState(tag);

  useEffect(() => {
    const dbRef = ref(db, `${userUID}/activities`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let activityList = Object.values(data);
        if (tagFilter) {
          activityList = activityList.filter(activity => activity.tag === tagFilter);
        }
        setActivities(activityList);
      }
      else {
        setActivities([]);
      }
    });
  }, [userUID, tagFilter]);

  const renderItem = ({ item }) => {
    const date = new Date(item.date);
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateFormatted = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

    return (
      <View style={{ marginRight: 15 }}>
        <ActivitieWideCard key={item.title} Time={time} Date={dateFormatted} Name={item.title} activity={item}
          Description={item.description} Notification={item.notification} Location={item.location}
          Tag={item.tag} UserUID={userUID} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={activities}
        horizontal={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

export default ActivitiesWideCardView

const styles = StyleSheet.create({

})