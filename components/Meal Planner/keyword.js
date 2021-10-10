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

export const Keyword = ({ info, setInfo }) => {
    return (
        <View>
            <Text style={styles.info}>
                Enter what you want to eat, like "coffee and croissant" or "chicken
                enchilada".
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setInfo({ ...info, keywords: text })}
                value={info.keywords}
                placeholder="Keywords like 'chicken and rice'"
            />
        </View>
    );
};
