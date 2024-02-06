import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
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
import axios from 'axios';
import { apiAtendimentos, apiAtendimentosOcorrencias } from '../../services/api';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function AddAtendimentt() {
    const { LoadMotives, motives, user, LoadClients, Customers, LoadUsers,
        users,
        userRepres, LoadItems,
        contactMethods, LoadSituations,
        situations, loading, setLoading, LoadSystems,
        sistems, LoadTelas,
        telasSistem } = useContext(ContextAuth)

    //const com os tipos de filtros



    //const de navegacao
    const navigation = useNavigation()
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
    const [selectedAtendentTransfer, setSelectedAtendentTranfer] = useState('00000000-0000-0000-0000-000000000000')
    const [statusSelected, setStatusSelected] = useState('')
    const [ckekboxVisible, setChekVisible] = useState(false)
    const [openTab, setOpenTab] = useState(false)
    const [uidCliente, setUidCliente] = useState('')

    const [uidReason, setUidReason] = useState('')
    //pega a data atual e salva na const
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());

    const [dateEnd, setDateEnd] = useState(new Date())
    const [hourEnd, setHourEnd] = useState(new Date())
    const [fimTime, setFimTime] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [ocorrencias, setOcorrencias] = useState([])
    //recebe o item clicado
    const route = useRoute();
    const { item, client } = route.params || {};


    //armazena o uid do atendimento no momento que o atendimento e iniciado
    const [uidAtendimento, setUidAtendimento] = useState('')
    //serve para controlar cada tabview
    const [index, setIndex] = useState(0)




    //carrega os motivos
    useEffect(() => {


        LoadMotives()
        LoadClients()
        LoadUsers()
        LoadItems()
        LoadSituations()
        LoadSystems()
        LoadTelas()


    }, [])


    //se caso tiver um item selecionado, ele seta com as informações
    useEffect(() => {
        setLoading(true)
        if (item) {
            setProtocol(item.Protocolo)
            setSolicit(item.Solicitante)
            setPhone(item.Telefone)
            setSelectedAtendent(item.Atendente)
            setSelectedCustomer(item.Titulo)
            setSelectedContact(item.Tipo_contato)
            setDate(item.Data_atend_ini)
            setHour(item.Hora_atendimento)
            setSelectedSistem(item.Ocorrencias[0].Sistema)
            setDesc(item.Ocorrencias[0].Descricao)
            setReason(item.Ocorrencias[0].Motivo)
            setSolution(item.Ocorrencias[0].Solucao)
            setTrello(item.Link)
            setSelectedAtendentTranfer(item.Transferido)
            setStatusSelected(item.SituacaoUID)
            setSelectedView(item.Ocorrencias[0].Tela)
            setDisabled(true)
            setLoading(false)
            setUidCliente(item.UIDTitulo)
            setDateEnd(item.Data_conclusao)
            setHourEnd(item.Hora_conclusao)
            setFimTime(item.Tempo_conclusao)

            LoadCGIClient()


            if (item.Data_atend_ini) {
                setDate(item.Data_atend_ini)

            }
        } else {
            setCgi('')
            setSelectedCustomer('')
            setLoading(false)
        }
    }, [item])

    //quando o usuario escolher um cliente antes de abrir o atendimento, o nome do cliente e cgi, ja sera setado na tela de atendimento
    useEffect(() => {
        if (client) {
            setSelectedCustomer(client.Nome)
            setCgi(client.CGI)
            setUidCliente(client.UID)

        }

    }, [])
    //formata data e hora
    function formatDt(value) {

        const formateDate = format(value, 'dd/MM/yyyy');
        return formateDate;
    }

    function Formathr(value) {

        const formateHour = format(value, 'HH:mm:ss');
        return formateHour;
    }





    //função para percorrer a lista de contatos e pegar somente os nomes dos clientes
    const customer = Customers.map((item) => ({
        label: item.NomeFantasia,
        value: item.Nome
    }))
    const atendants = users.map((item) => ({
        label: item.Nome,
        value: item.UID
    }))
    const contacts = contactMethods.map((item) => ({
        label: item.Descricao,
        value: item.UID
    }))
    const situation = situations.map((item) => ({
        label: item.Descricao,
        value: item.UID
    }))
    const sistempicker = sistems.map((item) => ({
        label: item.Sistema,
        value: item.UID
    }))
    const [telaPickerlist, setTelaPickerlist] = useState(telasSistem);

    const telaPicker = telaPickerlist.map((item) => ({
        label: item.Descricao,
        value: item.UID
    }));


    function SearchTelaSistem() {
        if (selectedSistem) {
            const filter = telasSistem.filter((item) => item.UIDSistema === selectedSistem);
            setTelaPickerlist(filter || []); // Defina como array vazio se filter for nulo ou vazio
        } else {
            setTelaPickerlist(telasSistem);
        }
    }

    useEffect(() => {
        SearchTelaSistem()
    }, [selectedSistem])






    function SearchMotive() {
        const search = motives.filter((item) => item.Motivo.includes(reason))
        setUidReason(search[0]?.UID)

    }
    useEffect(() => {

        SearchMotive()
    }, [reason])
    //QUANDO O CLIENTE FOR SELECIONADO, QUERO PEGAR O CGI DELE ALTOMATICAMENTE
    function LoadCGIClient() {
        console.log('Iniciando LoadCGIClient');

        if (item && item.Titulo) {
            const searchResult = Customers.filter(
                (customer) =>
                    customer.NomeFantasia.toLowerCase().includes(item.Titulo.toLowerCase()) ||
                    customer.Nome.toLowerCase().includes(item.Titulo.toLowerCase())
            );

            if (searchResult.length > 0) {
                console.log('Cliente encontrado:', searchResult[0].NomeFantasia);
                setCgi(searchResult[0].CGI);
                // Aqui você pode fazer o que precisa com o cliente encontrado, como setCgi(searchResult[0].CGI)
            } else {
                console.log('Nenhum cliente encontrado para:', item.Titulo);
            }
        } else {
            console.log('Item ou item.Titulo é indefinido. Não é possível executar a busca.');
        }

        console.log('Finalizando LoadCGIClient');
    }



    function handleCheked(id) {
        setReason(id)
        setChekVisible(false)
    }

    //função para somar data e hora no momento de finalizar o chamado




    //função para buscar ocorencias


    //função pra verificar o status do atendimento  e modificar a data final
    /* function Status() {
 
         if (statusSelected === 'e6ddfaea-c342-4405-99b1-389d6b484e17') {
             console.log('removendo data fim')
             setFimTime('')
             setDateEnd('')
             setHourEnd('')
         }
     }
     useEffect(() => {
 
         Status()
     }, [statusSelected])
 */

    //calcula o tempo total gasto no atendimento
    function SomeHours() {

        let duration = ''; // Variável para armazenar a duração do atendimento

        // Verifica se o status do atendimento é "Concluído"
        if (!item && statusSelected === '6568b706-d486-4ad3-9817-1d5858135703') {
            // Formata as datas e horas no formato correto
            const startTimeString = `${format(date, 'yyyy-MM-dd')}T${format(hour, 'HH:mm:ss')}`;
            const endTimeString = `${format(dateEnd, 'yyyy-MM-dd')}T${format(hourEnd, 'HH:mm:ss')}`;

            // Cria novos objetos Date para a hora inicial e final
            const startTime = new Date(startTimeString);
            const endTime = new Date(endTimeString);

            // Verifica se as datas são válidas
            if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
                // Calcula a diferença entre as datas em milissegundos
                const timeDifference = endTime.getTime() - startTime.getTime();

                // Calcula as horas, minutos e segundos a partir da diferença em milissegundos
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                // Formata a duração do atendimento como uma string
                duration = `${hours}:${minutes}:${seconds}`;
                console.log(duration)
                setFimTime(duration)
            } else {
                console.log('Horário de início ou término inválido.');
            }
        } else {
            console.log('O atendimento ainda não está concluído.');
        }

        // se eu tiver um atendimnento e quiser encerrar, ele vem pra ca
        if (item) {
            if (item.Situacao === 'CONCLUÍDO') {
                console.log('O atendimento já foi encerrado')
            } else if (statusSelected === '6568b706-d486-4ad3-9817-1d5858135703') {
                console.log('Voce esta prestes a encerrar o atendimento')
                setDateEnd(new Date())
                setHourEnd(new Date())
                console.log('data inicial', date, 'date final', dateEnd, 'hora inicial:', hour, 'hora fincal: ', hourEnd)
                const startTimeString = `${format(date, 'yyyy-MM-dd')}T${hour}`// Usa a data inicial fornecida
                const hourEndString = `${format(dateEnd, 'HH:mm:ss')}`;
                const endTimeString = `${format(dateEnd, 'yyyy-MM-dd')}T${hourEndString}`;
                // Combina a data final e o horário final fornecidos
                const startTime = new Date(startTimeString);
                const endTime = new Date(endTimeString);

                // Verifica se as datas são válidas
                if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
                    // Calcula a diferença entre as datas em milissegundos
                    const timeDifference = endTime.getTime() - startTime.getTime();

                    // Calcula as horas, minutos e segundos a partir da diferença em milissegundos
                    const totalSeconds = Math.floor(timeDifference / 1000);
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;

                    // Formata a duração do atendimento como uma string
                    // Formata a duração do atendimento como uma string
                    const formattedHours = String(hours).padStart(2, '0');
                    const formattedMinutes = String(minutes).padStart(2, '0');
                    const formattedSeconds = String(seconds).padStart(2, '0');
                    duration = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
                    console.log('duracao', duration);
                    setFimTime(duration)

                } else {
                    console.log('Horário de início ou término inválido.');
                }


            }
        }

        // Retorna a duração do atendimento
        return duration;

    }





    useEffect(() => {
        SomeHours()
    }, [statusSelected, item])

    //função para adicionar ocorrencia
    async function handleAddOcorrencia(uid) {
        const data = {
            UIDAtendimento: uid,
            UIDSistema: selectedSistem,
            UIDTela: selectedView,
            UIDMotivo: uidReason,
            Descricao: desc.toUpperCase(),
            Solucao: solution.toUpperCase(),

        }
        console.log(data)
        await axios.post(apiAtendimentosOcorrencias, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: ' O atendimento foi iniciado'
                }),
                    navigation.navigate('calleds')
            }).catch((error) => {
                console.log('erro ao abrir ocorrencia', error)
                Toast.show({
                    type: 'error',
                    text1: error,
                    text2: 'Erro ao abrir ocorrencia'
                })
            }
            )

    }

    // função para adicionar um atendimento
    async function Add() {
        if (selectedAtendent !== ' ' && selectedContac !== '' && selectedSistem !== '' && selectedView !== '' && statusSelected !== '' && reason !== '') {
            try {


                const data = {
                    Ativo: true,
                    Motivo: reason,
                    UIDContratante: user.UidContratante,
                    Titulo: selectedCustomer,
                    UIDTitulo: uidCliente,
                    Solicitante: solicit,
                    Atendente: selectedAtendent,
                    // Atendente: selectedAtendent,
                    //ExecutorUID: uidAtendent,
                    Executor: selectedAtendent,
                    Data_atend_ini: date,
                    Hora_atendimento: Formathr(hour),
                    Data_conclusao: dateEnd,
                    Hora_conclusao: Formathr(hourEnd),
                    Tempo_conclusao: fimTime,
                    Situacao: statusSelected,
                    Telefone: phone,
                    Tipo_contato: selectedContac,
                    Transferido: selectedAtendentTransfer,
                    Link: trello,
                    Sistema: selectedSistem,
                    //Representante: null,





                }

                console.log(data)
                const response = await axios.post(apiAtendimentos, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        console.log('response:', res.data)
                        let uid = res.data.UID
                        if (res) {
                            handleAddOcorrencia(uid)
                        }


                    })
                    .catch((error) => console.log(error))





            }

            catch (error) {
                console.error("Erro na chamada axios.post:", error);

                if (error.response) {
                    console.error("Dados do erro na resposta:", error.response.data);
                }

                // Tratar o erro adequadamente ou lançar novamente para ser capturado no nível mais alto.
                throw error;
            }



        } else {
            Toast.show({
                type: 'info',
                text1: 'Preencha os campos vazios para continuar'
            })
            console.log('Preencha os campos para continuar ')
        }

    }


    //função para editar o atendimento
    // quando se tem um item selecionado, recebemos os campos com o nome do cliente, atendente e etc, porem o banco so recebe o uid
    //funções pora encontrar os uisd com base nos nomes

    const [uidAtendent, setUidAtendente] = useState('')
    const [uidContact, setidContact] = useState('')
    const [uidSistem, setUidSistem] = useState('')
    function searchAtendent() {
        const search = users.filter((item) => item.Nome === selectedAtendent)
        setUidAtendente(search[0]?.UID)

    }
    function SearchContact() {
        const search = contactMethods.filter((item) => item.Descricao === selectedContac)
        setidContact(search[0]?.UID)
    }
    function searchSistem() {
        const search = sistems.filter((item) => item.Sistema === selectedSistem)
        setUidSistem(search[0]?.UID)

    }

    useEffect(() => {
        searchAtendent()
        SearchContact()
        searchSistem()
        searchTela()
    }, [item, selectedAtendent, selectedContac, selectedSistem])
    async function Edit() {

        if (item.Situacao === 'CONCLUÍDO' || item.Situacao === 'CONCLUIDO POR INATIVIDADE') {
            Toast.show({
                text1: 'O atendimento já foi finalizado!',
                type: 'info'
            })
            setDisabled(true)
        } else {
            setDisabled(false)
            setDateEnd(new Date())
            setHourEnd(new Date())
            if (disabled === false) {

                const uid = item.UID
                const protoclo = item.Protocolo
                const data = {
                    Ativo: true,
                    UID: uid,
                    Protocolo: protoclo,
                    Motivo: reason,
                    UIDContratante: user.UidContratante,
                    Titulo: selectedCustomer,
                    UIDTitulo: uidCliente,
                    Solicitante: solicit,
                    Atendente: uidAtendent,
                    Executor: uidAtendent,
                    Data_atend_ini: date,
                    Hora_atendimento: hour,
                    Data_conclusao: dateEnd,
                    Hora_conclusao: Formathr(hourEnd),
                    Tempo_conclusao: fimTime,
                    Situacao: statusSelected,
                    Telefone: phone,
                    Tipo_contato: uidContact,
                    Transferido: uidAtendent,
                    Link: trello,
                    Sistema: uidSistem,





                }
                console.log(data)

                const response = await axios.put(`${apiAtendimentos}/${uid}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }


                }
                ).then((res) => {

                    console.log('Iniciando Ocorrencia')
                    EdiOcorrencia(uid)

                })
                    .catch((error) => {
                        console.log('Erro ao editar atendimento')
                        console.log(error.response.data)
                        Toast.show({
                            type: 'error',
                            text1: 'Erro ao editar atendimento',
                            text2: error
                        })
                    })
            }

        }



    }

    const [uidTela, setUidTela] = useState('')
    function searchTela() {
        const searh = telasSistem.filter((item) => item.Descricao === selectedView)
        setUidTela(searh[0]?.UID)
    }

    async function EdiOcorrencia(uid) {
        const uidOcorrencia = item.Ocorrencias[0]?.UIDOcorrencia
        const data = {
            UIDAtendimento: uid,
            UIDOcorrencia: uidOcorrencia,
            UIDSistema: uidSistem,
            UIDTela: uidTela,
            UIDMotivo: uidReason,
            Descricao: desc.toUpperCase(),
            Solucao: solution.toUpperCase(),

        }
        console.log(data)
        await axios.put(`${apiAtendimentosOcorrencias}/${uidOcorrencia}/${uid}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: ' O atendimento foi alterado'
                })
                navigation.navigate('calleds')
            }).catch((error) => {
                console.log('erro ao abrir ocorrencia', error)
                console.log(error.response.data)
                Toast.show({
                    type: 'error',
                    text1: error.message,
                    text2: 'Erro ao abrir ocorrencia'
                })
            }
            )



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
                    {
                        loading === true ? <ActivityIndicator size='large' color='#DB6015' /> :

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={styles.container}>




                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, width: 200, padding: 6, borderRadius: 6, marginBottom: 5 }}>


                                    <View style={{ backgroundColor: 'white', padding: 6 }}>
                                        <Text style={styles.label}>Data</Text>
                                        {
                                            item ? <Text>{formatDt(date)}</Text> :
                                                <Text>{formatDt(date)} </Text>
                                        }

                                    </View>
                                    <View style={{ backgroundColor: 'white', padding: 6 }}>
                                        <Text style={styles.label}>Hora</Text>
                                        {
                                            item ? <Text>{hour.toString()}</Text> :
                                                <Text>{Formathr(hour)}</Text>
                                        }

                                    </View>
                                </View>
                                <View style={{ justifyContent: 'center' }}>


                                    <Text style={styles.label}>Cliente</Text>
                                    {
                                        <Input
                                            value={selectedCustomer}
                                            onChangeText={(text) => { setSelectedCustomer(text) }}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            containerStyle={styles.containerInput}
                                            disabled={true}
                                        />
                                    }
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
                                                    width: 100, marginBottom: 10, height: 40,
                                                    textAlign: 'auto'
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
                                    disabled={disabled}
                                />

                                <Text style={styles.label}>Telefone</Text>
                                <Input
                                    value={phone}
                                    onChangeText={(text) => { setPhone(text) }}
                                    keyboardType='numeric'
                                    inputStyle={styles.input}
                                    containerStyle={styles.containerInput}
                                    disabled={disabled}
                                />



                                <Text style={styles.label}>Atendente</Text>
                                <DropDownPicker
                                    style={styles.picker}
                                    items={atendants}
                                    open={openDropAtendant}
                                    value={selectedAtendent}
                                    setOpen={setOpenDropAtendant}
                                    setValue={setSelectedAtendent}
                                    disabled={disabled}

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
                                    disabled={disabled}

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

                    }


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
                                        disabled={disabled}
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

                        <Text style={styles.label}>Sistema</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={sistempicker}
                            open={openDrop}
                            value={selectedSistem}
                            setOpen={setOpenDrop}
                            setValue={setSelectedSistem}
                            disabled={disabled}
                            placeholder={item ? selectedSistem : 'Selecionar Sistema'}

                        />

                        {
                            selectedSistem !== '' ? (
                                <View style={{ zIndex: 500 }}>
                                    <Text style={styles.label}> Tela</Text>
                                    <DropDownPicker
                                        style={styles.picker}
                                        items={telaPicker}
                                        open={openDropAtendant}
                                        value={selectedView}
                                        setOpen={setOpenDropAtendant}
                                        setValue={setSelectedView}
                                        disabled={disabled}
                                        placeholder={item ? selectedSistem : 'Selecionar Sistema'}

                                    />
                                </View>
                            ) : ''
                        }

                        <Input

                            label='Descrição'
                            multiline
                            value={desc}
                            onChangeText={(text) => setDesc(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput, { flexWrap: 'wrap' }]}
                            disabled={disabled}

                        />
                        <Input

                            label='Solução'
                            multiline
                            value={solution}
                            onChangeText={(text) => setSolution(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput]}
                            disabled={disabled}
                        />
                        <Input

                            label='Link Trello'
                            value={trello}
                            onChangeText={(text) => setTrello(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput]}
                            disabled={disabled}
                        />

                        <Text style={styles.label}>Transferido para</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={atendants}
                            open={openDropContact}
                            value={selectedContac}
                            setOpen={setOpenDropContact}
                            setValue={setSelectedContact}
                            disabled={disabled}

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
                            disabled={disabled}

                            placeholder={item ? statusSelected : 'Selecione a situação'}

                        />

                        {
                            statusSelected === '6568b706-d486-4ad3-9817-1d5858135703' ? (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, padding: 6, borderRadius: 6, marginBottom: 5 }}>
                                        <View style={{ backgroundColor: 'white', padding: 6, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.label}>Data Conclusão</Text>
                                            {
                                                item ? <Text>{formatDt(item.Data_conclusao)}</Text> :
                                                    <Text>{formatDt(date)} </Text>
                                            }
                                        </View>
                                        <View style={{ backgroundColor: 'white', padding: 6, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.label}>Hora Conclusão</Text>
                                            {
                                                item ? <Text>{item.Hora_conclusao}</Text> :
                                                    <Text>{Formathr(hourEnd)}</Text>
                                            }
                                        </View>
                                    </View>

                                    <View style={{ backgroundColor: '#36c389', padding: 6, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.label, { color: 'white' }]}>Duração do Atendimento</Text>

                                        <Text style={[styles.label, { color: 'white' }]}>{fimTime.toString()} </Text>

                                    </View>
                                </View>
                            ) : null
                        }


                        {
                            statusSelected === '067f4b9a-4b85-4312-ab01-4d7e4d69c7e9' ? (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, padding: 6, borderRadius: 6, marginBottom: 5 }}>
                                        <View style={{ backgroundColor: 'white', padding: 6, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.label}>Data Conclusão</Text>
                                            {
                                                item ? <Text>{formatDt(item.Data_conclusao)}</Text> :
                                                    <Text>{formatDt(date)} </Text>
                                            }
                                        </View>
                                        <View style={{ backgroundColor: 'white', padding: 6, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.label}>Hora Conclusão</Text>
                                            {
                                                item ? <Text>{item.Hora_conclusao}</Text> :
                                                    <Text>{Formathr(hourEnd)}</Text>
                                            }
                                        </View>
                                    </View>

                                    <View style={{ backgroundColor: '#36c389', padding: 6, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.label, { color: 'white' }]}>Duração do Atendimento</Text>
                                        <Text style={[styles.label, { color: 'white' }]}> {fimTime ? fimTime.toString() : ''}</Text>

                                    </View>
                                </View>
                            ) : null
                        }


                    </ScrollView>
                </TabView.Item>

            </TabView>
            <FabSpeed openTab={openTab} setOpenTab={setOpenTab} itemSelected={item} save={Add} edit={Edit} />
        </SafeAreaView >

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
        fontFamily: 'RobotoMedium',
        marginStart: 10,


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