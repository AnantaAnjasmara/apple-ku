import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CartItem from '../../components/CartItem';
import { useCartStore } from '../../stores/CartStore';

export default function CartScreen() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    Alert.alert(
      'Checkout Berhasil',
      `Total pembayaran Anda: Rp ${totalPrice.toLocaleString('id-ID')}`,
      [{ text: 'OK', onPress: () => clearCart() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Keranjang Belanja</Text>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>Keranjang Anda kosong.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: Rp {totalPrice.toLocaleString('id-ID')}
            </Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', marginTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff' },
  totalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  checkoutButton: { backgroundColor: '#34C759', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});