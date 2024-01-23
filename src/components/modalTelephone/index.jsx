import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import { Input, Button, ButtonGroup } from '@rneui/themed'
import { useState, useEffect } from 'react'
import Exit from 'react-native-vector-icons/Feather'
export default function ModalAdd({ closeModal, itemSelected, type }) {
    const [focusContact, setFocusContact] = useState(false)
    const [focusCustomer, setFocusCustomer] = useState(false)
    const [focusNumber, setFocusNumber] = useState(false)

    const [contact, setContact] = useState('')
    const [number, setNumber] = useState('')
    const [customer, setCustomer] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [textButton, setTextButton] = useState('Editar')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //sempre que o modal for aberto vai ser verificado se tem um item selecionado, se tiver ele recupera os dados e coloca 
    //nos inputs, se nao o input começa vazio
    useEffect(() => {
        if (itemSelected) {
            if (type === 'addUser') {
                setContact(itemSelected.Nome)
                setEmail(itemSelected.Email)
                setPassword(itemSelected.Password)

            } else if (type === 'Contact') {
                setContact(itemSelected.Nome)
                setCustomer(itemSelected.NomeFantasia)
                setNumber(itemSelected.Telefone)

            }
        }
        else {
            setDisabled(false)
        }

    }, [])



    const handleFocus = (field) => {
        setFocusContact(field === 'contact')
        setFocusCustomer(field === 'customer')
        setFocusNumber(field === 'number')
    }

    const handleBlur = () => {
        setFocusContact(false)
        setFocusCustomer(false)
        setFocusNumber(false)
    }

    function Edit() {
        setDisabled(false)
        setTextButton('Salvar')
    }

    function Save() {
        setTextButton('Editar')
        setDisabled(true)
    }
    return (
        <View style={styles.modal}>
            <View style={{ backgroundColor: '#DB6015', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>

                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.exit}>
                    <Exit name='x-circle' size={28} color='white' />
                </TouchableOpacity>
                {
                    type === 'addUser' ? <Text style={styles.title}>Dados do Usuário</Text> :
                        <Text style={styles.title}>Agenda Telefônica</Text>
                }

            </View >
            <View style={styles.containerInput}>
                <Input
                    label={type === 'addUser' ? 'Nome' : 'Contato'}
                    labelStyle={styles.label}
                    placeholder='Digite o nome'
                    onFocus={() => handleFocus('contact')}
                    onBlur={handleBlur}
                    inputStyle={focusContact ? styles.inputFocus : styles.input}
                    value={contact}
                    onChangeText={(text) => setContact(text)}
                    disabled={disabled}
                />

                <Input
                    label={type === 'addUser' ? 'Email' : 'Cliente'}
                    labelStyle={styles.label}
                    onFocus={() => handleFocus('customer')}
                    onBlur={handleBlur}

                    inputStyle={focusCustomer ? styles.inputFocus : styles.input}
                    value={type === 'addUser' ? email : customer}
                    onChangeText={type === 'addUser' ? (text) => setCustomer(text) : (text) => setEmail(text)}
                    disabled={disabled}
                />

                <Input
                    label={type === 'addUser' ? 'Senha' : 'Telefone'}
                    labelStyle={styles.label}
                    placeholder='Digite o número'
                    onFocus={() => handleFocus('number')}
                    onBlur={handleBlur}
                    inputStyle={focusNumber ? styles.inputFocus : styles.input}
                    value={type === 'addUser' ? password : number}
                    onChangeText={type === 'addUser' ? (text) => setPassword(text) : (text) => setNumber(text)}
                    keyboardType='numeric'
                    secureTextEntry={type == 'addUser' ? true : false}
                    disabled={disabled}
                />
            </View>


            <View style={styles.containerButton}>
                {
                    itemSelected ?
                        <Button
                            onPress={textButton === 'Editar' ? Edit : Save}
                            title={textButton}
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{ backgroundColor: '#36c389' }}
                        />
                        :
                        <Button
                            onPress={Save}
                            title='Salvar'
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{ backgroundColor: '#36c389' }}
                        />
                }

                <Button
                    onPress={closeModal}
                    title='Cancelar'
                    containerStyle={{ width: 100, borderRadius: 6 }}
                    buttonStyle={{ backgroundColor: '#d02d55' }}
                />

            </View>






        </View >
    )
}

const styles = StyleSheet.create({

    title: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'RobotoRegular',
        textAlign: 'center',
        marginBottom: 10,
        color: 'white'
    },
    containerInput: {
        marginTop: 20,
        marginStart: 10,
        marginEnd: 10
    },
    label: {
        fontSize: 20,
        fontFamily: 'RobotoMedium',
        color: 'grey',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#e6e6e6e6',
        width: 300
    },
    inputFocus: {
        borderBottomWidth: 1,
        borderColor: '#DB6015',
        width: 300
    },
    exit: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20
    }

})
