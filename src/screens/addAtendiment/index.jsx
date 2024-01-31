import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Input, Button, Tab, TabView, CheckBox } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { listaDeContatos, } from '../../services/baseDadosTeste';
import { format } from 'date-fns'
import { ContextAuth } from '../../context';
// import { Container } from './styles';
import Icon from 'react-native-vector-icons/AntDesign'
import { useRoute } from '@react-navigation/native';
import FabSpeed from '../../components/FabSpeedAction';
import SearchBarComponent from '../../components/searchBarComponent';


export default function AddAtendimentt() {
    const { LoadMotives, motives, user, LoadClients, Customers, LoadUsers,
        users,
        userRepres, LoadItems,
        contactMethods, LoadSituations,
        situations, } = useContext(ContextAuth)

    //const com os tipos de filtros




    //controle do estado do dropdown
    const [openDrop, setOpenDrop] = useState(false)
    const [openDropCustomer, setOpenDropCustomer] = useState(false)
    const [openDropAtendant, setOpenDropAtendant] = useState(false)
    const [openDropContact, setOpenDropContact] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState('')
    const [selectedAtendent, setSelectedAtendent] = useState('')
    const [selectedContac, setSelectedContact] = useState('')
    const [cgi, setCgi] = useState('')
    const [protocol, setProtocol] = useState('')
    const [solicit, setSolicit] = useState('')
    const [phone, setPhone] = useState('')
    const [reason, setReason] = useState('')
    const [selectedSistem, setSelectedSistem] = useState('')
    const [selectedView, setSelectedView] = useState('')
    const [desc, setDesc] = useState('')
    const [solution, setSolution] = useState('')
    const [trello, setTrello] = useState('')
    const [selectedAtendentTransfer, setSelectedAtendentTranfer] = useState('')
    const [statusSelected, setStatusSelected] = useState('')
    const [ckekboxVisible, setChekVisible] = useState(false)
    const [openTab, setOpenTab] = useState(false)
    //pega a data atual e salva na const
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());

    const [dateEnd, setDateEnd] = useState('')

    //recebe o item clicado
    const route = useRoute();
    const { item } = route.params || {};

    //serve para controlar cada tabview
    const [index, setIndex] = useState(0)

    //pesquisa do searchbar
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')

    //salvar o cliente ao pesquisar
    const [filteredCustomers, setFilteredCostumers] = useState([])

    //carrega os motivos
    useEffect(() => {


        LoadMotives()
        LoadClients()
        LoadUsers()
        LoadItems()
        LoadSituations()

    }, [])


    //se caso tiver um item selecionado, ele seta com as informações
    useEffect(() => {

        if (item) {
            setProtocol(item.Protocolo)
            setSolicit(item.Solicitante)
            setPhone(item.Telefone)
            setSelectedAtendent(item.Atendente)
            setSelectedCustomer(item.Titulo)
            setSelectedContact(item.Tipo_contato)
            setDate(item.Data_atend_ini)  // Certifique-se de que seja um objeto Date válido
            setHour(item.Hora_atendimento)
            setSelectedSistem(item.Ocorrencias[0].Sistema)
            setDesc(item.Ocorrencias[0].Descricao)
            setReason(item.Ocorrencias[0].Motivo)
            setSolution(item.Ocorrencias[0].Solucao)
            setTrello(item.Link)
            setSelectedAtendentTranfer(item.Transferido)
            setStatusSelected(item.Situacao)
            setSelectedView(item.Ocorrencias[0].Tela)
        }
    }, [item])


    //formata data e hora
    function formatDt(value) {
        console.log(value); // Adicione este log
        const formateDate = format(value, 'dd/MM/yyyy');
        return formateDate;
    }

    function Formathr(value) {
        console.log(value); // Adicione este log
        const formateHour = format(value, 'HH:mm:ss');
        return formateHour;
    }





    //função para percorrer a lista de contatos e pegar somente os nomes dos clientes
    const customer = Customers.map((item) => ({
        label: item.NomeFantasia,
        value: item.UID
    }))
    const atendants = users.map((item) => ({
        label: item.Nome,
        value: item.UID
    }))
    const contacts = contactMethods.map((item) => ({
        label: item.Descricao,
        value: item.Descricao
    }))
    const situation = situations.map((item) => ({
        label: item.Descricao,
        value: item.Descricao
    }))


    //QUANDO O CLIENTE FOR SELECIONADO, QUERO PEGAR O CGI DELE ALTOMATICAMENTE
    function LoadCGIClient() {
        console.log('uid do cliente', selectedCustomer)
        if (selectedCustomer != null) {
            const searchUID = Customers.filter((item) => item.UID.includes(selectedCustomer))
            console.log('comparando', selectedCustomer, 'com', searchUID[0].CGI)
            setCgi(searchUID[0].CGI)

        }
    }

    useEffect(() => {

        LoadCGIClient()
    }, [selectedCustomer])

    function handleCheked(id) {
        setReason(id)
        console.log(reason)
        setChekVisible(false)
    }
    return (

        <SafeAreaView style={{ flex: 1 }}>



            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3
                }}
                containerStyle={{ backgroundColor: '#DB6015' }}
                variant='primary'
            >
                <Tab.Item title='Atendimento'
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'timer', type: 'ionicon', color: 'white' }}

                />
                <Tab.Item title='Motivo'
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'profile', type: 'antdesign', color: 'white' }}

                />




            </Tab>

            <TabView value={index} onChange={setIndex} animationType='spring'>
                <TabView.Item style={{ width: '100%' }}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.container}>

                        {
                            item ? '' :
                                <View style={{ zIndex: 500 }}>
                                    <SearchBarComponent
                                        search={search}
                                        OnSearch={setSearch}
                                        filter={selectedFilter}
                                        setFilter={setSelectedFilter}
                                        type='addAtendiment'
                                    />


                                </View>

                        }


                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, width: 200, padding: 6, borderRadius: 6, marginBottom: 5 }}>


                            <View style={{ backgroundColor: 'white', padding: 6 }}>
                                <Text style={styles.label}>Data</Text>
                                <Text>{formatDt(date).toString()}</Text>
                            </View>
                            <View style={{ backgroundColor: 'white', padding: 6 }}>
                                <Text style={styles.label}>Hora</Text>
                                <Text>{Formathr(hour).toString()}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center' }}>


                            <Text style={styles.label}>Cliente</Text>
                            <DropDownPicker
                                style={styles.picker}
                                items={customer}
                                open={openDropCustomer}
                                value={selectedCustomer}
                                setOpen={setOpenDropCustomer}
                                setValue={setSelectedCustomer}

                                placeholder={item ? selectedCustomer : 'Todos'}

                            />
                            <View >
                                <View>
                                    <Text style={styles.label}>CGI</Text>
                                    <Input
                                        value={cgi}
                                        onChangeText={(text) => { setCgi(text) }}
                                        keyboardType='numeric'
                                        inputStyle={{ borderWidth: 1, borderRadius: 6, backgroundColor: 'white', borderColor: 'white' }}
                                        containerStyle={{ width: 100, }}
                                        disabled={true}
                                    />

                                </View>










                            </View>

                            <View>
                                <Text style={styles.label}>Protocolo</Text>
                                {
                                    item ?
                                        <Text style={{
                                            borderRadius: 6,
                                            backgroundColor: 'white',
                                            borderColor: 'white',
                                            fontSize: 18,
                                            marginStart: 10,
                                            width: 100, marginBottom: 10, height: 40
                                        }}>{protocol}</Text> :
                                        <Input
                                            value={protocol}
                                            onChangeText={(text) => { setProtocol(text) }}
                                            keyboardType='numeric'
                                            inputStyle={{ borderWidth: 1, borderRadius: 6, backgroundColor: 'white', borderColor: 'white' }}
                                            containerStyle={{ width: 100, }}
                                            disabled={true}
                                        />
                                }


                            </View>

                        </View>

                        <Text style={styles.label}>Solicitante</Text>
                        <Input
                            value={solicit}
                            onChangeText={(text) => { setSolicit(text) }}
                            keyboardType='default'
                            inputStyle={styles.input}
                            containerStyle={styles.containerInput}
                        />

                        <Text style={styles.label}>Telefone</Text>
                        <Input
                            value={phone}
                            onChangeText={(text) => { setPhone(text) }}
                            keyboardType='numeric'
                            inputStyle={styles.input}
                            containerStyle={styles.containerInput}
                        />



                        <Text style={styles.label}>Atendente</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={atendants}
                            open={openDropAtendant}
                            value={selectedAtendent}
                            setOpen={setOpenDropAtendant}
                            setValue={setSelectedAtendent}

                            placeholder={item ? selectedAtendent : 'Todos'}

                        />
                        <Text style={styles.label}>Meios de Contato</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={contacts}
                            open={openDropContact}
                            value={selectedContac}
                            setOpen={setOpenDropContact}
                            setValue={setSelectedContact}

                            placeholder={item ? selectedContac : 'Todos'}

                        />
                        {
                            selectedContac === 'WHATSAPP' ?
                                <View>


                                    <Text style={styles.label}>Protocolo Whatsapp</Text>
                                    <Input
                                        value={phone}
                                        onChangeText={(text) => { setPhone(text) }}
                                        keyboardType='numeric'
                                        inputStyle={styles.input}
                                        containerStyle={styles.containerInput}
                                        disabled={true}
                                    />
                                </View> : null
                        }





                    </ScrollView>

                </TabView.Item>
                <TabView.Item style={{ width: "100%" }}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.container}>
                        <Text style={styles.label}>Motivo</Text>
                        {
                            ckekboxVisible ?
                                motives.map((item) =>
                                (
                                    <CheckBox
                                        center
                                        title={item.Motivo}
                                        checkedColor='green'
                                        checked={reason === item.Motivo}
                                        onPress={() => handleCheked(item.Motivo)}
                                    />
                                )
                                )
                                : (<TouchableOpacity onPress={() => setChekVisible(true)}>
                                    <Text style={{ color: 'red' }}>Mostrar Opções</Text>
                                </TouchableOpacity>
                                )

                        }

                        {
                            reason !== '' ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5, backgroundColor: 'white', padding: 6 }}>

                                    <Icon name='checksquareo' size={24} color='green' />
                                    <Text style={styles.label}>{reason}</Text>
                                </View>
                            ) : ''
                        }

                        <Input

                            label='Sistema'
                            value={selectedSistem}
                            onChangeText={(text) => setSelectedSistem(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput, { marginTop: 10 }]}
                        />

                        <Input

                            label='Tela'
                            value={selectedView}
                            onChangeText={(text) => setSelectedView(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput, { marginTop: 10 }]}
                        />
                        <Input

                            label='Descrição'
                            multiline
                            value={desc}
                            onChangeText={(text) => setDesc(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput, { flexWrap: 'wrap' }]}

                        />
                        <Input

                            label='Solução'
                            multiline
                            value={solution}
                            onChangeText={(text) => setSolution(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput]}
                        />
                        <Input

                            label='Link Trello'
                            value={trello}
                            onChangeText={(text) => setTrello(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput]}
                        />

                        <Text style={styles.label}>Transferido para</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={atendants}
                            open={openDropContact}
                            value={selectedContac}
                            setOpen={setOpenDropContact}
                            setValue={setSelectedContact}

                            placeholder={item ? selectedAtendentTransfer : 'Todos'}

                        />

                        <Text style={styles.label}>Situação</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={situation}
                            open={openDropCustomer}
                            value={statusSelected}
                            setOpen={setOpenDropCustomer}
                            setValue={setStatusSelected}

                            placeholder='Todos'

                        />



                    </ScrollView>
                </TabView.Item>

            </TabView>
            <FabSpeed openTab={openTab} setOpenTab={setOpenTab} itemSelected={item} />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginStart: 10,
        marginEnd: 10,
        marginTop: 10,

    },
    title: {
        fontSize: 20,
        fontFamily: 'RobotoMedium',


    },
    picker: {
        width: 300,
        borderColor: 'white',

        backgroundColor: 'white',
        zIndex: 100,
        marginTop: 5,
        marginBottom: 5


    },
    label: {
        fontSize: 16,
        fontFamily: 'RobotoRegular',

    },
    input: {
        width: 400,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'white',
        borderColor: 'white'


    },

    title: {
        marginTop: 30,
        fontSize: 20,
        marginStart: 10,
        fontFamily: 'RobotoMedium',
        color: 'white', marginBottom: 10
    },

    containerInput: {
        marginTop: 10,
        marginEnd: 10,
        width: 400
    },

    input: {
        borderBottomWidth: 1,
        borderColor: '#e6e6e6e6',
        width: 300
    },
    inputFocus: {
        borderBottomWidth: 1,
        borderColor: '#DB6015',
        width: 300
    },
})