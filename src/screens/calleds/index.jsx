import React from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import Header from '../../components/header';
import DatePickerHeader from '../../components/headerDatePicker';
import { Button, Overlay } from '@rneui/themed'
import { useState, useEffect, useContext } from 'react'
import SearchBarComponent from '../../components/searchBarComponent';
import { FlatList } from 'react-native';
import AtendimentList from '../../components/atendimentList';
import { useNavigation } from '@react-navigation/native';
import { apiAtendimentos } from '../../services/api';
import axios from 'axios';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';
import { ContextAuth } from '../../context';
import FabSpeed from '../../components/FabSpeedAction';
import OverlayAtendiment from '../../components/overlayAttendiment';


// import { Container } from './styles';


export default function Calleds() {
    const [selectedPicker, setSelectedPicker] = useState('')
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Nome')
    const [atendiment, setAtendiment] = useState([])
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [loading, setLoading,] = useState(false)
    const { situations, LoadSituations, user, LoadClients, Customers } = useContext(ContextAuth)

    //determina se o  modal esta aberto ou fechado
    const [open, setOpen] = useState(false);

    //const pra armazenar a pesquisa, pois o usuario inicialmente vai digitar o nome do cliente, assim que clicar em incluir atendimento
    const [searchClient, setSearchCliente] = useState('')
    const [selectedClient, setSelectedClient] = useState(null)
    const [filteredList, setFilteredList] = useState([])
    const [emptyList, setEmptyList] = useState(false)



    //consts responsaveis para gerenciar a pesquisa de atendimentos principal 
    const [searchAtendiment, setSearchAtendiment] = useState('')
    const [filteredAtendiment, setFilteredAtendiment] = useState([])

    //const navigation para navegar pra outra screen
    const navigation = useNavigation()

    //função para formatar a data no formato esperado pela api
    function FormatData(value) {
        const FormatDT = format(value, 'yyyy.MM.dd')
        return FormatDT;

    }


    //função para carregar todos os atendimentos

    async function LoadCalleds() {
        setLoading(true)

        const response = await axios.get(`${apiAtendimentos}?dataInicial=${FormatData(dateStart)}&dataFinal=${FormatData(dateEnd)}`)
        try {
            setAtendiment(response.data)
            setLoading(false)


        }
        catch {
            (error) => {
                console.log('Erro ao buscar atendimentos', error)
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'erro ao buscar atendimentos',

                })
            }
        }

    }

    useEffect(() => {
        LoadCalleds()
    }, [])

    //assim que os atendiimentos sao carregados e salvos na const de atendiments, eles ja sao salvos tambem
    //na filteredAtendimet
    useEffect(() => {
        setFilteredAtendiment(atendiment)

    }, [atendiment])

    useEffect(() => {
        LoadSituations()
        LoadClients()

    }, [])
    useEffect(() => {

        setFilteredList(Customers)
    }, [Customers])

    // reneriza a lista de clientes no modal
    function RenderClients({ item }) {

        return (



            <TouchableOpacity
                onPress={() => seleteClient(item)}
                style={{ backgroundColor: '#e6e6e6', marginTop: 10, paddingVertical: 5 }}>
                <Text style={{ fontSize: 16, }}>{item.NomeFantasia}</Text>
            </TouchableOpacity>

        )




    }
    function handleIncludeAtendiment() {
        setOpen(true)
        //navigation.navigate('addatendiment')
    }
    //quando selecionar um cliente, ele vai enviar os dados do cliente pra tela de criar atendiment
    //armazena o clliente no selected cliente e envia pra outra teka
    function seleteClient(item) {
        setSelectedClient(item)

        if (selectedClient) {
            setOpen(false)
            navigation.navigate("addatendiment", { client: selectedClient })
        }

    }

    //função pra pesquisar um cliente pra atender
    function FindByName() {
        console.log(searchClient.toUpperCase())
        if (searchClient !== '') {
            setLoading(true)
            const foundItems = Customers.filter(item => item.NomeFantasia.toUpperCase().includes(searchClient.toUpperCase()));


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
                setFilteredList(Customers);
                setTimeout(() => setLoading(false), 200)

            }
        } else {
            setFilteredList(Customers);
            setEmptyList(false)
            console.log('carregando lista original');
        }
    }


    useEffect(() => {
        FindByName()

    }, [searchClient])



    //FUNÇÕES DE PESQUISA PARA ATENDIMENTOS
    function TypeFilter() {

        if (filter === 'Todos') {
            setFilteredAtendiment(atendiment)
            if (search !== '') {
                findName()
            }
        } else if (filter === 'Cliente') {
            findName()
        } else if (filter === 'Atendente') {
            findByAtendent()
        } else if (filter === 'Protocolo') {
            findByProtocolo()
        }
    }
    //monitora a mudança entre filtros
    useEffect(() => {
        TypeFilter()
    }, [search, filter])

    function findName() {
        setLoading(true)
        if (search !== '') {
            const searchName = atendiment.filter((item) => item.Titulo.includes(search.toUpperCase()))

            if (searchName.length > 0) {
                setTimeout(() => setLoading(false), 300)
                setFilteredAtendiment(searchName)
                setEmptyList(false)

            } else {
                setTimeout(() => setLoading(false), 300)
                setEmptyList(true)
                setFilteredAtendiment([])
            }


        } else {
            setTimeout(() => setLoading(false), 300)
            setFilteredAtendiment(atendiment)
            setEmptyList(false)
        }
    }

    function findByAtendent() {
        setLoading(true)
        if (search !== '') {
            const searchName = atendiment.filter((item) => item.Atendente.includes(search.toUpperCase()))

            if (searchName.length > 0) {
                setTimeout(() => setLoading(false), 300)
                setFilteredAtendiment(searchName)
                setEmptyList(false)

            } else {
                setTimeout(() => setLoading(false), 300)
                setEmptyList(true)
                setFilteredAtendiment([])
            }


        } else {
            setTimeout(() => setLoading(false), 300)
            setFilteredAtendiment(atendiment)
            setEmptyList(false)
        }
    }
    function findByProtocolo() {
        setLoading(true)
        if (search !== '') {
            const searchName = atendiment.filter((item) => item.Protocolo === parseInt(search))

            if (searchName.length > 0) {
                setTimeout(() => setLoading(false), 300)
                setFilteredAtendiment(searchName)
                setEmptyList(false)

            } else {
                setTimeout(() => setLoading(false), 300)
                setEmptyList(true)
                setFilteredAtendiment([])
            }


        } else {
            setTimeout(() => setLoading(false), 300)
            setFilteredAtendiment(atendiment)
            setEmptyList(false)
        }
    }


    //quando o usuario escolher um espaço de datas , essa função e ativada
    //faz uma nova busca na api, com as datas novas
    function searchFilterDate() {

        LoadCalleds()

    }
    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                marginEnd: 140,
                alignItems: 'center',
                zIndex: 500
            }}>


            </View>
            <View style={{ marginTop: 10 }}>
                <View style={{ zIndex: 10000 }}>
                    <SearchBarComponent search={search} OnSearch={setSearch} type='calleds' filter={filter} setFilter={setFilter} />

                </View>
                <DatePickerHeader setDateStart={setDateStart} setDateEndd={setDateEnd} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 10, marginEnd: 10 }}>
                    <Button title='Filtrar'
                        onPress={searchFilterDate}
                        containerStyle={{ width: 100, height: 50, marginTop: 5, }}
                        buttonStyle={{ backgroundColor: '#DB6015' }}
                    />
                    <Button
                        onPress={handleIncludeAtendiment}
                        title='Incluir Atendimento'
                        containerStyle={{ width: 180, height: 50, marginTop: 5, }}
                        buttonStyle={{ backgroundColor: '#36c389' }}
                    />
                </View>

            </View>

            <View style={{ flex: 1 }}>

                {
                    loading === true ? (
                        <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#DB6015" />
                    ) : <FlatList
                        keyExtractor={(item, index) => item.UID}
                        data={filteredAtendiment}
                        renderItem={({ item }) =>
                            <AtendimentList item={item} type='calleds' />
                        } refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={LoadCalleds}
                                colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']}
                            />
                        }
                    />
                }
                {
                    emptyList === true ? (
                        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 200 }}>Nenhum atendimento encontrado.</Text>
                    ) : ''
                }

                {/**MODAL QUE SERA ABERTO ANTES DE INCLUIR O ATENDIMENTO. PARA SELECIONAR O CLIENTE QUE SERA ATENDIDO */}

            </View>
            <Overlay
                isVisible={open}
                onBackdropPress={() => setOpen(!open)}
            >
                <View style={styles.modal}>
                    <View style={{ backgroundColor: '#DB6015', justifyContent: 'center', marginBottom: 10 }}>
                        <Text style={styles.title}>Escolha o cliente que sera atendido</Text>
                    </View>

                    <SearchBarComponent search={searchClient} OnSearch={setSearchCliente} />
                    {
                        loading === true ? (
                            <ActivityIndicator size='large' />
                        ) : filteredList.length > 0 ? (
                            <FlatList
                                data={filteredList}
                                keyExtractor={(item, index) => item.UID}
                                renderItem={({ item }) => <RenderClients item={item} />}
                            />
                        ) : (
                            <Text>Nenhum item encontrado.</Text>
                        )
                    }


                </View>

            </Overlay>



        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        marginStart: 10,
        marginEnd: 10,
        flex: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'RobotoBold',
        color: 'white',

    },
    modal: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500
    }

})