import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Overlay } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { JWT_KEY } from '../constants';
import { getKNextDay } from '../utils/date';
import { CardConfirm } from './cardConfirm';
import { getRequest, postRequest } from '../utils/serviceCall';

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

const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
};

export const OverlayConfirm = ({ info, toggleOverlay, goToDashboard }) => {
    const [slotData, setSlotData] = useState(null);
    const [date, setDate] = useState(null);

    const fetchData = async () => {
        const auth_token = await SecureStore.getItemAsync(JWT_KEY);
        const response = await getRequest('api/booking/getSlot', auth_token, {
            scheduleID: info.id,
        });
        const { data } = response;
        const { schedule } = data;
        setSlotData({
            start_time: schedule.start_time,
            end_time: schedule.end_time,
            isVirtual: schedule.isVirtual,
            address: schedule.address,
            number_of_patients: schedule.number_of_patients - schedule.bookings,
            id: schedule.id,
            day: schedule.day_of_week,
            doctor_name: schedule.doctor.user.name,
            doctorType: schedule.doctor.typeOfDoctor,
            contact_number: schedule.doctor.medical_contact_number,
        });
    };

    useEffect(() => {
        fetchData(info.id);
    }, []);

    const confirmBooking = async (id, date) => {
        const auth_token = await SecureStore.getItemAsync(JWT_KEY);
        postRequest('api/booking/confirm', { date, doctorScheduleId: id }, auth_token)
            .then((_) => {
                goToDashboard();
            })
            .catch((_) => {
                Alert.alert(
                    'Slot Full',
                    'The selected slot has been booked completely. Please choose another slot',
                );
            });
    };

    const handleDate = (date) => {
        setDate(date);
    };

    let availDates = [];
    if (slotData) availDates = getKNextDay(daysMap[slotData.day]);

    return (
        <Overlay
            overlayStyle={styles.overlayContainer}
            isVisible={info.open}
            onBackdropPress={toggleOverlay}
        >
            <Text
                style={{
                    fontSize: 20,
                    marginBottom: 20,
                    textDecorationLine: 'underline',
                }}
            >
                Confirm Booking
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>Select a date</Text>
            {slotData ? (
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={handleDate}
                    value={date}
                    items={availDates.map((day) => ({
                        label: day.toDateString(),
                        value: day.toDateString(),
                    }))}
                    placeholder={{
                        label: 'Select Date',
                        value: null,
                        color: 'blue',
                    }}
                />
            ) : null}
            {date ? (
                <ScrollView style={{ width: '100%' }}>
                    <Text style={{ fontSize: 16, marginTop: 20, textAlign: 'center' }}>
                        Booking Information
                    </Text>
                    <CardConfirm
                        start_time={slotData.start_time}
                        end_time={slotData.end_time}
                        isVirtual={slotData.isVirtual}
                        address={slotData.address}
                        id={slotData.id}
                        date={slotData.date}
                        doctor_name={slotData.doctor_name}
                        doctorType={slotData.doctorType}
                        contact_number={slotData.contact_number}
                        date={new Date(date)}
                        cb={confirmBooking}
                    />
                </ScrollView>
            ) : null}
        </Overlay>
    );
};
