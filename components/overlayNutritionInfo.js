import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { Overlay } from 'react-native-elements';

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
        fontSize: 17,
        marginBottom: 2.5,
    },
    infoHead: {
        fontWeight: '400',
        color: 'gray',
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

export const OverlayNutritionInfo = ({ visible, toggleOverlay, foodInfo }) => {
    const getOverallInfo = () => {
        const combinedData = {
            nf_calories: 0,
            nf_total_fat: 0,
            nf_saturated_fat: 0,
            nf_cholesterol: 0,
            nf_sodium: 0,
            nf_total_carbohydrate: 0,
            nf_dietary_fiber: 0,
            nf_sugars: 0,
            nf_protein: 0,
            nf_potassium: 0,
        };
        foodInfo.map((food) => {
            let {
                food_name,
                nf_calories,
                nf_total_fat,
                nf_saturated_fat,
                nf_cholesterol,
                nf_sodium,
                nf_total_carbohydrate,
                nf_dietary_fiber,
                nf_sugars,
                nf_protein,
                nf_potassium,
            } = food;

            if (!nf_calories) nf_calories = 0;
            if (!nf_total_fat) nf_total_fat = 0;
            if (!nf_saturated_fat) nf_saturated_fat = 0;
            if (!nf_cholesterol) nf_cholesterol = 0;
            if (!nf_sodium) nf_sodium = 0;
            if (!nf_total_carbohydrate) nf_total_carbohydrate = 0;
            if (!nf_dietary_fiber) nf_dietary_fiber = 0;
            if (!nf_sugars) nf_sugars = 0;
            if (!nf_potassium) nf_potassium = 0;
            if (!nf_protein) nf_protein = 0;

            combinedData.nf_calories += nf_calories;
            combinedData.nf_total_fat += nf_total_fat;
            combinedData.nf_saturated_fat += nf_saturated_fat;
            combinedData.nf_cholesterol += nf_cholesterol;
            combinedData.nf_sodium += nf_sodium;
            combinedData.nf_total_carbohydrate += nf_total_carbohydrate;
            combinedData.nf_dietary_fiber += nf_dietary_fiber;
            combinedData.nf_sugars += nf_sugars;
            combinedData.nf_potassium += nf_potassium;
            combinedData.nf_protein += nf_protein;
        });

        combinedData.nf_calories = combinedData.nf_calories.toFixed(2);
        combinedData.nf_total_fat = combinedData.nf_total_fat.toFixed(2);
        combinedData.nf_saturated_fat = combinedData.nf_saturated_fat.toFixed(2);
        combinedData.nf_cholesterol = combinedData.nf_cholesterol.toFixed(2);
        combinedData.nf_sodium = combinedData.nf_sodium.toFixed(2);
        combinedData.nf_total_carbohydrate =
            combinedData.nf_total_carbohydrate.toFixed(2);
        combinedData.nf_dietary_fiber = combinedData.nf_dietary_fiber.toFixed(2);
        combinedData.nf_sugars = combinedData.nf_sugars.toFixed(2);
        combinedData.nf_potassium = combinedData.nf_potassium.toFixed(2);
        combinedData.nf_protein = combinedData.nf_protein.toFixed(2);

        return (
            <View style={styles.infoContainer}>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Calories :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_calories + ' kcal'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Fat :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_total_fat + ' g'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Saturated Fat :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_saturated_fat + ' g'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Cholesterol :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_cholesterol + ' mg'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Sodium :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_sodium + ' mg'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Potassium :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_potassium + ' mg'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Carbohydrates :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_total_carbohydrate + ' g'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Dietary Fiber :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_dietary_fiber + ' g'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Sugars :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_sugars + ' g'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Total Protein :</Text>
                    <Text style={styles.info}>
                        {' ' + combinedData.nf_protein + ' g'}
                    </Text>
                </Text>
            </View>
        );
    };

    const getFoodInfo = () => {
        return foodInfo.map((food, index) => {
            let {
                food_name,
                nf_calories,
                nf_total_fat,
                nf_saturated_fat,
                nf_cholesterol,
                nf_sodium,
                nf_total_carbohydrate,
                nf_dietary_fiber,
                nf_sugars,
                nf_protein,
                nf_potassium,
            } = food;

            if (!nf_calories) nf_calories = 0;
            if (!nf_total_fat) nf_total_fat = 0;
            if (!nf_saturated_fat) nf_saturated_fat = 0;
            if (!nf_cholesterol) nf_cholesterol = 0;
            if (!nf_sodium) nf_sodium = 0;
            if (!nf_total_carbohydrate) nf_total_carbohydrate = 0;
            if (!nf_dietary_fiber) nf_dietary_fiber = 0;
            if (!nf_sugars) nf_sugars = 0;
            if (!nf_potassium) nf_potassium = 0;
            if (!nf_protein) nf_protein = 0;

            return (
                <View key={index} style={styles.infoContainer}>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Food Name :</Text>
                        <Text style={styles.info}>{' ' + toTitleCase(food_name)}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Calories :</Text>
                        <Text style={styles.info}>{' ' + nf_calories + ' kcal'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Total Fat :</Text>
                        <Text style={styles.info}>{' ' + nf_total_fat + ' g'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Saturated Fat :</Text>
                        <Text style={styles.info}>{' ' + nf_saturated_fat + ' g'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Cholesterol :</Text>
                        <Text style={styles.info}>{' ' + nf_cholesterol + ' mg'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Sodium :</Text>
                        <Text style={styles.info}>{' ' + nf_sodium + ' mg'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Potassium :</Text>
                        <Text style={styles.info}>{' ' + nf_potassium + ' mg'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Carbohydrates :</Text>
                        <Text style={styles.info}>
                            {' ' + nf_total_carbohydrate + ' g'}
                        </Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Dietary Fiber :</Text>
                        <Text style={styles.info}>{' ' + nf_dietary_fiber + ' g'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Sugars :</Text>
                        <Text style={styles.info}>{' ' + nf_sugars + ' g'}</Text>
                    </Text>
                    <Text style={styles.head}>
                        <Text style={styles.infoHead}>Protein :</Text>
                        <Text style={styles.info}>{' ' + nf_protein + ' g'}</Text>
                    </Text>
                </View>
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
                View Nutritional Information
            </Text>
            {foodInfo.length > 0 ? (
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Text
                        style={{
                            fontSize: 19,
                            textAlign: 'center',
                            marginBottom: 15,
                            fontWeight: '800',
                        }}
                    >
                        Overall Information
                    </Text>
                    {getOverallInfo()}
                    <Text
                        style={{
                            fontSize: 19,
                            textAlign: 'center',
                            marginBottom: 15,
                            marginTop: 20,
                            fontWeight: '800',
                        }}
                    >
                        Individual Information
                    </Text>
                    {getFoodInfo()}
                </ScrollView>
            ) : (
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Text
                        style={{
                            fontSize: 19,
                            textAlign: 'center',
                            marginBottom: 15,
                            marginTop: 20,
                            fontWeight: '800',
                        }}
                    >
                        Individual Information
                    </Text>
                    {getFoodInfo()}
                </ScrollView>
            )}
        </Overlay>
    );
};
