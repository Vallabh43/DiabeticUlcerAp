import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { FIREBASE_RTDB, FIREBASE_AUTH } from './FirebaseConfig'; // Import your Firebase RTDB configuration
import { getDatabase, ref, child, push, update } from "firebase/database";

export default function ResultScreen({ navigation, route }) {
  const { diagnosisResult } = route.params;

  // Function to save prediction and timestamp to Firebase Realtime Database
  const saveToDatabase = (prediction) => {
    const timestamp = Date.now(); // Get current timestamp
    const user = FIREBASE_AUTH.currentUser; // Assuming you have a current user

    // Push the prediction and timestamp to the database
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
          <Paragraph style={{ fontSize: 18, marginBottom: 20 }}>
            Result: {diagnosisResult ? diagnosisResult.prediction : 'No prediction available'}
          </Paragraph>
          {/* Display additional information if needed */}
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
