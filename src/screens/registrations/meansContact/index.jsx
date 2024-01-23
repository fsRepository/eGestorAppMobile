import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import EmailIcon from 'react-native-vector-icons/MaterialIcons'
import WhatsappIcon from 'react-native-vector-icons/FontAwesome'
import DiscordIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FABComponent from '../../../components/FAB';
import { Overlay, Button, Input, Badge } from '@rneui/themed';
import axios from 'axios';
import { apiMeiosDeContato } from '../../../services/api';
import Toast from 'react-native-toast-message'
import OverlayRender from '../../../components/overlay';
// import { Container } from './styles';

export default function MeansContact() {

    const [loading, setLoading] = useState(false)

    const [contactMethods, setMethods] = useState([])
    const [itemSelected, setItemSelected] = useState([])


    //FUNÇÃO PARA CARREGAR TODOS OS MEIOS DA API

    async function LoadItems() {
        const response = await axios.get(apiMeiosDeContato)
            .then((response) => {
                console.log(response.data)
                setMethods(response.data);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Parece que algo deu errado',
                    text2: error
                })
            })
    }
    useEffect(() => {
        setLoading(true)

        LoadItems()
    }, [])
    function onRefresh() {
        setLoading(true)
        LoadItems()

    }

    const renderIcon = (type) => {
        switch (type) {
            case 'Telefone':
                return <Icon name='phone' size={24} color='#DB6015' />
            case 'E-mail':
                return <EmailIcon name='email' size={24} color='#DB6015' />
            case 'WhatsApp':
                return <WhatsappIcon name='whatsapp' size={24} color='#DB6015' />
            case 'Discord':
                return <DiscordIcon name='discord' size={24} color='#DB6015' />
            case 'Chat Online':
                return <DiscordIcon name='wechat' size={24} color='#DB6015' />
            default: return <EmailIcon name='connect-without-contact' size={24} color='#DB6015' />

        }
    }

    // responsavel por abrir ou fechar o overlay modal
    const [openModal, setOpenModal] = useState(false)
    function toggleOverlay(item) {

        setOpenModal(!openModal)
        setItemSelected(item)
    }
    //armazena o que e digitado no input
    const [input, setInput] = useState('')


    return (
        <View style={styles.container}>

            {
                loading === true ? <ActivityIndicator size='large' color='#DB6015' /> : (

                    <FlatList
                        vertical
                        data={contactMethods}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => toggleOverlay(item)}
                                style={styles.content}>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    {renderIcon(item.type)}
                                    <Text style={styles.label}>{item.Descricao}</Text>
                                </View>

                                {
                                    item.Ativo === true ? <Badge status='success' /> :
                                        <Badge status='warning' />
                                }
                            </TouchableOpacity>
                        )


                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={onRefresh}
                                colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']}
                            />
                        }


                    />

                )
            }


            <FABComponent onPress={() => {
                setOpenModal(true)
                setItemSelected([])
            }} />



            <Overlay animationType='fade' isVisible={openModal} onBackdropPress={toggleOverlay}>
                <OverlayRender openModal={openModal} setOpenModal={setOpenModal} input={input} setInput={setInput} itemSelected={itemSelected} type='contact' />
            </Overlay>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        marginStart: 10,
        marginEnd: 10,
        marginTop: 10
    },

    content: {
        flexDirection: 'row',
        gap: 20, marginBottom: 10,
        backgroundColor: '#e6e6e6',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

})