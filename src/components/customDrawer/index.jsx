import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { ContextAuth } from '../../context/index'


//icones para a foto do usuarioo
import Avatar from 'react-native-vector-icons/FontAwesome'
import Camera from 'react-native-vector-icons/Entypo'

import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CustomDrawer(props) {

    const [image, setImage] = useState(null)
    const { user } = useContext(ContextAuth)


    //vericar se tem imagem no storage

    useEffect(() => {

        async function VerifyImage() {

            await AsyncStorage.getItem(user.uid)
                .then((response) => {
                    console.log('imagem recuperada')
                    setImage(response)
                    console.log(response)

                })
                .cath((error) => {
                    console.log('Erro ao recuperar imagem do storage', error)
                })
        }

        VerifyImage()
    }, [])

    //função pra pegar imagem da galeria 
    const pickImage = async () => {


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            const imageUri = result.assets[0].uri
            const userUID = user.uid
            await AsyncStorage.setItem(userUID, imageUri)
            try {
                console.log('imagem enviada pro storage')
            }
            catch (error) {
                console.log('Erro ao enviar imagem pro storage', error)
            }
        }
    };

    return (
        <DrawerContentScrollView {...props}>

            <View style={{ backgroundColor: '#eecdba', height: 180 }} >




                <View style={{ justifyContent: 'center', marginTop: 20, marginStart: 15 }}>
                    <TouchableOpacity style={{ zIndex: 100 }} onPress={pickImage}>

                        <Camera style={styles.pencil} name='camera' size={26} color='white' />
                    </TouchableOpacity>

                    <View style={styles.containerImage}>
                        {
                            image === null ? <Avatar name='user' size={50} color='white' /> :
                                <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        }


                    </View>


                </View>

                <View style={{ marginStart: 15, marginTop: 5 }} >
                    <Text style={styles.title}>Olá {user.name}</Text>
                    <Text style={styles.p}> {user.email}</Text>
                </View>
            </View>
            <DrawerItemList{...props} />

        </DrawerContentScrollView>

    )
}

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'RobotoMedium'
    },
    p: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'RobotoRegular',

    },
    pencil: {
        position: 'absolute',
        left: 80,
        top: 70


    },
    containerImage: {
        backgroundColor: 'grey',
        height: 100, width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginBottom: 5
    }
})