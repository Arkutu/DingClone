import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const ExistingOrganizations = ({ navigation }) => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const user = auth.currentUser;
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.organizations) {
            setOrganizations(userData.organizations);
          } else {
            setOrganizations([]);
          }
        }
      } catch (error) {
        Alert.alert('Error fetching organizations', error.message);
      }
    };

    fetchOrganizations();
  }, []);

  return (
   <View style={styles.container}>
      <Text style={styles.title}>Existing Organizations</Text>
      <FlatList
        data={organizations}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.organizationItem}
            onPress={() => navigation.navigate('MainHome', { organizationName: item })}
          >
            <Text style={styles.organizationText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 60,
  },
  title: {
    fontSize: 24,
    color: '#0d6efd',
    textAlign: 'center',
    marginBottom: 20,
  },
  organizationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  organizationText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ExistingOrganizations;
