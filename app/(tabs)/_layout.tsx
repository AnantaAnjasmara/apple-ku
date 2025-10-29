// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Pastikan Anda sudah menginstall @expo/vector-icons

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // Warna ikon/teks saat aktif
        headerShown: false, // Sembunyikan header default
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Produk', // Judul tab
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Keranjang', // Judul tab
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}