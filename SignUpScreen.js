import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
      navigation.navigate('Welcome');
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Create Account</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ marginBottom: 20 }}
        />
        <Button mode="contained" onPress={handleSignUp}>
          Create Account
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}
