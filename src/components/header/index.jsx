import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ContextAuth } from "../../context";
export default function Header({ setSelectedPicker, selectedPicker, }) {
    const [open, setOpen] = useState(false)




    return (
        <View style={{ marginTop: 10, borderRadius: 20, zIndex: 500, }}>
            <Text style={styles.label}>Atendente:</Text>
            <View style={styles.content}>


                <DropDownPicker
                    style={styles.picker}
                    containerStyle={{ width: 200, zIndex: 100 }}
                    open={open}
                    value={selectedPicker}

                    setOpen={setOpen}
                    setValue={setSelectedPicker}

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
