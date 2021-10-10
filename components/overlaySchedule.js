import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Overlay } from 'react-native-elements';

const styles = StyleSheet.create({
    overlayContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '60%',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export const OverlaySchedule = ({
    visible,
    toggleOverlay,
    handleDayChange,
    daysAvailable,
    getSlotCards,
    day,
}) => {
    return (
        <Overlay
            overlayStyle={styles.overlayContainer}
            isVisible={visible}
            onBackdropPress={toggleOverlay}
        >
            <Text
                style={{
                    fontSize: 20,
                    marginBottom: 20,
                    textDecorationLine: 'underline',
                }}
            >
                View Schedule
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Select a day</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={handleDayChange}
                value={day}
                items={daysAvailable.map((day) => ({ label: day, value: day }))}
                placeholder={{
                    label: 'Select Day',
                    value: null,
                    color: 'blue',
                }}
            />
            {day ? (
                <ScrollView style={{ width: '100%' }}>
                    <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center' }}>
                        Slots
                    </Text>
                    {getSlotCards()}
                </ScrollView>
            ) : null}
        </Overlay>
    );
};
