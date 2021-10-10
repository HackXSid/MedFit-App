import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Avatar, Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    paragraph: {
        fontSize: 20,
        fontWeight: '600',
        paddingBottom: 10,
        color: '#34495e',
        textAlign: 'center',
    },
    subparagraph: {
        fontSize: 18,
        fontWeight: '400',
        paddingBottom: 7,
        color: '#34495e',
        flexWrap: 'wrap',
        flex: 1,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardInfo: {
        marginTop: 10,
        marginLeft: 15,
        flexDirection: 'column',
        maxWidth: '50%',
    },
});

export const CardAppointment = ({
    image_url,
    name,
    doctor_type,
    date,
    mode,
    time,
    cb = () => {},
}) => {
    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.card}>
                    <Avatar rounded source={image_url} size={'xlarge'} rounded={true} />
                    <View style={styles.cardInfo}>
                        <Text style={styles.paragraph}>{name}</Text>
                        <Text style={styles.subparagraph}>{doctor_type}</Text>
                        <Text style={styles.subparagraph}>
                            {`${date.toDateString()}`}
                        </Text>
                        <Text style={styles.subparagraph}>{`Start Time: ${time}`}</Text>
                        <Text style={styles.subparagraph}>{mode}</Text>
                    </View>
                </View>
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginTop: 15,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    }}
                    onPress={cb}
                    title="View Appointment"
                />
            </Card>
        </View>
    );
};
