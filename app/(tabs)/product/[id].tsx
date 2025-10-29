import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProductStore } from '../../../stores/ProductStore';
import ProductFormModal from '../../../components/ProductFormModal';
import { Product } from '../../../types';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [isModalVisible, setModalVisible] = useState(false);

  const product = products.find((p) => p.id === parseInt(id, 10));

  const openEditModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleUpdate = (productData: Omit<Product, 'id'>) => {
    if (product) {
      updateProduct(product.id, productData);
      Alert.alert('Sukses', 'Produk berhasil diperbarui.');
    }
  };

  const handleDelete = () => {
    if (product) {
      Alert.alert('Hapus Produk', `Apakah Anda yakin ingin menghapus ${product.name}?`, [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => { deleteProduct(product.id); router.back(); } },
      ]);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addProduct(product);
      Alert.alert("Berhasil!", `${product.name} telah ditambahkan ke keranjang.`, [
        { text: "Lanjutkan Belanja", style: "cancel" },
        { text: "Lihat Keranjang", onPress: () => router.push('/(tabs)/cart') }
      ]);
    }
  };

  if (!product) {
    return <View style={styles.centered}><Text style={styles.errorText}>Produk tidak ditemukan.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={openEditModal} style={styles.headerButton}>
          <Ionicons name="pencil" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.headerButton}>
          <Ionicons name="trash" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
          <Text style={styles.descriptionTitle}>Deskripsi</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>

      <ProductFormModal
        visible={isModalVisible}
        product={product}
        onClose={closeModal}
        onSubmit={handleUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingHorizontal: 16, paddingBottom: 10, backgroundColor: '#fff' },
  headerButton: { padding: 8 },
  contentContainer: { paddingBottom: 20 },
  image: { width: '100%', height: 300, resizeMode: 'contain', backgroundColor: '#f5f5f7' },
  detailsContainer: { padding: 20 },
  category: { fontSize: 14, color: '#8E8E93', textTransform: 'uppercase', fontWeight: '600', marginBottom: 8 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#1D1D1F', marginBottom: 12 },
  price: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
  descriptionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1D1D1F', marginBottom: 8 },
  description: { fontSize: 16, color: '#6E6E73', lineHeight: 24 },
  footer: { paddingHorizontal: 20, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#E5E5E7' },
  addButton: { backgroundColor: '#007AFF', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: '#888' },
});