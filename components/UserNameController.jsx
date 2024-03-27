import { StyleSheet, Text, View } from 'react-native'
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from "../Database/FirebaseDB";
import React, { useEffect, useState } from "react";

const UserNameController = ({ userUID }) => {

    const [userName, setUserName] = useState('');


    useEffect(() => {
        if (userUID === 'GestUser') {
            setUserName('GestUser');
        } else {
            const dbRef = ref(db, `${userUID}/userprofile/username`);
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setUserName(data);
                }
            });
        }
    }, [userUID]);
    console.log('userControl: ', userName);

    return (
        <View>
            <Text style={{ fontFamily: 'LSsemibold', fontSize: 25 }}>{userName.length > 8 ? userName.substring(0, 8) + '...' : userName}</Text>
        </View>
    )
}

export default UserNameController

const styles = StyleSheet.create({

})
