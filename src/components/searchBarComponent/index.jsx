import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from '@rneui/themed'

// import { Container } from './styles';
export default function SearchBarComponent({ search, setSearch }) {
    return (
        <View style={{ alignItems: 'center' }}>
            <SearchBar

                placeholder='Pesquisar'
                onChangeText={setSearch}
                value={search}
                inputContainerStyle={{ width: 350, height: 30, backgroundColor: '#e9e9e9', }}
                containerStyle={{ backgroundColor: '#e9e9e9', borderColor: 'white', width: 380, borderRadius: 12, }}
                showLoading={false}

            />
        </View>
    )
}