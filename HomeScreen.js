import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [prediction, setPrediction] = useState(null);

  return (
    <View>
      <Text>Welcome to Diabetic Foot Ulcer Detector</Text>
      <Button
        title="Diagnose"
        onPress={() => navigation.navigate('ImageCapture')}
      />
      {prediction && <Text>Prediction: {prediction}</Text>}
      <Button title="View History" onPress={() => navigation.navigate('History')} />
    </View>
  );
}
