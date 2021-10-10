import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { APP_URL } from '../constants';

const styles = StyleSheet.create({
    overlayContainer: {
        width: '90%',
        justifyContent: 'center',
        maxHeight: '50%',
        alignItems: 'center',
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
        fontSize: 18,
        fontWeight: '400',
        color: 'gray',
    },
    info: {
        fontSize: 18,
        fontWeight: '500',
    },
    textContainer: {
        marginBottom: 8,
    },
});

export const OverlayPrescriptionVerify = ({ visible, toggleOverlay, id }) => {
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
                    textAlign: 'center',
                }}
            >
                Scan the QR Code to Verify the Prescription
            </Text>
            <QRCode value={`${APP_URL}?prescription_id=${id}`} size={300} />
        </Overlay>
    );
};
