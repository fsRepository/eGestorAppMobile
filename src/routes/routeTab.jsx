import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/home';
import Icon from 'react-native-vector-icons/Ionicons'
import RegisterProfile from '../screens/registrations/RegisterCustomers';
import Telephone from '../screens/registrations/telephone';
// import { Container } from './styles';

export default function RouterTab() {



    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false

            }}
        >
            <Tab.Screen name='home' component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon({ focused, color, size }) {
                        if (focused) {
                            return (
                                <Icon name='home' size={size} color='#DB6015' />
                            )
                        } else {
                            return (

                                <Icon name='home-outline' size={size} color={color} />
                            )
                        }
                    }


                }}

            />




        </Tab.Navigator>
    )
}