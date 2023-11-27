import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { FIREBASE_RTDB, FIREBASE_AUTH } from './FirebaseConfig';
import { getDatabase, ref, child, push, update } from "firebase/database";


export default function ResultScreen({ navigation, route }) {
  const { diagnosisResult } = route.params;
  const [imageSource, setImageSource] = useState(null);

  const saveToDatabase = (prediction) => {
    const timestamp = Date.now();
    const user = FIREBASE_AUTH.currentUser;

    // Assuming diagnosisResult has the base64 encoded image in the 'imageBase64' field
    const { imageBase64 } = diagnosisResult;

    setImageSource({ uri: `data:image/jpeg;base64,${imageBase64}` });

    // Rest of the database save logic
    push(ref(FIREBASE_RTDB, `user_predictions/${user.uid}`), {
      prediction,
      timestamp,
    });
  };

  useEffect(() => {
    if (diagnosisResult) {
      saveToDatabase(diagnosisResult.prediction);
    }
  }, [diagnosisResult]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <Card style={{ width: '80%' }}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Title style={{ fontSize: 24, marginBottom: 10 }}>Diagnosis Result</Title>
          {imageSource && <Image source={imageSource} style={{ width: 200, height: 200, marginBottom: 10 }} />}
          <Paragraph style={{ fontSize: 18, marginBottom: 20 }}>
            Result: {diagnosisResult ? diagnosisResult.prediction : 'No prediction available'}
          </Paragraph>
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'center', marginTop: 20 }}>
          <Button mode="contained" onPress={() => navigation.navigate('Home')}>
            Back to Home
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
