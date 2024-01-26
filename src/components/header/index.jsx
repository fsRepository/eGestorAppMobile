import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Header({ setSelectedPicker, selectedPicker, initialpicker }) {
    const [open, setOpen] = useState(false)
    const [attendants, setAttendants] = useState([
        { id: 1, name: "João Atendente" },
        { id: 2, name: "Maria Atendente" },
        { id: 3, name: "Pedro Atendente" },
        { id: 4, name: "Ana Atendente" },
        { id: 5, name: "Carlos Atendente" },
    ]);
    //recria a state com os valores aceitos pelo picker
    const attendantsLabel = attendants.map((item) => ({
        label: item.name,
        value: item.name
    }))
    return (
        <View style={{ marginTop: 10, borderRadius: 20, zIndex: 500, }}>
            <Text style={styles.label}>Atendente:</Text>
            <View style={styles.content}>


                <DropDownPicker
                    style={styles.picker}
                    containerStyle={{ width: 200, zIndex: 100 }}
                    open={open}
                    value={selectedPicker}
                    items={attendantsLabel}
                    setOpen={setOpen}
                    setValue={setSelectedPicker}
                    setItems={setAttendants}
                    placeholder='Todos'


                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 500


    },
    picker: {
        width: 180,
        borderColor: 'white',

        backgroundColor: 'white',
        zIndex: 100


    },
    label: {
        fontSize: 16,
        fontFamily: 'RobotoRegular',


    }
})
