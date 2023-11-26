import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [prediction, setPrediction] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Diabetic Foot Ulcer Detector</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ImageCapture')}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Diagnose
      </Button>
      {prediction && <Text>Prediction: {prediction}</Text>}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('History')}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        View History
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
