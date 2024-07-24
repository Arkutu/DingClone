// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { getAuth } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { db } from '../firebaseConfig';
// import { updateUserProfile } from '../updateUserProfile'; // Adjust the import path

// const EditProfile = ({ navigation }) => {
//   const [newDisplayName, setNewDisplayName] = useState('');
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       Alert.alert('Permission to access camera roll is required!');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const handleSaveProfile = async () => {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;

//     try {
//       let photoURL = currentUser.photoURL;
//       if (image) {
//         const storage = getStorage();
//         const storageRef = ref(storage, `profiles/${currentUser.uid}`);
//         const img = await fetch(image);
//         const bytes = await img.blob();
//         await uploadBytes(storageRef, bytes);
//         photoURL = await getDownloadURL(storageRef);
//       }

//       await updateUserProfile(newDisplayName, photoURL);
//       Alert.alert('Profile updated successfully!');
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Error updating profile:', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ marginBottom: 50 }} />
//       <TouchableOpacity onPress={pickImage}>
//         <Image
//           source={{ uri: image || 'https://via.placeholder.com/150' }}
//           style={styles.avatar}
//         />
//         <View style={{ marginBottom: 30 }} />
//       </TouchableOpacity>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new display name"
//         placeholderTextColor="#888"
//         value={newDisplayName}
//         onChangeText={setNewDisplayName}
//       />
//       <View style={{ marginBottom: 30 }} />
//       <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
//         <Text style={styles.buttonText}>Save Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#101223',
//     padding: 16,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   input: {
//     height: 50,
//     borderColor: '#888',
//     borderWidth: 1,
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     color: '#000',
//     backgroundColor: '#FFF',
//     marginBottom: 20,
//     width: '80%',
//   },
//   button: {
//     backgroundColor: '#0d6efd',
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: 'center',
//     width: '80%',
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 18,
//   },
// });

// export default EditProfile;

//???????????????????????
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
import { getAuth, updateEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { updateUserProfile } from "../updateUserProfile"; // Adjust the import path

const EditProfile = ({ navigation }) => {
  const [newDisplayName, setNewDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      let photoURL = currentUser.photoURL;
      if (image) {
        const storage = getStorage();
        const storageRef = ref(storage, `profiles/${currentUser.uid}`);
        const img = await fetch(image);
        const bytes = await img.blob();
        await uploadBytes(storageRef, bytes);
        photoURL = await getDownloadURL(storageRef);
      }

      if (newEmail && newEmail !== currentUser.email) {
        await updateEmail(currentUser, newEmail);
      }

      const updatedProfile = {
        displayName: newDisplayName || currentUser.displayName,
        photoURL,
        email: newEmail || currentUser.email,
        gender: gender || userData.gender,
        dateOfBirth: dateOfBirth
          ? dateOfBirth.toISOString()
          : userData.dateOfBirth,
      };

      await updateUserProfile(updatedProfile);
      Alert.alert("Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error updating profile:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: image || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter new display name"
        placeholderTextColor="#888"
        value={newDisplayName}
        onChangeText={setNewDisplayName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter new email"
        placeholderTextColor="#888"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>
            {dateOfBirth ? dateOfBirth.toDateString() : "Select date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateOfBirth(selectedDate);
              }
            }}
          />
        )}
      </View>

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
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  label: {
    color: "#FFF",
    marginRight: 10,
  },
  picker: {
    height: 50,
    flex: 1,
    color: "#FFF",
    backgroundColor: "#444",
  },
  dateContainer: {
    width: "80%",
    marginBottom: 20,
  },
  dateText: {
    color: "#FFF",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#444",
    borderRadius: 25,
  },
});

export default EditProfile;
