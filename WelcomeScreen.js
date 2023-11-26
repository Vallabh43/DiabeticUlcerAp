import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 32, marginBottom: 20, fontWeight: 'bold', color: '#007AFF' }}>
        Welcome to Diabetic Foot Ulcer Detector
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('SignIn')}
        style={{ marginBottom: 20, width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}
        labelStyle={{ fontSize: 18 }}
      >
        Sign In
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('SignUp')}
        style={{ width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}
        labelStyle={{ fontSize: 18 }}
      >
        Create Account
      </Button>
    </View>
  );
}
