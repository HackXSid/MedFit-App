import React, { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Fuse from 'fuse.js';
import { JWT_KEY } from '../constants';
import * as SecureStore from 'expo-secure-store';
import { getRequest } from '../utils/serviceCall';
import { getDoctorImage } from '../utils/getImage';
import { CardDoctor } from '../components/cardDoctor';
import { View, ScrollView, Text } from 'react-native';

export const DoctorListView = ({ doctors, goToDashboard }) => {
    const [search, setSearch] = useState('');
    const updateSearch = (search) => {
        setSearch(search);
    };

    const getDoctorCard = () => {
        let arr = doctors;
        if (search) {
            const fuse = new Fuse(doctors, { keys: ['name', 'hospital'] });
            const result = fuse.search(search);
            arr = result.map((res) => res.item);
        }
        if (arr.length === 0)
            return (
                <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}>
                    No doctors available
                </Text>
            );
        return arr.map((doctor) => (
            <CardDoctor
                key={doctor.id}
                id={doctor.id}
                image_url={doctor.image_url}
                name={doctor.name}
                doctor_type={doctor.doctor_type}
                medical_contact_number={doctor.medical_contact_number}
                yoe={doctor.yoe}
                hospital={doctor.hospital}
                goToDashboard={goToDashboard}
            />
        ));
    };

    return (
        <View style={{ paddingBottom: 100 }}>
            <SearchBar
                placeholder="Doctor Name or Hospital"
                onChangeText={updateSearch}
                value={search}
            />
            <ScrollView>{getDoctorCard()}</ScrollView>
        </View>
    );
};

export const DoctorList = ({ speciality, setSpeciality, goToDashboard }) => {
    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        const auth_token = await SecureStore.getItemAsync(JWT_KEY);
        const response = await getRequest('api/booking/getDoctors', auth_token, {
            doctorType: speciality,
        });
        const { data } = response;
        const { doctors: doctorFetch } = data;
        setDoctors(
            doctorFetch.map((doctor) => ({
                image_url: getDoctorImage(),
                name: doctor.user.name,
                doctor_type: doctor.typeOfDoctor,
                hospital: doctor.hospital.name,
                medical_contact_number: doctor.medical_contact_number,
                yoe: doctor.yoe,
                id: doctor.id,
            })),
        );
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <View style={{ height: '100%' }}>
            <DoctorListView doctors={doctors} goToDashboard={goToDashboard} />
            <FAB
                icon={<Icon name="back" size={30} color="white" />}
                placement="right"
                buttonStyle={{ backgroundColor: 'green', padding: 10 }}
                containerStyle={{ position: 'absolute', right: 10, bottom: 80 }}
                onPress={() => setSpeciality('')}
            />
        </View>
    );
};
