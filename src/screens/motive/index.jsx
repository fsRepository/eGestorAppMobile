import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import axios from 'axios';
import { apiMotivos } from '../../services/api';
import Toast from 'react-native-toast-message'
import { Badge, Overlay, Input, Button, CheckBox } from '@rneui/themed';
import FABComponent from '../../components/FAB';
import OverlayRender from '../../components/overlay';
import { ContextAuth } from '../../context';
// import { Container } from './styles';


export default function Motives() {



    const [openModal, setOpenModal] = useState(false)
    const [input, setInput] = useState("")
    const [itemSelected, setItemSelected] = useState([])
    const [status, setStatus] = useState(false)
    const { user, LoadMotives, motives, loading } = useContext(ContextAuth)
    //buscar todos os motibvos da api


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

    //função poara adicionar item
    async function AddItem() {
        if (input !== '' && status !== '') {
            await axios.post(apiMotivos, {
                UIDContratante: user.UidContratante,
                Ativo: status,
                MotivosAtendimentos: [],
                Motivo: input.toUpperCase()

            }, {
                headers: {
                    'Content-type': 'application/json'
                }
            })


                .then(() => {

                    Toast.show({
                        type: 'success',
                        text1: 'Item Adicionado'
                    })
                    setOpenModal(false)
                    LoadMotives()
                })
                .catch((erro) => {
                    console.log(erro)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao adicionar item',
                        text2: erro
                    })

                }
                )

        } else {
            Toast.show({
                type: 'info',
                text1: 'Preencha os campos vazios'
            })
        }
    }


    //função para editar item
    async function EditItem(itemSelected) {
        if (input !== itemSelected.Motivo || status !== itemSelected.Ativo) {
            await axios.put(`${apiMotivos}/${itemSelected.UID}`, {
                UID: itemSelected.UID,
                Motivo: input,
                Ativo: status,
                UIDContratante: user.UidContratante,
                MotivosAtendimentos: []


            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            )

                .then(() => {

                    Toast.show({
                        type: 'success',
                        text1: 'Item Atualizado'
                    })
                    setOpenModal(false)
                    LoadMotives()
                })
                .catch((erro) => {
                    console.log(erro)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao atualizar item',
                        text2: erro
                    })

                }
                )

        }


    }

    //função para excluir item
    async function DeleteItem(itemSelected) {
        //pergunta ao ususario se ele realmente quer excluir o item
        Alert.alert('Você está prestes a excluir o item:',
            `${itemSelected.Motivo}`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => setOpenModal(false),
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: () => {


                        ConfirmDelete()



                    },
                },
            ]

        )

    }
    async function ConfirmDelete() {
        await axios.delete(`${apiMotivos}/${itemSelected.UID}`, {
            UID: itemSelected.UID,
            Motivo: input,
            Ativo: status,
            UIDContratante: user.UidContratante,
            MotivosAtendimentos: []

        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(() => {

                Toast.show({
                    type: 'success',
                    text1: 'Item Deletado'
                })
                setOpenModal(false)
                LoadMotives()
            })
            .catch((erro) => {
                console.log(erro)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao deletar item',
                    text2: erro
                })

            }
            )
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
                <OverlayRender
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    input={input}
                    setInput={setInput}
                    itemSelected={itemSelected}
                    type='motive'
                    status={status}
                    setStatus={setStatus}
                    Save={AddItem}
                    EditItem={EditItem}
                    DeleteItem={DeleteItem}
                />
            </Overlay>
            {
                loading === true ? '' : (
                    <FABComponent onPress={() => {
                        setInput('')
                        setOpenModal(true)
                        setItemSelected([])
                    }} />
                )
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginStart: 10,
        marginEnd: 10,
        marginTop: 10,
        flex: 1
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

    inputContainer: {
        width: 300,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#DB6015',
        marginTop: 10
    }
})