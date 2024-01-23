import React, { useEffect } from 'react';
import { View, SafeAreaView, Image } from 'react-native';
import Logo from '../../../assets/Logo.png'
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


const SplashScreen = () => {

    const navigation = useNavigation()

    //O próximo useEffect é utilizado para agendar a ação de navegar até a página Welcome 
    //logo após renderizar a Splash Screen.
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('initial');
        }, 1500);
    }, [navigation])

    //Tela de Splash Screen com a logo da Foco, rendereizada assim que o app é iniciado
    return <SafeAreaView style={styles.SplashScreen} >
        <View style={styles.viewSplash}>
            <Image source={Logo}
                style={{ resizeMode: 'contain', width: '100%', alignItems: 'center', justifyContent: 'center' }}
            />
        </View>
    </SafeAreaView>;

}



export default SplashScreen;