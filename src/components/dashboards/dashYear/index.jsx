import React from 'react';
import { View } from 'react-native';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

export default function DashYear({ data }) {


    const Data = data.map((item) => ({
        Data: item.Ano,
        Quantidade: item.Total
    }));



    // Obtendo um array com a propriedade Quantidade de cada objeto em Data
    const Quantidades = Data.map((item) => item.Quantidade);

    return (
        <View style={{ height: 200, marginTop: 10, flexDirection: 'row' }}>
            <YAxis
                data={Quantidades}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{ fill: 'grey', fontSize: 16 }}
                numberOfTicks={10}
                formatLabel={(value) => `${value}`} // Formatação dos rótulos do eixo Y
            />
            <View style={{ flex: 1 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={Quantidades} // Passando Quantidades como dados para o gráfico
                    gridMin={0}
                    svg={{ fill: '#36c389' }}
                />
                <XAxis
                    style={{ marginTop: 10 }}
                    data={Data.map((item) => item.Data)} // Passando as datas como dados para o eixo X
                    scale={scale.scaleBand}
                    formatLabel={(value, index) => `${Data[index].Data}`} // Exibindo a data correspondente a cada barra
                    labelStyle={{ color: 'black' }}
                />

            </View>
        </View>
    );
}
