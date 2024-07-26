// import React, { useState, useLayoutEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { getAuth } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db } from "../firebaseConfig";
// import { updateUserProfile } from "../updateUserProfile"; // Adjust the import path

// const EditProfile = ({ navigation }) => {
//   const [newDisplayName, setNewDisplayName] = useState("");
//   const [image, setImage] = useState(null);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitleStyle: {
//         color: "#ccc",
//       },
//       headerStyle: { backgroundColor: "#ccc" },
//       headerLeft: () => {
//         return (
//           <View style={{ marginLeft: 13 }}>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               style={styles.leftIconContainer}
//               onPress={() => navigation.goBack()}
//             >
//               <Ionicons name="chevron-back-sharp" size={28} color="#333" />
//             </TouchableOpacity>
//           </View>
//         );
//       },
//       headerRight: () => {
//         return (
//           <View>
//             <Text style={styles.textTop}>Profile</Text>
//           </View>
//         );
//       },
//     });
//   }, [navigation]);

//   const pickImage = async () => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       Alert.alert("Permission to access camera roll is required!");
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
//       Alert.alert("Profile updated successfully!");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error updating profile:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ marginBottom: 50 }} />
//       <TouchableOpacity onPress={pickImage}>
//         <Image
//           source={{ uri: image || "https://via.placeholder.com/150" }}
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
//     backgroundColor: "#ccc",
//     padding: 16,
//     alignItems: "center",
//   },
//   textTop: {
//     width: 80,
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#555",
//     marginRight: 6,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   input: {
//     height: 50,
//     borderColor: "#888",
//     borderWidth: 1,
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     color: "#000",
//     backgroundColor: "#FFF",
//     marginBottom: 20,
//     width: "80%",
//   },
//   button: {
//     backgroundColor: "#0d6efd",
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: "center",
//     width: "80%",
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 18,
//   },
// });

// export default EditProfile;

//???????? NOw Trying ?????????????
// import React, { useState, useLayoutEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { getAuth } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { updateUserProfile } from "../updateUserProfile"; // Adjust the import path

// const EditProfile = ({ navigation }) => {
//   const [newDisplayName, setNewDisplayName] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newGender, setNewGender] = useState("");
//   const [newDateOfBirth, setNewDateOfBirth] = useState("");
//   const [image, setImage] = useState(null);

