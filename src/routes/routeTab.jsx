import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Calleds from '../screens/calleds';
import CalledIcon from 'react-native-vector-icons/MaterialIcons'
import CrmIcon from 'react-native-vector-icons/FontAwesome5'
import CalledsCRM from '../screens/calledsCRM';

export default function RouterTab() {



    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarLabel: { color: 'black' }

            }}
        >
            <Tab.Screen name='calleds' component={Calleds}
                options={{
                    tabBarLabel: 'Ligações',

                    tabBarIcon({ focused, color, size }) {
                        if (focused) {
                            return (
                                <CalledIcon name='wifi-calling' size={size} color='#DB6015' />
                            )
                        } else {
                            return (

                                <CalledIcon name='wifi-calling' size={size} color={color} />
                            )
                        }
                    }


                }}

            />
            <Tab.Screen name='crm' component={CalledsCRM}
                options={{
                    tabBarLabel: 'CRM',

                    tabBarIcon({ focused, color, size }) {
                        if (focused) {
                            return (
                                <CrmIcon name='users-cog' size={size} color='#DB6015' />
                            )
                        } else {
                            return (

                                <CrmIcon name='users-cog' size={size} color={color} />
                            )
                        }
                    }


                }}

            />




        </Tab.Navigator>
    )
}