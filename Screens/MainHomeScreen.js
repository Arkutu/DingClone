import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure firebaseConfig.js is set up correctly

const MainHomeScreen = ({ route, navigation }) => {
  const { organizationName } = route.params || {};
  const [searchText, setSearchText] = useState('');
  const [channels, setChannels] = useState([
    { name: 'general', description: 'General is a messaging app for groups of people who work together. You can send updates, share files, and organize conversations so that everyone is in the loop.' },
    { name: 'meeting', description: 'Meeting channel for discussing various topics and holding meetings.' },
    { name: 'random', description: 'Random channel for off-topic discussions and fun.' },
  ]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const addChannel = (name, description) => {
    setChannels([...channels, { name, description }]);
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.log('No user data found!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const firstLetter = organizationName ? organizationName.charAt(0).toUpperCase() : '';

  const getActiveRoute = () => navigation.getState().routes[navigation.getState().index].name;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0d6efd" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={{ marginBottom: 40 }} />
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>{firstLetter}</Text>
                </View>
                <Text style={styles.headerTitle}>{organizationName}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  {user && user.photoURL ? (
                    <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
                  ) : (
                    <Ionicons name="person-circle" size={40} color="#FFF" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Jump to or search..."
                  placeholderTextColor="#888"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
            </View>

            <ScrollView style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Workspace</Text>
                {channels.map((channel, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.channelItem}
                    onPress={() => navigation.navigate('Chat', { channelName: channel.name, channelDescription: channel.description })}
                  >
                    <Text style={styles.channelText}># {channel.name}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.addChannel}
                  onPress={() => navigation.navigate('ChannelBrowser', { addChannel })}
                >
                  <Text style={styles.addChannelText}>+ Add channel</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Direct messages</Text>
                <TouchableOpacity style={styles.channelItem} onPress={() => navigation.navigate('Chat', { channelName: `${user?.displayName} (you)`, channelDescription: 'Direct messages with yourself.' })}>
                  <Text style={styles.channelText}>{user?.displayName} (you)</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.suggestion}>
                <Text style={styles.suggestionText}>Next, you could...</Text>
                <TouchableOpacity style={styles.suggestionButton}>
                  <Text style={styles.suggestionButtonText}>Add teammates</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color={getActiveRoute() === 'Home' ? '#0d6efd' : '#FFF'} />
          <Text style={getActiveRoute() === 'Home' ? styles.navTextActive : styles.navTextInactive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('OfficeScreen', { organizationName })}>
          <MaterialCommunityIcons name="office-building" size={28} color={getActiveRoute() === 'OfficeScreen' ? '#0d6efd' : '#FFF'} />
          <Text style={getActiveRoute() === 'OfficeScreen' ? styles.navTextActive : styles.navTextInactive}>Office</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Activity')}>
          <Ionicons name="notifications" size={28} color={getActiveRoute() === 'Activity' ? '#0d6efd' : '#FFF'} />
          <Text style={getActiveRoute() === 'Activity' ? styles.navTextActive : styles.navTextInactive}>Activity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072d',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00072d',
  },
  headerContainer: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#0d6efd',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFF',
    paddingVertical: 10,
    flex: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b2b40',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  channelItem: {
    paddingVertical: 10,
  },
  channelText: {
    color: '#FFF',
    fontSize: 16,
  },
  addChannel: {
    paddingVertical: 10,
  },
  addChannelText: {
    color: '#0d6efd',
    fontSize: 16,
  },
  suggestion: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  suggestionText: {
    color: '#888',
    marginBottom: 10,
  },
  suggestionButton: {
    backgroundColor: '#1a1a2e',
    padding: 10,
    borderRadius: 10,
  },
  suggestionButtonText: {
    color: '#0d6efd',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navTextActive: {
    color: '#0d6efd',
    fontSize: 12,
  },
  navTextInactive: {
    color: '#888',
    fontSize: 12,
  },
});

export default MainHomeScreen;
