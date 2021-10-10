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

export const OverlayExerciseInfo = ({ visible, toggleOverlay, exerciseInfo }) => {
    const getOverallInfo = () => {
        const overall = {
            totalMins: 0,
            calories: 0,
        };
        exerciseInfo.map(({ duration_min, nf_calories }) => {
            overall.totalMins += duration_min ? duration_min : 0;
            overall.calories += nf_calories ? nf_calories : 0;
        });
        return (
            <View style={styles.infoContainer}>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Overall Duration : </Text>
                    <Text style={styles.info}>
                        {Math.round(overall.totalMins) + ' mins'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Overall Calories : </Text>
                    <Text style={styles.info}>
                        {overall.calories.toFixed(2) + ' kcal'}
                    </Text>
                </Text>
            </View>
        );
    };

    const getWorkoutInfo = () => {
        return exerciseInfo.map(({ name, duration_min, nf_calories }) => (
            <View style={styles.infoContainer} key={name}>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Workout : </Text>
                    <Text style={styles.info}>{' ' + toTitleCase(name)}</Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Duration : </Text>
                    <Text style={styles.info}>
                        {duration_min ? Math.round(duration_min) + ' mins' : 'NA'}
                    </Text>
                </Text>
                <Text style={styles.head}>
                    <Text style={styles.infoHead}>Calories : </Text>
                    <Text style={styles.info}>
                        {nf_calories ? nf_calories.toFixed(2) + ' kcal' : 'NA'}
                    </Text>
                </Text>
            </View>
        ));
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
                View Workout Information
            </Text>
            {exerciseInfo.length > 0 ? (
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
                    {getWorkoutInfo()}
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
                    {getWorkoutInfo()}
                </ScrollView>
            )}
        </Overlay>
    );
};
