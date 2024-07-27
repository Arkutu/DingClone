import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { db, auth, storage } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const ChatScreen = ({ route, navigation }) => {
  const {
    channelName,
    channelDescription,
    memberCount,
    recipientId,
    recipientName,
    isDirectMessage,
  } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => (
        <View>
          <TouchableOpacity
            style={styles.leftContainer}
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />

            <View style={styles.leftTextContainer}>
              <Text style={styles.channelName}>{getChatTitle()}</Text>
              <Text style={styles.memberCount}>
                {getMemberCount()} member{getMemberCount() !== 1 ? "s" : ""}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.rightContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate()}
          >
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="black"
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
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
        collection(db, "directMessages"),
        where("senderId", "in", [auth.currentUser.uid, recipientId]),
        where("recipientId", "in", [auth.currentUser.uid, recipientId]),
        orderBy("createdAt", "asc")
      );
    } else {
      q = query(
        collection(db, "channels", channelName, "messages"),
        orderBy("createdAt", "asc")
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => unsubscribe();
  }, [channelName, recipientId, isDirectMessage]);

  const handleSendMessage = async () => {
    if (message.trim() === "" && !image) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Message cannot be empty!",
      });
      return;
    }

    if (!user) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No user is signed in!",
      });
      return;
    }

    try {
      setLoading(true);
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
        await addDoc(collection(db, "directMessages"), {
          ...messageData,
          senderId: user.uid,
          recipientId: recipientId,
        });
      } else {
        await addDoc(
          collection(db, "channels", channelName, "messages"),
          messageData
        );
      }

      setMessage("");
      setImage(null);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error sending message: ",
        error,
      });
    } finally {
      setLoading(false);
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <ScrollView style={styles.messageList} ref={scrollViewRef}>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageContainer,
                  msg.userId === user?.uid
                    ? styles.myMessage
                    : styles.otherMessage,
                ]}
              >
                <Image
                  source={{
                    uri: msg.userPhoto || "https://via.placeholder.com/150",
                  }}
                  style={styles.avatar}
                />
                <View style={styles.messageContent}>
                  <Text
                    style={[
                      styles.messageAuthor,
                      {
                        color: msg.userId === user?.uid ? "#fff" : "#555",
                      },
                    ]}
                  >
                    {msg.userName || "Anonymous"}
                  </Text>
                  {msg.text ? (
                    <Text
                      style={[
                        styles.messageText,
                        {
                          color: msg.userId === user?.uid ? "#fff" : "#555",
                        },
                      ]}
                    >
                      {msg.text}
                    </Text>
                  ) : null}
                  {msg.imageUrl ? (
                    <Image
                      source={{ uri: msg.imageUrl }}
                      style={styles.messageImage}
                    />
                  ) : null}
                  <Text style={styles.messageTime}>
                    {moment(msg.createdAt.toDate()).format("h:mm A")}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.welcomeText}>Welcome!</Text>
              <Text style={styles.description}>{channelDescription}</Text>

              <View style={styles.actionItems}>
                <TouchableOpacity style={styles.actionItem}>
                  <Ionicons name="information-circle" size={24} color="#333" />
                  <Text style={styles.actionText}>
                    Learn about {channelName}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem}>
                  <Ionicons name="person-add" size={24} color="#333" />
                  <Text style={styles.actionText}>Invite people</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem}>
                  <Ionicons name="link" size={24} color="#333" />
                  <Text style={styles.actionText}>Connect apps</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handlePickImage}>
            <Text>
              <Ionicons name="add-circle" size={28} color="#333" />
            </Text>
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
            <Text>
              <Ionicons name="send" size={28} color="#333" />
            </Text>
          </TouchableOpacity>
        </View>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  leftContainer: {
    marginLeft: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  leftTextContainer: {
    marginLeft: 10,
  },
  channelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  memberCount: {
    fontSize: 14,
    color: "#555",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#2f3542",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginLeft: 50,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#dfe4ea",
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
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    marginBottom: 5,
  },
  messageImage: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
    color: "#555",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  actionItems: {
    marginTop: 5,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  actionText: {
    marginLeft: 10,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#212121",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: "#333",
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default ChatScreen;
