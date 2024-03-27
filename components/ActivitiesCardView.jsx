import { StyleSheet, Text, View, SafeAreaView, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from "react";

import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../Database/FirebaseDB";

import ActivitieCard from '../widget/ActivitieCard'
import ActivitieWideCard from '../widget/ActivitieWideCard';
import DefaultActivitieCard from '../widget/DefaultActivitieCard';

const ActivitiesCardView = ({ userUID }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, `${userUID}/activities`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const activityList = Object.values(data);
        setActivities(activityList);
      }
      else if (!data) {
        setActivities([]);
      }
    });
  }, [userUID]);

  const renderItem = ({ item }) => {
    const date = new Date(item.date);
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateFormatted = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });

    return (
      <View style={{ marginRight: 15 }}>
        <ActivitieCard key={item.title} Time={time} Date={dateFormatted} Name={item.title} activity={item}
          Description={item.description} Notification={item.notification} Location={item.location}
          Tag={item.tag} UserUID={userUID} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {activities && activities.length > 0 ? (
        <FlatList
          data={activities}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      ) : (
        <ScrollView horizontal={true}>
          <DefaultActivitieCard userUID={userUID} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ActivitiesCardView

const styles = StyleSheet.create({

})