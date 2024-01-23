import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/home';
import RouterTab from './routeTab';
import Calleds from '../screens/calleds';
import { Text } from 'react-native';
import CustomDrawer from '../components/customDrawer';
import Login from '../screens/Login';
import Telephone from '../screens/registrations/telephone';
import RouteRegistrations from './RouteRegistrations';
import MeansContact from '../screens/registrations/meansContact';
import Motives from '../screens/motive';
import Sistems from '../screens/systems';

// import { Container } from './styles';

export default function RouteDrawer({ Navigation }) {

    const Drawer = createDrawerNavigator()
    return (


        <Drawer.Navigator
            drawerContent={props => <CustomDrawer{...props} />}
            screenOptions={{

                headerTintColor: '#db6015',
                drawerActiveBackgroundColor: '#e6e6e6',
                drawerActiveTintColor: '#db6015'
            }}
        >


            <Drawer.Screen component={Home} name='HomeTab'
                options={{
                    title: 'Dashboard',



                }}

            />

            <Drawer.Screen component={Calleds} name='calleds'
                options={{
                    title: 'Atendimentos'
                }}
            />
            <Drawer.Screen component={RouteRegistrations} name='registrations'
                options={{
                    title: 'Cadastros',

                }}
            />

            <Drawer.Screen component={MeansContact} name='meansContact'
                options={{
                    title: 'Meios de Contato',

                }}
            />
            <Drawer.Screen component={Motives} name='motives'
                options={{
                    title: 'Motivos',

                }}
            />
            <Drawer.Screen component={Sistems} name='system'
                options={{
                    title: 'Sistemas',

                }}
            />
            <Drawer.Screen component={Login} name='login'
                options={{
                    title: 'Sair',
                    headerShown: false
                }}
            />



        </Drawer.Navigator>
    )
}