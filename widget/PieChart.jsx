import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { VictoryPie } from 'victory-native';

import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../Database/FirebaseDB";

const defaultGraphicData = [{ x: 'Liquid', y: 0 }, { x: 'Iced', y: 0 }, { x: 'Total', y: 100 }]; // Data used to make the animate prop work

function PieChart({ userUID }) {
  const [activities, setActivities] = useState([]);
  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  console.log('PieChart userUID: ', userUID);

  const tagColors = {
    'Work': '#FF5353',
    'Hangout': '#4CAF50',
    'Reading': '#6E04C1',
    'Exercise': '#4A98F7',
    'Deadlines': '#FF7000',
    'Sleeping': '#290080',
    'Shopping': '#FF9F00',
    'Travel': '#F040DE',
    'Other': 'black'
  };

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

  useEffect(() => {
    const tagCounts = {};
    const tagOrder = [];
    activities.forEach(activity => {
      if (!(activity.tag in tagCounts)) {
        tagOrder.push(activity.tag);
      }
      if (activity.tag in tagCounts) {
        tagCounts[activity.tag]++;
      } else {
        tagCounts[activity.tag] = 1;
      }
    });

    const newGraphicData = tagOrder.map(tag => ({ x: tag, y: tagCounts[tag] }));
    setGraphicData(newGraphicData);
  }, [activities]);

  return (
    // <VictoryPie
    //   animate={{ easing: 'exp' }}
    //   data={graphicData}
    //   radius={30}
    //   innerRadius={40}
    //   labelRadius={70}
    //   colorScale={graphicData.map(data => tagColors[data.x])}
    //   style={{
    //     data: {
    //       fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2
    //     },
    //     labels: {
    //       fill: "#212121"
    //     }
    //   }}
    // />
    <VictoryPie
      data={graphicData}
      labelRadius={({ innerRadius }) => innerRadius + 5}
      radius={({ datum }) => 50 + datum.y * 20}
      innerRadius={30}
      colorScale={graphicData.map(data => tagColors[data.x])}
      style={{ labels: { fill: "white", fontSize: 10, fontFamily: 'LSregular' } }}
    />
  );
}

export default PieChart;