//   const auth = getAuth();
//   const currentUser = auth.currentUser;

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitleStyle: {
//         color: "#ccc",
//       },
//       headerStyle: { backgroundColor: "#ccc" },
//       headerLeft: () => (
//         <View style={{ marginLeft: 13 }}>
//           <TouchableOpacity
//             activeOpacity={0.5}
//             style={styles.leftIconContainer}
//             onPress={() => navigation.goBack()}
//           >
//             <Ionicons name="chevron-back-sharp" size={28} color="#333" />
//           </TouchableOpacity>
//         </View>
//       ),
//       headerRight: () => (
//         <View>
//           <Text style={styles.textTop}>Profile</Text>
//         </View>
//       ),
//     });
//   }, [navigation]);

//   const pickImage = async () => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       Alert.alert("Permission to access camera roll is required!");
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

//       await updateUserProfile(newDisplayName, photoURL, newEmail, newGender, newDateOfBirth);
//       Alert.alert("Profile updated successfully!");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error updating profile:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ marginBottom: 50 }} />
//       <TouchableOpacity onPress={pickImage}>
//         <Image
//           source={image ? { uri: image } : require("../assets/avart.png")}
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
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new email"
//         placeholderTextColor="#888"
//         value={newEmail}
//         onChangeText={setNewEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new gender"
//         placeholderTextColor="#888"
//         value={newGender}
//         onChangeText={setNewGender}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new date of birth (YYYY-MM-DD)"
//         placeholderTextColor="#888"
//         value={newDateOfBirth}
//         onChangeText={setNewDateOfBirth}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
//         <Text style={styles.buttonText}>Save Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ccc",
//     padding: 16,
//     alignItems: "center",

//???????????????????????????????????????????????????
// import React, { useState, useLayoutEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import { getAuth } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db } from "../firebaseConfig";
// import { updateUserProfile } from "../updateUserProfile"; // Adjust the import path

// const EditProfile = ({ navigation }) => {
//   const [newDisplayName, setNewDisplayName] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newGender, setNewGender] = useState("");
//   const [newDateOfBirth, setNewDateOfBirth] = useState("");
//   const [image, setImage] = useState(null);

//   const auth = getAuth();
//   const currentUser = auth.currentUser;

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitleStyle: {
//         color: "#ccc",
//       },
//       headerStyle: { backgroundColor: "#ccc" },
//       headerLeft: () => {
//         return (
//           <View style={{ marginLeft: 13 }}>
//             <TouchableOpacity
//               activeOpacity={0.5}
//               style={styles.leftIconContainer}
//               onPress={() => navigation.goBack()}
//             >
//               <Ionicons name="chevron-back-sharp" size={28} color="#333" />
//             </TouchableOpacity>
//           </View>
//         );
//       },
//       headerRight: () => {
//         return (
//           <View>
//             <Text style={styles.textTop}>Profile</Text>
//           </View>
//         );
//       },
//     });
//   }, [navigation]);

//   const pickImage = async () => {
//     const permissionResult =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (permissionResult.granted === false) {
//       Alert.alert("Permission to access camera roll is required!");
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

//       await updateUserProfile(
//         newDisplayName,
//         newEmail,
//         newGender,
//         newDateOfBirth,
//         photoURL
//       );
//       Alert.alert("Profile updated successfully!");
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error updating profile:", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ marginBottom: 50 }} />
//       <TouchableOpacity onPress={pickImage}>
//         <Image
//           source={image ? { uri: image } : require("../assets/avart.png")}
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
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new email"
//         placeholderTextColor="#888"
//         value={newEmail}
//         onChangeText={setNewEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new gender"
//         placeholderTextColor="#888"
//         value={newGender}
//         onChangeText={setNewGender}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter new date of birth (YYYY-MM-DD)"
//         placeholderTextColor="#888"
//         value={newDateOfBirth}
//         onChangeText={setNewDateOfBirth}
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
//     backgroundColor: "#ccc",
//     padding: 16,
//     alignItems: "center",
//   },
//   textTop: {
//     width: 80,
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#555",
//     marginRight: 6,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   input: {
//     height: 50,
//     borderColor: "#888",
//     borderWidth: 1,
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     color: "#000",
//     backgroundColor: "#FFF",
//     marginBottom: 20,
//     width: "80%",
//   },
//   button: {
//     backgroundColor: "#0d6efd",
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: "center",
//     width: "80%",
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 18,
//   },
// });

// export default EditProfile;

//??????????????????????????????????????????
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              email: userData.email || currentUser.email,
              displayName: userData.displayName || currentUser.displayName,
              gender: userData.gender,
              dateOfBirth: userData.dateOfBirth,
              photoURL: userData.photoURL || currentUser.photoURL,
            });
          } else {
            setUser({
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No user is signed in.");
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ marginTop: 5 }} />

      <View style={styles.profileMe}>
        <View style={styles.profContainer}>
          <Text style={styles.name}>{user?.displayName || "Anonymous"}</Text>

          <View style={{ marginLeft: 10, marginRight: 10, marginTop: 40 }}>
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#f1f2f6",
                alignItems: "center",
              }}
            />
          </View>

          <View style={styles.emailContainer}>
            <Text style={styles.email}>{user?.email || "user@email.com"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.img}>
        <Image
          source={
            user?.photoURL
              ? { uri: user.photoURL }
              : require("../assets/avart.png")
          }
          style={styles.avatar}
        />
      </View>

      <ScrollView>
        <View style={{ marginTop: 60 }} />
        <View style={{ marginBottom: 100 }}>
          <Text style={styles.textHeader}>My Profile</Text>

          <View style={styles.profile}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.settingsContainer}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <View style={styles.items}>
                <Text style={styles.text}>Profile</Text>
              </View>
              <View>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Username</Text>
              </View>

              <View>
                <Text style={styles.itemsText}>
                  {user?.displayName || "Anonymous"}
                </Text>
              </View>
            </View>

            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Email</Text>
              </View>

              <View>
                <Text style={styles.itemsText}>
                  {user?.email || "user@email.com"}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }} />
          <Text style={styles.textHeader}>More</Text>

          <View style={styles.profile}>
            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Gender</Text>
              </View>

              <View>
                <Text style={styles.itemsText}>
                  {user?.gender || "Not set"}
                </Text>
              </View>
            </View>

            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Date of Birth</Text>
              </View>

              <View>
                <Text style={styles.itemsText}>
                  {user?.dateOfBirth || "Not set"}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }} />
          <Text style={styles.textHeader}>Privacy</Text>

          <View style={styles.profileSeetings}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.settingsContainer}
              onPress={() => navigation.navigate("Settings")}
            >
              <View style={styles.items}>
                <Text style={styles.text}>Settings & Privacy</Text>
              </View>

              <View>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  profile: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  profileSeetings: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 100,
  },
  profileMe: {
    position: "relative",
  },
  profContainer: {
    position: "absolute",
    width: "94%",
    height: 130,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
  },
  img: {
    width: "25%",
    borderColor: "#fff",
    borderRadius: 18,
    marginTop: 40,
    marginLeft: 25,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 18,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 30,
  },
  emailContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  email: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ccc",
  },
  items: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  itemsText: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    marginTop: 15,
    marginBottom: 15,
  },
  settingsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    fontSize: 15,
  },
  space: {
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 2,
    width: "90%",
    backgroundColor: "#ccc",
  },
  textHeader: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Profile;
