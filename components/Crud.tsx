import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, FlatList, ScrollView, Modal, Button } from 'react-native';
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
  const [selectedItem, setSelectedItem] = useState<Catatan | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item: Catatan): void => {
    setSelectedItem(item);
    setModalVisible(true);
  }

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  }

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

  const handleUpdate = () => {
    if (selectedItem) {
      axios
      .post('http://192.168.0.2/ThaniaPHP/update.php', {
        id: selectedItem.id,
        nama: selectedItem.nama,
        catatan: selectedItem.catatanku,
        hobi: selectedItem.hobiku
      })
      .then(() => {
        Alert.alert('SUKSES', 'Catatan berhasil diupdate!')
        closeModal()
        fetchData()
      })
      .catch(() => {
        Alert.alert('ERROR', 'Catatan gagal diupdate!')
      })

    }
  }

  const handleDelete = (id: number) => {
    Alert.alert('KONFIRMASI', 'Apakah anda yakin untuk menghapus data ini?', [
      {
        text: 'Batal',
        style: 'cancel'
      },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          axios
          .post('http://192.168.0.2/ThaniaPHP/delete.php', {id})
          .then(() => {
            Alert.alert('Catatan berhasil dihapus!')
            fetchData()
          })
          .catch(() => {
            Alert.alert('ERROR', 'Catatan gagal dihapus!')
          });
        }
      }
    ])
  }

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


        <FlatList
          data={data}
          style={styles.flatlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.card}>
                <Text>{item.nama}</Text>
                <Text>{item.catatanku}</Text>
                <Text>{item.hobiku}</Text>
                <Text>{item.tanggal}</Text>

                <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.textButtonDelete}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={modalVisible}
          animationType='fade'
          transparent={true}
          onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedItem && (
                <>
                  <TextInput
                  style={styles.editNama}
                  value={selectedItem.nama}
                  onChangeText={(text) =>
                    setSelectedItem({... selectedItem, nama:text})
                  }/>
                  <TextInput
                  style={styles.editCatatan}
                  value={selectedItem.catatanku}
                  onChangeText={(text) =>
                    setSelectedItem({... selectedItem, catatanku:text})
                  }/>
                  <TextInput
                  style={styles.editNama}
                  value={selectedItem.hobiku}
                  onChangeText={(text) =>
                    setSelectedItem({... selectedItem, hobiku:text})
                  }/>
                  <Button title='UPDATE' onPress={handleUpdate}/>
                </>
              )}

              <TouchableOpacity onPress={closeModal} style={styles.iconClose}>
                <Text style={{ fontSize: 20 }}>X</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
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
  flatlist: {
    marginTop: 140,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(192, 192, 192, 0.73)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 10,
  },
  iconClose: {
    position: 'absolute',
    right: 10,
  },
  card: {
    padding: 9,
    marginVertical: 9,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
    width: 450,
    height: 112
  },
  editNama: {
    top: 1,
    width: 300,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
  },
  editCatatan: {
    top: 1,
    width: 300,
    height: 130,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    textAlignVertical: 'top'
  },
  buttonDelete: {
    backgroundColor: '#e60000',
    paddingVertical: 15,
    width: 100,
    right: -322,
    height: 10,
    top: -80,
    borderRadius: 7,
    marginTop: 20,
  },
  textButtonDelete: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    top: 5,
    left: 27
  }
})