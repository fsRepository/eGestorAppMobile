import React from 'react';
import { View } from 'react-native';
import { SpeedDial } from '@rneui/themed';
// import { Container } from './styles';
export default function FabSpeed({ openTab, setOpenTab, edit, save }) {
    return (

        <SpeedDial
            isOpen={openTab}
            icon={{ name: 'edit', color: 'white' }}
            openIcon={{ name: 'close', color: 'white' }}
            onOpen={() => setOpenTab(!openTab)}
            onClose={() => setOpenTab(!openTab)}
            color='#DB6015'
        >
            <SpeedDial.Action
                icon={{ name: 'edit', color: 'white' }}
                title='Editar'
                onPress={edit}
                color='#DB6015'
            />
            <SpeedDial.Action
                icon={{ name: 'save', color: 'white' }}
                title='Salvar'
                onPress={save}
                color='#DB6015'
            />


        </SpeedDial>

    )
}