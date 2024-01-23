import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';
import { Overlay, Input, Button, CheckBox } from '@rneui/themed';


export default function OverlayRender({ openModal, setOpenModal, input, itemSelected, setInput, type }) {

    const [disabled, setDisabled] = useState(false)
    const [textButton, setTextButton] = useState('Salvar')

    const [checkedAtive, setCheckedAtive] = useState(false)
    const [checkedInative, setCheckedInative] = useState(false)
    // SE TIVER UM ITEM SELECIONADO ELE JA ABRE COM O VALOR DO ITEM

    useEffect(() => {

        if (itemSelected) {
            if (type === 'motive') {
                setInput(itemSelected.Motivo)
            } else if (type === 'contact') {
                setInput(itemSelected.Descricao)
            }


            setDisabled(true)
            setTextButton('Editar')
            if (itemSelected.Ativo === true) {
                setCheckedAtive(true)
                setCheckedInative(false)
            } else {
                setCheckedInative(true)
                setCheckedAtive(false)
            }
        }

    }, [])


    //função para salvar o item na lista
    function saveItem() {
        if (textButton === 'Salvar') {
            alert('salvo')
        } else {
            setDisabled(false)
            setTextButton('Salvar')
        }

    }


    return (
        <View>
            <Text style={styles.label}>Adicionar Novo meio de contato</Text>
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


                    }}
                />
            </View>
            <Button
                onPress={saveItem}
                title={textButton}
                buttonStyle={{
                    backgroundColor:
                        '#36c389', borderRadius: 6
                }}
            />
            <Button
                onPress={() => setOpenModal(false)}
                title='Cancelar'
                buttonStyle={{ backgroundColor: '#d02d55', marginTop: 10, borderRadius: 6 }}
            />
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