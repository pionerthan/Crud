import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';



export default function explore() {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Greeting');
  }

  const [getText, setText] = useState(' ');
  const [savedText, setSavedText, nameText, birthText, favText, wishText] = useState('');

  const simpan = () => {
    setSavedText(getText);
  };

  return (
    <ThemedView>
      <Image
        source={require('@/assets/images/atas.png')}
        style={styles.biruatas}
      />
      <Image
        source={require('@/assets/images/help.png')}
        style={styles.help}
      />
      <TextInput
        style={styles.name}
        value={nameText}
        onChangeText={(nameText) => setText(Text)} placeholder="Enter Your Full Name"
      />
      <TextInput
        style={styles.birth}
        value={birthText}
        onChangeText={(birthText) => setText(Text)} placeholder="Enter Your Birthday"
      />
      <TextInput
        style={styles.fav}
        value={favText}
        onChangeText={(favText) => setText(Text)} placeholder="Enter Your Favorite Food"
      />
      <TextInput
        style={styles.wish}
        value={wishText}
        onChangeText={(wishText) => setText(Text)} placeholder="Enter Your Wish"
      />
      <Image
        source={require('@/assets/images/birubawah.png')}
        style={styles.birubawah}
      />
      <Image
        source={require('@/assets/images/welkom.png')}
        style={styles.welkom}
      />
      <Image
        source={require('@/assets/images/birubawah.png')}
        style={styles.biruatas1}
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <ThemedText style={styles.buttonText}> Get Started </ThemedText>
      </TouchableOpacity>
      <Text style={styles.get}>Get things done with TODo</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  get: {
    top: 280,
    fontSize: 19,
    right: -90,
  },
  biruatas: {
    width: 231,
    height: 254,
    top: -80,
    left: 0,
  },
  biruatas1: {
    width: 231,
    height: 254,
    top: -90,
    left: 280,
  },
  help: {
    position: 'absolute',
    top: 260,
    left: 125,
    width: 245
  },
  geting: {
    top: 280,
    right: -50,
    width: 360,
  },
  birubawah: {
    width: 231,
    height: 254,
    top: 350,
    left: 250,
  },
  welkom: {
    position: 'absolute',
    top: 199,
    left: 102
  },
  name: {
    top: 100,
    width: 370,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  birth: {
    top: 105,
    width: 370,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  fav: {
    top: 110,
    width: 370,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  wish: {
    top: 115,
    width: 370,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white'
  },
});