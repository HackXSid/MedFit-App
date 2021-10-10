import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Fuse from 'fuse.js';
import { CardSpeciality } from '../components/cardSpecialities';
import { getRequest } from '../utils/serviceCall';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
});

export const Specialities = ({ setSpeciality }) => {
    const [specialityList, setSpecialityList] = useState([]);
    const [search, setSearch] = useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };

    const fetchSpecialities = async () => {
        const response = await getRequest('constant/specialities');
        const { data } = response;
        const { specialities } = data;
        specialities.sort();
        setSpecialityList(specialities);
    };

    const getCards = () => {
        const fuse = new Fuse(specialityList);
        let arrFilter = specialityList;
        if (search) {
            const result = fuse.search(search);
            arrFilter = result.map((ele) => ele.item);
        }
        const chunk = 2;
        const cards = [];
        for (let i = 0; i < arrFilter.length; i += chunk) {
            const arr = arrFilter.slice(i, i + chunk);
            const pairCard = arr.map((speciality) => (
                <CardSpeciality
                    text={speciality}
                    key={speciality}
                    setSpeciality={setSpeciality}
                />
            ));
            cards.push(
                <View style={styles.container} key={i}>
                    {pairCard}
                </View>,
            );
        }
        return cards;
    };

    useEffect(() => {
        fetchSpecialities();
    }, []);

    return (
        <View>
            <SearchBar
                placeholder="Type of Doctor"
                onChangeText={updateSearch}
                value={search}
            />
            <ScrollView>{getCards()}</ScrollView>
        </View>
    );
};
