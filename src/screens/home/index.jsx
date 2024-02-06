import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import RenderCards from '../../components/renderCards';
import DatePickerHeader from '../../components/headerDatePicker';
import { Button } from '@rneui/base';
import RenderAtendiment from '../../components/renderAtendiment';
import axios from 'axios';
import { apiDash } from '../../services/api';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';
import DashAtendent from '../../components/dashboards/dashAtendent';


export default function Home() {

    const [selectedPicker, setSelectedPicker] = useState("Todos")
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [dashData, setDashData] = useState([])
    const [dashSituacao, setDashSituacao] = useState([])
    const [dashAtendente, setDashAtendente] = useState([])
    const [dashAtendimentAtendente, setAtendiment] = useState([])
    const [values, setValues] = useState({
        Pendente: 5,
        Concluido: 3,
        Liberado: 3,
        Retorno: 1,
        Desenvolvimento: 0,
        TotalOcorrencias: 10,

        TotalAtendimentos: 20,

    }

    )
    const [atendiments, setAtendiments] = useState([
        { name: 'Usuario 9', atend: 2 },
        { name: 'Usuario 1', atend: 4 },
        { name: 'Usuario 3', atend: 8 },
        { name: 'Usuario 4', atend: 7 },
        { name: 'Usuario 5', atend: 6 },
        { name: 'Usuario 6', atend: 5 },
        { name: 'Usuario 7', atend: 1 },
        { name: 'Usuario 8', atend: 21 },
    ])

    const data = Object.entries(values).map(([key, value]) => ({ id: key, value }));



    //função pra formatar data para o formato esperado pela api
    function FormatDate(value) {
        const data = format(value, 'yyyy.MM.dd')
        return data;
    }
    //sempre que a tela é aberta, os dados sao carregados da api
    useEffect(() => {
        LoadDash()
    }, [])


    async function LoadDash() {
        const url = `${apiDash}?dataInicial=${FormatDate(dateStart)}&dataFinal=${FormatDate(dateEnd)}`
        console.log(url)
        setLoading(true)
        try {
            const response = await axios.get(`${apiDash}?dataInicial=${FormatDate(dateStart)}&dataFinal=${FormatDate(dateEnd)}`);
            setDashData(response.data)

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log('Erro ao buscar os dados para o dashboard', error);
            Toast.show({
                type: "error",
                text1: 'Erro ao buscar dados para o dashboard',
                text2: error.message
            });
        }
    }


    useEffect(() => {

        const Situacao = dashData.DashAtendimentosPorSituacao
        setDashSituacao(Situacao)
        const atendent = dashData.DashAtendente
        setDashAtendente(atendent)

        const atendiment = dashData.DashAtendenteStacked
        setAtendiment(atendiment)

    }, [dashData])



    return (


        <View style={{ marginStart: 10, marginEnd: 10, }}>

            <View style={styles.header} >

                <DatePickerHeader setDateEndd={setDateEnd} setDateStart={setDateStart} />

            </View>

            <Button
                onPress={LoadDash}
                title='Filtrar'
                containerStyle={{ width: 100, height: 50, marginTop: 5, }}
                buttonStyle={{ backgroundColor: '#DB6015' }}
            />
            <Text style={styles.label}>Visão Geral - Atendimentos</Text>

            {
                loading === true ?
                    (
                        <View style={{ marginTop: 200 }}>
                            <ActivityIndicator color='#DB6015' size='large' />
                        </View>

                    ) :

                    <ScrollView>


                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal

                            data={dashSituacao}
                            keyExtractor={(item) => item.Situacao}
                            renderItem={({ item }) =>
                                <RenderCards item={item} loading={loading} />
                            }
                        />
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal

                            data={dashAtendente}
                            keyExtractor={(item) => item.UIDAtendente}
                            renderItem={({ item }) =>
                                <RenderAtendiment item={item} />}


                        />
                        <Text style={styles.label}>Atendimentos por Atendente</Text>
                        <DashAtendent data={dashAtendimentAtendente} />
                        <Text style={styles.label}>Atendimentos por Situação</Text>
                        <Text style={styles.label}>Atendimentos por Motivo</Text>
                        <Text style={styles.label}>Atendimentos por Contato</Text>
                    </ScrollView>
            }

        </View>
    )



}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'RobotoMedium',
        fontSize: 18,
        marginTop: 15
    },
    header: {
        flexDirection: 'row',
        marginEnd: 140,
        alignItems: 'center',
        zIndex: 5000
    }
})