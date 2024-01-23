import { View, Text, StyleSheet, FlatList, Modal, ActivityIndicator, RefreshControl } from "react-native"
import SearchBarComponent from "../../../components/searchBarComponent"
import { useState, useEffect } from 'react'
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
    const [openModal, setOpenModal] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    async function LoadUsers() {
        setLoading(true)
        const response = await axios.get(apiUsuarios)
            .then((response) => {
                console.log(response.data)
                setUsers(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao buscar usuários'
                })
            })
    }

    useEffect(() => {

        LoadUsers()

    }, [])
    function Refresh() {
        LoadUsers()
    }
    return (
        <View style={styles.container}>
            <SearchBarComponent search={search} setSearch={setSearch} />
            {

                loading === true ? <ActivityIndicator size='large' color='#DB6015' /> :
                    <FlatList
                        data={users}
                        keyExtractor={(item, index) => item.UID}
                        renderItem={({ item }) =>
                            <RenderList item={item} type='addUser' />
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



        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 10,

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