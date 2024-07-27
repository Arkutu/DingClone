import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebaseConfig";
import { updateUserProfile } from "../updateUserProfile";
import Toast from "react-native-toast-message";

const EditProfile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  //?
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: "#ccc",
      },
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
            <Text style={styles.textTop}>Profile</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Permission to access camera roll is required!",
      });
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
    try {
      setLoading(true);
      let photoURL = currentUser.photoURL;
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `profiles/${currentUser.uid}`);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update Firestore with the new data
      await updateUserProfile(
        currentUser.uid,
        username,
        photoURL,
        newGender,
        newDateOfBirth
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully!",
      });
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast.show({
        type: "error",
        text1: "Error updating profile:",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={pickImage}
          style={styles.imageContainer}
        >
          <Image
            source={image ? { uri: image } : require("../assets/avart.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter new display name"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter gender (male/female)"
          placeholderTextColor="#888"
          value={newGender}
          onChangeText={setNewGender}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter date of birth (YYYY-MM-DD)"
          placeholderTextColor="#888"
          value={newDateOfBirth}
          onChangeText={setNewDateOfBirth}
        />

        <View style={{ marginBottom: 30 }} />

        <Button
          title={
            loading ? (
              <ActivityIndicator size="small" color="#007bff" />
            ) : (
              "Save Profile"
            )
          }
          onPress={handleSaveProfile}
          containerStyle={styles.button}
          buttonStyle={styles.customizeButton}
          titleStyle={styles.buttonText}
          disabled={loading}
        />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  innerContainer: {
    padding: 16,
    backgroundColor: "#ccc",
    alignItems: "center",
    marginTop: 50,
  },
  textTop: {
    width: 80,
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 6,
  },
  imageContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    paddingVertical: 20,
    paddingHorizontal: 6,
  },
  input: {
    width: "100%",
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
    borderRadius: 5,
    marginBottom: 70,
    width: "100%",
  },
  customizeButton: {
    backgroundColor: "#555",
    padding: 13,
  },
  buttonText: {
    color: "#eee",
    fontSize: 17,
  },
});

export default EditProfile;
