import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

// import { Container } from './styles';
import { Overlay, Input, Button, CheckBox } from '@rneui/themed';


export default function OverlayRender({ openModal,
    setOpenModal,
    input,
    itemSelected,
    setInput,
    type,
    Save,
    setStatus,
    EditItem,
    status,
    DeleteItem }) {

    const [disabled, setDisabled] = useState(false)


    const [checkedAtive, setCheckedAtive] = useState(false)
    const [checkedInative, setCheckedInative] = useState(false)
    // SE TIVER UM ITEM SELECIONADO ELE JA ABRE COM O VALOR DO ITEM
    console.log(itemSelected)
    useEffect(() => {
        if (itemSelected && Object.keys(itemSelected).length !== 0) {
            setDisabled(true);

            if (type === 'motive') {
                setInput(itemSelected.Motivo);
            } else if (type === 'contact') {
                setInput(itemSelected.Descricao);
            } else if (type === 'sistem') {
                setInput(itemSelected.Sistema)
            }

            if (itemSelected.Ativo === true) {
                setCheckedAtive(true);
                setCheckedInative(false);
            } else {
                setCheckedInative(true);
                setCheckedAtive(false);
            }
        } else {

            setDisabled(false);
            setInput('')
        }
    }, [itemSelected]);
    //função para salvar o item na lista
    function saveItem() {
        Save()

    }

    function Update() {
        setDisabled(false)

        if (disabled === false && input !== itemSelected.Descricao || status !== itemSelected.Ativo) {


            EditItem(itemSelected)
        }

    }


    function Delete() {
        DeleteItem(itemSelected)
    }


    return (
        <View>
            {
                type === 'contact' ?
                    <Text style={styles.label}>Adicionar Novo meio de contato</Text> :
                    type === 'motive' ?
                        <Text style={styles.label}>Adicionar Motivo</Text> : <Text style={styles.label}>Adicionar Sistema</Text>
            }

            <Input
                placeholder='Ex: WhatsApp'
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={input}
                onChangeText={(text) => setInput(text)}
                disabled={disabled}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <CheckBox
                    center
                    title='Ativo'
                    checked={checkedAtive}
                    disabled={disabled}
                    onPress={() => {
                        setCheckedAtive(!checkedAtive)
                        setCheckedInative(false)
                        setStatus(true)


                    }}
                />
                <CheckBox
                    center
                    title='Inativo'
                    checked={checkedInative}
                    disabled={disabled}
                    onPress={() => {
                        setCheckedInative(!checkedInative)
                        setCheckedAtive(false)
                        setStatus(false)


                    }}
                />
            </View>
            {
                itemSelected.length === 0 ? <Button
                    onPress={saveItem}
                    title='Salvar'
                    buttonStyle={{
                        backgroundColor:
                            '#36c389', borderRadius: 6
                    }}
                /> : ''
            }

            {
                itemSelected.length === 0 ? '' :
                    <Button
                        onPress={Update}
                        title='Editar'
                        buttonStyle={{
                            backgroundColor:
                                '#138ae4', borderRadius: 6,
                            marginTop: 10
                        }}
                    />
            }






        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontFamily: 'RobotoRegular'
    },
    inputContainer: {
        width: 300,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#DB6015',
        marginTop: 10
    }

})