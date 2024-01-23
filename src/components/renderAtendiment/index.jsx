import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function RenderAtendiment({ item }) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>{item.name}</Text>
            <View style={{ backgroundColor: 'white', width: 100, height: 1 }}></View>
            <Text style={styles.num}>{item.atend}</Text>
            <Text style={styles.text}>Atendimentos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 2,
        backgroundColor: '#db6015',
        margin: 10,
        elevation: 5,
        width: 110,
        height: 100,
        borderRadius: 10
    },
    label: {
        fontSize: 17,
        fontFamily: 'RobotoMedium',
        color: 'white',


    },
    text: {
        fontSize: 14,
        color: 'white',

    },
    num: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'RobotoBold'
    }
})