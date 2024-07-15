import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CreateOrganization = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>OfficeComms</Text>

      <View style={{ marginBottom: 120 }} />

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Create Organization</Text>
        <Text style={styles.welcomeSubtitle}>Get started with creating your organization</Text>

        <View style={{ marginBottom: 1 }} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrganizationScreen')}>
            <Text style={styles.buttonText}>Create New Organization</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExistingOrganizations')}>
            <Text style={styles.buttonText}>Existing Organizations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InviteLinkScreen')}>
            <Text style={styles.buttonText}>Invite Link</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 50,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  welcomeContainer: {
    backgroundColor: '#101223',
    borderRadius: 35,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    height: '50%',
    marginBottom: -300,
  },
  welcomeTitle: {
    fontSize: 24,
    color: '#0d6efd',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#0d6efd',
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default CreateOrganization;
