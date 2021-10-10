import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        width: '100%',
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

export const CardSlot = ({
    start_time,
    end_time,
    isVirtual,
    address,
    slots_left,
    cb,
    id,
}) => {
    return (
        <Card>
            <View style={cardStyles.headContainer}>
                <Text style={cardStyles.subpara}>
                    Timing : {start_time} - {end_time}
                </Text>
                <Text style={cardStyles.subpara}>
                    Mode: {isVirtual ? 'Online' : 'In-Person'}
                </Text>
                {!isVirtual ? (
                    <Text style={cardStyles.subpara}>Address : {address}</Text>
                ) : null}
                <Text style={cardStyles.subpara}>Slots Left : {slots_left}</Text>
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
                    title="Book Slot"
                    onPress={() => cb(id)}
                />
            </View>
        </Card>
    );
};
