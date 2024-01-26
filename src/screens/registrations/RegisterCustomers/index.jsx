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
    const { loading, Customers, LoadClients, users, setLoading } = useContext(ContextAuth)
    const [filter, setFilter] = useState('Nome')
    const [filteredList, setFilteredList] = useState([])
    const [emptyList, setEmptyList] = useState(false)


    useEffect(() => {
        LoadClients()

    }, [])
    function OnSearch(value) {
        setSearch(value)
    }


    function Refresh() {
        LoadClients()

    }

    useEffect(() => {
        SearchItem()


    }, [search, filter])

    function SearchItem() {
        if (filter === 'Nome') {
            FindByName()
        } else if (filter === 'CNPJ') {
            FindByCnpj()
        }
    }

    function FindByName() {
        if (search !== '') {
            setLoading(true)
            const searhTerm = search.toUpperCase()

            const find = Customers.filter((item) => item.NomeFantasia.includes(searhTerm))
            try {

                if (find.length > 0) {
                    setFilteredList(find);
                    setTimeout(() => setLoading(false), 200)
                    setEmptyList(false)

                } else {
                    setFilteredList([])
                    console.log('Nenhum item encontrado');
                    setTimeout(() => setLoading(false), 200)
                    setEmptyList(true)


                }
            }
            catch {
                console.log('cliente não encontrado')
                setFilteredList([])
                setEmptyList(true)
                setTimeout(() => setLoading(false), 200)
            }
        } else {
            setFilteredList(users)
            setEmptyList(false)
        }
    }

    //pesquisa por cnpj

    function FindByCnpj() {
        if (search !== '') {
            try {
                setLoading(true)
                const searchCnpj = search.replace(/\s+/g, '').toUpperCase();

                const foundCnpj = Customers.filter((item) => {
                    // Verifica se item.CNPJ não é nulo antes de tentar acessar suas propriedades
                    const itemCnpj = item.CNPJ ? item.CNPJ.replace(/\s+/g, '') : '';

                    // Considere a pesquisa como uma correspondência se o CNPJ contiver o valor de pesquisa
                    return itemCnpj.includes(searchCnpj);
                });

                if (foundCnpj.length > 0) {
                    console.log(foundCnpj);
                    setFilteredList(foundCnpj);
                    setEmptyList(false)
                    setTimeout(() => setLoading(false), 200)
                } else {
                    console.log('item nao encontrado')
                    setEmptyList(true)
                    setLoading(false)
                    setFilteredList([])
                }

            } catch {
                setFilteredList(users)
                setEmptyList(false)
            }
        } else {
            setFilteredList(users)
            setEmptyList(false)
        }
    }




    return (

        <View style={styles.container}>
            <View style={{ zIndex: 1000 }}>
                <SearchBarComponent OnSearch={OnSearch} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
            </View>

            {
                emptyList === true ? <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', marginTop: 200 }}>Nenhum item foi encontrado</Text> : ''
            }

            {
                loading === true ? <ActivityIndicator size='large' color='#DB6015' style={{ marginTop: 100 }} /> :
                    (
                        <FlatList

                            vertical
                            data={search !== '' ? filteredList : Customers}
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



                loading === true ? '' :



                    <FABComponent
                        onPress={() => navigation.navigate('datacustomers')} />


            }



        </View>
    )
}

export default RegisterCustomers;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,

        flex: 1
    }
})