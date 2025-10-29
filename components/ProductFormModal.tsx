// components/ProductFormModal.tsx

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Product } from '../types';
import ImagePickerComponent from './ImagePicker'; // 1. Impor komponen baru

interface ProductFormModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ visible, product, onClose, onSubmit }) => {
  // State untuk form tetap sama
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); // State ini akan menyimpan URI gambar
  const [description, setDescription] = useState('');

  // useEffect untuk mengisi form saat mode edit
  useEffect(() => {
    if (visible) {
      if (product) {
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price.toString());
        setImage(product.image); // Isi dengan URI gambar dari produk
        setDescription(product.description);
      } else {
        // Kosongkan form untuk mode tambah
        setName('');
        setCategory('');
        setPrice('');
        setImage('');
        setDescription('');
      }
    }
  }, [visible, product]);

  const handleSubmit = () => {
    // Validasi tetap sama, tidak perlu validasi URL lagi
    if (!name || !category || !price || !image || !description) {
      Alert.alert('Error', 'Semua field harus diisi.');
      return;
    }

    const productData = {
      name,
      category,
      price: parseFloat(price),
      image, // Kirim URI gambar yang dipilih
      description,
    };

    onSubmit(productData);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</Text>
          
          {/* 2. Ganti TextInput untuk URL Gambar dengan ImagePickerComponent */}
          <ImagePickerComponent imageUri={image} onImagePicked={setImage} />
          
          <TextInput style={styles.input} placeholder="Nama Produk" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Kategori" value={category} onChangeText={setCategory} />
          <TextInput style={styles.input} placeholder="Harga" value={price} onChangeText={setPrice} keyboardType="numeric" />
          
          {/* Hapus TextInput untuk URL Gambar yang lama */}
          
          <TextInput style={[styles.input, styles.textArea]} placeholder="Deskripsi" value={description} onChangeText={setDescription} multiline />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Style tidak perlu banyak perubahan, cukup hapus style untuk input yang sudah dihapus
const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 25, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, fontSize: 16, borderRadius: 8, marginBottom: 15, width: '100%', backgroundColor: '#fff' },
  textArea: { height: 80 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
  button: { padding: 12, borderRadius: 8, width: '45%' },
  submitButton: { backgroundColor: '#007AFF' },
  cancelButton: { backgroundColor: '#8E8E93' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default ProductFormModal;