import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

const UI = () => {
    const [nama, setName] = useState('');

    return (
        <View>
            <View >

                <View style={styles.box1} />
                <View style={styles.box2} />
                <View style={styles.box3} />

                <View style={styles.bulatAtas}>
                    <View style={styles.bulat} />
                    <View style={styles.bulat2} />
                    <View style={styles.bulat3} />
                </View>
                <View style={styles.box4} />
                <View style={styles.box5} />
                <View style={styles.box6} />
                <View style={styles.box7} />
                <View style={styles.box8} />
                <View style={styles.box9} />
                <View style={styles.box10} />
                <View style={styles.box11} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bulat: {
        width: 160,
        height: 160,
        backgroundColor: '#ffc92a',
        left: 266,
        top: -50,
        borderRadius: 80,
    },
    bulat2: {
        width: 100,
        height: 100,
        backgroundColor: '#cc0000',
        left: 296,
        top: -178,
        borderRadius: 80,
    },
    bulat3: {
        width: 60,
        height: 60,
        backgroundColor: '#ffe599',
        left: 316,
        top: -259,
        borderRadius: 80,
    },
    box1: {
        width: 190,
        height: 40,
        backgroundColor: '#000000',
        top: 80,
        left: 12,
        borderRadius: 7,
    },
    box2: {
        width: 140,
        height: 40,
        backgroundColor: '#cc0000',
        top: 95,
        left: 12,
        borderRadius: 7,
    },
    box3: {
        width: 90,
        height: 40,
        backgroundColor: '#000000',
        top: 110,
        left: 12,
        borderRadius: 7,
    },
    kotakAtas: {
        position: 'absolute'
    },
    bulatAtas: {
        position: 'absolute',
        top: 130
    },
    box4: {
        width: 50,
        height: 189,
        backgroundColor: '#f4cccc',
        top: 330,
        left: 22,
        borderRadius: 7,
        position: 'absolute'
    },
    box5: {
        width: 50,
        height: 140,
        backgroundColor: '#bcbcbc',
        top: 380,
        left: 92,
        borderRadius: 7,
        position: 'absolute'
    },
    box6: {
        width: 50,
        height: 95,
        backgroundColor: '#bdab99',
        top: 425,
        left: 160,
        borderRadius: 7,
        position: 'absolute'
    },
    box7: {
        width: 50,
        height: 63,
        backgroundColor: '#b3f09c',
        top: 456,
        left: 230,
        borderRadius: 7,
        position: 'absolute'
    },
    box8: {
        width: 50,
        height: 63,
        backgroundColor: '#b3f09c',
        top: 545,
        left: 22,
        borderRadius: 7,
        position: 'absolute'
    },
    box9: {
        width: 50,
        height: 95,
        backgroundColor: '#bdab99',
        top: 545,
        left: 92,
        borderRadius: 7,
        position: 'absolute'
    },
    box10: {
        width: 50,
        height: 140,
        backgroundColor: '#bcbcbc',
        top: 545,
        left: 160,
        borderRadius: 7,
        position: 'absolute'
    },
    box11: {
        width: 50,
        height: 189,
        backgroundColor: '#f4cccc',
        top: 545,
        left: 230,
        borderRadius: 7,
        position: 'absolute'
    },
});

export default UI;