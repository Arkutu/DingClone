// InviteLinkScreen.js
import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { handleInvitationLink } from "../invitationUtils"; // Ensure the path is correct
import { getAuth } from "firebase/auth";

const InviteLinkScreen = ({ navigation }) => {
  const [inviteLink, setInviteLink] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: { backgroundColor: "#ccc" },
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 13 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.leftIconContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-sharp" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View>
            <Text style={styles.textTop}>Link</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  const handleJoinOrganization = async () => {
    if (!inviteLink) {
      Alert.alert("Please enter an organization link");
      return;
    }

    setButtonLoading(true);
    try {
      const linkId = inviteLink.replace("officecomms://join/", "").trim();
      console.log("Extracted link ID:", linkId); // Debug log

      const auth = getAuth();
      const userId = auth.currentUser.uid;

      const { organizationName, linkId: id } = await handleInvitationLink(
        linkId,
        userId
      );
      setButtonLoading(false);
      // navigation.navigate("MainHome", { organizationName, linkId: id });
      navigation.navigate("ExistingOrganizations", {
        organizationName,
        linkId: id,
      });
    } catch (error) {
      setButtonLoading(false);
      console.error("Error handling invitation link:", error); // Debug log
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Join Organization</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter invite link"
            value={inviteLink}
            onChangeText={setInviteLink}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={handleJoinOrganization}
          >
            {buttonLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Join organization</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    marginTop: 130,
  },
  textTop: {
    fontSize: 25,
    fontWeight: "600",
    color: "#555",
    marginRight: 14,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    color: "#eee",
    textAlign: "center",
    marginBottom: 50,
  },
  inputContainer: {
    paddingVertical: 20,
    paddingHorizontal: 6,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eee",
    paddingHorizontal: 10,
    color: "#333",
    backgroundColor: "#eee",
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
  button: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#555",
    backgroundColor: "#555",
    padding: 13,
    alignItems: "center",
  },
  buttonText: {
    color: "#eee",
    fontSize: 17,
  },
});

export default InviteLinkScreen;
