import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Overlay } from 'react-native-elements';

const renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: 'lightpink' }}
    />
);

const styles = StyleSheet.create({
    overlayContainer: {
        width: '90%',
        justifyContent: 'center',
        maxHeight: '50%',
        flex: 1,
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

const Prescription = ({ data }) => {
    const { prescription } = data;

    return (
        <ScrollView style={{ width: '95%', marginLeft: '2.5%' }}>
            {prescription.diagnosis ? (
                <View>
                    <Text
                        style={{
                            ...styles.head,
                            marginTop: 10,
                            marginBottom: 15,
                            color: 'gray',
                            textDecorationLine: 'underline',
                        }}
                    >
                        Diagnosis
                    </Text>
                    <Text style={styles.info}>{prescription.diagnosis}</Text>
                </View>
            ) : null}
            {prescription.tests ? (
                <View>
                    <Text
                        style={{
                            ...styles.head,
                            marginTop: 10,
                            marginBottom: 15,
                            color: 'gray',
                            textDecorationLine: 'underline',
                        }}
                    >
                        Tests
                    </Text>
                    <Text style={styles.info}>{prescription.tests}</Text>
                </View>
            ) : null}
            {prescription.medicine ? (
                <View>
                    <Text
                        style={{
                            ...styles.head,
                            marginTop: 10,
                            marginBottom: 15,
                            color: 'gray',
                            textDecorationLine: 'underline',
                        }}
                    >
                        Medicine
                    </Text>
                    <Text style={styles.info}>{prescription.medicine}</Text>
                </View>
            ) : null}
            {prescription.others ? (
                <View>
                    <Text
                        style={{
                            ...styles.head,
                            marginTop: 10,
                            marginBottom: 15,
                            color: 'gray',
                            textDecorationLine: 'underline',
                        }}
                    >
                        Others
                    </Text>
                    <Text style={styles.info}>{prescription.others}</Text>
                </View>
            ) : null}
        </ScrollView>
    );
};

const Information = ({ data }) => {
    const { prescription, doctor, user } = data;

    const getValidity = () => {
        const { expiry, createdAt } = prescription;
        if (!expiry) return 'Lifetime';
        const dateExpiry = new Date(expiry);
        const dateCreated = new Date(createdAt);
        const deltaTime = dateExpiry.getTime() - dateCreated.getTime();
        const deltaDays = deltaTime / (1000 * 3600 * 24);
        return deltaDays > 0 ? Math.round(deltaDays) + ' days' : 'Expired';
    };

    return (
        <ScrollView style={{ width: '100%' }}>
            <View style={styles.infoContainer}>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Issued : </Text>
                    <Text style={styles.info}>
                        {new Date(prescription.createdAt).toDateString()}
                    </Text>
                </Text>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Expiry : </Text>
                    <Text style={styles.info}>
                        {prescription.expiry
                            ? new Date(prescription.expiry).toDateString()
                            : 'Not Available'}
                    </Text>
                </Text>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Validity : </Text>
                    <Text style={styles.info}>{getValidity()}</Text>
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Issued By : </Text>
                    <Text style={styles.info}>{doctor.user.name}</Text>
                </Text>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Contact Info : </Text>
                    <Text style={styles.info}>{doctor.medical_contact_number}</Text>
                </Text>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Specialisation : </Text>
                    <Text style={styles.info}>{doctor.typeOfDoctor}</Text>
                </Text>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Hospital : </Text>
                    <Text style={styles.info}>{doctor.hospital.name}</Text>
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Issued To: </Text>
                    <Text style={styles.info}>{user.name}</Text>
                </Text>
                <Text style={styles.textContainer}>
                    <Text style={styles.infoHead}>Contact Info : </Text>
                    <Text style={styles.info}>{user.phone_number}</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

export const OverlayPrescription = ({ visible, toggleOverlay, prescription: data }) => {
    const [index, setIndex] = useState(0);
    const layout = useWindowDimensions();
    const [routes] = useState([
        { key: 'information', title: 'Information' },
        { key: 'prescription', title: 'Prescription' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'information':
                return <Information data={data} />;
            case 'prescription':
                return <Prescription data={data} />;
            default:
                return null;
        }
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
                    textAlign: 'center',
                }}
            >
                View Prescription
            </Text>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width, height: 0 }}
                renderTabBar={renderTabBar}
            />
        </Overlay>
    );
};
