import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Input, Tab, TabView, FAB, Button, CheckBox } from '@rneui/themed'
import UserIcon from 'react-native-vector-icons/AntDesign'
import Local from 'react-native-vector-icons/Entypo'
import { useRoute } from '@react-navigation/native';
import FabSpeed from '../../../../components/FabSpeedAction';


const DataCustomers = () => {



    //consts para armazenar os valores dos inputs
    const [cgi, setCgi] = useState('')
    const [typeProfile, setTypeProfile] = useState('')
    const [dateRegister, setDateRegister] = useState('')
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
    const [status, setStatus] = useState('')
    const [checkedAtv, setCheckedAtv] = useState(false)
    const [checkedIna, setCheckedIna] = useState(false)

    const [focus, setFocus] = useState(false)
    const [index, setIndex] = useState(0)
    //estado que vai determinar se os inputs vao estar desabilitados ou nao
    const [disabled, setDisabled] = useState(true)


    //const para determinar se o speedTab esta aberto ou fechado
    const [openTab, setOpenTab] = useState(false)


    //estou recebendo os dados pela navegação
    const route = useRoute();
    const { itemSelected, type } = route.params || {};
    //verificar se tem um item selecionado, se tiver ele carrega a pagina com os seus dados,
    // se nao tiver selecionado ele abre tudo vazio
    useEffect(() => {
        console.log('item:', itemSelected)
        if (itemSelected) {
            setCgi(itemSelected.CGI)
            setTypeProfile(itemSelected.TipoPessoa)
            setDateRegister(itemSelected.DataCadastro)
            setRazao(itemSelected.razaoSocial)
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
            console.log(itemSelected.id)
            if (itemSelected.Ativo === true) {
                setCheckedAtv(true);

            } else {
                setCheckedIna(true)
            }

        } else {
            setDisabled(false)
        }


    }, [])


    function Edit() {
        //quando clica em editar , o input é ativado
        setDisabled(false)
        setOpenTab(false)

    }

    function Save() {
        //quando clica em salvar o input e desativado
        setDisabled(true)
        setOpenTab(false)
    }


    return (
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
                    title='Dados do Cliente'
                    titleStyle={{ fontSize: 18 }}
                    icon={<UserIcon name='user' color='white' size={20} />}
                />
                <Tab.Item
                    title='Endereço'
                    titleStyle={{ fontSize: 18 }}
                    icon={<Local name='location' color='white' size={20} />}
                />


            </Tab>

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

                            <Input
                                label='Tipo de Pessoa'
                                placeholder='Fisica ou juridica'
                                labelStyle={styles.label}
                                inputStyle={styles.input}
                                value={typeProfile}
                                onChangeText={(text) => setTypeProfile(text)}
                                disabled={disabled}

                            />
                            <Input
                                label='Data de Cadastro'
                                labelStyle={styles.label}
                                placeholder='12/12/1222'
                                keyboardType='numeric'
                                inputStyle={styles.input}
                                value={dateRegister}
                                onChangeText={(text) => setDateRegister(text)}
                                disabled={disabled}

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
                            <Input
                                label='Representante'
                                labelStyle={styles.label}
                                keyboardType='default'
                                inputStyle={styles.input}
                                value={representante}
                                onChangeText={(text) => setRepresentante(text)}
                                disabled={disabled}

                            />


                        </ScrollView>

                    </View>

                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <View>


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
                                onChangeText={(text) => setCepS(text)}
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

                    </View>

                </TabView.Item>

            </TabView>
            <FabSpeed openTab={openTab} setOpenTab={setOpenTab} edit={Edit} save={Save} />
        </SafeAreaView>
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