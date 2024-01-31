import React from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import Header from '../../components/header';
import DatePickerHeader from '../../components/headerDatePicker';
import { Button, Overlay } from '@rneui/themed'
import { useState, useEffect, useContext } from 'react'
import SearchBarComponent from '../../components/searchBarComponent';
import { FlatList } from 'react-native';
import AtendimentList from '../../components/atendimentList';
import { useNavigation } from '@react-navigation/native';
import { apiAtendimentos } from '../../services/api';
import axios from 'axios';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';
import { ContextAuth } from '../../context';
import FabSpeed from '../../components/FabSpeedAction';


// import { Container } from './styles';


export default function Calleds() {
    const [selectedPicker, setSelectedPicker] = useState('')
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Todos')
    const [atendiment, setAtendiment] = useState([])
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [loading, setLoading,] = useState(false)
    const { situations, LoadSituations, user, LoadClients } = useContext(ContextAuth)

    //determina se o  modal esta aberto ou fechado
    const [open, setOpen] = useState(false);

    //const navigation para navegar pra outra screen
    const navigation = useNavigation()

    //função para formatar a data no formato esperado pela api
    function FormatData(value) {
        const FormatDT = format(value, 'yyyy.MM.dd')
        return FormatDT;

    }


    //função para carregar todos os atendimentos

    async function LoadCalleds() {
        setLoading(true)

        const response = await axios.get(`${apiAtendimentos}?dataInicial=2024.01.01&dataFinal=2024.01.02`)
        try {

            console.log('dados', response.data)
            setAtendiment(response.data)
            setLoading(false)


        }
        catch {
            (error) => {
                console.log('Erro ao buscar atendimentos', error)
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'erro ao buscar atendimentos',

                })
            }
        }

    }

    useEffect(() => {
        LoadCalleds()
    }, [])

    useEffect(() => {
        LoadSituations()
        LoadClients()
    }, [atendiment])

    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                marginEnd: 140,
                alignItems: 'center',
                zIndex: 500
            }}>
                <Header selectedPicker={selectedPicker} setSelectedPicker={setSelectedPicker} />
                <DatePickerHeader />
            </View>
            <View style={{ marginTop: 10 }}>
                <View style={{ zIndex: 5000 }}>
                    <SearchBarComponent search={search} setSearch={setSearch} type='calleds' filter={filter} setFilter={setFilter} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 10, marginEnd: 10 }}>
                    <Button title='Filtrar'
                        containerStyle={{ width: 100, height: 50, marginTop: 5, }}
                        buttonStyle={{ backgroundColor: '#DB6015' }}
                    />
                    <Button
                        onPress={() => navigation.navigate('addatendiment')}
                        title='Incluir Atendimento'
                        containerStyle={{ width: 180, height: 50, marginTop: 5, }}
                        buttonStyle={{ backgroundColor: '#36c389' }}
                    />
                </View>

            </View>

            <View style={{ zIndex: -1 }}>

                {
                    loading === true ? (
                        <ActivityIndicator style={{ marginTop: 100 }} size="large" color="#DB6015" />
                    ) : <FlatList
                        keyExtractor={(item, index) => item.UID}
                        data={atendiment}
                        renderItem={({ item }) =>
                            <AtendimentList item={item} type='calleds' />
                        } refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={LoadCalleds}
                                colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']}
                            />
                        }
                    />
                }



            </View>




        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        marginStart: 10,
        marginEnd: 10
    }
})