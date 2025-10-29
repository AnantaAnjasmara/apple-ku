import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@react-navigation/elements';

interface ImagePickerProps {
  imageUri: string | null;
  onImagePicked: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({ imageUri, onImagePicked }) => {
  
  const pickImage = async () => {
    // Meminta izin terlebih dahulu
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Izin Diperlukan", "Maaf, kami memerlukan izin untuk mengakses galeri foto Anda!");
      return;
    }

    // Buka image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="camera" size={40} color="#ccc" />
          <Text style={styles.placeholderText}>Pilih Gambar</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#888',
  },
});

export default ImagePickerComponent;