import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Input, Button, Tab, TabView, CheckBox } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { listaDeContatos } from '../../services/baseDadosTeste';
import { format } from 'date-fns'
import { motivos } from '../../services/baseDadosTeste';
// import { Container } from './styles';
import Icon from 'react-native-vector-icons/AntDesign'

export default function AddAtendimentt() {

    //const com os tipos de filtros
    const [filters, setFilters] = useState([


        {
            label: 'CGI',
            value: 'CGI'
        },
        {
            label: 'Nome Fantasia',
            value: 'Nome Fantasia'
        },
        {
            label: 'Razão Social',
            value: 'Razão Social'
        },
        {
            label: 'CNPJ/CPF',
            value: 'CNPJ/CPF'
        }
    ])
    const [contactMethods, setMethods] = useState([
        { id: '1', type: 'Telefone', value: '(11) 1234-5678' },
        { id: '2', type: 'E-mail', value: 'exemplo@email.com' },
        { id: '3', type: 'WhatsApp', value: '(11) 98765-4321' },
        { id: '4', type: 'Discord', value: 'linkedin.com/in/exemplo' },
        { id: '5', type: 'Chat Online', value: '@exemplo' },
        { id: '6', type: 'Escritório', value: '@exemplo' },
        { id: '7', type: 'Visita Externa', value: '@exemplo' },

    ])
    const contacts = contactMethods.map((item) => ({
        label: item.type,
        value: item.type
    }))

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
    //pega a data atual e salva na const
    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')


    //serve para controlar cada tabview
    const [index, setIndex] = useState(0)

    const dateActually = new Date()


    useEffect(() => {
        const formateDate = format(dateActually, 'dd/MM/yyy')
        console.log(formateDate)
        const formateHour = format(dateActually, 'HH:mm:ss')
        console.log(formateHour)
        setDate(formateDate)
        setHour(formateHour)


    }, [])

    //função para percorrer a lista de contatos e pegar somente os nomes dos clientes
    const customer = listaDeContatos.map((item) => ({
        label: item.empresa,
        value: item.empresa
    }))
    const atendants = listaDeContatos.map((item) => ({
        label: item.nomeContato,
        value: item.nomeContato
    }))

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

                    <ScrollView style={styles.container}>




                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, backgroundColor: 'white', width: 200, padding: 6, borderRadius: 6, marginBottom: 5 }}>
                            <View>
                                <Text style={styles.label}>Data</Text>
                                <Text>{date}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Hora</Text>
                                <Text>{hour}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.label}>Filtro</Text>
                            <DropDownPicker
                                style={styles.picker}
                                items={filters}
                                open={openDrop}
                                value={selectedFilter}
                                setOpen={setOpenDrop}
                                setValue={setSelectedFilter}
                                setItems={setFilters}
                                placeholder='Todos'

                            />
                            <Text style={styles.label}>Cliente</Text>
                            <DropDownPicker
                                style={styles.picker}
                                items={customer}
                                open={openDropCustomer}
                                value={selectedCustomer}
                                setOpen={setOpenDropCustomer}
                                setValue={setSelectedCustomer}
                                setItems={setFilters}
                                placeholder='Todos'

                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <View>
                                    <Text style={styles.label}>CGI</Text>
                                    <Input
                                        value={cgi}
                                        onChangeText={(text) => { setCgi(text) }}
                                        keyboardType='numeric'
                                        inputStyle={{ borderWidth: 1, borderRadius: 6, backgroundColor: 'white', borderColor: 'white' }}
                                        containerStyle={{ width: 100, }}
                                    />

                                </View>

                                <View>
                                    <Text style={styles.label}>Protocolo</Text>
                                    <Input
                                        value={protocol}
                                        onChangeText={(text) => { setProtocol(text) }}
                                        keyboardType='numeric'
                                        inputStyle={{ borderWidth: 1, borderRadius: 6, backgroundColor: 'white', borderColor: 'white' }}
                                        containerStyle={{ width: 100, }}
                                    />


                                </View>
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
                            items={customer}
                            open={openDropAtendant}
                            value={selectedAtendent}
                            setOpen={setOpenDropAtendant}
                            setValue={setSelectedAtendent}
                            setItems={setFilters}
                            placeholder='Todos'

                        />
                        <Text style={styles.label}>Meios de Contato</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={contacts}
                            open={openDropContact}
                            value={selectedContac}
                            setOpen={setOpenDropContact}
                            setValue={setSelectedContact}
                            setItems={setFilters}
                            placeholder='Todos'

                        />
                        {
                            selectedContac === 'WhatsApp' ?
                                <View>


                                    <Text style={styles.label}>Protocolo Whatsapp</Text>
                                    <Input
                                        value={phone}
                                        onChangeText={(text) => { setPhone(text) }}
                                        keyboardType='numeric'
                                        inputStyle={styles.input}
                                        containerStyle={styles.containerInput}
                                    />
                                </View> : null
                        }





                    </ScrollView>

                </TabView.Item>
                <TabView.Item style={{ width: "100%" }}>

                    <ScrollView style={styles.container}>
                        <Text style={styles.label}>Motivo</Text>
                        {
                            ckekboxVisible ?
                                motivos.map((item) =>
                                (
                                    <CheckBox
                                        center
                                        title={item.nome}
                                        checkedColor='green'
                                        checked={reason === item.id}
                                        onPress={() => handleCheked(item.id)}
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
                                    <Text style={styles.label}>{motivos.find(motivo => motivo.id === reason).nome}</Text>
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

                            label='Descrição'
                            value={desc}
                            onChangeText={(text) => setDesc(text)}
                            inputStyle={styles.input}
                            containerStyle={[styles.containerInput]}
                        />
                        <Input

                            label='Solução'
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
                            setItems={setFilters}
                            placeholder='Todos'

                        />

                        <Text style={styles.label}>Situação</Text>
                        <DropDownPicker
                            style={styles.picker}
                            items={atendants}
                            open={openDropContact}
                            value={selectedContac}
                            setOpen={setOpenDropContact}
                            setValue={setSelectedContact}
                            setItems={setFilters}
                            placeholder='Todos'

                        />



                    </ScrollView>
                </TabView.Item>
            </TabView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginStart: 10,
        marginEnd: 10,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontFamily: 'RobotoMedium',
        marginTop: 10

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
        width: 300,
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'white',
        borderColor: 'white'


    },
    containerInput: {
        width: 300,

    }
})