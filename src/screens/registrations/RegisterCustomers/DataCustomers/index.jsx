import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { Input, Tab, TabView, FAB, Button, CheckBox } from '@rneui/themed'
import UserIcon from 'react-native-vector-icons/AntDesign'
import Local from 'react-native-vector-icons/Entypo'
import { useNavigation, useRoute } from '@react-navigation/native';
import FabSpeed from '../../../../components/FabSpeedAction';
import { apiClientes } from '../../../../services/api';
import axios from 'axios';
import { ContextAuth } from '../../../../context';
import Toast from 'react-native-toast-message';
import { format, addDays, } from 'date-fns';
import DropDownPicker from 'react-native-dropdown-picker';
import AccountIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DataCustomers = () => {

    const navigation = useNavigation()
    const { user, userRepres, LoadUsers, loading, LoadClients } = useContext(ContextAuth)
    //consts para armazenar os valores dos inputs
    const [cgi, setCgi] = useState('')
    const [typeProfile, setTypeProfile] = useState('')
    const [dateRegister, setDateRegister] = useState(new Date())
    const [Razao, setRazao] = useState('')
    const [fantasy, setFantasy] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [inscription, setInscription] = useState('')
    const [uf, setUF] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [cep, setCep] = useState('')
    const [adress, setAdress] = useState("")
    const [complement, setComplement] = useState('')
    const [num, setNum] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [representante, setRepresentante] = useState('')
    const [status, setStatus] = useState(true)
    const [mensal, setMensal] = useState(false)
    const [obs, setObs] = useState('')
    const [nivel, setNivel] = useState('')
    const [model, setModel] = useState('')
    const [userNfce, setUserNfce] = useState('')
    const [passwordNfce, setPasswordNfce] = useState('')
    const [dateValid, setDateValid] = useState(new Date())
    const [checkedAtv, setCheckedAtv] = useState(false)
    const [checkedIna, setCheckedIna] = useState(false)

    const [focus, setFocus] = useState(false)
    const [index, setIndex] = useState(0)
    //estado que vai determinar se os inputs vao estar desabilitados ou nao
    const [disabled, setDisabled] = useState(true)


    //const para determinar se o speedTab esta aberto ou fechado
    const [openTab, setOpenTab] = useState(false)

    //const para selecionar o representante

    //states para deteminar a mensalidade como verdadeira ou falsa
    const [chekmensal, setChekMensal] = useState(false)
    const [chekmensalN, setChekMensalNN] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    function PadronizeCgi() {

        if (email < 6) {
            console.log('o CGI precisa ter 6 números ')
            setErrorMessage(true)
        } else if (email > 6) {
            console.log('o CGI precisa ter 6 números ')
            setErrorMessage(true)

        } else if (email === 6) {

            setErrorMessage(false)
        }

    }

    useEffect(() => {
        LoadUsers()
    }, [])

    const [openPicker, setOpenPicker] = useState(false)
    const [selectedUserRepres, setSelectedUserRepres] = useState('')
    //função para converter para o formato esperado pelo picker
    const formatUsersRepres = userRepres.map((item) => ({
        value: item.UID,
        label: item.Nome
    }))
    //função para procurar o uid do representante escolhido atraves do nome
    function SearchUser(value) {
        console.log('Valor a ser encontrado:', value);

        const foundUser = userRepres.find(item => item.Nome === value);


        if (foundUser) {

            setRepresentante(foundUser.UID)
        } else {
            console.log('Representante não encontrado');
        }
    }


    //estou recebendo os dados pela navegação
    const route = useRoute();
    const { itemSelected, type } = route.params || {};
    //verificar se tem um item selecionado, se tiver ele carrega a pagina com os seus dados,
    // se nao tiver selecionado ele abre tudo vazio


    //formatando a data 
    console.log(dateRegister)
    const dateFormat = format(dateRegister, 'dd/MM/yyyy')
    const dateFormatValid = format(dateValid, 'dd/MM/yyyy')

    //controla o estado do picker data
    const [openCalender, setOpenCalender] = useState(false)

    //função para formatar a data de validade pro formato esperado pelo banco
    function handleDateChange(event, date) {

        setOpenCalender(false)
        setDateValid(date)


    }

    // se o usuario digitar pessoa fisica, ele so deixa o f, se nao deixa o j
    function handleTypeProfile(text) {
        if (text === 'fisica' || 'FISICA') {
            setTypeProfile('f')

        } else {
            setTypeProfile('j')

        }

    }

    useEffect(() => {
        console.log('item:', itemSelected)
        if (itemSelected) {
            setCgi(itemSelected.CGI)
            setTypeProfile(itemSelected.TipoPessoa)
            setDateRegister(itemSelected.DataCadastro)
            setRazao(itemSelected.Nome)
            setFantasy(itemSelected.NomeFantasia)
            setCnpj(itemSelected.CNPJ)
            setUF(itemSelected.UF)
            setCity(itemSelected.Cidade)
            setCep(itemSelected.CEP)
            setAdress(itemSelected.Logradouro)
            setDistrict(itemSelected.Bairro)
            setInscription(itemSelected.InscricaoEstadual)
            setEmail(itemSelected.Email)
            setTelefone(itemSelected.Telefone)
            setRepresentante(itemSelected.Representante)
            setNum(itemSelected.Numero)
            setStatus(itemSelected.Ativo)
            setSelectedUserRepres(itemSelected.Representante)
            setNivel(itemSelected.Nivel)
            setObs(itemSelected.OBS)
            setUserNfce(itemSelected.UsuarioNFCe)
            setPasswordNfce(itemSelected.SenhaNFCe)


            console.log(itemSelected.id)
            if (itemSelected.Ativo === true) {
                setCheckedAtv(true);

            } else {
                setCheckedIna(true)
            }

        } else {
            setDisabled(false)
        }


    }, [itemSelected])




    async function Edit() {
        //quando clica em editar , o input é ativado
        setDisabled(false)
        setOpenTab(false)
        if (disabled === false) {
            if (Razao !== itemSelected.Nome || status !== itemSelected.Ativo) {


                await axios.put(`${apiClientes}/${itemSelected.UID}`, {


                    UID: itemSelected.UID,
                    UIDContratante: user.UidContratante,
                    CGI: cgi,
                    Nome: Razao.toUpperCase(),
                    NomeFantasia: fantasy.toUpperCase(),
                    TipoPessoa: typeProfile.toUpperCase(),
                    CNPJ: cnpj,
                    InscricaoEstadual: inscription,
                    Ativo: status,
                    DataCadastro: dateRegister,
                    Telefone: telefone,
                    Email: email,
                    Bairro: district.toUpperCase(),
                    Logradouro: adress.toUpperCase(),
                    CEP: cep,
                    Cidade: city,
                    UF: uf,
                    Numero: num,
                    Representante: representante,
                    Complemento: complement.toUpperCase(),
                    Atendimentos: [],
                    Usuario: null,
                    Contador: '',
                    SemMensalidade: mensal,
                    Status: '',
                    OBS: obs,
                    Nivel: nivel,
                    Validade: dateValid,
                    Modelo: model,
                    UsuarioNFCe: userNfce,
                    SenhaNFCe: passwordNfce




                }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(() => {
                        console.log('dados alterados')
                        Toast.show({
                            type: 'success',
                            text1: 'Dados alterados com sucesso'
                        })
                        navigation.navigate('customers')
                        LoadClients()
                    })
                    .catch((error) => {
                        console.log('erro ao alterar dados', error.response.data)
                        Toast.show({
                            type: 'error',
                            text1: 'Erro ao alterar dados',
                            text2: error

                        })
                    })
            }
        } else {
            Toast.show({
                type: 'info',
                text1: 'Nada foi modificado'
            })
            console.log('e preciso alterar algo')
        }

    }

    async function Save() {
        //quando clica em salvar o input e desativado




        const data = {
            UIDContratante: user.UidContratante,
            CGI: cgi,
            Nome: Razao.toUpperCase(),
            NomeFantasia: fantasy.toUpperCase(),
            TipoPessoa: typeProfile.toUpperCase(),
            CNPJ: cnpj,
            InscricaoEstadual: inscription,
            Ativo: status,
            DataCadastro: dateRegister,
            Telefone: telefone,
            Celular: '',
            Email: email,
            Bairro: district.toUpperCase(),
            Logradouro: adress.toUpperCase(),
            CEP: cep,
            Cidade: city,
            UF: uf,
            Numero: num,
            Representante: representante,
            Complemento: complement.toUpperCase(),
            Atendimentos: [],
            Usuario: null,
            Contador: '',
            SemMensalidade: mensal,
            Status: '',
            OBS: obs,
            Nivel: nivel,
            Validade: dateValid,
            Modelo: model,
            UsuarioNFCe: userNfce,
            SenhaNFCe: passwordNfce


        }

        if (!itemSelected) {
            if (cgi !== '' || Razao !== '' || cnpj !== '') {


                console.log(data)
                await axios.post(apiClientes, data, {
                    headers: { 'Content-Type': 'application/json' }
                })


                    .then(() => {
                        console.log('Novo cliente adicionado')
                        Toast.show({
                            type: 'success',
                            text1: 'Novo cliente adicionado'
                        })
                        setOpenTab(false)
                        navigation.navigate('customers')
                        LoadClients()

                    })
                    .catch((error) => {
                        console.log('erro ao adicionar cliente', error.response.data)
                        Toast.show({
                            type: 'error',
                            text1: 'Erro ao adicionar cliente',
                            text2: error.response.data
                        })
                    })
            } else {
                Toast.show({
                    type: 'info',
                    text1: 'Preencha os campos vazios'
                })
            }
        }
    }

    function DeleteItem() {
        //pergunta ao ususario se ele realmente quer excluir o item
        Alert.alert('Você está prestes a excluir o cliente:',
            `${itemSelected.NomeFantasia}`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => setOpenTab(false),

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
        const data = {



        }
        await axios.delete(`${apiClientes}/${itemSelected.UID}`, {
            UIDContratante: user.UidContratante,
            CGI: cgi,
            Nome: Razao.toUpperCase(),
            NomeFantasia: fantasy.toUpperCase(),
            TipoPessoa: typeProfile.toUpperCase(),
            CNPJ: cnpj,
            InscricaoEstadual: inscription,
            Ativo: status,
            DataCadastro: dateRegister,
            Telefone: telefone,
            Celular: '',
            Email: email,
            Bairro: district.toUpperCase(),
            Logradouro: adress.toUpperCase(),
            CEP: cep,
            Cidade: city,
            UF: uf,
            Numero: num,
            Representante: representante,
            Complemento: complement.toUpperCase(),
            Atendimentos: [],
            Usuario: null,
            Contador: '',
            SemMensalidade: mensal,
            Status: '',
            OBS: obs,
            Nivel: nivel,
            Validade: dateValid,
            Modelo: model,
            UsuarioNFCe: userNfce,
            SenhaNFCe: passwordNfce
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(() => {
                setOpenTab(false)

                setOpenTab(false)
                navigation.navigate('customers')
                LoadClients()
                Toast.show({
                    type: 'success',
                    text1: 'Cliente apagado com sucesso'
                })
            })
            .catch((error) => {
                console.log('erro', error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao apagar cliente',
                    text2: error
                })

            })

    }

    return (
        <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>

            <SafeAreaView style={styles.container}>
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

                    <Tab.Item

                        title='Dados'
                        titleStyle={{ fontSize: 18 }}
                        icon={<UserIcon name='user' color='white' size={20} style={{ marginTop: 20 }} />}
                    />
                    <Tab.Item
                        title='Endereço'
                        titleStyle={{ fontSize: 18 }}
                        icon={<Local name='location' color='white' size={20} style={{ marginTop: 20 }} />}
                    />
                    <Tab.Item
                        title='Contab'
                        titleStyle={{ fontSize: 18 }}
                        icon={<AccountIcon name='account-box' color='white' size={20} style={{ marginTop: 20 }} />}
                    />


                </Tab>
                {
                    loading === true ? (
                        <ActivityIndicator style={{ marginTop: 200 }} color='#DB6015' size='large' />
                    ) : (
                        <TabView
                            value={index}
                            onChange={setIndex}
                            animationType='spring'
                        >
                            <TabView.Item style={{ width: '100%' }}>
                                <View>
                                    <ScrollView style={styles.containerInput}>
                                        <View>

                                            <Input
                                                label='CGI'
                                                labelStyle={styles.label}
                                                placeholder='Digite o CGI'
                                                keyboardType='numeric'
                                                value={cgi}
                                                onChangeText={(text) => setCgi(text)}
                                                inputStyle={styles.input}
                                                disabled={disabled}


                                            />
                                            <Text style={{ fontSize: 16, color: 'grey', fontFamily: 'RobotoMedium', marginStart: 10 }}>Situação</Text>
                                            <CheckBox

                                                title='Ativo'
                                                checked={checkedAtv}
                                                onPress={() => {
                                                    setCheckedAtv(true)
                                                    setCheckedIna(false)
                                                }}
                                                disabled={disabled}
                                            />
                                            <CheckBox
                                                title='Inativo'
                                                checked={checkedIna}
                                                onPress={() => {
                                                    setCheckedAtv(false)
                                                    setCheckedIna(true)
                                                }}
                                                disabled={disabled}
                                            />
                                        </View>
                                        <Text style={{ fontSize: 16, marginStart: 10, color: 'grey', fontWeight: '500' }}>Representante</Text>
                                        <View style={{ zIndex: 100 }}>


                                            <DropDownPicker

                                                style={{ width: 300, marginTop: 5, marginStart: 10, marginBottom: 10, borderColor: 'white' }}
                                                open={openPicker}
                                                setOpen={setOpenPicker}
                                                value={selectedUserRepres}
                                                setValue={setSelectedUserRepres}
                                                items={formatUsersRepres}
                                                setItems={formatUsersRepres}
                                                onChangeValue={(item) => SearchUser(item)}
                                                placeholder={itemSelected ? SearchUser(representante) : 'Selecione um representante'}
                                                scrollViewProps={{
                                                    // Evita conflito de rolagem
                                                    persistentScrollbar: true,
                                                }}

                                            />
                                        </View>
                                        <Input
                                            label='Tipo de Pessoa'
                                            placeholder='Fisica ou juridica'
                                            labelStyle={styles.label}
                                            inputStyle={styles.input}
                                            value={typeProfile}
                                            onChangeText={(text) => handleTypeProfile(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Data de Cadastro'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            placeholder={dateFormat}
                                            inputStyle={styles.input}
                                            value={dateRegister}
                                            onChangeText={(text) => setDateRegister(text)}
                                            disabled={true}

                                        />

                                        <Input
                                            label='Razão Social'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={Razao}
                                            onChangeText={(text) => setRazao(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Nome Fantasia'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={fantasy}
                                            onChangeText={(text) => setFantasy(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='CNPJ'
                                            labelStyle={styles.label}
                                            keyboardType='numeric'
                                            inputStyle={styles.input}
                                            value={cnpj}
                                            onChangeText={(text) => setCnpj(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Inscrição Estadual'
                                            labelStyle={styles.label}
                                            keyboardType='numeric'
                                            inputStyle={styles.input}
                                            value={inscription}
                                            onChangeText={(text) => setInscription(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Email'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={email}
                                            onChangeText={(text) => setEmail(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Telefone'
                                            labelStyle={styles.label}
                                            keyboardType='numeric'
                                            inputStyle={styles.input}
                                            value={telefone}
                                            onChangeText={(text) => setTelefone(text)}
                                            disabled={disabled}

                                        />



                                    </ScrollView>

                                </View>

                            </TabView.Item>
                            <TabView.Item style={{ width: '100%' }}>
                                <KeyboardAvoidingView behavior='height'>


                                    <ScrollView style={styles.containerInput}>

                                        <Input
                                            label='UF'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={uf}
                                            onChangeText={(text) => setUF(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Cidade'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={city}
                                            onChangeText={(text) => setCity(text)}
                                            disabled={disabled}

                                        />

                                        <Input
                                            label='CEP'
                                            labelStyle={styles.label}
                                            keyboardType='numeric'
                                            inputStyle={styles.input}
                                            value={cep}
                                            onChangeText={(text) => setCep(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Endereço'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={adress}
                                            onChangeText={(text) => setAdress(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Número'
                                            labelStyle={styles.label}
                                            keyboardType='numeric'
                                            inputStyle={styles.input}
                                            value={num}
                                            onChangeText={(text) => setNum(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Bairro'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={district}
                                            onChangeText={(text) => setDistrict(text)}
                                            disabled={disabled}

                                        />
                                        <Input
                                            label='Complemento'
                                            labelStyle={styles.label}
                                            keyboardType='default'
                                            inputStyle={styles.input}
                                            value={complement}
                                            onChangeText={(text) => setComplement(text)}
                                            disabled={disabled}

                                        />

                                    </ScrollView>

                                </KeyboardAvoidingView>

                            </TabView.Item>

                            <TabView.Item style={{ width: '100%' }}>
                                <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>


                                    <ScrollView>
                                        <Text style={{ fontSize: 16, color: 'grey', fontFamily: 'RobotoMedium', marginStart: 10 }}>Mensalidade</Text>
                                        <CheckBox

                                            title='Ativo'
                                            checked={checkedAtv}
                                            onPress={() => {
                                                setCheckedAtv(true)
                                                setCheckedIna(false)
                                            }}
                                            disabled={disabled}
                                        />
                                        <CheckBox
                                            title='Inativo'
                                            checked={checkedIna}
                                            onPress={() => {
                                                setCheckedAtv(false)
                                                setCheckedIna(true)
                                            }}
                                            disabled={disabled}
                                        />
                                        <Input
                                            label='Nivel'
                                            value={nivel}
                                            onChangeText={(text) => setNivel(text)}
                                            keyboardType='numeric'
                                            disabled={disabled}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setOpenCalender(true)}
                                        >
                                            <Text style={{ color: 'grey', fontSize: 16, marginStart: 10, fontWeight: 600 }}>Validade</Text>
                                            <Text style={{ color: 'grey', fontSize: 16, marginStart: 10, fontWeight: 600, }}> {dateFormatValid}</Text>
                                        </TouchableOpacity>
                                        {
                                            openCalender === true ?
                                                <DateTimePicker
                                                    value={dateValid}
                                                    mode="date"
                                                    is24Hour={true}
                                                    display="default"
                                                    onChange={handleDateChange}
                                                    disabled={disabled}
                                                />
                                                : ''
                                        }

                                        <Input
                                            label='OBS'
                                            value={obs}
                                            onChangeText={(text) => setObs(text)}
                                            keyboardType='default'
                                            disabled={disabled}
                                        />

                                        <Input
                                            label='Usuário NFCe'
                                            value={userNfce}
                                            onChangeText={(text) => setUserNfce(text)}
                                            keyboardType='default'
                                            disabled={disabled}
                                        />
                                        <Input
                                            label='Senha NFCe'
                                            value={passwordNfce}
                                            onChangeText={(text) => setPasswordNfce(text)}
                                            keyboardType='default'
                                            secureTextEntry={true}
                                            disabled={disabled}
                                        />
                                    </ScrollView>
                                </KeyboardAvoidingView>
                            </TabView.Item>
                        </TabView>
                    )
                }

                <FabSpeed DeleteItem={DeleteItem} openTab={openTab} setOpenTab={setOpenTab} edit={Edit} save={Save} itemSelected={itemSelected} />

            </SafeAreaView >
        </KeyboardAvoidingView>
    )
}

export default DataCustomers;

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        marginEnd: 10

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