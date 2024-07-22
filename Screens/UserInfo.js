import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebaseConfig";
//import { updateUserProfile } from "../updateUserProfile"; // Adjust the import path
import { UserInfo } from "firebase/auth";

const UserInformation = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!displayName) {
      Alert.alert("Display name cannot be empty");
      return;
    }

    try {
      let photoURL = currentUser.photoURL;
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `profiles/${currentUser.uid}`);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateUserProfile(displayName, photoURL);
      Alert.alert("Profile setup successfully!");
      navigation.navigate("MainAppScreen"); // Navigate to the main screen of your app
    } catch (error) {
      console.error("Error setting up profile:", error);
      Alert.alert("Error setting up profile:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50 }} />
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: image || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <View style={{ marginBottom: 30 }} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter display name"
        placeholderTextColor="#888"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <View style={{ marginBottom: 30 }} />
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101223",
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: "#000",
    backgroundColor: "#FFF",
    marginBottom: 20,
    width: "80%",
  },
  button: {
    backgroundColor: "#0d6efd",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default UserInformation;
