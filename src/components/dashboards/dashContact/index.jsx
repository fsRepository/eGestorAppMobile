import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as Text1 } from 'react-native-svg'
export default function DashContaxt({ data }) {
    // Filtra os dados para remover aqueles com Total igual a 0
    const filteredData = data.filter(item => item.Total > 0);

    // Extrai os motivos e totais dos dados filtrados
    const contat = filteredData.map(item => item.Contato);
    const totais = filteredData.map(item => item.Total);

    // Define os dados a serem exibidos no PieChart
    const pieData = totais.map((value, index) => ({
        value,
        total: value,
        svg: {
            fill: getRandomColor(), // Função para obter cores aleatórias
        },
        key: `pie-${index}`,
        arc: { outerRadius: '100%', padAngle: 0 },
    }));

    // Função para gerar cores aleatórias
    function getRandomColor() {
        return '#' + Math.random().toString(16).substr(-6);
    }

    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            const value = data.total.toString();


            return (
                <Text1
                    key={`label-${index}`}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill='white'
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={16}
                    stroke={'black'}
                    strokeWidth={0.2}

                >
                    {value}
                </Text1>
            );
        });
    };


    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <PieChart
                    style={styles.chart}
                    data={pieData}
                >
                    <Labels />

                </PieChart>

            </View>
            <View style={styles.legendContainer}>
                {contat.map((contat, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: pieData[index].svg.fill }]} />
                        <Text>{contat}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    chart: {
        width: 120, // Largura do gráfico
        height: 120,
        // Altura do gráfico
    },
    legendContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    legendColor: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
});
