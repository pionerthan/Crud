import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();
  const handleButtonPress = () => {
    navigation.navigate('Save');
  }
  return (
    <ThemedView>
      <Image
        source={require('@/assets/images/atas.png')}
        style={styles.biruatas}
      />
      <Image
        source={require('@/assets/images/todeal.png')}
        style={styles.todil}
      />
      <Image
        source={require('@/assets/images/geting.png')}
        style={styles.geting}
      />
      <Image
        source={require('@/assets/images/birubawah.png')}
        style={styles.birubawah}
      />
      <Image
        source={require('@/assets/images/manusia.png')}
        style={styles.man}
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
  todil: {
    top: 330,
    right: -50,
    width: 360,
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
  man: {
    width: 200,
    height: 259,
    left: 120,
    bottom: 350,
  },
  start: {
    width: 378,
    height: 200,
    left: 50,
    bottom: 200,
  },
  button1: {
    top: -200,
    width: 2000,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    top: 120
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
