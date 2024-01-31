import { View, Text, StyleSheet, FlatList, Modal, ActivityIndicator, RefreshControl, ScrollView, Alert } from "react-native"
import SearchBarComponent from "../../../components/searchBarComponent"
import { useState, useEffect, useContext } from 'react'
import { ContextAuth } from "../../../context"
import { listaDeContatos } from "../../../services/baseDadosTeste"
import RenderList from "../../../components/renderList"
import { FAB, Overlay } from "@rneui/themed"
import FABComponent from "../../../components/FAB"
import ModalAdd from "../../../components/modalTelephone"
import axios from "axios"
import { apiUsuarios } from "../../../services/api"
import Toast from 'react-native-toast-message'

export default function AddUsers() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Nome')
    const [openModal, setOpenModal] = useState(false)
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(false)
    const [Representante, setRepresentante] = useState(false)
    const [Adm, setAdm] = useState(false)
    const [filteredList, setFilteredList] = useState()
    const [emptyList, setEmptyList] = useState(false)
    const { user, users, LoadUsers, loading, setLoading } = useContext(ContextAuth)
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {

        LoadUsers()

    }, [])
    function Refresh() {
        LoadUsers()
    }
    useEffect(() => {
        setFilteredList(users)

    }, [users])
    // função para dicionar um novo usuario no sistemas
    async function Add() {
        if (contact !== '' && email !== '' && password !== '') {
            await axios.post(apiUsuarios, {

                UIDContratante: user.UidContratante,
                Nome: contact.toUpperCase(),
                Email: email,
                Password: password,
                Ativo: status,
                Representante: Representante,
                Adm: Adm,
                Atendimentos: []
            },
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(() => {
                    console.log('usuario cadastrado')
                    setOpenModal(false)
                    Toast.show({
                        type: 'success',
                        text1: 'Usuario cadastrado com sucesso'
                    })
                    LoadUsers()


                })
                .catch((error) => {
                    console.log('erro ao cadastrar usuario', error)
                })
        } else {
            Toast.show({
                type: "info",
                text1: 'Preencha os campos vazios para continuar'
            })
        }
    }

    //editar alguma informação do usuario
    async function EditItem(itemSelected) {
        if (itemSelected.Nome !== contact || itemSelected.Password !== password || itemSelected.Email !== email) {

            await axios.put(`${apiUsuarios}/${itemSelected.UID}`, {
                UID: itemSelected.UID,
                UIDContratante: user.UidContratante,
                Nome: contact.toUpperCase(),
                Email: email,
                Password: password,
                Ativo: status,
                Representante: Representante,
                Atendimentos: []
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

            )
                .then(() => {
                    setOpenModal(false)
                    Toast.show({
                        type: 'success',
                        text1: 'Usuario alterado com sucesso'
                    })

                    LoadUsers()
                })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao editar item',
                        text2: error
                    })

                })



        } else {
            console.log('é preciso alterar algo para editar')
            Toast.show({
                type: 'info',
                text1: 'Atenção',
                text2: 'nenhuma alteração foi feita'
            })
        }
    }

    function DeleteItem(itemSelected) {
        //pergunta ao ususario se ele realmente quer excluir o item
        Alert.alert('Você está prestes a excluir o usuário:',
            `${itemSelected.Nome}`,
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
        await axios.delete(`${apiUsuarios}/${itemSelected.UID}`, {
            UID: itemSelected.UID,
            UIDContratante: user.UIDContratante,
            Nome: contact.toUpperCase(),
            Email: email,
            Password: password,
            Ativo: status,
            Representante: Representante,
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
                    text1: 'Usuário apagado com sucesso'
                })

                LoadUsers()
            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao apagar usuário',
                    text2: error
                })

            })

    }


    useEffect(() => {
        SearchItem()


    }, [search, filter])

    function SearchItem() {
        if (filter === 'Nome') {
            FindByName()
        }
    }

    function FindByName() {
        console.log(search.toUpperCase())
        if (search !== '') {
            setLoading(true)
            const foundItems = users.filter(item => item.Nome.toUpperCase().includes(search.toUpperCase()));

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
                setFilteredList(users);
                setTimeout(() => setLoading(false), 200)

            }
        } else {
            setFilteredList(users);
            setEmptyList(false)
            console.log('carregando lista original');
        }
    }




    return (
        <View style={styles.container}>
            <View style={{ zIndex: 1000 }}>
                <SearchBarComponent search={search} setSearch={setSearch} filter={filter} OnSearch={(value) => setSearch(value)} type='users' />
            </View>
            {
                emptyList === true ?
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 200 }}>Nenhum usuário encontrado</Text> :
                    ''
            }

            {

                loading === true ? <ActivityIndicator size='large' color='#DB6015' /> :
                    <FlatList
                        vertical
                        data={filteredList}
                        keyExtractor={(item, index) => item.UID}
                        renderItem={({ item }) =>
                            <RenderList item={item} type='addUser'

                                contact={contact}
                                setContact={setContact}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                email={email}
                                password={password}
                                Add={Add}
                                status={status}
                                setStatus={setStatus}
                                Adm={Adm}
                                setAdm={setAdm}
                                Representante={Representante}
                                setRepresentante={setRepresentante}
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




            }
            {
                loading === true ? '' :
                    (


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
                            <ModalAdd
                                closeModal={() => setOpenModal(false)}
                                type='addUser'
                                contact={contact}
                                setContact={setContact}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                email={email}
                                password={password}
                                Add={Add}
                                status={status}
                                setStatus={setStatus}
                                Adm={Adm}
                                setAdm={setAdm}
                                Representante={Representante}
                                setRepresentante={setRepresentante}


                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
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
})