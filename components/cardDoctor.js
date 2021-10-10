import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Avatar, Button } from 'react-native-elements';
import { CardSlot } from './cardSlot';
import { JWT_KEY } from '../constants';
import * as SecureStore from 'expo-secure-store';
import { OverlaySchedule } from './overlaySchedule';
import { OverlayConfirm } from './overlayConfirm';
import { getRequest } from '../utils/serviceCall';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    paragraph: {
        fontSize: 20,
        fontWeight: '600',
        paddingBottom: 10,
        color: '#34495e',
    },
    subparagraph: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 7,
        color: '#34495e',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardInfo: {
        marginTop: 10,
        marginLeft: 15,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

const confirmDefault = {
    open: false,
    id: -1,
};

export const CardDoctor = ({
    image_url,
    name,
    doctor_type,
    medical_contact_number,
    yoe,
    hospital,
    goToDashboard,
    id,
}) => {
    const [visible, setVisible] = useState(false);
    const [day, setDay] = useState('');
    const [daysAvailable, setDaysAvailable] = useState([]);
    const [slots, setSlots] = useState([]);
    const [confirmInfo, setConfirmInfo] = useState(confirmDefault);

    const fetchSlots = async (value) => {
        const auth_token = await SecureStore.getItemAsync(JWT_KEY);
        const response = await getRequest('api/booking/getSlots', auth_token, {
            doctorID: id,
            day_of_week: value,
        });
        const { data } = response;
        const { schedules } = data;
        setSlots(
            schedules.map((schedule) => ({
                start_time: schedule.start_time,
                end_time: schedule.end_time,
                isVirtual: schedule.isVirtual,
                address: schedule.address,
                number_of_patients: schedule.number_of_patients - schedule.booked_slots,
                id: schedule.id,
            })),
        );
    };

    const fetchAvailable = async () => {
        const auth_token = await SecureStore.getItemAsync(JWT_KEY);
        const response = await getRequest('api/booking/getSchedules', auth_token, {
            doctorID: id,
        });
        const { data } = response;
        const { schedules } = data;
        setDaysAvailable([
            ...new Set(schedules.map((schedule) => schedule.day_of_week)),
        ]);
    };

    const handleDayChange = (value) => {
        setDay(value);
        fetchSlots(value);
    };

    const handleBookSlot = (id) => {
        toggleOverlay();
        setConfirmInfo({ ...confirmInfo, open: true, id });
    };

    const toggleOverlay = () => {
        if (!visible) {
            fetchAvailable()
                .then(() => setVisible(!visible))
                .catch((_) => {});
        } else setVisible(!visible);
    };

    const toggleConfirmOverlay = () => {
        setConfirmInfo(confirmDefault);
    };

    const getSlotCards = () => {
        return slots.map((slot) => (
            <CardSlot
                id={slot.id}
                key={slot.id}
                start_time={slot.start_time}
                end_time={slot.end_time}
                isVirtual={slot.isVirtual}
                address={slot.address}
                slots_left={slot.number_of_patients}
                cb={handleBookSlot}
            />
        ));
    };

    const confirmBooking = () => {
        setConfirmInfo(confirmDefault);
        goToDashboard();
    };

    return (
        <View style={styles.container}>
            {confirmInfo.open ? (
                <OverlayConfirm
                    info={confirmInfo}
                    toggleOverlay={toggleConfirmOverlay}
                    goToDashboard={confirmBooking}
                />
            ) : null}
            {visible ? (
                <OverlaySchedule
                    visible={visible}
                    toggleOverlay={toggleOverlay}
                    handleDayChange={handleDayChange}
                    daysAvailable={daysAvailable}
                    getSlotCards={getSlotCards}
                    day={day}
                />
            ) : null}
            <Card>
                <View style={styles.card}>
                    <Avatar rounded source={image_url} size={'xlarge'} rounded={true} />
                    <View style={styles.cardInfo}>
                        <Text style={styles.paragraph}>{name}</Text>
                        <Text style={styles.subparagraph}>{hospital}</Text>
                        <Text style={styles.subparagraph}>{doctor_type}</Text>
                        <Text style={styles.subparagraph}>
                            Contact : {medical_contact_number}
                        </Text>
                        <Text
                            style={styles.subparagraph}
                        >{`${yoe} years of experience`}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        type={'outline'}
                        buttonStyle={{
                            borderRadius: 0,
                            marginTop: 15,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                        }}
                        onPress={toggleOverlay}
                        title="View Schedule"
                    />
                </View>
            </Card>
        </View>
    );
};
