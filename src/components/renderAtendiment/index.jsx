import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

export default function RenderAtendiment({ item }) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>{item.Atendente}</Text>
            <View style={{ backgroundColor: 'white', width: 100, height: 1 }}></View>
            <Text style={styles.num}>{item.Total}</Text>
            <Text style={styles.text}>Atendimentos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#db6015',
        margin: 10,
        elevation: 5,
        width: 120,
        height: 120,
        borderRadius: 10
    },
    label: {
        fontSize: 16,
        fontFamily: 'RobotoMedium',
        color: 'white',
        width: 100,
        textAlign: 'center'


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