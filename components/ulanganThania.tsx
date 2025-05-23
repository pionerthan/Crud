import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, FlatList, ScrollView, Modal, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Crud = () => {
  type Buku = {
    id: number,
    judul: string,
    pengarang: string,
    
  }


  const [judul, setJudul] = useState('');
  const [pengarang, setPengarang] = useState('');
  
  const [data, setData] = useState<Buku[]>([]);
  const [selectedItem, setSelectedItem] = useState<Buku | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (item: Buku): void => {
    setSelectedItem(item);
    setModalVisible(true);
  }

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  }

  const handleButton = () => {
    if (judul === '' || pengarang === '') {
      Alert.alert('Error', 'Data harus lengkap!');
      return;
    }

    axios
      .post('http://192.168.0.2/ulanganThania/add.php', { judul, pengarang })
      .then((response) => {
        Alert.alert('DATA BERHASIL DISIMPAN', response.data.message);
        setJudul('');
        setPengarang('');
        fetchData();
      })
      .catch(() => {
        Alert.alert('DATA TIDAK LENGKAP!');
      })

  }

  const fetchData = () => {
    axios
      .get('http://192.168.0.2/ulanganThania/get.php')
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
      .post('http://192.168.0.2/ulanganThania/update.php', {
        id: selectedItem.id,
        judul: selectedItem.judul,
        pengarang: selectedItem.pengarang,
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
          .post('http://192.168.0.2/ulanganThania/delete.php', {id})
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

        <Text style={styles.title}> Daftar Buku </Text>
        <TextInput style={styles.inputJudul} placeholder='Judul Buku' value={judul} onChangeText={setJudul} />
        <TextInput style={styles.inputPengarang} placeholder='Nama Pengarang' value={pengarang} onChangeText={setPengarang} />
        <TouchableOpacity style={styles.simpan} onPress={handleButton}>
          <Text style={styles.save}> Tambah Buku </Text>
        </TouchableOpacity>


        <FlatList
          data={data}
          style={styles.flatlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.card}>
                <Text style={styles.judul}>{item.judul}</Text>
                <Text style={styles.pengarang}>{item.pengarang}</Text>

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
                  value={selectedItem.judul}
                  onChangeText={(text) =>
                    setSelectedItem({... selectedItem, judul:text})
                  }/>
                  <TextInput
                  style={styles.editCatatan}
                  value={selectedItem.pengarang}
                  onChangeText={(text) =>
                    setSelectedItem({... selectedItem, pengarang:text})
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
    fontWeight: 900,
    position: 'absolute',
    right: 75
  },
  inputJudul: {
    top: 150,
    width: 440,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 6,
  },
  inputPengarang: {
    top: 152,
    width: 440,
    height: 48,
    alignSelf: 'center',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 6,
    textAlignVertical: 'top'
  },
  simpan: {
    top: 170,
    backgroundColor: '#69adea',
    width: 440,
    alignSelf: 'center',
    height: 50,
    borderRadius: 7,
    marginTop: 0,
  },
  save: {
    textAlign: 'center',
    fontWeight: 900,
    top: 11,
    fontSize: 16,
    color: 'white'
  },
  flatlist: {
    marginTop: 180,
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
    padding: 10,
    marginVertical: 11,
    marginHorizontal: 10,
    borderRadius: 12,
    marginTop: 10,
    width: 440,
    height: 112,
    backgroundColor: '#d1d1d1'
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
    paddingVertical: 20,
    width: 100,
    right: -318,
    height: 10,
    top: -60,
    borderRadius: 7,
    marginTop: 20,
  },
  textButtonDelete: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: 5,
    left: 27
  },
  judul: {
    fontSize: 24,
    fontWeight: 900,
    top: 9,
    left: 29
  },
  pengarang: {
    fontSize: 18,
    top: 9,
    left: 29
  }
})