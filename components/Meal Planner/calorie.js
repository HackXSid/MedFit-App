import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 60,
        marginTop: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        marginLeft: '7.5%',
        marginRight: '7.5%',
        width: '85%',
        marginBottom: 30,
    },
    info: {
        marginTop: 35,
        marginBottom: 20,
        textAlign: 'center',
        width: '95%',
        marginLeft: '2.5%',
        fontSize: 18,
    },
});

export const Calorie = ({ info, setInfo }) => {
    return (
        <View>
            <Text style={styles.info}>
                Input maximum desired calories per serving ( in kcal )
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setInfo({ ...info, calories: text })}
                value={info.calories}
                placeholder={'100'}
                keyboardType="numeric"
            />
        </View>
    );
};
