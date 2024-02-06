import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, CheckBox, Button } from '@rneui/themed';
import { ContextAuth } from '../../context';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePickerHeader from '../headerDatePicker';
import { apiCRMAtendimentos } from '../../services/api';
import Toast from 'react-native-toast-message';

import axios from 'axios';
import { format } from 'date-fns';

export default function OverlayAtendiment({ setOpen, open,
    selectedCustomer,
    setSelectedCustomer,
    openPicker,
    setOpenPicker,
    dateStart,
    setDateStart,
    dateEnd,
    setDateEndd,
    dataCustomer,
    setDataCustomer,
    conceito,
    setConceito,
    desc,
    setDesc,
    status,
    setStatus,
    chekOk,
    setChekOk,
    chekPendent,
    setPendentcHEK,
    itemSelected,
    Add,
    EditItem,
    DeleteItem
}) {


    const [errorMessage, setError] = useState(false)
    const { Customers, user } = useContext(ContextAuth)
    const [disabled, setDisabled] = useState(false)

    function FormatData(value) {
        return format(value, 'dd/MM/yyyy')

    }

    console.log(open)

    /**
     * 
     *   case 'Pendente':
                return '#d02d55';
            case 'Concluido':
                return '#36c389';
            case 'Liberado':
                return '#138ae4';
            case 'Retorno':
                return '#d02d55';
            case 'Desenvolvimento':
                return '#138ae4';
            case 'TotalOcorrencias':
                return '#d02d55';
            case 'TotalAtendimentos':
                return '#36c389';
     */
    useEffect(() => {

        const customerData = Customers.map((item) => ({
            label: item.Nome,
            value: item.UID
        }))
        setDataCustomer(customerData)

    }, [Customers])

    function VerifyNumber(text) {
        if (text > 10) {
            setError(true)

        } else {
            setConceito(text)
            setError(false)
        }
    }


    useEffect(() => {

        if (itemSelected) {
            setSelectedCustomer(itemSelected.UIDCliente),
                setDateStart(itemSelected.Periodo_Inicial),
                setStatus(itemSelected.Situacao),
                setDateEndd(itemSelected.Periodo_Final),
                setConceito(itemSelected.Conceito),
                setDesc(itemSelected.Descricao)
            setDisabled(true)


            if (
                itemSelected.Situacao === 'CONCLUIDO'
            ) {
                setChekOk(true)
            } else {
                setPendentcHEK(true)
            }

        } else {
            setSelectedCustomer(''),
                setDateStart(''),
                setStatus(''),
                setDateEndd(''),
                setConceito(''),
                setDesc('')
            setDisabled(false)
        }

    }, [itemSelected])


    function Edit() {
        setDisabled(false)

        if (disabled === false) {
            EditItem(itemSelected)
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#DB6015', justifyContent: 'center' }}>
                <Text style={styles.title}>CRM</Text>
            </View>

            <View>
                <Text style={styles.label}>Cliente</Text>
                <View style={{ zIndex: 100 }}>
                    <DropDownPicker
                        style={{ borderColor: 'white' }}
                        open={openPicker}
                        setOpen={setOpenPicker}
                        items={dataCustomer}
                        value={selectedCustomer}
                        setValue={setSelectedCustomer}
                        disabled={disabled}
                    />
                </View>
                {
                    itemSelected !== undefined ? (

                        <View style={{ gap: 5 }}>
                            {dateStart && <Text style={styles.date}>{FormatData(dateStart)}</Text>}
                            {dateEnd && <Text style={styles.date}>{FormatData(dateEnd)}</Text>}
                        </View>

                    ) :
                        <DatePickerHeader setDateEndd={setDateEndd} setDateStart={setDateStart} />
                }
                <Text style={styles.label}>Conceito</Text>
                {
                    itemSelected ? <Text style={styles.label}>{conceito}/10</Text> : (
                        <Input
                            value={conceito}
                            onChangeText={(text) => VerifyNumber(text)}
                            keyboardType='numeric'
                            placeholder="Digite uma nota de 1 a 10"
                            errorMessage={errorMessage === true ? 'Você deve digitar um numero entre 1 e 10' : ''}
                            disabled={disabled}
                        />
                    )
                }



                <Text style={styles.label}>Descrição</Text>
                <Input
                    value={desc}
                    inputStyle={{ backgroundColor: '#e6e6e6', height: 70, width: 100 }}
                    onChangeText={(text) => setDesc(text)}
                    keyboardType='default'
                    disabled={disabled}
                    multiline
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -30 }}>
                    <Text style={{ color: '#36c389', fontSize: 16 }}>Concluido</Text>
                    <CheckBox
                        checked={chekOk}
                        onPress={() => {
                            setChekOk(!chekOk)
                            setPendentcHEK(false)

                            setStatus('Concluido')
                        }}
                        disabled={disabled}
                    />
                    <Text style={{ color: '#d02d55', fontSize: 16 }}>Pendente</Text>
                    <CheckBox
                        checked={chekPendent}
                        onPress={() => {
                            setPendentcHEK(!chekPendent)
                            setChekOk(false)
                            setStatus('Pendente')


                        }}
                        disabled={disabled}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    {
                        itemSelected ? <Button

                            title='Editar'
                            onPress={Edit}
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{ backgroundColor: '#138ae4' }}
                        /> :
                            <Button
                                onPress={Add}
                                title='Salvar'
                                containerStyle={{ width: 100, borderRadius: 6 }}
                                buttonStyle={{ backgroundColor: '#36c389' }}
                            />
                    }

                    {itemSelected ?


                        <Button
                            title='Exlcuir'
                            onPress={() => DeleteItem(itemSelected)}
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{ backgroundColor: '#d02d55' }}
                        /> :
                        <Button
                            title='Cancelar'
                            onPress={() => setOpen(false)}
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{ backgroundColor: '#d02d55' }}
                        />
                    }

                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        width: 350,
        height: 500
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'RobotoBold',
        color: 'white',
        marginTop: 10
    },
    label: {
        fontSize: 20,
        fontFamily: 'RobotoMedium',
        color: 'grey',
        marginTop: 5, marginBottom: 5
    },
    date: {
        fontSize: 16,
        fontFamily: 'RobotoMedium',
        color: 'black',
        backgroundColor: '#e6e6e6',
        padding: 2,
        borderRadius: 5
    }

})