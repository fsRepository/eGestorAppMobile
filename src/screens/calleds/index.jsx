import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/header';
import DatePickerHeader from '../../components/headerDatePicker';
import { Button, Overlay } from '@rneui/themed'
import { useState } from 'react'
import SearchBarComponent from '../../components/searchBarComponent';
import { FlatList } from 'react-native';
import AtendimentList from '../../components/atendimentList';
import { useNavigation } from '@react-navigation/native';



// import { Container } from './styles';


export default function Calleds() {
    const [selectedPicker, setSelectedPicker] = useState('')
    const [search, setSearch] = useState('')
    const [atendimentoData, setAtendimentoData] = useState([
        {
            protocolNumber: '123456',
            clientId: 'C001',
            clientName: 'Lojão Bras',
            requesterName: 'Maria Souza',
            attendantName: 'Carlos Oliveira',
            startTime: '2024-01-18T10:00:00',
            status: 'Concluido',
        },
        {
            protocolNumber: '789012',
            clientId: 'C002',
            clientName: 'Atacado Martins',
            requesterName: 'José Silva',
            attendantName: 'Fernanda Souza',
            startTime: '2024-01-18T11:30:00',
            status: 'Pendente',
        },
        {
            protocolNumber: '345678',
            clientId: 'C003',
            clientName: 'Americanas',
            requesterName: 'Juliana Lima',
            attendantName: 'Mariana Oliveira',
            startTime: '2024-01-18T14:15:00',
            status: 'Em Andamento',
        },
        {
            protocolNumber: '901234',
            clientId: 'C004',
            clientName: 'Atacadao',
            requesterName: 'Rafaela Pereira',
            attendantName: 'Rodrigo Mendes',
            startTime: '2024-01-18T16:45:00',
            status: 'Pendente',
        },
        {
            protocolNumber: '567890',
            clientId: 'C005',
            clientName: 'Lucas Oliveira',
            requesterName: 'Isabela Santos',
            attendantName: 'Anderson Souza',
            startTime: '2024-01-18T19:30:00',
            status: 'Em Andamento',
        },
        {
            protocolNumber: '234567',
            clientId: 'C006',
            clientName: 'Fernanda Lima',
            requesterName: 'Roberto Silva',
            attendantName: 'Camila Oliveira',
            startTime: '2024-01-18T22:00:00',
            status: 'Pendente',
        },
        {
            protocolNumber: '890123',
            clientId: 'C007',
            clientName: 'Mariana Souza',
            requesterName: 'Lucas Santos',
            attendantName: 'Gabriel Lima',
            startTime: '2024-01-19T09:00:00',
            status: 'Em Andamento',
        },
        {
            protocolNumber: '456789',
            clientId: 'C008',
            clientName: 'Juliano Silva',
            requesterName: 'Tatiane Oliveira',
            attendantName: 'Ana Lima',
            startTime: '2024-01-19T12:30:00',
            status: 'Pendente',
        },
        {
            protocolNumber: '012345',
            clientId: 'C009',
            clientName: 'Roberta Oliveira',
            requesterName: 'Gustavo Lima',
            attendantName: 'Patricia Souza',
            startTime: '2024-01-19T15:15:00',
            status: 'Em Andamento',
        },
        {
            protocolNumber: '678901',
            clientId: 'C010',
            clientName: 'Larissa Santos',
            requesterName: 'Ricardo Silva',
            attendantName: 'Daniel Oliveira',
            startTime: '2024-01-19T18:45:00',
            status: 'Pendente',
        },
    ]);

    //determina se o  modal esta aberto ou fechado
    const [open, setOpen] = useState(false);

    //const navigation para navegar pra outra screen
    const navigation = useNavigation()
    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                marginEnd: 140,
                alignItems: 'center'
            }}>
                <Header selectedPicker={selectedPicker} setSelectedPicker={setSelectedPicker} />
                <DatePickerHeader />
            </View>
            <View style={{ marginTop: 10 }}>
                <SearchBarComponent search={search} setSearch={setSearch} />
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

            <View>


                <FlatList
                    keyExtractor={(item, index) => item.protocolNumber}
                    data={atendimentoData}
                    renderItem={({ item }) =>
                        <AtendimentList item={item} />
                    }
                />


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