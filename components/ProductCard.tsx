// components/ProductCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { useRouter } from 'expo-router';
import { useCartStore } from '../stores/CartStore';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number, name: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    Alert.alert("Berhasil!", `${product.name} telah ditambahkan ke keranjang.`, [{ text: "OK" }]);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.cardContent} onPress={() => router.push(`/product/${product.id}`)} activeOpacity={0.9}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Tambah ke Keranjang</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  cardContent: { padding: 16 },
  productImage: { width: '100%', height: 150, resizeMode: 'contain', backgroundColor: '#F5F5F7', borderRadius: 8, marginBottom: 15 },
  infoContainer: { marginBottom: 10 },
  category: { fontSize: 12, color: '#8E8E93', textTransform: 'uppercase', fontWeight: '600', marginBottom: 4 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#1D1D1F', marginBottom: 4 },
  price: { fontSize: 20, fontWeight: 'bold', color: '#007AFF' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, paddingBottom: 10 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5 },
  actionButtonText: { marginLeft: 5, fontSize: 14, fontWeight: '600' },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    marginTop: 0,
  },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});

export default ProductCard;