import React, { useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, Linking } from 'react-native';
import { Overlay } from 'react-native-elements';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import AwesomeButtonC137 from 'react-native-really-awesome-button/src/themes/c137';

const styles = StyleSheet.create({
    overlayContainer: {
        width: '90%',
        paddingTop: 40,
        alignItems: 'center',
        maxHeight: '72%',
        paddingBottom: 30,
        flex: 1,
    },
    bottom: {
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        flexDirection: 'row',
    },
    landingImage: {
        minWidth: '95%',
        height: '80%',
    },
    card: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    info: {
        position: 'absolute',
        top: '69%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    head: {
        textAlign: 'center',
        fontSize: 22,
    },
    subinfo: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    labelText: {
        fontSize: 18,
        color: 'gray',
    },
    labelInfo: {
        fontSize: 18,
        fontWeight: '600',
    },
});

export const OverlayRecipeInfo = ({ visible, toggleOverlay, recipeInfo }) => {
    const [index, setIndex] = useState(0);
    const openURL = (url) => {
        Linking.openURL(url).catch((_) => {});
    };

    const getRecipe = () => {
        if (index === recipeInfo.length) return null;
        const recipe = recipeInfo[index];
        const { label, image, url, servings, calories, totalWeight, totalTime } =
            recipe;
        return (
            <View style={styles.card}>
                <ImageBackground source={{ uri: image }} style={styles.landingImage} />
                <View style={styles.info}>
                    <Text style={styles.head}>{label}</Text>
                    <View style={styles.subinfo}>
                        <Text>
                            <Text style={styles.labelText}>Servings : </Text>
                            <Text style={styles.labelInfo}>{servings}</Text>
                        </Text>
                        <Text>
                            <Text style={styles.labelText}>Time Required : </Text>
                            <Text style={styles.labelInfo}>
                                {totalTime ? Math.round(totalTime) + ' mins' : 'NA'}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.subinfo}>
                        <Text>
                            <Text style={styles.labelText}>Calories : </Text>
                            <Text style={styles.labelInfo}>
                                {calories.toFixed(2)} kcal
                            </Text>
                        </Text>
                        <Text>
                            <Text style={styles.labelText}>Weight : </Text>
                            <Text style={styles.labelInfo}>
                                {totalWeight.toFixed(2)} gm
                            </Text>
                        </Text>
                    </View>
                    <AwesomeButtonC137
                        type="primary"
                        onPress={(next) => {
                            openURL(url);
                            next();
                        }}
                        style={{ marginTop: 15 }}
                        raiseLevel={6}
                        textSize={19}
                        width={150}
                    >
                        View Recipe
                    </AwesomeButtonC137>
                </View>
            </View>
        );
    };

    const up = () => {
        setIndex((index + 1) % recipeInfo.length);
    };
    const down = () => {
        setIndex((index - 1 + recipeInfo.length) % recipeInfo.length);
    };

    return (
        <Overlay
            overlayStyle={styles.overlayContainer}
            isVisible={visible}
            onBackdropPress={toggleOverlay}
        >
            {getRecipe()}
            <View style={styles.bottom}>
                <AwesomeButtonRick
                    type="secondary"
                    onPress={(next) => {
                        down();
                        next();
                    }}
                    raiseLevel={4}
                    textSize={19}
                    width={120}
                >
                    Previous
                </AwesomeButtonRick>
                <AwesomeButtonRick
                    type="secondary"
                    onPress={(next) => {
                        up();
                        next();
                    }}
                    raiseLevel={6}
                    textSize={19}
                    width={120}
                >
                    Next
                </AwesomeButtonRick>
            </View>
        </Overlay>
    );
};
