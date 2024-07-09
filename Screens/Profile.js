import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              email: currentUser.email,
              displayName: userData.displayName || currentUser.displayName,
              photoURL: userData.photoURL || currentUser.photoURL,
            });
          } else {
            setUser({
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.error('No user is signed in.');
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }} />
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: user.photoURL || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.displayName || 'User Name'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{user.email}</Text>
      </View>
      <View style={{ marginBottom: 380 }} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101223',
    padding: 16,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    color: '#FFF',
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

export default Profile;
