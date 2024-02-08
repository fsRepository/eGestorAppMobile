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
import DashMotive from '../../components/dashboards/dashMotive';
import DashContaxt from '../../components/dashboards/dashContact';
import DashHour from '../../components/dashboards/dashHour';
import DashDay from '../../components/dashboards/DashDay';
import DashMount from '../../components/dashMount';
import DashYear from '../../components/dashboards/dashYear';


export default function Home() {

    const [selectedPicker, setSelectedPicker] = useState("Todos")
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [dashData, setDashData] = useState([])
    const [dashSituacao, setDashSituacao] = useState([])
    const [dashAtendente, setDashAtendente] = useState([])
    const [dashAtendimentAtendente, setDashAtendiment] = useState([])
    const [dashMotive, setDashMotive] = useState([])
    const [dashContact, setDashContact] = useState([])
    const [dashHour, setDashHour] = useState([])
    const [customerRecor, setCustomerRecor] = useState([])
    const [dashDay, setDashDay] = useState([])
    const [dashMounth, setDashMounth] = useState([])
    const [dashYear, setDashYear] = useState([])
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

        setDashAtendiment(dashData.DashAtendenteStacked)
        const Situacao = dashData.DashAtendimentosPorSituacao
        setDashSituacao(Situacao)
        const atendent = dashData.DashAtendente
        setDashAtendente(atendent)
        setDashMotive(dashData.DashAtendimentosPorMotivo)
        setDashContact(dashData.DashAtendimentosPorContato)
        setDashHour(dashData.DashAtendimentosPorHora)
        setCustomerRecor(dashData.ClientesRecorrentes)
        setDashDay(dashData.DashboardAtendimentosPorDia)
        setDashMounth(dashData.DashboardAtendimentosPorMes)
        setDashYear(dashData.DashboardAtendimentosPorAno)
    }, [dashData]);


    /// função pra retormnar os clientes recorrentes

    function RenderClients({ item }) {
        return (
            <View style={styles.containerClients}>
                <Text style={styles.text}>{item.Titulo}</Text>
                <Text>-</Text>
                <Text style={styles.text1}>{item.Total} ATENDIMENTO(S)</Text>
            </View>
        )
    }
    return (
        <View style={{ marginStart: 10, marginEnd: 10, flex: 1 }}>
            <View style={styles.header}>
                <DatePickerHeader setDateEndd={setDateEnd} setDateStart={setDateStart} />
            </View>
            <Button
                onPress={LoadDash}
                title='Filtrar'
                containerStyle={{ width: 100, height: 50, marginTop: 5, }}
                buttonStyle={{ backgroundColor: '#DB6015' }}
            />
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.label}>Visão Geral - Atendimentos</Text>
                {loading ? (
                    <View style={{ marginTop: 200 }}>
                        <ActivityIndicator color='#DB6015' size='large' />
                    </View>
                ) : (
                    <View>
                        {/* Verifica se há atendimentos */}
                        {dashAtendente.length === 0 && (
                            <Text style={{ textAlign: 'center', marginTop: 100, fontSize: 16 }}>Nenhum atendimento disponível.</Text>
                        )}
                        {/* Renderiza a lista de atendimentos se houver */}
                        {dashAtendente.length > 0 && (
                            <View>
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


                                <Text style={styles.label}>Atendimentos por Motivo</Text>

                                <DashMotive data={dashMotive} />

                                <Text style={styles.label}>Atendimentos por Contato</Text>

                                <DashContaxt data={dashContact} />


                                <Text style={styles.label}>Atendimentos por Hora</Text>

                                <DashHour data={dashHour} />

                                <Text style={styles.label}>Clientes Recorrentes</Text>
                                <FlatList
                                    keyExtractor={(item, index) => item.UID}
                                    data={customerRecor}
                                    renderItem={({ item }) => <RenderClients item={item} />

                                    }
                                />
                                <Text style={styles.label}>Atendimentos por Dia</Text>
                                <DashDay
                                    data={dashDay}
                                />
                                <Text style={styles.label}>Atendimentos por Mês</Text>
                                <DashMount
                                    data={dashMounth}
                                />

                                <Text style={styles.label}>Atendimentos por Ano</Text>
                                <DashYear data={dashYear} />
                            </View>



                        )}
                    </View>
                )}
            </ScrollView>
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
    },
    containerClients: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around', marginTop: 10,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    text: {
        fontSize: 16,
        fontFamily: 'RobotoRegular',
        width: 100
    },
    text1: {
        fontSize: 16,
        fontFamily: 'RobotoRegular',

    }
})