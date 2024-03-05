import React, { useState, useRef, useCallback, useMemo, useEffect, useContext } from 'react';
import { View, Platform, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, TextInput, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Switch } from '@rneui/themed'
import Icon from 'react-native-vector-icons/Fontisto'
import Lock from 'react-native-vector-icons/AntDesign'
// import { Container } from './styles';
import Logo from '../../../assets/gestor.png'
import ModalRender from '../../components/modal';
import BotomSheet from '@gorhom/bottom-sheet'
import Toast from 'react-native-toast-message'
import { ContextAuth } from '../../context/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
    const { login, loading, setLoading, user } = useContext(ContextAuth);
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [focusedEmail, setFocusedEmail] = useState(false)
    const [focusedPassword, setFocusedPasswsord] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [remenber, setRemenber] = useState(false)

    const bottomRef = useRef(null)
    const snapPoints = useMemo(() => ['1', '30%', '60%'], [])
    function handleFocus(value) {
        if (value === 'user') {
            setFocusedEmail(true)
        } else {
            setFocusedPasswsord(true)
        }
    }
    function handleBlur(value) {
        if (value === 'user') {
            setFocusedEmail(false)
        } else {
            setFocusedPasswsord(false)
        }
    }
    function openBottomSheet() {
        bottomRef.current?.expand()
        setModalVisible(true)
    }

    function handleLogin() {
        if (username !== '' && password !== '') {
            login(username, password, remenber)

        }
        else {

            Toast.show({
                type: "error",
                text1: 'Preencha os campos vazios'
            })
        }


    }

    // sempre que o usuario voltar pra tela de login, o loading para de rodar
    useEffect(() => {

        setLoading(false)

    }, [])

    // se o usuarioativar o remenber, os dados deles sao recuperados do storage 
    useEffect(() => {
        async function LoadRemenber() {


            const data = await AsyncStorage.getItem('user')
            const parse = JSON.parse(data)
            console.log('dados do usuario', parse)
            if (parse.Remenber === false) {
                return;
            } else {
                setUserName(parse.email)
                setPassword(parse.password)
                setRemenber(parse.Remenber)
            }


        }
        LoadRemenber()

    }, [])
    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding ' : 'height'} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Image source={Logo} style={{ width: 100, height: 100, resizeMode: 'contain' }} />
                    <Text style={styles.title}>eGestorMobile</Text>


                    <View style={{ marginTop: 50, gap: 20 }}>
                        <View style={{ justifyContent: 'flex-start', marginRight: 60, gap: 5 }}>
                            <Text style={{ marginTop: 18, fontSize: 24, fontFamily: 'RobotoBold' }}>Login</Text>
                            <Text style={{ fontSize: 16, fontFamily: 'RobotoRegular' }}>você está a um passo de uma melhor gestão</Text>
                        </View>
                        <View style={focusedEmail ? styles.inputFocus : styles.input}>
                            <Lock name='user' size={18} />
                            <TextInput
                                style={{ width: 300 }}
                                placeholder='Digite seu usuário'
                                keyboardType='default'
                                onFocus={() => handleFocus('user')}
                                onBlur={() => handleBlur('user')}
                                value={username}
                                onChangeText={(text) => setUserName(text)}
                            />
                        </View>
                        <View style={focusedPassword ? styles.inputFocus : styles.input}>
                            <Lock name='lock' size={18} />
                            <TextInput
                                style={{ width: 300 }}
                                placeholder='Digite sua senha'
                                keyboardType='default'
                                secureTextEntry
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                    </View>
                    <Button
                        onPress={handleLogin}
                        title={loading === false ? 'Login' : <ActivityIndicator color='white' />}
                        containerStyle={{
                            width: 300,
                            marginTop: 20,

                        }}
                        buttonStyle={{
                            backgroundColor: '#DB6015',
                            borderRadius: 6
                        }}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, gap: 5 }}>
                        <Text style={{ fontSize: 15, }}>Lembrar meu usuário</Text>
                        <Switch
                            value={remenber}
                            onValueChange={(value) => setRemenber(value)}
                            color='#DB6015'
                        />
                    </View>

                    {/**
                    <TouchableOpacity onPress={openBottomSheet}>
                        <Text style={{ fontSize: 16, marginTop: 10 }}>Esqueceu sua Senha?</Text>
                    </TouchableOpacity>
                </View>
                <BotomSheet

                    ref={bottomRef}
                    index={0}
                    snapPoints={snapPoints}
                    keyboardBehavior='fillParent'
                    backgroundStyle={{ backgroundColor: 'white' }}
                >
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <ModalRender closeModal={() => bottomRef.current?.close()} />
                    </View>

                </BotomSheet>
 */}
                </View>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'RobotoBold'
    },
    input: {
        width: 350,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    inputFocus: {
        borderColor: '#DB6015',
        borderBottomWidth: 1,
        width: 350,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        backgroundColor: '#DB6015',
        width: 200,
        padding: 8,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },

});

export default Login;