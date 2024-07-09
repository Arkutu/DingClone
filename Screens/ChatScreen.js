import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';

const ChatScreen = ({ route, navigation }) => {
  const { channelName, channelDescription, memberCount } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const scrollViewRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: currentUser.uid,
            displayName: userData.displayName || currentUser.displayName,
            photoURL: userData.photoURL || currentUser.photoURL,
          });
        }
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUser();
      }
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'channels', channelName, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, [channelName]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      Alert.alert('Message cannot be empty.');
      return;
    }

    if (!user) {
      Alert.alert('No user is signed in.');
      return;
    }

    try {
      await addDoc(collection(db, 'channels', channelName, 'messages'), {
        text: message,
        createdAt: new Date(),
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
      });
      setMessage('');
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={styles.channelName}>{channelName}</Text>
            <Text style={styles.channelDescription}>{channelDescription}</Text>
          </View>
        </View>
        <ScrollView style={styles.messageList} ref={scrollViewRef}>
          {messages.map((msg) => (
            <View key={msg.id} style={styles.messageContainer}>
              <Image source={{ uri: msg.userPhoto || 'https://via.placeholder.com/150' }} style={styles.avatar} />
              <View style={styles.messageContent}>
                <Text style={styles.messageAuthor}>{msg.userName || 'User'}</Text>
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101223',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#1a1a2e',
  },
  channelName: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  channelDescription: {
    fontSize: 14,
    color: 'gray',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    backgroundColor: '#1a1a2e',
    padding: 10,
    borderRadius: 10,
  },
  messageAuthor: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#333',
    marginRight: 10,
  },
});

export default ChatScreen;
