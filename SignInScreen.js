import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigation.navigate('Home');
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView behaviour="padding">
      <Text>Sign In</Text>
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
      <Button title="Sign In" onPress={handleSignIn} />
      </KeyboardAvoidingView>
    </View>
  );
}
