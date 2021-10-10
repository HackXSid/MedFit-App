import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

const labelData = [
    {
        label: 'alcohol-free',
        text: 'Alcohol-free',
        help: 'No alcohol used or contained',
    },
    {
        label: 'celery-free',
        text: 'Celery-free',
        help: 'Does not contain celery or derivatives',
    },
    {
        label: 'crustacean-free',
        text: 'Crustacean-free',
        help: 'Does not contain crustaceans (shrimp, lobster etc.) or derivatives',
    },
    { label: 'dairy-free', text: 'Dairy-free', help: 'No dairy; No lactose' },
    {
        label: 'egg-free',
        text: 'Egg-free',
        help: 'No eggs or products containing eggs',
    },
    { label: 'fish-free', text: 'Fish-free', help: 'No fish or fish derivatives' },
    {
        label: 'gluten-free',
        text: 'Gluten-free',
        help: 'No ingredients containing gluten',
    },
    {
        label: 'keto-friendly',
        text: 'Keto',
        help: 'Maximum 7 grams of net carbs per serving',
    },
    {
        label: 'kidney-friendly',
        text: 'Kidney friendly',
        help: 'Per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg',
    },
    {
        label: 'kosher',
        text: 'Kosher',
        help: 'Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves',
    },
    {
        label: 'low-potassium',
        text: 'Low potassium',
        help: 'Less than 150mg per serving',
    },
    {
        label: 'lupine-free',
        text: 'Lupine-free',
        help: 'Does not contain lupine or derivatives',
    },
    {
        label: 'mustard-free',
        text: 'Mustard-free',
        help: 'Does not contain mustard or derivatives',
    },
    {
        label: 'no-oil-added',
        text: 'No oil added',
        help: 'No oil added except to what is contained in the basic ingredients',
    },
    {
        label: 'low-sugar',
        text: 'No-sugar',
        help: 'No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose',
    },
    {
        label: 'paleo',
        text: 'Paleo',
        help: 'Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils',
    },
    {
        label: 'peanut-free',
        text: 'Peanut-free',
        help: 'No peanuts or products containing peanuts',
    },
    {
        label: 'pescatarian',
        text: 'Pescatarian',
        help: 'Does not contain meat or meat based products, can contain dairy and fish',
    },
    {
        label: 'pork-free',
        text: 'Pork-free',
        help: 'Does not contain pork or derivatives',
    },
    {
        label: 'red-meat-free',
        text: 'Red meat-free',
        help: 'Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.',
    },
    {
        label: 'sesame-free',
        text: 'Sesame-free',
        help: 'Does not contain sesame seed or derivatives',
    },
    {
        label: 'shellfish-free',
        text: 'Shellfish-free',
        help: 'No shellfish or shellfish derivatives',
    },
    { label: 'soy-free', text: 'Soy-free', help: 'No soy or products containing soy' },
    {
        label: 'sugar-conscious',
        text: 'Sugar-conscious',
        help: 'Less than 4g of sugar per serving',
    },
    {
        label: 'tree-nut-free',
        text: 'Tree-Nut-free',
        help: 'No tree nuts or products containing tree nuts',
    },
    {
        label: 'vegan',
        text: 'Vegan',
        help: 'No meat, poultry, fish, dairy, eggs or honey',
    },
    { label: 'vegetarian', text: 'Vegetarian', help: 'No meat, poultry, or fish' },
    {
        label: 'wheat-free',
        text: 'Wheat-free',
        help: 'No wheat, can have gluten though',
    },
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

export const Health = ({ info, setInfo }) => {
    const addInfo = (nextStateCheck, label) => {
        if (nextStateCheck) {
            // To add
            setInfo({ ...info, health: [...info.health, label] });
        } else {
            setInfo({ ...info, health: info.health.filter((lbl) => label !== lbl) });
        }
    };

    const getBoxes = () => {
        return labelData.map((labelInfo) => {
            const isChecked = info.health.includes(labelInfo.label);
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
