import React from 'react';
import { View, Platform } from 'react-native';
import { FAB } from '@rneui/themed';
// import { Container } from './styles';

const FABComponent = ({ onPress }) => {
    return (
        <View>
            <FAB
                style={{ left: 0, right: 0, position: 'absolute', bottom: 60 }}
                onPress={onPress}
                size='large'
                icon={{ type: 'Ionicon', name: 'add', color: 'white' }}
                color='#DB6015'
                visible={true}

            />
        </View>
    )
}

export default FABComponent;