import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'
import { Input, Button, ButtonGroup, CheckBox } from '@rneui/themed'
import { useState, useEffect, useContext } from 'react'
import { ContextAuth } from '../../context'
import Exit from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropDownPicker from 'react-native-dropdown-picker'


export default function ModalAdd({
    closeModal,
    itemSelected,
    type,
    contact,
    setContact,
    email,
    setEmail,
    setPassword,
    password,
    Add,
    EditItem,
    status,
    setStatus,
    Adm,
    setAdm,
    Representante,
    setRepresentante,
    DeleteItem

}) {
    const [focusContact, setFocusContact] = useState(false)
    const [focusCustomer, setFocusCustomer] = useState(false)
    const [focusNumber, setFocusNumber] = useState(false)


    const [number, setNumber] = useState('')
    const [customer, setCustomer] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [textButton, setTextButton] = useState('Editar')
    const [customerName, setCustomerName] = useState([])
    const [selectedPicker, setSelectedPicker] = useState('')
    const [openPicker, setOpenPicker] = useState(false)


    //checkbox
    const [checkAdm, setCheckAdm] = useState(false)
    const [checkRepres, setCheckRepres] = useState(false)
    const [checkStatus, setCheckStatus] = useState(false)



    const { loading, LoadClients, Customers } = useContext(ContextAuth)


    // função para buscar os clientes na hora de adicionar um novo contato na agenda telefonica

    useEffect(() => {

        function loadDataCustomers() {
            if (!itemSelected) {
                const dataCustomer = Customers.map((item) => ({
                    value: item.NomeFantasia,
                    label: item.NomeFantasia
                }))

                setCustomerName(dataCustomer)

            }
        }
        loadDataCustomers()


    }, [])


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
            setContact('')
            setEmail('')
            setPassword('')
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



    //verificar os chekboxs que foram marcados pra enviar pro screen pai
    useEffect(() => {
        setStatus(checkStatus)
        setAdm(checkAdm)
        setRepresentante(checkRepres)
    }, [checkAdm, checkRepres, checkStatus])



    function Save() {
        Add()
    }
    function Edit() {
        setDisabled(false)
        if (disabled === false) {
            EditItem(itemSelected)
        }

    }

    function Delete() {
        DeleteItem(itemSelected)
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
                {


                    type === 'Contact' && itemSelected === undefined ? (
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.label}>Cliente</Text>
                            <DropDownPicker
                                style={{ borderColor: 'white' }}
                                items={customerName}
                                open={openPicker}
                                setOpen={setOpenPicker}
                                value={selectedPicker}
                                setValue={setSelectedPicker}
                                setItems={customerName}
                            />
                        </View>

                    ) : (
                        <Input
                            label={type === 'addUser' ? 'Email' : 'Cliente'}
                            labelStyle={styles.label}
                            onFocus={() => handleFocus('customer')}
                            onBlur={handleBlur}
                            inputStyle={focusCustomer ? styles.inputFocus : styles.input}
                            value={type === 'addUser' ? email : customer}
                            onChangeText={type === 'addUser' ? (text) => setEmail(text) : (text) => setCustomer(text)}
                            disabled={disabled}
                        />
                    )
                }


                <Input
                    label={type === 'addUser' ? 'Senha' : 'Telefone'}
                    labelStyle={styles.label}
                    placeholder={type === 'addUser' ? 'Digite a senha' : ' Digite o Telefone'}
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


            <View style={styles.containerChek}>
                <CheckBox
                    title='Adm'
                    checked={itemSelected ? itemSelected.Adm : checkAdm}
                    onPress={() => {

                        setCheckAdm(!checkAdm)


                    }}
                    disabled={disabled}
                />
                <CheckBox
                    title='Representante'
                    checked={itemSelected ? itemSelected.Representante : checkRepres}
                    onPress={() => {
                        setCheckRepres(!checkRepres)

                    }}
                    disabled={disabled}
                />
                <CheckBox
                    title='Ativo'
                    checked={itemSelected ? itemSelected.Ativo : checkStatus}
                    onPress={() => {
                        setCheckStatus(!checkStatus)

                    }}
                    disabled={disabled}
                />

            </View>

            <View style={styles.containerButton}>
                {
                    itemSelected ?
                        <Button
                            onPress={Edit}
                            title='Editar'
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{
                                backgroundColor:
                                    '#138ae4'
                            }}
                        />
                        :
                        <Button
                            onPress={Save}
                            title='Salvar'
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{ backgroundColor: '#36c389' }}
                        />
                }
                {
                    itemSelected ?
                        <Button
                            onPress={Delete}
                            title='Excluir'
                            containerStyle={{ width: 100, borderRadius: 6 }}
                            buttonStyle={{ backgroundColor: '#d02d55' }}
                        />
                        : ''
                }


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
    },
    containerChek: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100

    }

})
