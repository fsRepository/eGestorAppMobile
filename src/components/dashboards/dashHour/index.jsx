import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart, YAxis, Grid, XAxis } from 'react-native-svg-charts';

export default function DashHour({ data }) {
    // Verifica se há dados
    if (!data || data.length === 0) {
        return null;
    }

    const contentInset = { top: 20, bottom: 20 };

    // Extrai as situações e horas dos dados
    const situations = data.map(item => item.Situacao);
    const hours = data.map(item => item.Horas);

    // Cores das linhas
    const colors = ['#d02d55', '#36c389']; // Verde para finalizações e Vermelho para aberturas
    // Define os dados a serem exibidos no LineChart
    const chartData = hours.map((values, index) => ({
        data: values,
        svg: {
            stroke: colors[index] // Cor da linha do gráfico
        },
        key: `line-${index}`,
    }));

    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View>
                    <View style={styles.cardOk}></View>
                    <Text>Ligações Finalizadas</Text>
                </View>
                <View>
                    <View style={styles.card}></View>
                    <Text>Ligações em Aberto</Text>
                </View>
            </View>

            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={hours[1]} // Use os dados da segunda situação para definir os rótulos do eixo Y
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}h`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={chartData}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
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
});
