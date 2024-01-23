import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RenderList from '../../../components/renderList';
import SearchBarComponent from '../../../components/searchBarComponent';
import TabButton from '../../../components/tabButton';
import { listaDeContatos } from '../../../services/baseDadosTeste';
import { FAB } from '@rneui/themed';
import FABComponent from '../../../components/FAB';
import { useNavigation } from '@react-navigation/native';

//importtando contexto
import { ContextAuth } from '../../../context/index'

const RegisterCustomers = () => {
    const navigation = useNavigation()

    const [search, setSearch] = useState('')
    const { loading, Customers, LoadClients } = useContext(ContextAuth)

    function Refresh() {
        LoadClients()
    }


    return (

        <View style={styles.container}>
            <SearchBarComponent search={search} setSearch={setSearch} />
            {
                loading === true ? <ActivityIndicator size='large' color='#DB6015' /> :
                    (
                        <FlatList
                            vertical
                            data={Customers}
                            keyExtractor={(item) => item.UID}
                            renderItem={({ item }) =>
                                <RenderList type='Customers' item={item} />
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={Refresh}
                                    colors={['#4285F4', '#34A853', '#FBBC05', '#EA4335']}
                                />
                            }

                        />
                    )
            }
            {
                loading === true ? '' : <FABComponent onPress={() => navigation.navigate('datacustomers')} />

            }

        </View>
    )
}

export default RegisterCustomers;

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }
})