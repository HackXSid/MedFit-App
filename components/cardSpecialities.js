import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '45%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#fff',
        borderRadius: 40,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.53,
        shadowRadius: 6.97,
        elevation: 21,
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
    },
});

export const CardSpeciality = ({ text, setSpeciality }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => setSpeciality(text)}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};
