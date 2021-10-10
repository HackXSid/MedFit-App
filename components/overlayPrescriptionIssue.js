import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import { Overlay } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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

export const OverlayPrescriptionIssue = ({ visible, toggleOverlay, cb }) => {
    const [diagnosis, setDiagnosis] = useState('');
    const [tests, setTests] = useState('');
    const [medicine, setMedicine] = useState('');
    const [others, setOthers] = useState('');
    const [expiry, setExpiry] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setExpiry(date);
        hideDatePicker();
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
                Prescription Details
            </Text>
            <ScrollView style={{ width: '100%', marginBottom: 30, marginTop: 20 }}>
                <Text style={styles.infoHead}>Diagnosis</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDiagnosis}
                    value={diagnosis}
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Patient Diagnosis - Disease"
                />
                <Text style={styles.infoHead}>Medical Tests to be Done</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTests}
                    value={tests}
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Medical tests to be carried out by the patient"
                />
                <Text style={styles.infoHead}>Recommended Medication</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setMedicine}
                    value={medicine}
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Medication for the patient"
                />
                <Text style={styles.infoHead}>Other Information</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setOthers}
                    value={others}
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Any other notes"
                />
                <Button
                    title={`Expiry Date - ${expiry.toDateString()}`}
                    onPress={showDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    date={expiry}
                />
            </ScrollView>
            <AwesomeButtonRick
                onPress={(next) => {
                    cb(diagnosis, tests, medicine, others, expiry);
                    next();
                }}
                raiseLevel={4}
                textSize={19}
                type="secondary"
                width={210}
            >
                Issue Prescription
            </AwesomeButtonRick>
        </Overlay>
    );
};
