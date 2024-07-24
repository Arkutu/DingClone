import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { createInvitationLink } from "../invitationUtils"; // Adjust path accordingly

const OrganizationScreen = ({ navigation }) => {
  const [organizationName, setOrganizationName] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: {
        backgroundColor: "#ccc",
      },
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
            <Text style={styles.textTop}>Organization</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  const handleCreateOrganization = async () => {
    if (!organizationName) {
      Alert.alert("Please enter an organization name");
      return;
    }

    setButtonLoading(true);
    try {
      const user = auth.currentUser;

      const organizationRef = doc(db, "organizations", organizationName);
      await setDoc(organizationRef, {
        name: organizationName,
        createdBy: user.uid,
        members: [user.uid],
        createdAt: new Date(),
      });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        organizations: arrayUnion(organizationName),
      });

      const invitationLink = await createInvitationLink(organizationName);
      Alert.alert(
        "Success",
        `Organization created successfully! Share this link to invite others: ${invitationLink}`
      );

      setButtonLoading(false); // Stop loading
      // navigation.navigate("MainHome", { organizationName });
      navigation.navigate("ExistingOrganizations", { organizationName });
    } catch (error) {
      setButtonLoading(false); // Stop loading
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Your Organization</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Organization Name"
            placeholderTextColor="#888"
            value={organizationName}
            onChangeText={setOrganizationName}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={handleCreateOrganization}
          >
            {buttonLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Create organization</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    width: 80,
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
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
    height: 50,
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

export default OrganizationScreen;
