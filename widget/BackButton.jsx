import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import React from 'react'

const BackButton = ({ nav }) => {

    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity onPress={() => { navigation.navigate(nav) }}
                style={[
                    styles.backButtonStyle,
                    Platform.OS === 'ios' ? styles.iosDropShadow : null,
                ]}
            >
                <IonicIcon name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButtonStyle: {
        width: 40,
        height: 40,
        borderRadius: 55,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iosDropShadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'grey',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
            },
            android: {},
        }),
    },
})

export default BackButton
