import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from '../firebaseConfig';  // Ensure the path is correct to your Firebase config file

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Enter email and password');
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous",
          photoURL: user.photoURL || "",
          lastLogin: new Date(),
        }, { merge: true });

        Alert.alert('Success', 'Login successful!');
        navigation.navigate('CreateOrganization'); // Navigate to CreateOrganization
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Update user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
        lastLogin: new Date(),
      }, { merge: true });

      Alert.alert('Success', 'Login successful!');
      navigation.navigate('CreateOrganization'); // Navigate to CreateOrganization
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const goBack = () => {
    const from = route.params?.from || 'Welcome';
    navigation.navigate(from);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={24} color="white" onPress={goBack} style={styles.icon} />
      <Text style={styles.headerText}>Login to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={"gray"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.signInContainer}>
        <View style={styles.line} />
        <Text style={styles.signInText}>or sign in with</Text>
        <View style={styles.line} />
      </View>
      <Pressable style={styles.iconButton} onPress={handleGoogleSignIn}>
        <Ionicons name="logo-google" size={30} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#101223',
  },
  icon: {
    marginTop: 40,
    marginBottom: 50,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 18,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 50,
    marginBottom: 50,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    marginBottom: 16,
  },
  line: {
    width: 70,
    height: 1,
    backgroundColor: 'gray',
  },
  signInText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'gray',
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 150,
  },
});

export default LoginScreen;
