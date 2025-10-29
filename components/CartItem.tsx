// components/CartItem.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          Rp {item.price.toLocaleString('id-ID')}
        </Text>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.removeButtonText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  productImage: {
    width: 'auto',
    resizeMode: 'cover',
    marginRight: 12,
    backgroundColor: '#F5F5F7',
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1, 
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#8E8E93',
  },
  controlsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D1D1F',
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    marginTop: 8,
  },
  removeButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartItem;