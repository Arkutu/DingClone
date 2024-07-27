import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";

const UserInfo = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const skipForNow = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "MainTabs",
            state: {
              routes: [{ name: "MainHome" }],
            },
          },
        ],
      })
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: { backgroundColor: "#ccc" },
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.textTopContainer}
          onPress={skipForNow}
        >
          <Text style={styles.textTop}>Skip</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSaveProfile = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    try {
      setLoading(true);
      let photoURL = null;
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `profiles/${currentUser.uid}`);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);
        photoURL = await getDownloadURL(storageRef);
      }

      const userData = {
        displayName: username,
        photoURL: photoURL,
      };

      await setDoc(doc(db, "users", currentUser.uid), userData);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile setup successfully!",
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "MainTabs",
              state: {
                routes: [{ name: "MainHome" }],
              },
            },
          ],
        })
      );
    } catch (error) {
      console.error("Error setting up profile:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          <Image
            source={image ? { uri: image } : require("../assets/avart.png")}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <Button
          title={
            loading ? (
              <ActivityIndicator size="small" color="#007bff" />
            ) : (
              "Save"
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
    flex: 1,
    backgroundColor: "#ccc",
    padding: 20,
    alignItems: "center",
    marginTop: 90,
  },
  textTopContainer: {
    width: 80,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#007bff",
    backgroundColor: "#007bff",
    padding: 5,
    alignItems: "center",
    marginRight: 10,
  },
  textTop: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  imageContainer: {
    borderColor: "#fff",
    backgroundColor: "#fff",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginBottom: 30,
  },
  button: {
    width: "100%",
    borderRadius: 5,
    marginBottom: 70,
  },
  customizeButton: {
    backgroundColor: "#007bff",
    height: 45,
  },
  buttonText: {
    color: "#eee",
    fontSize: 17,
  },
});

export default UserInfo;
