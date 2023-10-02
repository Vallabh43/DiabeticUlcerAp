import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () =>  {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //await createUserWithEmailAndPassword(auth, "email@gmail.com", "password");
      alert('Registration successful!');
      navigation.navigate('Welcome');
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView behaviour="padding">
      <Text>Create Account</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Create Account" onPress={handleSignUp} />
      </KeyboardAvoidingView>
    </View>
  );
}
