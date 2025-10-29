// app/(tabs)/about.tsx

import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const APP_VERSION = '1.0.0'; // Anda bisa mengubah ini

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Apple.ku</Text>
          <Text style={styles.subtitle}>Platform Jual Beli Produk Apple Original</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
          <Text style={styles.sectionText}>
            Apple.ku adalah aplikasi mobile yang dirancang sebagai platform jual beli terpercaya untuk produk-produk Apple original. 
            Temukan iPhone, MacBook, iPad, AirPods, dan aksesoris resmi lainnya dengan mudah dan nyaman.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>Katalog produk Apple yang lengkap dan terupdate.</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>Keranjang belanja yang persisten (data tersimpan offline).</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>Manajemen produk untuk menambah, mengedit, dan menghapus.</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            <Text style={styles.featureText}>Dibangun dengan teknologi modern (Expo, React Native, TypeScript).</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Versi</Text>
          <Text style={styles.versionText}>v{APP_VERSION}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kontak & Dukungan</Text>
          <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL('mailto:support@apple.ku.com')}>
            <Ionicons name="mail" size={20} color="#007AFF" />
            <Text style={styles.linkText}>support@apple.ku.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL('https://www.apple.ku.com')}>
            <Ionicons name="globe" size={20} color="#007AFF" />
            <Text style={styles.linkText}>www.apple.ku.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Apple.ku. All rights reserved.</Text>
          <Text style={styles.footerText}>Made with ❤️ using Expo.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#6E6E73',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#6E6E73',
    marginLeft: 10,
    flex: 1,
  },
  versionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});