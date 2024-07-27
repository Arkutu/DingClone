import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { isSpeakingAsync, speak, stop } from "expo-speech";
import { Entypo, Ionicons } from "@expo/vector-icons";

const Aichat = ({ navigation }) => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyAKO5xm26DgKh0N_r74_12T4qhjB0VVDX8";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerLeft: () => (
        <View style={styles.leftIconContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-sharp" size={26} color="#333" />
          </TouchableOpacity>

          <Text style={styles.textTop}>My AI</Text>
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

  const handleUserInput = async () => {
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
      console.log("Gemini Pro API Response:", response.data);

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        // Add model response
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Error calling Gemini Pro API:", error);
      console.error("Error response:", error.response);
      setError("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    try {
      if (isSpeaking) {
        stop();
        setIsSpeaking(false);
      } else {
        const speaking = await isSpeakingAsync();
        if (!speaking) {
          speak(text);
          setIsSpeaking(true);
        }
      }
    } catch (error) {
      console.error("Error with speech synthesis:", error);
    }
  };

  const renderChatItem = ({ item }) => (
    <View style={item.role === "user" ? styles.userMessage : styles.aiMessage}>
      <Text style={styles.messageText}>{item.parts[0].text}</Text>
      <TouchableOpacity onPress={() => handleSpeech(item.parts[0].text)}>
        <Ionicons name="volume-high" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.innerContainer}
        source={require("../assets/ocicon.png")}
        resizeMode="contain"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <FlatList
            data={chat}
            renderItem={renderChatItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.chatContainer}
          />
          {loading && <ActivityIndicator style={styles.loading} color="#333" />}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Chat"
              placeholderTextColor="#888"
              value={userInput}
              onChangeText={setUserInput}
              onSubmitEditing={handleUserInput}
            />
            <TouchableOpacity onPress={handleUserInput}>
              <Ionicons name="send" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Aichat;

const styles = StyleSheet.create({
  leftIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  textTop: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    color: "#333",
  },
  keyboard: {
    flex: 1,
    justifyContent: "flex-end",
  },
  loading: {
    marginTop: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageText: {
    color: "#333",
    fontSize: 16,
  },
});
