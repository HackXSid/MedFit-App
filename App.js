import React, { useEffect, useMemo, useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PersistGate } from 'redux-persist/integration/react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import { JWT_KEY, JWT_STATUS } from './constants';
import { store, persistor } from './redux/stores';
import { LandingScreen } from './screens/landing.screen';
import { Dashboard } from './screens/dashboard.screen';
import { Prescription } from './screens/prescription.screen';
import { Appointment } from './screens/appointment.screen';
import { Logout } from './screens/logout.screen';
import { MedBuddy } from './screens/medbuddy.screen';
import { Food } from './screens/food.screen';
import { Exercise } from './screens/exercise.screen';
import { getRequest } from './utils/serviceCall';
import { appStyles } from './styles/app.style';
import { AuthContext } from './contexts';
import { BookAppointment } from './screens/book_appointment.screen';

const styles = StyleSheet.create(appStyles());
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'VERIFY':
                    return {
                        ...prevState,
                        jwtStatus: JWT_STATUS.JWT_VERIFIED,
                        token: action.token,
                    };
                case 'INVALID':
                    return {
                        ...prevState,
                        jwtStatus: JWT_STATUS.JWT_INVALID,
                        token: '',
                    };
            }
        },
        {
            jwtStatus: JWT_STATUS.JWT_NOT_VERIFIED,
            token: '',
        },
    );

    const authContext = useMemo(() => ({
        verify: (token) => dispatch({ type: 'VERIFY', token }),
        invalid: () => dispatch({ type: 'INVALID' }),
    }));

    const verifyJWT = async () => {
        const jwt = await SecureStore.getItemAsync(JWT_KEY);
        if (jwt) {
            getRequest('auth/jwt', jwt)
                .then((_) => {
                    dispatch({ type: 'VERIFY', token: jwt });
                })
                .catch(async (_) => {
                    await SecureStore.deleteItemAsync(JWT_KEY);
                    dispatch({ type: 'INVALID' });
                });
        } else {
            dispatch({ type: 'INVALID' });
        }
    };
    const authReducer = useSelector((state) => state.authenticationReducer);
    useEffect(() => {
        const { user } = authReducer;
        if (!user) {
            dispatch({ type: 'INVALID' });
        } else verifyJWT();
    }, [authReducer]);

    if (
        state.token &&
        authReducer.user &&
        state.jwtStatus === JWT_STATUS.JWT_VERIFIED &&
        authReducer.user.userType === 'User'
    ) {
        return (
            <View style={styles.container}>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName="Dashboard">
                            <Drawer.Screen name="Dashboard" component={Dashboard} />
                            <Drawer.Screen
                                name="Book Appointment"
                                component={BookAppointment}
                            />
                            <Drawer.Screen
                                name="View Appointments"
                                component={Appointment}
                            />
                            <Drawer.Screen
                                name="View Prescriptions"
                                component={Prescription}
                            />
                            <Drawer.Screen
                                name="MedBuddy - Your Assistant"
                                component={MedBuddy}
                            />
                            <Drawer.Screen name="How's My Food" component={Food} />
                            <Drawer.Screen name="Let's Workout" component={Exercise} />
                            <Drawer.Screen name="Logout" component={Logout} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </View>
        );
    } else if (
        state.token &&
        authReducer.user &&
        state.jwtStatus === JWT_STATUS.JWT_VERIFIED &&
        authReducer.user.userType === 'Doctor'
    ) {
        return (
            <View style={styles.container}>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        <Drawer.Navigator initialRouteName="Dashboard">
                            <Drawer.Screen name="Dashboard" component={Dashboard} />
                            <Drawer.Screen
                                name="View Appointments"
                                component={Appointment}
                            />
                            <Drawer.Screen
                                name="View Prescriptions"
                                component={Prescription}
                            />
                            <Drawer.Screen name="Logout" component={Logout} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Landing">
                            <Stack.Screen name="Landing" component={LandingScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            </View>
        );
    }
};

const Main = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
};

export default Main;
