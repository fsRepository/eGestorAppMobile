
import { View, Text, StyleSheet, FlatList } from 'react-native'
import SearchBarComponent from '../../../components/searchBarComponent'
import React, { useState, useEffect } from 'react'
import { listaDeContatos } from '../../../services/baseDadosTeste'
import RenderList from '../../../components/renderList'
import { FAB } from 'react-native-elements'
import FABComponent from '../../../components/FAB'
export default function Counter() {

    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Nome')
    const [loading, setLoading] = useState(false)
    return (
        <View style={styles.container}>
            <View style={{ zIndex: 1000 }}>
                <SearchBarComponent search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
            </View>


            <FlatList
                data={listaDeContatos}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) =>
                    <RenderList item={item} type='counter' />
                }
            />
            <FABComponent />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }
})