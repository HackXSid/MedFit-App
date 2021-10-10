import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width: '100%',
    },
    paragraph: {
        fontSize: 19,
        paddingBottom: 10,
        fontWeight: '500',
    },
    subpara: {
        fontSize: 17,
        paddingBottom: 5,
        fontWeight: '500',
        color: 'gray',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export const CardConfirm = ({
    start_time,
    end_time,
    isVirtual,
    address,
    id,
    date,
    doctor_name,
    doctorType,
    contact_number,
    cb,
}) => {
    return (
        <Card>
            <View style={cardStyles.headContainer}>
                <Text style={cardStyles.paragraph}>{doctor_name}</Text>
                <Text style={cardStyles.subpara}>{doctorType} </Text>
                <Text style={cardStyles.subpara}>Contact No. : {contact_number} </Text>
                <Text style={cardStyles.subpara}>
                    Appointment Date : {date.toDateString()}
                </Text>
                <Text style={cardStyles.subpara}>
                    Timing : {start_time} - {end_time}
                </Text>
                <Text style={cardStyles.subpara}>
                    Mode: {isVirtual ? 'Online' : 'In-Person'}
                </Text>
                {!isVirtual ? (
                    <Text style={cardStyles.subpara}>Address : {address}</Text>
                ) : null}
            </View>
            <View style={cardStyles.buttonContainer}>
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginTop: 15,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    title="Confirm Booking"
                    onPress={() => cb(id, date)}
                />
            </View>
        </Card>
    );
};
