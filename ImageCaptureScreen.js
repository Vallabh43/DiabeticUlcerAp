import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import axios from 'axios';

export default function ImageCaptureScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'ios') {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(status === 'granted');

        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      } else {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

        setHasCameraPermission(cameraStatus.status === 'granted');
        setHasGalleryPermission(galleryStatus.status === 'granted');
      }
    })();
  }, []);

  const diagnose = async (result) => {
    const singleFile = result.assets[0];
    const url = 'http://10.184.62.197:5000/api/predict';
    const formData = new FormData();
    formData.append('my_image', {
      uri: singleFile.uri,
      name: 'my_image.jpg',
      type: 'image/jpeg',
    });
    const config = {
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const pickImageFromGallery = async () => {
    if (hasGalleryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const diagResult = await diagnose(result);
        navigation.navigate('Result', { diagnosisResult: diagResult });
      }
    } else {
      alert('Gallery access permission is required');
    }
  };

  const captureImageFromCamera = async () => {
    if (hasCameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const diagResult = await diagnose(result);
        navigation.navigate('Result', { diagnosisResult: diagResult });
      }
    } else {
      alert('Camera access permission is required');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Image Capture</Text>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
      <Button
        mode="contained"
        onPress={pickImageFromGallery}
        style={{ width: 250, marginBottom: 10 }}
        labelStyle={{ fontSize: 16 }}
      >
        Choose Image
      </Button>
      <Button
        mode="contained"
        onPress={captureImageFromCamera}
        style={{ width: 250, marginBottom: 10 }}
        labelStyle={{ fontSize: 16 }}
      >
        Capture Image
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Home')}
        style={{ width: 250 }}
        labelStyle={{ fontSize: 16 }}
      >
        Back to Home
      </Button>
    </View>
  );
}
