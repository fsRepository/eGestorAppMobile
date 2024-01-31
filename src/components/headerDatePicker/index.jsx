import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';


export default function DatePickerHeader({ setDateStart, setDateEndd }) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [pickerType, setPickerType] = useState('');

    const showDatePicker = (type) => {
        setOpen(true);
        setPickerType(type);
    };

    const hideDatePicker = () => {
        setOpen(false);
    };

    const handleDateChange = (event, selectedDate) => {
        hideDatePicker();
        if (selectedDate) {
            if (pickerType === 'start') {
                setDate(selectedDate);
                setDateStart(selectedDate)

                console.log("Data de início selecionada:", selectedDate);
            } else if (pickerType === 'end') {
                setDateEnd(selectedDate);
                setDateEndd(selectedDate)
                console.log("Data de fim selecionada:", selectedDate);
            }
        }
    };

    return (
        <View>
            <View style={{ marginTop: 5, gap: 5 }}>
                <TouchableOpacity onPress={() => showDatePicker('start')}>
                    <Text style={styles.date}>Inicio: {format(date, "dd/MM/yyyy")}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showDatePicker('end')}>
                    <Text style={styles.date} >Fim: {format(dateEnd, "dd/MM/yyyy")}</Text>
                </TouchableOpacity>
            </View>

            {open && (
                <DateTimePicker
                    value={pickerType === 'start' ? date : dateEnd}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    date: {
        fontSize: 16,
        fontFamily: 'RobotoMedium',
        color: 'black',
        backgroundColor: '#e6e6e6',
        padding: 2,
        borderRadius: 5
    }
})