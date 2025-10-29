// app/(tabs)/index.tsx

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProductStore } from '../../stores/ProductStore'; // Pastikan nama file store benar
import ProductCard from '../../components/ProductCard';
import ProductFormModal from '../../components/ProductFormModal';
import { Product } from '../../types';

export default function HomeScreen() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  
  // State untuk mengontrol visibilitas modal
  const [isModalVisible, setModalVisible] = useState(false);
  
  // State untuk menyimpan produk yang sedang diedit. DIISI DENGAN NULL untuk mode tambah.
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- Fungsi untuk Modal ---
  const openAddModal = () => {
    setEditingProduct(null); // Set ke null untuk mode tambah
    setModalVisible(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product); // Set produk untuk mode edit
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    // Beri jeda kecil sebelum mereset state untuk menghindari "flicker"
    setTimeout(() => setEditingProduct(null), 300);
  };

  const handleSubmit = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      // Mode Edit: panggil fungsi updateProduct dari store
      updateProduct(editingProduct.id, productData);
      Alert.alert('Sukses', 'Produk berhasil diperbarui.');
    } else {
      // Mode Tambah: panggil fungsi addProduct dari store
      addProduct(productData);
      Alert.alert('Sukses', 'Produk berhasil ditambahkan.');
    }
    // Modal akan ditutup oleh ProductFormModal setelah onSubmit dipanggil
  };

  // --- Fungsi untuk Aksi Produk ---
  const handleDelete = (productId: number, productName: string) => {
    Alert.alert('Hapus Produk', `Apakah Anda yakin ingin menghapus ${productName}?`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => deleteProduct(productId) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Apple.ku</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* 
        Komponen Modal.
        Saya menyesuaikan nama prop dengan yang Anda gunakan:
        - `visible` -> `isVisible`
        - `product` -> `initialProduct`
      */}
      <ProductFormModal
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleSubmit}
        product={editingProduct}
      />
    </View>
  );
}

// --- STYLE SHEET ---
// Letakkan ini di bagian paling bawah file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7', // Warna abu-abu terang khas Apple
    marginTop: 50
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1d1d1f',
  },
  addButton: {
    backgroundColor: '#007aff', // Biru khas Apple
    borderRadius: 20, // Membuatnya bulat
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});