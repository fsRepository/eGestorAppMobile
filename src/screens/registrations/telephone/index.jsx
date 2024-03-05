import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, SafeAreaView, ActivityIndicator, RefreshControl, Alert } from 'react-native';
// import { Container } from './styles';
import { useState, useContext } from 'react';
import SearchBarComponent from '../../../components/searchBarComponent';
import RenderList from '../../../components/renderList';
import TabButton from '../../../components/tabButton';
import ModalAdd from '../../../components/modalTelephone';
import { listaDeContatos } from '../../../services/baseDadosTeste';
import FABComponent from '../../../components/FAB';
import { ContextAuth } from '../../../context/index'
import axios from 'axios';
import { apiAgendaTelefonica } from '../../../services/api';
import Toast from 'react-native-toast-message';
export default function Telephone() {


    //pegando função pra carregar dados do contexto
    const { LoadClients, Customers, loading, setLoading, user } = useContext(ContextAuth);
    const [openModal, setOpenModal] = useState(false);


    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Nome')
    const [contacts, setContacts] = useState([])
    const [contact, setContact] = useState('')
    const [status, setStatus] = useState('')
    const [number, setNumber] = useState('')
    const [client, setClient] = useState('')
    const [vinculed, setVinculed] = useState(false)
    const [filteredList, setFilteredList] = useState([])
    const [emptyList, setEmptyList] = useState(false)
    //função para carregar a agenda telefonica da api

    async function LoadContacts() {

        setLoading(true)

        await axios.get(apiAgendaTelefonica)
            .then((res) => {

                setContacts(res.data)
                setFilteredList(res.data)
                console.log('Buscando agenda telefonica...')
                setLoading(false)

            })
            .catch((error) => {

                setLoading(false)
                console.log(error)
                Toast.show(({
                    type: 'error',
                    text1: 'Erro ao buscar agenda contatos',
                    text2: error
                }))

            })


    }


    useEffect(() => {
        LoadContacts()
        LoadClients()



    }, [])

    function Refresh() {
        LoadContacts()
    }



    //função para adicionar novo contato
    async function Add() {
        if (contact !== '' && number !== '' && client !== '') {

            const Data = {
                Contato: contact.toUpperCase(),
                Numero: number,
                UIDCliente: client,
                UIDContratante: user.UIDContratante,
                Vinculado: vinculed
            }
            await axios.post(apiAgendaTelefonica, Data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    setOpenModal(false)
                    console.log('contato salvo')
                    Refresh()
                    Toast.show(({
                        type: 'success',
                        text1: 'Contato salvo com sucesso'
                    }))
                })
                .catch((error) => {
                    console.log(error.data)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao salvar contato',
                        text2: error
                    })
                })


        }
    }


    //função pra editar contato
    async function EditItem(itemSelected) {
        try {
            // Verifica se houve alteração nos campos
            if (
                contact.toUpperCase() !== itemSelected.Contato ||
                number !== itemSelected.Numero ||
                client !== itemSelected.UIDCliente ||
                vinculed !== itemSelected.Vinculado
            ) {
                await axios.put(`${apiAgendaTelefonica}/${itemSelected.UID}`, {
                    Contato: contact.toUpperCase(),
                    Numero: number,
                    UIDCliente: client,
                    UIDContratante: user.UidContratante,
                    Vinculado: vinculed,
                    UID: itemSelected.UID
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                setOpenModal(false);
                console.log('Contato alterado');
                Refresh();
                Toast.show({
                    type: 'success',
                    text1: 'Contato alterado com sucesso.'
                });
            } else {
                Toast.show({
                    type: 'info',
                    text1: 'É preciso alterar algo para modificar o contato.'
                });
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao alterar contato.',
                text2: error.message || 'Erro desconhecido.'
            });
        }
    }


    function DeleteItem(itemSelected) {
        //pergunta ao ususario se ele realmente quer excluir o item
        Alert.alert('Você está prestes a excluir o contato:',
            `${itemSelected.Contato}`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => setOpenModal(false),
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: () => {


                        ConfirmDelete(itemSelected)



                    },
                },
            ]

        )
    }

    //deletar usuario
    async function ConfirmDelete(itemSelected) {
        await axios.delete(`${apiAgendaTelefonica}/${itemSelected.UID}`, {
            Contato: contact.toUpperCase(),
            Numero: number,
            UIDCliente: client,
            UIDContratante: user.UidContratante,
            Vinculado: vinculed,
            UID: itemSelected.UID
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(() => {
                setOpenModal(false)
                Toast.show({
                    type: 'success',
                    text1: 'Contato apagado com sucesso'
                })

                Refresh()
            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao apagar contato',
                    text2: error
                })

            })

    }

    //função pra buscar contato
    useEffect(() => {
        SearchItem()


    }, [search, filter])

    function SearchItem() {
        if (filter === 'Nome') {
            FindByName()
        }
    }

    function FindByName() {

        if (search !== '') {
            setLoading(true)
            const foundItems = contacts.filter(item => item.Contato.toUpperCase().includes(search.toUpperCase()));

            console.log(foundItems)
            try {
                if (foundItems.length > 0) {
                    setFilteredList(foundItems);
                    setTimeout(() => setLoading(false), 200)
                    setEmptyList(false)

                } else {
                    setFilteredList([])
                    console.log('Nenhum item encontrado');
                    setTimeout(() => setLoading(false), 200)
                    setEmptyList(true)
                }
                console.log(foundItems);
            } catch {
                console.log('erro ao pesquisar usuario');
                setFilteredList(contacts);
                setTimeout(() => setLoading(false), 200)

            }
        } else {
            setFilteredList(contacts);
            setEmptyList(false)
            console.log('carregando lista original');
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ zIndex: 1000 }}>
                <SearchBarComponent search={search} OnSearch={setSearch} filter={filter} setFilter={setFilter} type='Contact' />
            </View>
            {
                emptyList === true ? (
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 200 }}>Nenhum contato encontrado!</Text>
                ) : ''
            }

            {
                loading === true ? <ActivityIndicator size='large' color='#DB6015' /> :
                    (
                        <FlatList
                            vertical
                            data={filteredList}
                            keyExtractor={item => String(item.UID)}
                            renderItem={({ item }) => <RenderList
                                type='Contact'
                                item={item}
                                contact={contact}
                                setContact={setContact}
                                setNumber={setNumber}
                                setClient={setClient}
                                setVinculed={setVinculed}
                                number={number}
                                client={client}
                                vinculed={vinculed}
                                EditItem={EditItem}
                                DeleteItem={DeleteItem}


                            />

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
            {
                loading === true ? '' : (
                    <FABComponent onPress={() => setOpenModal(true)} />
                )
            }


            <Modal
                transparent={true}
                animationType='slide'
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View >
                            <ModalAdd closeModal={() => setOpenModal(false)}
                                setStatus={setStatus}
                                customers={Customers} type='Contact'
                                contact={contact} setContact={setContact}
                                setNumber={setNumber}
                                setClient={setClient}
                                setVinculed={setVinculed}
                                number={number}
                                client={client}
                                vinculed={vinculed}
                                Add={Add}
                                EditItem={EditItem}

                            />
                        </View>
                    </View>
                </View>
            </Modal>



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

        marginTop: 10,
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 350,
        height: 500,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5
    },
});