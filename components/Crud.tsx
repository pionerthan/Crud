import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, FlatList, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Crud = () => {
  type Catatan = {
    id: number,
    nama: string,
    catatanku: string,
    hobiku: string,
    tanggal: string,
  }


  const [nama, setName] = useState('');
  const [catatan, setCatatan] = useState('');
  const [hobi, setHobi] = useState('');
  const [data, setData] = useState<Catatan[]>([]);

  const handleButton = () => {
    if (nama === '' || catatan === '' || hobi === '') {
      Alert.alert('Error', 'Data harus lengkap!');
      return;
    }

    axios
      .post('http://192.168.0.2/ThaniaPHP/add.php', { nama, catatan, hobi })
      .then((response) => {
        Alert.alert('DATA BERHASIL DISIMPAN', response.data.message);
        setName('');
        setCatatan('');
        setHobi('');
        fetchData();
      })
      .catch(() => {
        Alert.alert('DATA TIDAK LENGKAP!');
      })

  }

  const fetchData = () => {
    axios
      .get('http://192.168.0.2/ThaniaPHP/get.php')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setData(response.data)
        } else {
          setData([]);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Gagal mengambil data dari database!');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View>
        
        <Text style={styles.title}> My Note </Text>
        <TextInput style={styles.inputNama} placeholder='Masukan namamu' value={nama} onChangeText={setName} />
        <TextInput style={styles.inputCatatan} placeholder='Masukan catatanmu' value={catatan} onChangeText={setCatatan} />
        <TextInput style={styles.inputNama} placeholder='Masukan hobimu' value={hobi} onChangeText={setHobi} />
        <TouchableOpacity style={styles.simpan} onPress={handleButton}>
          <Text style={styles.save}> SAVE </Text>
        </TouchableOpacity>
        <Text style={styles.uye}>uye</Text>

        <FlatList
          data={data}
          style={styles.uye}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
               <Text>uye</Text>
              <Text>{item.nama}</Text>
              <Text>{item.catatanku}</Text>
              <Text>{item.hobiku}</Text>
              <Text>{item.tanggal}</Text>
            </View>
          )}
        />
      </View>
      </ScrollView>
  )
}

export default Crud;

const styles = StyleSheet.create({
  title: {
    top: 40,
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30,

  },
  inputNama: {
    top: 70,
    width: 300,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
  },
  inputCatatan: {
    top: 70,
    width: 300,
    height: 130,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    textAlignVertical: 'top'
  },
  simpan: {
    top: 100,
    backgroundColor: '#66cdaa',
    width: 120,
    alignSelf: 'center',
    height: 30,
    borderRadius: 7,
    marginTop: 0,
  },
  save: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  uye: {
    marginBottom: 90,
  }
})