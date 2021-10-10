import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AwesomeButtonRickBojack from 'react-native-really-awesome-button/src/themes/bojack';
import { SvgUri } from 'react-native-svg';

const styles = StyleSheet.create({
    overlayContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '75%',
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
        fontSize: 20,
        marginBottom: 2.5,
    },
    infoHead: {
        fontSize: 20,
        fontWeight: '400',
        color: 'gray',
    },
    info: {
        fontSize: 20,
        fontWeight: '500',
    },
    landingImage: {
        width: 300,
        height: 400,
        borderWidth: 1,
        marginBottom: 17,
    },
});

const toTitleCase = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const OverlayExercise = ({ visible, toggleOverlay, id }) => {
    const [workoutList, setWorkoutList] = useState([]);
    const [workout, setWorkout] = useState(null);

    const fetchExercises = async () => {
        const response = await axios.get(
            `https://wger.de/api/v2/exercise?category=${id}&limit=100&language=2`,
        );
        const { data } = response;
        const { results } = data;
        setWorkoutList(results);
    };

    const getSpecificWorkoutInfo = async (id) => {
        const response = await axios.get(`https://wger.de/api/v2/exerciseinfo/${id}`);
        const { data } = response;
        setWorkout(data);
    };

    const getWorkOuts = () => {
        return workoutList.map((workout, ind) => {
            return (
                <TouchableOpacity
                    onPress={() => getSpecificWorkoutInfo(workout.id)}
                    key={workout.id}
                    style={{
                        ...styles.infoContainer,
                        backgroundColor: ind & 1 ? 'white' : '#ddd',
                    }}
                >
                    <Text style={styles.head}>{toTitleCase(workout.name)}</Text>
                </TouchableOpacity>
            );
        });
    };

    useEffect(() => {
        fetchExercises();
    }, [id]);

    const getDescription = () => {
        const { description } = workout;
        const openRegex = /<p\s*\/?>/i;
        const closeRegex = /<\/p\s*\/?>/i;
        const lines = description.split(openRegex).filter((line) => line.length > 10);
        return lines.map((line, ind) => (
            <Text style={styles.info} key={ind}>
                {' '}
                - {line.replace(closeRegex, '')}
            </Text>
        ));
    };

    const getCategory = () => {
        const { category = {} } = workout;
        const { name = 'Not Available' } = category;
        return <Text style={styles.info}>{name}</Text>;
    };

    const getEquiments = () => {
        const { equipment = [] } = workout;
        const equiments = equipment.map(
            (eq, ind) => eq.name + (ind === equipment.length - 1 ? '' : ', '),
        );
        return <Text style={styles.info}>{equiments}</Text>;
    };

    const getImages = () => {
        const { images = [] } = workout;
        return images.map(({ image, id }) => (
            <Image
                resizeMode="contain"
                key={id}
                source={{ uri: image }}
                style={styles.landingImage}
            />
        ));
    };

    const getComments = () => {
        const { comments = [] } = workout;
        return comments
            .filter(({ comment }) => comment.length > 0)
            .map(({ comment, id }) => (
                <Text style={styles.info} key={id}>
                    {' '}
                    - {comment}
                </Text>
            ));
    };

    const getPrimaryMuscles = () => {
        const { muscles = [] } = workout;
        const getText = muscles.map(
            (muscle, ind) =>
                toTitleCase(muscle.name) + (ind === muscles.length - 1 ? '' : ', '),
        );
        return <Text style={styles.info}>{getText}</Text>;
    };

    const getSecondaryMuscles = () => {
        const { muscles_secondary = [] } = workout;
        const getText = muscles_secondary.map(
            (muscle, ind) =>
                toTitleCase(muscle.name) +
                (ind === muscles_secondary.length - 1 ? '' : ', '),
        );
        return <Text style={styles.info}>{getText}</Text>;
    };

    const getFront = () => {
        const { muscles, muscles_secondary } = workout;
        const muscleImages = [];
        muscles.forEach((muscle) => {
            if (muscle.is_front) {
                muscleImages.push(
                    <SvgUri
                        style={{ position: 'absolute', top: 0 }}
                        uri={'https://wger.de' + muscle.image_url_main}
                        key={muscle.id}
                    />,
                );
            }
        });
        muscles_secondary.forEach((muscle) => {
            if (muscle.is_front) {
                muscleImages.push(
                    <SvgUri
                        style={{ position: 'absolute', top: 0 }}
                        uri={'https://wger.de' + muscle.image_url_secondary}
                        key={muscle.id}
                    />,
                );
            }
        });
        return muscleImages;
    };

    const getBack = () => {
        const { muscles, muscles_secondary } = workout;
        const muscleImages = [];
        muscles.forEach((muscle) => {
            if (!muscle.is_front) {
                muscleImages.push(
                    <SvgUri
                        style={{ position: 'absolute', top: 0 }}
                        uri={'https://wger.de' + muscle.image_url_main}
                        key={muscle.id}
                    />,
                );
            }
        });
        muscles_secondary.forEach((muscle) => {
            if (!muscle.is_front) {
                muscleImages.push(
                    <SvgUri
                        style={{ position: 'absolute', top: 0 }}
                        uri={'https://wger.de' + muscle.image_url_secondary}
                        key={muscle.id}
                    />,
                );
            }
        });
        return muscleImages;
    };

    if (workout) {
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
                    Workout Info
                </Text>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{
                        width: '96%',
                        height: '100%',
                        marginBottom: 30,
                        paddingRight: 10,
                    }}
                >
                    <Text>
                        <Text style={styles.infoHead}>Name : </Text>
                        <Text style={styles.info}>{workout.name}</Text>
                    </Text>
                    {workout.category ? (
                        <View>
                            <Text
                                style={{
                                    ...styles.head,
                                    marginTop: 10,
                                    marginBottom: 15,
                                    color: 'gray',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Category
                            </Text>
                            {getCategory()}
                        </View>
                    ) : null}
                    {workout.equipment && workout.equipment.length > 0 ? (
                        <View>
                            <Text
                                style={{
                                    ...styles.head,
                                    marginTop: 10,
                                    marginBottom: 15,
                                    color: 'gray',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Equipment
                            </Text>
                            {getEquiments()}
                        </View>
                    ) : null}
                    {workout.description ? (
                        <View>
                            <Text
                                style={{
                                    ...styles.head,
                                    marginTop: 10,
                                    marginBottom: 15,
                                    color: 'gray',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Description
                            </Text>
                            {getDescription()}
                        </View>
                    ) : null}
                    {workout.images && workout.images.length > 0 ? (
                        <View style={{ flexDirection: 'column' }}>
                            <Text
                                style={{
                                    ...styles.head,
                                    marginTop: 10,
                                    marginBottom: 15,
                                    color: 'gray',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Images
                            </Text>
                            {getImages()}
                        </View>
                    ) : null}
                    {workout.comments && workout.comments.length > 0 ? (
                        <View>
                            <Text
                                style={{
                                    ...styles.head,
                                    marginTop: 10,
                                    marginBottom: 15,
                                    color: 'gray',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Comments for this exercise
                            </Text>
                            {getComments()}
                        </View>
                    ) : null}
                    {workout.muscles && workout.muscles.length > 0 ? (
                        <View>
                            <Text
                                style={{
                                    ...styles.head,
                                    marginTop: 10,
                                    marginBottom: 15,
                                    color: 'red',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Primary Muscle
                            </Text>
                            {getPrimaryMuscles()}
                        </View>
                    ) : null}
                    {workout.muscles_secondary &&
                    workout.muscles_secondary.length > 0 ? (
                        <View>
                            <Text
                                style={{
                                    ...styles.head,
                                    marginTop: 10,
                                    marginBottom: 15,
                                    color: 'orange',
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Secondary Muscles
                            </Text>
                            {getSecondaryMuscles()}
                        </View>
                    ) : null}
                    <Text
                        style={{
                            ...styles.head,
                            marginTop: 10,
                            marginBottom: 15,
                            color: 'gray',
                            textDecorationLine: 'underline',
                        }}
                    >
                        Front Body
                    </Text>
                    <View
                        style={{
                            height: 370,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <SvgUri
                            style={{ position: 'absolute', top: 0 }}
                            uri="https://wger.de/static/images/muscles/muscular_system_front.svg"
                        />
                        {getFront()}
                    </View>
                    <Text
                        style={{
                            ...styles.head,
                            marginTop: 10,
                            marginBottom: 15,
                            color: 'gray',
                            textDecorationLine: 'underline',
                        }}
                    >
                        Back Body
                    </Text>
                    <View
                        style={{
                            height: 370,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <SvgUri
                            style={{ position: 'absolute', top: 0 }}
                            uri="https://wger.de/static/images/muscles/muscular_system_back.svg"
                        />
                        {getBack()}
                    </View>
                </ScrollView>
                <AwesomeButtonRickBojack
                    onPress={(next) => {
                        setWorkout(null);
                        next();
                    }}
                    raiseLevel={4}
                    textSize={19}
                    width={170}
                >
                    Go Back
                </AwesomeButtonRickBojack>
            </Overlay>
        );
    }

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
                Choose Workout
            </Text>
            <ScrollView style={{ width: '100%', height: '100%' }}>
                {getWorkOuts()}
            </ScrollView>
        </Overlay>
    );
};
