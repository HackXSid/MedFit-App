import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const labelData = [
    {
        label: 'balanced',
        text: 'Balanced',
        help: 'Protein/Fat/Carb values in 15/35/50 ratio',
    },
    { label: 'high-fiber', text: 'High-Fiber', help: 'More than 5g fiber per serving' },
    {
        label: 'high-protein',
        text: 'High-Protein',
        help: 'More than 50% of total calories from proteins',
    },
    {
        label: 'low-carb',
        text: 'Low-Carb',
        help: 'Less than 20% of total calories from carbs',
    },
    {
        label: 'low-fat',
        text: 'Low-Fat',
        help: 'Less than 15% of total calories from fat',
    },
    { label: 'low-sodium', text: 'Low-Sodium', help: 'Less than 140mg Na per serving' },
];

const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '90%',
        marginLeft: '5%',
        marginBottom: 15,
    },
    info: {
        fontSize: 18,
        marginRight: 10,
        flexWrap: 'wrap',
    },
    help: {
        fontSize: 15,
        color: 'gray',
        textAlign: 'center',
        flexWrap: 'wrap',
        flex: 1,
    },
});

export const Diet = ({ info, setInfo }) => {
    const addInfo = (nextStateCheck, label) => {
        if (nextStateCheck) {
            // To add
            setInfo({ ...info, diet: [...info.diet, label] });
        } else {
            setInfo({ ...info, diet: info.diet.filter((lbl) => label !== lbl) });
        }
    };

    const getBoxes = () => {
        return labelData.map((labelInfo) => {
            const isChecked = info.diet.includes(labelInfo.label);
            return (
                <TouchableOpacity
                    key={labelInfo.label}
                    style={styles.boxContainer}
                    onPress={() => addInfo(!isChecked, labelInfo.label)}
                >
                    <CheckBox
                        checked={isChecked}
                        onPress={() => addInfo(!isChecked, labelInfo.label)}
                    />
                    <Text style={styles.info}>{labelInfo.text}</Text>
                    <Text style={styles.help}>{labelInfo.help}</Text>
                </TouchableOpacity>
            );
        });
    };
    return <ScrollView style={{ marginBottom: 120 }}>{getBoxes()}</ScrollView>;
};
