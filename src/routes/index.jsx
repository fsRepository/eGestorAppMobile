import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/home'
import InitialPage from '../screens/initalPage'
import Login from '../screens/Login'
import SplashScreen from '../screens/splash'
import RouterTab from './routeTab'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import RouteDrawer from './routeDrawer'
import DataCustomers from '../screens/registrations/RegisterCustomers/DataCustomers'
import AddAtendimentt from '../screens/addAtendiment'

const Drawer = createDrawerNavigator()
export default function Routes() {
    const Stack = createNativeStackNavigator()
    const navigation = useNavigation()

    return (



        <Stack.Navigator

            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#DB6015',

                },
                headerTintColor: 'white'
            }}
        >

            <Stack.Screen component={SplashScreen} name='splash' />
            <Stack.Screen component={InitialPage} name='initial' />
            <Stack.Screen component={Login} name='Login' />
            < Stack.Screen
                options={{

                    headerShown: false,

                }}

                component={RouteDrawer} name='home' />
            <Stack.Screen component={DataCustomers} name='datacustomers' />
            <Stack.Screen

                component={AddAtendimentt} name='addatendiment' />

        </Stack.Navigator>

    )
}




