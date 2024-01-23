import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Ionicons'

// import { Container } from './styles';

export default function TabButton({ openModal }) {
    return (
        <TouchableOpacity
            onPress={openModal}
            style={{ position: 'absolute', zIndex: 100, left: 180, right: 180, marginTop: 480 }}>

            <Icon name='add-circle' size={60} color='#DB6015' />

        </TouchableOpacity>
    )
}