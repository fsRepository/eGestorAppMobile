import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from '@rneui/themed';

export default function AtendimentList({ item }) {


    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.cardContainer}>
                <View style={styles.info}>
                    <Text style={styles.label1}>{item.clientName}</Text>
                    <Text style={styles.label}>Solicitante:{item.requesterName}</Text>
                    <Text style={styles.label}>Atendente: {item.attendantName}</Text>
                    <Text style={styles.label}>{item.startTime}</Text>
                    <Text>Protocolo:{item.protocolNumber}</Text>
                    <Text>Id cliente:{item.clientId}</Text>
                </View>
                <View style={styles.status}>
                    <Badge status={item.status === 'Pendente' ? 'error' : item.status === 'Concluido' ? 'success' : 'warning'} />
                    <Text>{item.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 8
    },
    label: {
        fontSize: 16,
        fontFamily: 'RobotoRegular'
    },
    label1: {
        fontSize: 18,
        fontFamily: 'RobotoMedium'
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    status: {
        alignItems: 'center',
        gap: 10
    }
})