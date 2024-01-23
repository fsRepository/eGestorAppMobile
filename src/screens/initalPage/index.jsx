
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Logo from '../../../assets/gestor.png'

export default function InitialPage() {

    const navigation = useNavigation()
    const phrases = [
        "Simplificando o gerenciamento para o sucesso do seu negócio.",
        "Gerencie Atendimentos.",
        "Otimize o seu tempo",
        "Aumente suas vendas, fidelize clientes, alcance o sucesso.",
        "Conquiste mais clientes, feche mais vendas, alcance novos patamares.",
        "O eGestor Mobile - seu aliado estratégico no mundo dos negócios.",
        "Transforme desafios em oportunidades com nossa plataforma.",
        "Tenha o controle total do seu negócio, a qualquer hora, em qualquer lugar.",
    ]
    const [phraseCurrent, setPhraseCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseCurrent((prevPhrase) => (prevPhrase + 1) % phrases.length)
        }, 3000)

        return () => clearInterval(interval)

    }, [phrases.length])

    return (
        <View style={styles.container}>
            <View style={{
                justifyContent: 'center', alignItems: 'center', marginTop: 160,

            }}>
                <Image source={Logo} style={{ width: 150, height: 150, backgroundColor: 'white', borderRadius: 60 }} />
                <Text style={styles.phrases}>{phrases[phraseCurrent]}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.contentText}>
                    <Text style={{ fontSize: 20, fontFamily: 'RobotoBold' }} >eGestor Mobile</Text>
                    <Text style={{ fontSize: 18, width: 300, fontFamily: 'RobotoRegular' }}>Simplificando Soluções Empresariais para o Sucesso do Seu Negócio</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Começar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#DB6015',

    },
    content: {
        flex: 2,
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: 100,
        alignItems: 'center',




    },
    contentText: {
        marginRight: 150,
        marginTop: 20,
        marginStart: 100
    },
    button: {
        backgroundColor: '#DB6015',
        width: 300,
        padding: 8,
        borderRadius: 8,
        marginTop: 30,
        alignItems: 'center'
    },
    phrases: {
        fontSize: 20,
        width: 350,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'RobotoMedium',
        marginTop: 10
    }

})

