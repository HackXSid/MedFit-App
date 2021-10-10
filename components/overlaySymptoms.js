import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { Overlay } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { JWT_KEY } from '../constants';
import { getRequest } from '../utils/serviceCall';

const styles = StyleSheet.create({
    overlayContainer: {
        width: '90%',
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
        color: 'red',
    },
    info: {
        fontWeight: '500',
    },
});

const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const compare = (a, b) => {
    if (a.Name < b.Name) {
        return -1;
    }
    if (a.Name > b.Name) {
        return 1;
    }
    return 0;
};

export const OverlaySymptoms = ({ visible, toggleOverlay, cb }) => {
    const [symtopms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);

    const fetchSymptoms = async () => {
        const auth_token = await SecureStore.getItemAsync(JWT_KEY);
        const response = await getRequest('api/medbuddy/symptoms', auth_token);
        const { data: resData } = response;
        const { data } = resData;
        data.sort(compare);
        setSymptoms(data);
    };

    const handleSymptom = (obj) => {
        if (selectedSymptoms.some((symptom) => symptom.Name === obj.Name)) {
            setSelectedSymptoms(
                selectedSymptoms.filter((symptom) => symptom.Name !== obj.Name),
            );
        } else {
            setSelectedSymptoms([...selectedSymptoms, obj]);
        }
    };

    useEffect(() => {
        fetchSymptoms();
    }, []);

    const getSymptoms = () => {
        return symtopms.map(({ ID, Name }) => {
            const isSelected = selectedSymptoms.some((symtom) => symtom.Name === Name);
            return (
                <TouchableOpacity
                    key={ID}
                    style={{
                        ...styles.infoContainer,
                        backgroundColor: isSelected ? '#ccc' : 'white',
                    }}
                    onPress={() => handleSymptom({ ID, Name })}
                >
                    <Text>
                        <Text style={styles.head}>{toTitleCase(Name)}</Text>
                        <Text style={styles.infoHead}>{`${
                            isSelected ? ' ( Selected )' : ''
                        }`}</Text>
                    </Text>
                </TouchableOpacity>
            );
        });
    };

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
                Select your Symptoms
            </Text>
            <ScrollView style={{ width: '100%', marginBottom: 30, marginTop: 20 }}>
                {getSymptoms()}
            </ScrollView>
            <AwesomeButtonRick
                onPress={(next) => {
                    cb(selectedSymptoms);
                    setSelectedSymptoms([]);
                    next();
                }}
                raiseLevel={4}
                textSize={19}
                type="secondary"
                width={170}
            >
                Predict Disease
            </AwesomeButtonRick>
        </Overlay>
    );
};
