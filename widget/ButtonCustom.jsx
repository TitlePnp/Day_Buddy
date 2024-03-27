import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ButtonCustom = ({ textToShow, nav }) => {
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity onPress={() => { navigation.navigate(nav) }}>
                <LinearGradient
                    colors={['#FFA500', '#FF4500']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ButtonStyle}
                >
                    <Text style={{ color: 'white' }}>{textToShow}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonCustom;

const styles = StyleSheet.create({
    ButtonStyle: {
        width: 320,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});