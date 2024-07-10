import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { createInvitationLink } from '../invitationUtils'; // Adjust path accordingly

const OrganizationScreen = ({ navigation }) => {
  const [organizationName, setOrganizationName] = useState('');

  const handleCreateOrganization = async () => {
    if (!organizationName) {
      Alert.alert('Please enter an organization name');
      return;
    }

    try {
      const user = auth.currentUser;

      const organizationRef = doc(db, 'organizations', organizationName);
      await setDoc(organizationRef, {
        name: organizationName,
        createdBy: user.uid,
        members: [user.uid],
        createdAt: new Date(),
      });

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        organizations: arrayUnion(organizationName),
      });

      const invitationLink = await createInvitationLink(organizationName);
      Alert.alert('Success', `Organization created successfully! Share this link to invite others: ${invitationLink}`);

      navigation.navigate('MainHome', { organizationName });

    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create Your Organization</Text>

      <View style={{ marginBottom: 120 }} />

      <TextInput
        style={styles.input}
        placeholder="Enter Organization Name"
        placeholderTextColor="#888"
        value={organizationName}
        onChangeText={setOrganizationName}
      />

      <View style={{ marginBottom: 20 }} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateOrganization}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    color: '#0d6efd',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: '#000',
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#0d6efd',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default OrganizationScreen;
