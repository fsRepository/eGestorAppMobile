import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import DatePickerHeader from '../../components/headerDatePicker';
import SearchBarComponent from '../../components/searchBarComponent';
import { apiCRMAtendimentos } from '../../services/api';
import Toast from 'react-native-toast-message';
import AtendimentList from '../../components/atendimentList';
import { ContextAuth } from '../../context';
import FABComponent from '../../components/FAB';
import { Button, Overlay } from '@rneui/themed';
import OverlayAtendiment from '../../components/overlayAttendiment';
// import { Container } from './styles';


export default function CalledsCRM() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Nome')
    const [calleds, setCalleds] = useState([])
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [filteredList, setFilteredList] = useState([])
    const { Customers, LoadClients, user } = useContext(ContextAuth)
    const [emptList, setEmptList] = useState(false)
    const [status, setStatus] = useState('')
    const [chekOk, setChekOk] = useState(false)
    const [chekPendent, setPendentcHEK] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState([])
    const [openPicker, setOpenPicker] = useState(false)
    const [itemSelected, setItemSelected] = useState([])
    const [dataCustomer, setDataCustomer] = useState([])
    const [loading, setLoading] = useState(true)

    const [conceito, setConceito] = useState('')
    const [desc, setDesc] = useState('')
    //const que vai definir o estado do modal de atendimento
    const [open, setOpen] = useState(false)

    console.log(dateStart, dateEnd)




    //função par buscar os atendimentos crm
    async function LoadCalleds() {
        setLoading(true); // Set loading to true before making the asynchronous call

        try {
            const response = await axios.get(apiCRMAtendimentos);
            setCalleds(response.data);
            setFilteredList(response.data);
            setEmptList(false);
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Erro ao buscar atendimentos'
            });
        } finally {
            setLoading(false); // Set loading to false after the asynchronous call is complete
        }
    }


    //sempre que a pagina for aberta ele carrega os atendimentos
    useEffect(() => {

        LoadCalleds()

        LoadClients()


    }, [])
    //carrega os clientes pra conseguir comparar depois com uid do atendimento


    //função para filtrar os dados atraves do intervalo de datas escolhidas pelo usuario
    async function FilterDateData() {
        if (dateStart === '' || dateEnd === '') {
            setFilteredList(calleds)
            setEmptList(false)
        } else {
            const filteredData = calleds.filter(item => {
                const itemDate = new Date(item.Data_Realizacao)
                const startDate = new Date(dateStart)
                const endDate = new Date(dateEnd)
                return itemDate >= startDate && itemDate <= endDate
            })
            if (filteredData.length === 0) {
                setEmptList(true)
                setFilteredList(filteredData)
                console.log('nada encontrado')
                setLoading(false)
            } else {
                setEmptList(false)
                setFilteredList(filteredData)
                setLoading(false)

            }


        }

    }

    function SearchAttendiment() {
        setLoading(true)
        if (search === '') {
            setLoading(false)
            setFilteredList(calleds)
            setEmptList(false)
        } else {

            const SearchUp = search.toUpperCase()
            const searchByNameFantasia = Customers.filter(item => item.NomeFantasia.includes(SearchUp));
            const searchByName = Customers.filter(item => item.Nome.includes(SearchUp));
            const combinedSearchResults = [...searchByNameFantasia, ...searchByName];

            if (combinedSearchResults.length === 0) {
                console.log('nada encontrado')
                setEmptList(true)

                setFilteredList([])
            } else {
                const searchUid = calleds.filter(item => combinedSearchResults.some(customer => customer.UID === item.UIDCliente));
                setEmptList(false)

                setFilteredList(searchUid)
            }
            setLoading(false)
        }
    }

    useEffect(() => {

        SearchAttendiment()

    }, [search, filter])

    /* 
 const [namesClients, setNamesClients] = useState([]);
    useEffect(() => {
        // Verifica se o item da lista tem UIDCliente e se é do tipo 'crm'
        if (item.UIDCliente && type === 'crm') {
            // Filtra os clientes correspondentes pelo UIDCliente
            const matchingCustomers = customer.filter(customer => customer.UID === item.UIDCliente);

            // Obtém os nomes dos clientes encontrados
            const names = matchingCustomers.map(customer => customer.Nome); // Substitua 'Nome' pela propriedade correta que armazena o nome do cliente

            // Define os nomes dos clientes
            setNamesClients(names);
        }
    }, [item.UIDCliente, type, customer]);
*/
    async function RegisterAtendiment() {
        if (conceito !== '' || dateStart !== '' & dateEnd !== '' & status !== '' & selectedCustomer !== '') {
            let data = {
                UIDContratante: user.UidContratante,
                Conceito: conceito,
                Descricao: desc,
                Periodo_Inicial: dateStart,
                Periodo_Final: dateEnd,
                UIDCliente: selectedCustomer,
                Data_Realizacao: new Date(),
                Situacao: status.toUpperCase(),
                Clientes: null
            }

            await axios.post(apiCRMAtendimentos, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {

                    setOpen(false)
                    Toast.show({
                        type: 'success',
                        text1: 'Atendimento CRM registrado'
                    })
                })
                .catch((error) => {
                    console.log(error.data)
                    Toast.show({
                        type: 'error',
                        text1: 'erro ao registrar atendimento',
                        text2: error
                    })
                })
        } else {
            Toast.show({
                type: 'info',
                text1: 'Preencha os campos vázios'
            })
        }

    }

    async function EditItem(itemSelected) {
        if (dateStart !== itemSelected.Periodo_Inicial || dateEnd !== itemSelected.Periodo_Final || desc !== itemSelected.Descricao
            || status !== itemSelected.Situacao
        ) {

            await axios.put(`${apiCRMAtendimentos}/${itemSelected.UID}`, {
                UIDContratante: user.UidContratante,
                Conceito: conceito,
                Descricao: desc,
                Periodo_Inicial: dateStart,
                Periodo_Final: dateEnd,
                UIDCliente: selectedCustomer,
                Data_Realizacao: new Date(),
                Situacao: status.toUpperCase(),
                Clientes: null,
                UID: itemSelected.UID

            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                console.log('atendimento editado')
                setOpen(false)
                Toast.show({
                    type: 'success',
                    text1: 'Atendimento CRM modificado'
                })
                LoadCalleds()
            })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        type: 'error',
                        text1: 'erro ao modificar atendimento',
                        text2: error
                    })
                })


        } else {
            Toast.show({
                type: 'info',
                text1: 'É preciso fazer alguma alteração pra modificar o atendimento'
            })
        }
    }



    function DeleteItem(itemSelected) {
        //pergunta ao ususario se ele realmente quer excluir o item
        Alert.alert('Você está prestes a excluir o atendimento:',
            `${itemSelected.UID}`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => setOpen(false),
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
        await axios.delete(`${apiCRMAtendimentos}/${itemSelected.UID}`, {
            UIDContratante: user.UidContratante,
            Conceito: conceito,
            Descricao: desc,
            Periodo_Inicial: dateStart,
            Periodo_Final: dateEnd,
            UIDCliente: selectedCustomer,
            Data_Realizacao: new Date(),
            Situacao: status.toUpperCase(),
            Clientes: null,
            UID: itemSelected.UID
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(() => {
                setOpen(false)
                Toast.show({
                    type: 'success',
                    text1: 'Atendimento deletado com sucesso'
                })

                LoadCalleds()
            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao deletar atendimento',
                    text2: error
                })

            })

    }


    return (
        <View style={styles.container}>
            <SearchBarComponent search={search} OnSearch={(value) => setSearch(value)} filter={filter} setFilter={setFilter} type='crm' />
            <View style={styles.headerDate}>
                <DatePickerHeader
                    setDateStart={setDateStart}
                    setDateEndd={setDateEnd}

                />
                <Button
                    onPress={FilterDateData}
                    title='Filtrar'
                    color='#DB6015'
                    buttonStyle={{ width: 100, height: 50, marginTop: 5, }}
                />
            </View>

            {
                emptList === true ?
                    <Text style={{ marginTop: 100, textAlign: 'center', fontSize: 18 }}>Nenhum atendimento encontrado!</Text> :
                    ''
            }


            {
                loading === true ? <ActivityIndicator style={{ marginTop: 200 }} size='large' color='#DB6015' /> :
                    <FlatList
                        data={filteredList}
                        keyExtractor={(item, index) => item.UID}
                        renderItem={({ item }) =>

                            <AtendimentList
                                setOpen={setOpen}
                                open={open}
                                selectedCustomer={selectedCustomer}
                                setSelectedCustomer={setSelectedCustomer}
                                openPicker={openPicker}
                                setOpenPicker={setOpenPicker}
                                dateStart={dateStart}
                                setDateStart={setDateStart}
                                dateEnd={dateEnd}
                                setDateEndd={setDateEnd}
                                dataCustomer={dataCustomer}
                                setDataCustomer={setDataCustomer}
                                conceito={conceito}
                                setConceito={setConceito}
                                desc={desc}
                                setDesc={setDesc}
                                status={status}
                                setStatus={setStatus}
                                chekOk={chekOk}
                                setChekOk={setChekOk}
                                chekPendent={chekPendent}
                                setPendentcHEK={setPendentcHEK}
                                itemSelected={itemSelected}
                                setItemSelected={setItemSelected}
                                item={item}
                                type='crm'
                                customer={Customers}
                                EditItem={EditItem}


                            />
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={LoadCalleds}
                                colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']}
                            />
                        }
                    />

            }
            {
                loading === true ? '' :
                    <FABComponent onPress={() => {
                        setOpen(true)
                        setItemSelected(undefined)

                    }} />

            }

            <Overlay
                isVisible={open}
                onBackdropPress={() => setOpen(!open)}
            >
                <OverlayAtendiment setOpen={setOpen}
                    open={open}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    dateStart={dateStart}
                    setDateStart={setDateStart}
                    dateEnd={dateEnd}
                    setDateEndd={setDateEnd}
                    dataCustomer={dataCustomer}
                    setDataCustomer={setDataCustomer}
                    conceito={conceito}
                    setConceito={setConceito}
                    desc={desc}
                    setDesc={setDesc}
                    status={status}
                    setStatus={setStatus}
                    chekOk={chekOk}
                    setChekOk={setChekOk}
                    chekPendent={chekPendent}
                    setPendentcHEK={setPendentcHEK}
                    itemSelected={itemSelected}
                    Add={RegisterAtendiment}
                    EditItem={EditItem}
                    DeleteItem={DeleteItem}
                />

            </Overlay>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    headerDate: {
        flexDirection: 'row',
        marginStart: 10, marginTop: 5,
        marginBottom: 10,
        marginEnd: 10,
        justifyContent: 'space-between'
    }
})