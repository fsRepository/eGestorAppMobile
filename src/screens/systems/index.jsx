import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ContextAuth } from '../../context/index'
import { Overlay, Badge } from '@rneui/themed';
import FABComponent from '../../components/FAB';
import OverlayRender from '../../components/overlay';
// import { Container } from './styles';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { apiSistemas } from '../../services/api';

export default function Sistems() {

    const { LoadSystems, sistems, loading, user } = useContext(ContextAuth)
    const [openModal, setOpenModal] = useState(false)
    const [input, setInput] = useState('')
    const [itemSelected, setItemSelected] = useState([])
    const [status, setStatus] = useState(false)
    //pega função pra carregar os sistemas , do context
    useEffect(() => {

        LoadSystems()

    }, [])
    function toggleOverlay(item) {
        setOpenModal(!openModal)
        setItemSelected(item)
    }

    //função para adicionar item
    async function Save() {
        if (status !== '' && input !== '') {
            await axios.post(apiSistemas, {
                Sistema: input.toUpperCase(),
                Ativo: status,
                UIDContratante: user.UidContratante,
                SistemasTelas: []



            }, {
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text1: 'Item Adicionado'
                    })
                    setOpenModal(false)
                    console.log('item adicionado')
                    LoadSystems()
                })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao adicionar item'
                    })
                })
        } else {
            Toast.show({
                type: 'warn',
                text1: 'Preencha os campos vazios'
            })
        }
    }

    // funcao pra editar item
    async function EditItem(itemSelected) {
        if (status !== itemSelected.Ativo || input !== itemSelected.Sistema) {
            await axios.put(`${apiSistemas}/${itemSelected.UID}`, {
                Sistema: input,
                Ativo: status,
                UIDContratante: user.UidContratante,
                UID: itemSelected.UID,
                SistemasTelas: []
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text1: 'Item alterado'
                    })
                    setOpenModal(false)
                    console.log('item alterado')
                    LoadSystems()
                })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao alterar item'
                    })
                })

        } else {
            Toast.show({
                type: 'info',
                text1: 'Preencha os campos vazios'
            })
        }
    }


    //FUNÇÃO PARA DELETAR ITEM
    async function DeleteItem(itemSelected) {
        Alert.alert('Você está prestes a deletar o item', `${itemSelected.Sistema}`,
            [

                {
                    text: 'Cancelar',
                    onPress: () => { return; },
                    styles: 'cancel'

                },
                {
                    text: 'Confirmar',
                    onPress: () => ConfirmDelete(),
                    style: 'default'

                }

            ]
        )
    }


    async function ConfirmDelete() {
        await axios.delete(`${apiSistemas}/${itemSelected.UID}`, {
            Sistema: input,
            UID: itemSelected.UID,
            SistemasTelas: [],
            UIDContratante: user.UidContratante
        })
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Item deletado'
                })
                setOpenModal(false)
                console.log('item deletado')
                LoadSystems()
            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao deletar item'
                })
            })
    }

    return (
        <View>
            {
                loading === true ? <ActivityIndicator size='large' color='#DB6015' /> : (
                    <FlatList
                        keyExtractor={(item, index) => item.UID}
                        data={sistems}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => toggleOverlay(item)}
                                style={styles.content}>
                                <Text style={styles.label}>{item.Sistema}</Text>
                                {
                                    item.Ativo === true ? <Badge status='success' /> :
                                        <Badge status='warning' />
                                }
                            </TouchableOpacity>
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={LoadSystems}
                                colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']}
                            />
                        }
                    />
                )
            }

            <Overlay
                isVisible={openModal}
                animationType='fade'
                onBackdropPress={toggleOverlay}

            >
                <OverlayRender
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    input={input}
                    setInput={setInput}
                    itemSelected={itemSelected}
                    type='sistem'
                    Save={Save}
                    status={status}
                    setStatus={setStatus}
                    EditItem={EditItem}
                    DeleteItem={DeleteItem}
                />
            </Overlay>
            {
                loading === true ? '' :
                    <FABComponent onPress={() => {
                        setOpenModal(!openModal)
                        setItemSelected([])
                    }} />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        gap: 20, marginBottom: 10,
        backgroundColor: '#e6e6e6',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },

})