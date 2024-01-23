import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Telephone from '../screens/registrations/telephone';
import Icon from 'react-native-vector-icons/Foundation'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import EmailIcon from 'react-native-vector-icons/MaterialIcons'
import RegisterCustomers from '../screens/registrations/RegisterCustomers';
import Counter from '../screens/registrations/counter';
import MeansContact from '../screens/registrations/meansContact';
import AddUsers from '../screens/registrations/addUsers';
// import { Container } from './styles';
export default function RouteRegistrations() {
    const tab = createBottomTabNavigator();
    return (
        <tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { color: 'black' },
            }}
        >
            <tab.Screen
                component={Telephone}
                name='agend-telephone'
                options={{
                    title: 'Agenda Telefônica',
                    headerShown: false,
                    tabBarIcon({ focused, color, size }) {
                        if (focused) {
                            return (
                                <Icon name='telephone' size={size} color='#DB6015' />
                            )
                        } else {
                            return (

                                <Icon name='telephone' size={size} color={color} />
                            )
                        }
                    }

                }}
            />

            <tab.Screen
                component={RegisterCustomers}
                name='customers'

                options={{
                    title: 'Clientes',
                    headerShown: false,

                    tabBarIcon({ focused, color, size }) {
                        if (focused) {
                            return (
                                <Icon2 name='users' size={size} color='#DB6015' />
                            )
                        } else {
                            return (

                                <Icon2 name='users' size={size} color={color} />
                            )
                        }
                    }

                }}
            />
            <tab.Screen
                component={Counter}
                name='counter'

                options={{
                    title: 'Contador',
                    headerShown: false,

                    tabBarIcon({ focused, color, size }) {
                        if (focused) {
                            return (
                                <Icon3 name='counter' size={size} color='#DB6015' />
                            )
                        } else {
                            return (

                                <Icon3 name='counter' size={size} color={color} />
                            )
                        }
                    }

                }}
            />
            <tab.Screen
                component={AddUsers}
                name='addUsers'

                options={{
                    title: 'Usuários',
                    headerShown: false,

                    tabBarIcon({ focused, color, size }) {
                        if (focused) {
                            return (
                                <Icon2 name='users' size={size} color='#DB6015' />
                            )
                        } else {
                            return (

                                <Icon2 name='users' size={size} color={color} />
                            )
                        }
                    }

                }}
            />

        </tab.Navigator>
    )
}