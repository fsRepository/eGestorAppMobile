import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from '@rneui/themed';
import { format, parseISO } from 'date-fns';
import StarIcon from 'react-native-vector-icons/AntDesign';
import { ContextAuth } from '../../context';
import { useNavigation } from '@react-navigation/native';
export default function AtendimentList({ item, type, customer, open, setOpen, itemSelected, setItemSelected, }) {
    const [nameClient, setNameClient] = useState('');
    const navigation = useNavigation()

    function formatDate(value) {
        if (value) {
            const parsedDate = parseISO(value);
            return format(parsedDate, 'dd/MM/yyyy');
        }
        return '';
    }


    const [namesClients, setNamesClients] = useState([]);
    useEffect(() => {
        // Verifica se o item da lista tem UIDCliente e se é do tipo 'crm'
        if (item.UIDCliente && type === 'crm') {
            // Filtra os clientes correspondentes pelo UIDCliente
            const matchingCustomers = customer.filter(customer => customer.UID === item.UIDCliente);

            // Obtém os nomes dos clientes encontrados
            const names = matchingCustomers.map(customer => customer.NomeFantasia); // Substitua 'Nome' pela propriedade correta que armazena o nome do cliente

            // Define os nomes dos clientes
            setNamesClients(names);
        }
    }, [item.UIDCliente, type, customer]);


    //função que recebe o item clicado e abre o modal
    function handleOpen() {


        setItemSelected(item)
        setOpen(true)
    }




    return (
        <View>
            {type === 'crm' ? (
                <TouchableOpacity style={styles.container}
                    onPress={(item) => handleOpen(item)}

                >
                    <View style={styles.cardContainer}>
                        <View style={styles.info}>
                            {namesClients.map((name, index) => (
                                <Text key={index} style={styles.label1}>{name}</Text>
                            ))}
                            <Text style={styles.label}> Periodo inicial:{formatDate(item.Periodo_Inicial)}</Text>
                            <Text style={styles.label}> Periodo final:{formatDate(item.Periodo_Final)}</Text>
                            <Text style={styles.label}> Data CRM:{formatDate(item.Data_Realizacao)}</Text>
                            <View style={{ flexDirection: 'row', marginStart: 10 }}>
                                <StarIcon name='star' size={20} color='#ffd700' />
                                <Text style={{ fontFamily: 'RobotoBold', fontSize: 16 }}>{item.Conceito}/10</Text>
                            </View>
                        </View>
                        <View style={styles.status}>
                            <Badge status={item.Situacao === 'PENDENTE' ? 'error' : item.Situacao === 'CONCLUIDO' ? 'success' : 'warning'} />
                            <Text>{item.Situacao}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.container}
                    onPress={() => navigation.navigate('addatendiment', { item })}

                >
                    <View style={styles.cardContainer}>
                        <View style={styles.info}>
                            <Text style={styles.label1}>{item.Titulo}</Text>
                            <Text style={styles.label}>Solicitante:{item.Solicitante}</Text>
                            <Text style={[styles.label, { width: 260 }]}>Atendente: {item.Atendente}</Text>
                            <Text style={styles.label}>{formatDate(item.Data_atend_ini)}</Text>
                            <Text style={styles.label}>{item.Hora_atendimento}</Text>
                            <Text>Protocolo:{item.Protocolo}</Text>

                        </View>
                        <View style={styles.status}>
                            <Badge status={item.Situcao === 'PENDENTE' ? 'error' : item.Situacao === 'CONCLUÍDO' ? 'success' : 'warning'} />
                            <Text>{item.Situacao}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        marginStart: 10,
        marginEnd: 10
    },
    label: {
        fontSize: 16,
        fontFamily: 'RobotoRegular',
    },
    label1: {
        fontSize: 18,
        fontFamily: 'RobotoMedium',
        width: 200
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    status: {
        alignItems: 'center',
        gap: 10,
        width: 100
    },
});
