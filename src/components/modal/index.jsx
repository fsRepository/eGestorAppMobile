import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Toast from 'react-native-toast-message'
// import { Container } from './styles';
import { Input } from '@rneui/themed'
export default function ModalRender({ closeModal }) {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)

    function isEmailValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }





    async function handleSend() {
        console.log(email)
        if (email.trim() !== '') {
            if (isEmailValid(email)) {

                try {
                    Toast.show({
                        type: 'success',
                        text1: 'Email enviado!',
                        text2: 'Em breve te enviaremos um email com mais informações'
                    })
                    setEmail('')
                    await closeModal()
                }
                catch (error) {
                    console.log(error)
                }

            } else {
                setErrorMessage(true)
            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Preencha os campos vazios para continuar'
            })
        }


    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Insira seu endereço de email</Text>
            <Text style={styles.p} > e nós o ajudaremos a recuperar sua senha.</Text>
            <Input
                containerStyle={{
                    width: 350, height: 40, borderRadius: 2, backgroundColor: '#e9e9e9',
                    marginTop: 10, marginBottom: 30

                }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                errorMessage={errorMessage === false ? '' : 'Digite um email válido'}
                placeholder='teste@gmail.com'
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={handleSend}
                    style={styles.button}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.button}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>

            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginStart: 10,
        marginEnd: 10
    },
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        fontFamily: 'RobotoMedium'
    },
    p: {
        fontSize: 15,
        color: 'black',
        marginTop: 10,
        fontFamily: 'RobotoMedium'
    },
    input: {
        width: 380,
        backgroundColor: '#e9e9e9',
        borderRadius: 6,
        height: 40,
        marginTop: 20,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#DB6015',
        marginTop: 10,
        width: 300,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    }
})