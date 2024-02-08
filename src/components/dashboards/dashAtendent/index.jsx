import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';

export default function DashAtendent({ data }) {
    // Filtra os atendentes com aberturas e finalizações maiores que zero
    const filteredData = data.filter(item => item.Aberta > 0 || item.Finalizado > 0);

    // Verifica se há dados válidos após a filtragem
    if (!filteredData || !Array.isArray(filteredData) || filteredData.length === 0) {
        return null; // Retorna null se não houver dados válidos
    }

    // Extrai os arrays de atendentes, aberturas e finalizações dos dados filtrados
    const atendentes = filteredData.map(item => item.Atendente);
    const aberturas = filteredData.map(item => item.Aberta);
    const finalizacoes = filteredData.map(item => item.Finalizado);


    // Define as cores das barras de aberturas e finalizações
    const colors = ['#36c389', '#d02d55']; // Verde para finalizações e Vermelho para aberturas

    // Define os dados a serem exibidos no gráfico de barras
    const barData = [
        {
            data: aberturas,
            svg: {
                fill: colors[1], // Vermelho para aberturas
            },
        },
        {
            data: finalizacoes,
            svg: {
                fill: colors[0], // Verde para finalizações
            },
        },
    ];

    return (
        <View style={{ flex: 1, margin: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View>
                    <View style={styles.cardOk}>

                    </View>
                    <Text>Concluido</Text>
                </View>
                <View>
                    <View style={styles.card}>

                    </View>
                    <Text>Pendente</Text>
                </View>
            </View>
            <View style={{ height: 200 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={barData}
                    gridMin={0}
                    contentInset={{ top: 30, bottom: 30, left: 20, right: 20 }} // Adiciona espaço para os rótulos do eixo X
                    spacingInner={0.3}
                    spacingOuter={0.1}
                >
                    <Grid />
                </BarChart>
                <YAxis
                    style={{ marginHorizontal: -10 }}
                    data={barData}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ flexDirection: 'row' }}
            >
                {atendentes.map((atendente, index) => (
                    <View key={index} style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 10 }}>{atendente}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 50,
        height: 10,
        backgroundColor: '#d02d55'
    },
    cardOk: {
        width: 50,
        height: 10,
        backgroundColor: '#36c389'
    }
})