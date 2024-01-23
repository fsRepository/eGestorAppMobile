import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { apiMotivos } from '../../services/api';
import Toast from 'react-native-toast-message'
import { Badge, Overlay, Input, Button, CheckBox } from '@rneui/themed';
import FABComponent from '../../components/FAB';
import OverlayRender from '../../components/overlay';
// import { Container } from './styles';


export default function Motives() {

    const [loading, setLoading] = useState(false)
    const [motives, setMotives] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [input, setInput] = useState("")
    const [itemSelected, setItemSelected] = useState([])
    //buscar todos os motibvos da api

    async function LoadMotives() {
        setLoading(true)
        try {
            const response = await axios.get(apiMotivos)

            if (response.status === 200) {
                console.log(response.data)
                setMotives(response.data)
                setLoading(false)

            } else {
                console.log(error)
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Parece que algo deu errado',
                    text2: 'tente novamente'
                })
            }


        } catch {
            setLoading(false)
            console.log('erro ')
        }

    }
    useEffect(() => {




        LoadMotives()
    }, [])


    function Refresh() {
        LoadMotives()
    }

    //função pra abrir overlay
    function toggleOverlay(item) {

        setOpenModal(!openModal)
        setItemSelected(item)

    }


    function AddItem() {
        setInput('')
        setOpenModal(true)
        setItemSelected([])

    }

    return (
        <View style={styles.container}>
            {
                loading === true ?

                    <ActivityIndicator size='large' color='#DB6015' /> :
                    (
                        <FlatList
                            data={motives}
                            keyExtractor={item => item.UID}
                            renderItem={({ item }) =>
                                <TouchableOpacity
                                    onPress={() => toggleOverlay(item)}
                                    style={styles.content}>
                                    <Text style={styles.label}>{item.Motivo}</Text>
                                    {
                                        item.Ativo === true ? <Badge status='success' /> :
                                            <Badge status='warning' />
                                    }
                                </TouchableOpacity>
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={Refresh}
                                    colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']}
                                />
                            }

                        />

                    )

            }


            <Overlay animationType='fade' isVisible={openModal} onBackdropPress={toggleOverlay}>
                <OverlayRender openModal={openModal} setOpenModal={setOpenModal} input={input} setInput={setInput} itemSelected={itemSelected} type='motive' />
            </Overlay>
            {
                loading === true ? '' : (
                    <FABComponent onPress={AddItem} />
                )
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginStart: 10,
        marginEnd: 10,
        marginTop: 10
    },
    label: {
        fontSize: 18,
        fontFamily: 'RobotoRegular'
    },
    content: {
        flexDirection: 'row',
        gap: 20, marginBottom: 10,
        backgroundColor: '#e6e6e6',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontFamily: 'RobotoRegular'
    },
    inputContainer: {
        width: 300,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#DB6015',
        marginTop: 10
    }
})