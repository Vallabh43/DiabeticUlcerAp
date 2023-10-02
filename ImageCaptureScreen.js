import React, { useState, useEffect } from 'react'; // Import useState
import { View, Text, Button, Image, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { styles } from './styles'; // Import the styles
import axios from 'axios';


export default function ImageCaptureScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    // Check and request permissions for camera and gallery
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
        const singleFile = result.assets[0];
        const url = 'http://10.184.63.26:5000/api/predict';
        const formData = new FormData();
        formData.append('my_image', {
          uri: singleFile.uri,
          name: 'my_image.jpg',
          type: 'image/jpeg',
        });
        const config = {
            headers: {
                Accept: 'application/json',
                "Cache-Control": "no-cache",
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            }
        }

        try {
          const response = await axios.post(url, formData, config);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
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
        // You can also upload the image here or pass it to your ML model for prediction
      }
    } else {
      alert('Camera access permission is required');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Image Capture</Text>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity
        style={styles.button}
        onPress={pickImageFromGallery}
      >
        <Text style={styles.buttonText}>Choose an image from gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={captureImageFromCamera}
      >
        <Text style={styles.buttonText}>Capture an image from camera</Text>
      </TouchableOpacity>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
