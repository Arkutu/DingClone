import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth, storage } from "../firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc, Timestamp, where } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';

const ChatScreen = ({ route, navigation }) => {
  const { channelName, channelDescription, memberCount, recipientId, recipientName, isDirectMessage } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
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
    let q;
    if (isDirectMessage) {
      q = query(
        collection(db, 'directMessages'),
        where('senderId', 'in', [auth.currentUser.uid, recipientId]),
        where('recipientId', 'in', [auth.currentUser.uid, recipientId]),
        orderBy('createdAt', 'asc')
      );
    } else {
      q = query(collection(db, 'channels', channelName, 'messages'), orderBy('createdAt', 'asc'));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
      scrollViewRef.current?.scrollToEnd({ animated: true }); // Auto-scroll
    });

    return () => unsubscribe();
  }, [channelName, recipientId, isDirectMessage]);

  const handleSendMessage = async () => {
    if (message.trim() === '' && !image) {
      Alert.alert('Message cannot be empty.');
      return;
    }

    if (!user) {
      Alert.alert('No user is signed in.');
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        const imageRef = ref(storage, `images/${Date.now()}-${user.uid}`);
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      const messageData = {
        text: message,
        imageUrl,
        createdAt: Timestamp.now(),
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
      };

      if (isDirectMessage) {
        await addDoc(collection(db, 'directMessages'), {
          ...messageData,
          senderId: user.uid,
          recipientId: recipientId,
        });
      } else {
        await addDoc(collection(db, 'channels', channelName, 'messages'), messageData);
      }

      setMessage('');
      setImage(null);
      scrollViewRef.current?.scrollToEnd({ animated: true }); // Auto-scroll after sending message
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const getChatTitle = () => {
    if (isDirectMessage) {
      return recipientName;
    }
    return channelName;
  };

  const getMemberCount = () => {
    if (isDirectMessage) {
      return 1;
    }
    return memberCount;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <View style={{ marginBottom: 43 }} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.channelName}>{getChatTitle()}</Text>
            <Text style={styles.memberCount}>{getMemberCount()} member{getMemberCount() !== 1 ? 's' : ''}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Text><Ionicons name="add" size={24} color="#FFF" style={styles.headerIcon} /></Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text><Ionicons name="headset" size={24} color="#FFF" style={styles.headerIcon} /></Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.messageList} ref={scrollViewRef}>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageContainer,
                  msg.userId === user?.uid ? styles.myMessage : styles.otherMessage
                ]}
              >
                <Image source={{ uri: msg.userPhoto || 'https://via.placeholder.com/150' }} style={styles.avatar} />
                <View style={styles.messageContent}>
                  <Text style={styles.messageAuthor}>{msg.userName || 'User'}</Text>
                  {msg.text ? <Text style={styles.messageText}>{msg.text}</Text> : null}
                  {msg.imageUrl ? <Image source={{ uri: msg.imageUrl }} style={styles.messageImage} /> : null}
                  <Text style={styles.messageTime}>{moment(msg.createdAt.toDate()).format('h:mm A')}</Text>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.welcomeText}>Welcome!</Text>
              <Text style={styles.description}>{channelDescription}</Text>
              <View style={styles.actionItems}>
                <TouchableOpacity style={styles.actionItem}>
                  <Ionicons name="information-circle" size={24} color="#FFF" />
                  <Text style={styles.actionText}>Learn about {channelName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Ionicons name="person-add" size={24} color="#FFF" />
                  <Text style={styles.actionText}>Invite people</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Ionicons name="link" size={24} color="#FFF" />
                  <Text style={styles.actionText}>Connect apps</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handlePickImage}>
            <Text><Ionicons name="add-circle" size={28} color="#FFF" /></Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder={`Message #${channelName}`}
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Text><Ionicons name="send" size={28} color="#FFF" /></Text>
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0a0a0a',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  channelName: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  memberCount: {
    fontSize: 14,
    color: '#FFF',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2b2b2b',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginLeft: 50,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginRight: 50,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageAuthor: {
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  messageText: {
    color: '#FFF',
    marginBottom: 5,
  },
  messageImage: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 50,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  actionItems: {
    marginTop: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionText: {
    marginLeft: 10,
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: '#FFF',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default ChatScreen;
