import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
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
import { ContextAuth } from '../../../context';
// import { Container } from './styles';

export default function MeansContact() {




    const [itemSelected, setItemSelected] = useState([])
    const { user, LoadItems, loading, contactMethods } = useContext(ContextAuth)

    //ao apagar um item esse coonfirm e usado pra armazenar a opcao do usuario
    const [confirm, setConfirm] = useState(false)
    //FUNÇÃO PARA CARREGAR TODOS OS MEIOS DA API


    useEffect(() => {


        LoadItems()
    }, [])
    function onRefresh() {

        LoadItems()

    }

    //função salvar meio de contato
    async function Save() {
        if (input !== '') {
            axios.post(apiMeiosDeContato, {
                UIDContratante: user.UidContratante,
                Descricao: input.toUpperCase(),
                Ativo: status,
                Atendimentos: []
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    console.log('Dados enviados:')
                    Toast.show({
                        type: 'success',
                        text1: 'Item Adicionado'
                    })
                    setOpenModal(false)
                    onRefresh()
                })
                .catch((error) => {
                    console.error('Erro na solicitação:', error);
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao adicionar item'
                    })
                    // Adicione o código para lidar com o erro aqui, se necessário
                });


        } else {
            Toast.show({
                type: 'info',
                text1: 'Preencha os campos vazios'
            })
        }
    }

    //função para editar 
    async function EditItem(itemSelected) {

        try {
            const response = await axios.put(`${apiMeiosDeContato}/${itemSelected.UID}`, {
                UID: itemSelected.UID,
                UIDContratante: user.UidContratante,
                Descricao: input.toUpperCase(),
                Ativo: status,
                Atendimentos: []
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Dados atualizados:', response.data);
            setOpenModal(false);
            Toast.show({
                type: 'success',
                text1: 'Dados atualizados'
            });

            //recarrega os items
            onRefresh()
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao atualizar dados',
                text2: error.message || 'Erro desconhecido'
            });
        }
    }

    //função para excluir um item

    async function DeleteItem(itemSelected) {
        //pergunta ao ususario se ele realmente quer excluir o item
        Alert.alert('Você está prestes a excluir o item:',
            `${itemSelected.Descricao}`,
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


        await axios.delete(`${apiMeiosDeContato}/${itemSelected.UID}`, {
            UID: itemSelected.UID,
            UIDContratante: user.UidContratante,
            Descricao: itemSelected.Descricao,
            Ativo: status,
            Atendimentos: []
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                setOpenModal(false)
                Toast.show({
                    type: 'success',
                    text1: 'Item exluido com sucesso'
                })
                onRefresh()
            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao tentar deletar o item',
                    text2: error

                })
            })

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
    const [status, setStatus] = useState(false)

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

            {
                loading === true ? '' : <FABComponent

                    onPress={() => {
                        setOpenModal(true)
                        setItemSelected([])

                    }} />
            }





            <Overlay animationType='fade' isVisible={openModal} onBackdropPress={toggleOverlay}>
                <OverlayRender openModal={openModal}
                    setOpenModal={setOpenModal}
                    input={input} setInput={setInput}
                    itemSelected={itemSelected}
                    type='contact'
                    setItemSelected={setItemSelected}
                    Save={Save}
                    setStatus={setStatus}
                    EditItem={EditItem}
                    status={status}
                    DeleteItem={DeleteItem}
                />
            </Overlay>
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },

})