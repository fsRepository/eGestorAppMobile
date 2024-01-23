import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
// import { Container } from './styles';

export default function RenderCards({ item }) {
    const getBackgroundColor = (itemId) => {
        switch (itemId) {

            case 'Pendente':
                return '#d02d55';
            case 'Concluido':
                return '#36c389';
            case 'Liberado':
                return '#138ae4';
            case 'Retorno':
                return '#d02d55';
            case 'Desenvolvimento':
                return '#138ae4';
            case 'TotalOcorrencias':
                return '#d02d55';
            case 'TotalAtendimentos':
                return '#36c389';
            default:
                return '#191919';
        }
    };

    const backgroundColor = getBackgroundColor(item.id);
    return (
        <View style={[styles.container,]}>
            <View style={[styles.leftContainer, { backgroundColor: backgroundColor }]}></View>
            <View style={styles.rightContainer}>
                {
                    item.id === 'Pendente' ? <AntDesign name='dislike1' size={40} color={backgroundColor} /> :
                        item.id === 'Concluido' ? <AntDesign name='like1' size={40} color={backgroundColor} /> :
                            item.id === 'Liberado' ? <Feather name='alert-triangle' size={40} color={backgroundColor} /> :
                                item.id === 'Retorno' ? <Fontisto name='arrow-return-left' size={40} color={backgroundColor} /> :
                                    item.id === 'Desenvolvimento' ? <Feather name='alert-triangle' size={40} color={backgroundColor} /> :
                                        item.id === 'TotalOcorrencias' ? <AntDesign name='checkcircle' size={40} color={backgroundColor} /> :
                                            item.id === 'TotalAtendimentos' ? <AntDesign name='checkcircle' size={40} color={backgroundColor} /> : ''
                }

                <Text style={styles.value}>{item.value}</Text>
                <Text style={styles.label}>{item.id}</Text>


            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: 170,
        height: 150,
        margin: 10,
        borderRadius: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 5

    },
    label: {
        fontFamily: 'RobotoMedium',
        fontSize: 16,


    },
    value: {
        fontFamily: 'RobotoMedium',
        fontSize: 20,

    },
    leftContainer: {
        height: '100%',
        width: 7,

        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        marginLeft: -1
    },
    rightContainer: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
})