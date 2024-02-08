import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from '@rneui/themed'
import FilterIcon from 'react-native-vector-icons/AntDesign'
import DropDownPicker from 'react-native-dropdown-picker';
// import { Container } from './styles';
export default function SearchBarComponent({ search, setSearch, filter, setFilter, OnSearch, type }) {

    const [filterItems, setFilterItems] = useState([
        {
            value: 'Nome',
            label: 'Nome'

        },
        {
            value: 'CNPJ',
            label: 'CNPJ'

        },

    ])
    const [filterUser, FilterUser] = useState([
        {
            value: 'Nome',
            label: 'Nome'

        },


    ])

    const [filtercalleds, setFilterCalleds] = useState([

        {
            value: 'Todos',
            label: 'Todos'

        },
        {
            value: 'Cliente',
            label: 'Cliente'

        },
        {
            value: 'Atendente',
            label: 'Atendente'

        },
    ])

    const [filters, setFilters] = useState([


        {
            label: 'CGI',
            value: 'CGI'
        },
        {
            label: 'Nome Fantasia',
            value: 'Nome Fantasia'
        },
        {
            label: 'Razão Social',
            value: 'Razão Social'
        },
        {
            label: 'CNPJ/CPF',
            value: 'CNPJ/CPF'
        }
    ])
    const [filtercalleds2, setFilterCalleds2] = useState([

        {
            value: 'Todos',
            label: 'Todos'

        },
        {
            value: 'Cliente',
            label: 'Cliente'

        },
        {
            value: 'Atendente',
            label: 'Atendente'

        },

        {
            value: 'Protocolo',
            label: 'Protocolo'

        }

    ])
    const [openPicker, SetOpenPicker] = useState(false
    )


    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: "center" }}>
            <SearchBar

                placeholder='Pesquisar'
                onChangeText={(value) => OnSearch(value)}
                value={search}
                inputContainerStyle={{ width: 330, height: 30, backgroundColor: '#e9e9e9', }}
                containerStyle={{ backgroundColor: '#e9e9e9', borderColor: 'white', width: 330, borderRadius: 12, }}
                showLoading={false}

            />


            <FilterIcon.Button
                onPress={() => {
                    SetOpenPicker(true)

                }}
                name="filter" size={24} color="#FFF" backgroundColor='#DB6015' />


            {
                openPicker ? <DropDownPicker

                    containerStyle={{
                        position: 'absolute',
                        width: 100,
                        right: 10,
                        top: 50
                    }}
                    open={openPicker}
                    setOpen={SetOpenPicker}
                    items={type === 'users' ?
                        filterUser : type === 'clients' ? filterItems : type === 'Contacts' ? filterUser : type === 'addAtendiment' ? filters : type === 'calleds' ? filtercalleds2 : filterUser}
                    setItems={filterItems}
                    setValue={setFilter}
                    value={filter}
                    zIndex={1000}
                /> :
                    ''
            }

        </View>
    )
}