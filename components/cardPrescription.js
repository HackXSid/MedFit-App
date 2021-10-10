import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    paragraph: {
        fontSize: 19,
        paddingBottom: 10,
        fontWeight: '500',
    },
    subpara: {
        fontSize: 17,
        paddingBottom: 5,
        fontWeight: '500',
        color: 'gray',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export const CardPrescription = ({
    name,
    doctorType,
    issue,
    viewCB,
    verifyCB,
    expiry = null,
}) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.headContainer}>
                    <Text style={styles.paragraph}>
                        {name} ( {doctorType} )
                    </Text>
                </View>
                <View style={styles.headContainer}>
                    <Text style={styles.subpara}>
                        Issued: {issue.toLocaleDateString(undefined, options)}
                    </Text>
                    <Text style={styles.subpara}>
                        {expiry
                            ? `Expiry: ${expiry.toLocaleDateString(undefined, options)}`
                            : 'Expiry : None'}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        buttonStyle={{
                            borderRadius: 0,
                            marginTop: 15,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                        }}
                        onPress={viewCB}
                        title="View Prescription"
                    />
                    {verifyCB ? (
                        <Button
                            type="outline"
                            buttonStyle={{
                                borderRadius: 0,
                                marginTop: 15,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                            }}
                            onPress={verifyCB}
                            title="Verify Prescription"
                        />
                    ) : null}
                </View>
            </Card>
        </View>
    );
};
