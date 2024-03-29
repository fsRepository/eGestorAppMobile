import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import {
    apiClientes,
    apiSistemas,
    apiToken,
    apiMotivos,
    apiMeiosDeContato,
    apiSituacoes,
    apiUsuarios,
    apiTelasSistema
} from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ContextAuth = createContext({})
export default function ContextProvider({ children }) {
    const navigation = useNavigation()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [Customers, setCustomers] = useState([])
    const [sistems, setSistems] = useState([])
    const [motives, setMotives] = useState([])
    const [contactMethods, setMethods] = useState([])
    const [situations, setSituations] = useState([])
    const [users, setUsers] = useState([])
    const [telasSistem, setTelaSistem] = useState([])
    const [atendiment, setAtendiment] = useState([])

    function login(username, password, remenber) {
        setLoading(true)
        try {
            let details = {
                'grant_type': 'password',
                'username': username,
                'password': password
            }
            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encondedValue = encodeURIComponent(details[property])
                formBody.push(encodedKey + '=' + encondedValue)
            }
            formBody = formBody.join('&');
            const urlApi = `${apiToken}?${formBody}`
            console.log(urlApi)
            fetch(apiToken, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer token',
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
                .then((response) => {
                    response.json()
                        .then((responseData) => {
                            if (responseData.error == 'invalid_grant') {
                                console.log('usuário ou senha incorreta')
                                Toast.show({
                                    type: 'error',
                                    text1: 'Usuário ou senha incorretos!',
                                    text2: 'Verifique os dados e tente novamente.'
                                })
                                setLoading(false)
                            } else {

                                console.log(responseData)
                                const user = {
                                    name: responseData.Username,
                                    status: responseData.Ativo,
                                    email: responseData.Email,
                                    Representante: responseData.Representante,
                                    Adm: responseData.Adm,
                                    uid: responseData.Uid,
                                    UidContratante: responseData.UidContratante,
                                    Remenber: remenber,
                                    password: password


                                }
                                setUser(user)
                                setLoading(false)
                                Toast.show({
                                    type: "success",
                                    text1: 'Seja bem vindo'
                                })
                                if (user) {

                                    const response = AsyncStorage.setItem('user', JSON.stringify(user))
                                        .then(() => { console.log('dados salvos no storage') })
                                        .catch((error) => console.log('erro ao salvar dados no storage'))
                                }

                                navigation.navigate('home');
                                console.log('user', user)
                            }

                        })
                        .catch((error) =>
                            console.log(error))
                })
                .catch((error) => {
                    console.log(error)
                    Toast.show({
                        type: 'error',
                        text1: 'Erro ao fazer login',
                        text2: 'Verifique os seus dados'
                    })
                })



        } catch {
            console.log('Verifique os dados')

        }

    }




    //função para carregar os clientes
    async function LoadClients() {
        setLoading(true
        )
        const response = await axios.get(apiClientes)
            .then((response) => {
                setLoading(false)
                setCustomers(response.data)
                try {
                    const data = JSON.stringify(response.data)
                    AsyncStorage.setItem('customers', data)

                } catch {
                    console.log('erro ao enviar dados pro storage')
                }

            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao buscar dados dos clientes'
                })
            })
    }


    //função para carregar os sistemas
    async function LoadSystems() {
        setLoading(true)
        const response = await axios.get(apiSistemas)
            .then((response) => {
                setSistems(response.data)
                setLoading(false)


            })
            .catch((error) => {
                console.log('erro ao carregar sistemas', error)
                Toast.show({
                    type: "error",
                    text1: 'Erro ao buscar sistemas disponiveis'
                })
            })
    }


    //função carregar motivos
    async function LoadMotives() {
        setLoading(true)
        try {
            const response = await axios.get(apiMotivos)

            if (response.status === 200) {

                setMotives(response.data)
                setLoading(false)

            } else {
                console.log(error)
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Parece que algo deu errado',
                    text2: 'tente novamente'
                })
            }


        } catch {
            setLoading(false)
            console.log('erro ')
        }

    }

    //carregar meios de contato 
    async function LoadItems() {
        setLoading(true)
        const response = await axios.get(apiMeiosDeContato)
            .then((response) => {

                setMethods(response.data);
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Parece que algo deu errado',
                    text2: error
                })
            })
    }


    //função para carregar situação dos atendimentos
    async function LoadSituations() {
        await axios.get(apiSituacoes)
            .then((response) => {
                setSituations(response.data)


            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao buscar situações'
                })
            })
    }

    // função para carregar os usuarios
    async function LoadUsers() {
        setLoading(true)
        const response = await axios.get(apiUsuarios)
            .then((response) => {

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
    //função para percorrer os ususarios que sao representantes
    const userRepres = users.filter(user => user.Representante === true);

    async function LoadTelas() {
        await axios.get(apiTelasSistema)
            .then((res) => {
                console.log('telas carregadas')
                setTelaSistem(res.data)

            })
            .catch((error) => {
                console.log(error)
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao carregar telas dos sistemas'
                })
            })
    }


    return (


        <ContextAuth.Provider

            value={{
                login,
                user,
                loading,
                setLoading,
                LoadClients,
                Customers,
                LoadSystems,
                sistems,
                LoadMotives,
                motives,
                LoadItems,
                contactMethods,
                LoadSituations,
                situations,
                LoadUsers,
                users,
                userRepres, LoadTelas,
                telasSistem,
                atendiment,
                setAtendiment
            }}
        >

            {children}

        </ContextAuth.Provider>
    )


}