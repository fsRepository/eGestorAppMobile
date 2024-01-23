import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { createContext, useState } from 'react'
import Toast from 'react-native-toast-message'
import { apiClientes, apiToken } from '../services/api'

export const ContextAuth = createContext({})
export default function ContextProvider({ children }) {
    const navigation = useNavigation()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [Customers, setCustomers] = useState([])

    function login(username, password) {
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
                                console.log('erro')
                                setLoading(false)
                            } else {


                                const user = {
                                    name: responseData.Username,
                                    status: responseData.Ativo,
                                    email: responseData.Email,
                                    Representante: responseData.Representante,
                                    uid: responseData.Uid,
                                    UidContratante: responseData.UidContratante,


                                }
                                setUser(user)
                                setLoading(false)
                                Toast.show({
                                    type: "success",
                                    text1: 'Seja bem vindo'
                                })
                                navigation.navigate('home');
                                console.log('user', user)
                            }

                        })
                })
                .catch((error) =>
                    console.log(error))
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
                console.log(response.data)
                setCustomers(response.data)
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
    return (


        <ContextAuth.Provider

            value={{ login, user, loading, LoadClients, Customers }}
        >

            {children}

        </ContextAuth.Provider>
    )


}