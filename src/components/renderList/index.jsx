import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconUser from 'react-native-vector-icons/AntDesign'
import Arrow from 'react-native-vector-icons/Feather'
import ModalAdd from '../modalTelephone';
import OnlineIcon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
// import { Container } from './styles';

export default function RenderList({ item, type,
    contact,
    setContact,
    email,
    setEmail,
    setPassword,
    password,
    status,
    setStatus,
    Adm,
    setAdm,
    Representante,
    setRepresentante,
    EditItem,
    DeleteItem,
    setNumber,
    setClient,
    setVinculed,
    number,
    client,
    vinculed

}) {

    const [openModal, setOpenModal] = useState(false);
    const [itemSelected, setItemSelected] = useState([])

    const navigation = useNavigation()


    async function selectedContact(item) {

        if (type === 'Contact') {
            setItemSelected(item)
            setOpenModal(true)
        } else if (type === 'Customers') {
            setItemSelected(item)
            if (itemSelected.length !== 0) {
                navigation.navigate('datacustomers', { itemSelected: itemSelected, type: type })
            } else {
                console.warn('itemSelected ainda nao esta preenchido')
            }


        } else if (type === 'counter') {
            setItemSelected(item)
            navigation.navigate('datacustomers', { itemSelected: itemSelected, type: type })
        } else if (type === 'addUser') {
            setItemSelected(item)

            setOpenModal(true)
        }


    }
    return (
        <View>
            {
                type === 'Contact' ? (

                    <TouchableOpacity
                        onPress={() => selectedContact(item)}
                        style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name='contact-page' size={30} color='#DB6015' />
                            <View style={styles.content}>
                                <Text style={styles.name}>{item.Contato}</Text>
                                <Text style={styles.number}>Telefone: {item.Numero}</Text>

                            </View>
                        </View>



                    </TouchableOpacity>
                ) : type === 'Customers' ? (
                    <TouchableOpacity
                        onPress={() => selectedContact(item)}
                        style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconUser name='user' size={30} color='#DB6015' />
                            <View style={styles.content}>
                                <Text style={styles.name}>{item.NomeFantasia}</Text>
                                <Text style={styles.number}>CNPJ: {item.CNPJ}</Text>
                                <Text style={styles.number}>Cidade: {item.Cidade}</Text>
                            </View>
                        </View>

                        <View >
                            {
                                item.Ativo === true ? <OnlineIcon name='circle' size={16} color='#36c389' /> :
                                    <OnlineIcon name='circle' size={16} color='#d02d55' />
                            }

                        </View>



                    </TouchableOpacity>
                ) : type === 'counter' ? (

                    <TouchableOpacity
                        onPress={() => selectedContact(item)}
                        style={styles.container}>
                        <View style={styles.contentAvatar}>
                            <IconUser name='user' size={30} color='#DB6015' />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.name}>{item.nomeContato}</Text>
                            <Text style={styles.number}>Email: {item.email}</Text>
                            <Text style={styles.number}>Telefone: {item.telefone}</Text>
                        </View>


                        <View
                            style={{ marginLeft: 60 }}
                        >


                            <Arrow name='arrow-right-circle' size={24} color='#DB6015' />
                        </View>

                    </TouchableOpacity>
                ) : type === 'addUser' ? (
                    <TouchableOpacity
                        onPress={() => selectedContact(item)}
                        style={[styles.container, { justifyContent: 'space-between' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <IconUser name='user' size={30} color='#DB6015' />
                            <Text style={styles.name}>{item.Nome}</Text>
                        </View>




                    </TouchableOpacity>
                ) : ''
            }

            <Modal
                transparent={true}
                animationType='slide'
                visible={openModal}
                onRequestClose={() => setOpenModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View >
                            <ModalAdd
                                itemSelected={itemSelected}
                                closeModal={() => setOpenModal(false)}
                                type={type}
                                contact={contact}
                                setContact={setContact}
                                email={email}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                password={password}
                                status={status}
                                setStatus={setStatus}
                                Adm={Adm}
                                setAdm={setAdm}
                                Representante={Representante}
                                setRepresentante={setRepresentante}
                                EditItem={EditItem}
                                DeleteItem={DeleteItem}
                                setNumber={setNumber}
                                setClient={setClient}
                                setVinculed={setVinculed}
                                number={number}
                                client={client}
                                vinculed={vinculed}
                                setItemSelected={setItemSelected}


                            />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#e9e9e9',
        marginEnd: 10,
        borderRadius: 10,
        marginStart: 10,
        justifyContent: 'space-between'
    },
    content: {

    },
    name: {
        fontSize: 18,
        fontFamily: 'RobotoMedium',
        width: 200
    },
    number: {
        fontSize: 17,
        fontFamily: 'RobotoRegular'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 350,
        height: 500,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,

    },
    situation: {
        fontSize: 16,
    }
})