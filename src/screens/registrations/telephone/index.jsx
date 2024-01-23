import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
// import { Container } from './styles';
import { useState, useContext } from 'react';
import SearchBarComponent from '../../../components/searchBarComponent';
import RenderList from '../../../components/renderList';
import TabButton from '../../../components/tabButton';
import ModalAdd from '../../../components/modalTelephone';
import { listaDeContatos } from '../../../services/baseDadosTeste';
import FABComponent from '../../../components/FAB';
import { ContextAuth } from '../../../context/index'

export default function Telephone() {


    //pegando função pra carregar dados do contexto
    const { LoadClients, Customers, loading } = useContext(ContextAuth);
    const [openModal, setOpenModal] = useState(false);
    console.log(openModal)

    const [search, setSearch] = useState('')


    useEffect(() => {

        LoadClients()



    }, [])

    function Refresh() {
        LoadClients()
    }

    return (
        <SafeAreaView style={styles.container}>

            <SearchBarComponent search={search} setSearch={setSearch} />

            {
                loading === true ? <ActivityIndicator size='large' color='#DB6015' /> :
                    (
                        <FlatList
                            vertical
                            data={Customers}
                            keyExtractor={item => String(item.UID)}
                            renderItem={({ item }) => <RenderList type='Contact' item={item} />

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
                            <ModalAdd closeModal={() => setOpenModal(false)} />
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