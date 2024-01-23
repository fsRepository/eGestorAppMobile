import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Header from '../../components/header';
import { Picker } from '@react-native-picker/picker';
import { Card } from '@rneui/themed';
import RenderCards from '../../components/renderCards';

import DatePickerHeader from '../../components/headerDatePicker';
import { Button } from '@rneui/base';
import RenderAtendiment from '../../components/renderAtendiment';


export default function Home() {

    const [selectedPicker, setSelectedPicker] = useState("Todos")

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
    /*
    
    */
    return (


        <View style={{ marginStart: 10, marginEnd: 10, }}>

            <View style={styles.header} >
                <Header setSelectedPicker={setSelectedPicker} selectedPicker={selectedPicker} />
                <DatePickerHeader />

            </View>

            <Button title='Filtrar'
                containerStyle={{ width: 100, height: 50, marginTop: 5, }}
                buttonStyle={{ backgroundColor: '#DB6015' }}
            />
            <Text style={styles.label}>Visão Geral - Atendimentos</Text>


            <ScrollView>


                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal

                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <RenderCards item={item} />
                    }
                />

                <Text style={styles.label}>Atendimentos por Atendente</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal

                    data={atendiments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <RenderAtendiment item={item} />}


                />

                <Text style={styles.label}>Atendimentos por Situação</Text>
                <Text style={styles.label}>Atendimentos por Motivo</Text>
                <Text style={styles.label}>Atendimentos por Contato</Text>
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
        alignItems: 'center'
    }
})