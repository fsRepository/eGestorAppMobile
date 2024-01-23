import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import Login from './src/screens/Login';
import SplashScreen from './src/screens/splash';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import * as Font from 'expo-font'
import ContextProvider from './src/context/index';


export default function App() {
  useEffect(() => {
    async function LoadFonts() {
      await Font.loadAsync({

        'MontserratRegular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'MontserratMedium': require('./assets/fonts/Montserrat-Medium.ttf'),
        'MontserratBold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
        'RobotoMedium': require('./assets/fonts/Roboto-Medium.ttf'),
        'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf')

      })
    }
    LoadFonts()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <NavigationContainer>
        <ContextProvider>
          <Routes />

          <Toast />
        </ContextProvider>
      </NavigationContainer>

    </GestureHandlerRootView>
  );
}


