import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
import UI2 from '@/components/UI2';

const UI1 = () => {
    const [nama, setName] = useState('');

    const navigation = useNavigation();
    const handleButtonPress = () => {
        navigation.navigate('UI2');
    }

    return (
        <View>
            <View >
                <View style={styles.bulat} />
                <View style={styles.bulat2} />
            </View>
            <View>
                <Text style={{ top: 40, fontSize: 18, textAlign: 'center' }}> imput your name! </Text>
                <TextInput style={styles.inputNama} value={nama} onChangeText={setName} />
                <TouchableOpacity style={styles.simpan}>
                    <Text style={styles.save}> SAVE </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.selanjutnya} onPress={handleButtonPress}>
                    <Text style={styles.next}> NEXT </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bulat: {
        width: 150,
        height: 150,
        backgroundColor: '#1d5757',
        left: 106,
        top: 120,
        borderRadius: 80,
    },
    bulat2: {
        width: 150,
        height: 150,
        backgroundColor: '#fac0c9',
        left: 216,
        top: -30,
        borderRadius: 80,
    },
    inputNama: {
        top: 55,
        width: 270,
        alignSelf: 'center',
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 15
    },
    simpan: {
        top: 80,
        backgroundColor: '#3ddf00',
        width: 90,
        alignSelf: 'center',
        height: 30,
        borderRadius: 7,
    },
    save: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14
    },
    selanjutnya: {
        top: 190,
        backgroundColor: 'white',
        width: 90,
        alignSelf: 'center',
        height: 30,
        borderRadius: 7,
        borderWidth: 1,
        left: 160,
    },
    next: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 14
    }
});

export default UI1;