import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { OverlayPrescription } from './overlayPrescription';
import { CardPrescription } from './cardPrescription';
import { Overlay } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { Card } from 'react-native-elements';
import { JWT_KEY } from '../constants';
import { getRequest } from '../utils/serviceCall';

const styles = StyleSheet.create({
    overlayContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '60%',
        paddingBottom: 30,
    },
    scroll: {
        minWidth: '100%',
    },
    infoContainer: {
        width: '100%',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    head: {
        fontSize: 20,
        marginBottom: 2.5,
    },
    infoHead: {
        fontWeight: '400',
        color: 'black',
        fontSize: 18,
        marginLeft: '2.5%',
    },
    info: {
        fontWeight: '500',
    },
    input: {
        height: 150,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        width: '95%',
        marginBottom: 30,
    },
});

const defaultState = {
    view: 'ALL',
    ind: -1,
};

export const OverlayHistory = ({ visible, toggleOverlay, userEmail }) => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [screen, setScreen] = useState(defaultState);
    const fetchPrescriptions = async () => {
        const auth_token = await SecureStore.getItemAsync(JWT_KEY);
        const response = await getRequest('api/doctor/getHistory', auth_token, {
            userEmail,
        });
        const { data } = response;
        const { prescriptions: presc } = data;
        setPrescriptions(presc);
    };

    const getPrescriptions = () => {
        return prescriptions.map((data, ind) => (
            <CardPrescription
                key={data.prescription.id}
                name={data.user.name}
                doctorType={data.user.gender} // Hack
                issue={new Date(data.prescription.createdAt)}
                expiry={new Date(data.prescription.expiry)}
                viewCB={() => {
                    setScreen({ ...defaultState, view: 'SPECIFIC', ind });
                }}
                verifyCB={null}
            />
        ));
    };

    useEffect(() => {
        fetchPrescriptions();
    }, []);
    if (screen.view === 'ALL') {
        return (
            <Overlay
                overlayStyle={styles.overlayContainer}
                isVisible={visible}
                onBackdropPress={toggleOverlay}
            >
                <Text
                    style={{
                        fontSize: 23,
                        marginBottom: 20,
                        textDecorationLine: 'underline',
                    }}
                >
                    Past Prescriptions
                </Text>
                <ScrollView style={{ width: '100%' }}>{getPrescriptions()}</ScrollView>
            </Overlay>
        );
    }
    return (
        <OverlayPrescription
            visible={screen.view === 'SPECIFIC'}
            toggleOverlay={() => setScreen(defaultState)}
            prescription={prescriptions[screen.ind]}
        />
    );
};
