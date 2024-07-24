import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserContext } from "../context/UserContext";
import { StatusBar } from "expo-status-bar";

const CreateChannel = ({ navigation }) => {
  const [channelName, setChannelName] = useState("");
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: {
        backgroundColor: "#ccc",
      },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 13 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-sharp" size={28} color="#333" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <Text style={styles.textTop}>Channel</Text>
        </View>
      ),
    });
  }, [navigation]);

  const handleCreateChannel = async (visibility) => {
    const newChannel = {
      name: channelName,
      visibility,
      members: visibility === "Private" ? [user.uid] : [],
      createdAt: Timestamp.now(),
    };
    await addDoc(collection(db, "channels"), newChannel);
    navigation.navigate("ChannelBrowser");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.innerContainer}>
        <Text style={styles.helperText}>
          Channels are where conversations happen around a topic. Use a name
          that’s easy to find and understand.
        </Text>

        <Text style={styles.title}>Channel Name</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="e.g. project-pigeon"
            value={channelName}
            onChangeText={setChannelName}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.nextContainer}
          onPress={() =>
            navigation.navigate("ChannelVisibility", { channelName })
          }
        >
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  textTop: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  nextContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#555",
    backgroundColor: "#555",
    padding: 13,
    alignItems: "center",
    marginBottom: 10,
  },
  nextButton: {
    color: "#eee",
    fontSize: 17,
  },
  title: {
    fontSize: 24,
    color: "#eee",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    backgroundColor: "#eee",
    padding: 10,
    color: "#333",
    marginBottom: 20,
  },
  helperText: {
    color: "#888",
    fontSize: 14,
  },
});

export default CreateChannel;
