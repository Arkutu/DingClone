// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const ForgetPassword = ({ navigation }) => {
//   const [userphoneone, setUserphoneone] = useState("");
//   const [userphone, setUserphone] = useState();

//   const handleForgetAccount = () => {
//     // Add your account creation logic here (e.g., API call)

//     if (!userphone || !userphoneone) {
//       alert("Enter new password and confirm");
//     } else if (userphone !== userphoneone) {
//       alert("Mismatch password");
//     } else {
//       navigation.navigate("Home");
//     }
//   };

//   const handelPhoneChange = (text) => {
//     setUserphone(text);
//     // console.log(userphone);
//   };

//   const handelPhoneChangeTwo = (text) => {
//     setUserphoneone(text);
//     // console.log(userphoneone);
//   };

//   const goBack = () => {
//     navigation.navigate("Login");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.innContainer}>
//         <View style={styles.icon}>
//           <Ionicons
//             name="chevron-back"
//             size={24}
//             color="white"
//             onPress={goBack}
//           />
//         </View>

//         <View style={styles.innerContainer}>
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.headerText}>Create new password</Text>
//           </View>

//           <View>
//             <View style={styles.textTopContainer}>
//               <Text style={styles.textTop}>
//                 Please enter below your new password.
//               </Text>
//             </View>

//             <TextInput
//               style={styles.inputCode}
//               placeholder="New password"
//               placeholderTextColor={"gray"}
//               value={userphone}
//               onChangeText={(text) => handelPhoneChange(text)}
//               // keyboardType="numeric"
//             />
//             <Text style={styles.textOne}>Must be at least 8 characters.</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Confirm password"
//               placeholderTextColor={"gray"}
//               value={userphoneone}
//               onChangeText={(text) => handelPhoneChangeTwo(text)}
//               // keyboardType="numeric"
//             />
//             <Text style={styles.textTwo}>Must match new password.</Text>
//           </View>

//           <Pressable style={styles.button} onPress={handleForgetAccount}>
//             <Text style={styles.buttonText}>Reset password</Text>
//           </Pressable>
//         </View>
//       </View>
//     </View>
//   );
// };

// ForgetPassword.propTypes = {
//   navigation: PropTypes.object.isRequired,
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#101223",
//   },
//   innContainer: {
//     marginTop: 40,
//   },
//   icon: {
//     marginBottom: 50,
//   },
//   innerContainer: {
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   headerTextContainer: {
//     marginBottom: 40,
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#007bff",
//     marginBottom: 20,
//   },
//   textTopContainer: {
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   textTop: {
//     color: "gray",
//     alignItems: "center",
//   },
//   inputCode: {
//     backgroundColor: "#fff",
//     borderColor: "#fff",
//     borderWidth: 1,
//     borderRadius: 50,
//     padding: 7,
//     paddingHorizontal: 20,
//     marginTop: 20,
//     marginBottom: 8,
//   },
//   textOne: {
//     color: "gray",
//     marginLeft: 10,
//     marginBottom: 25,
//   },
//   input: {
//     backgroundColor: "#fff",
//     borderColor: "#fff",
//     borderWidth: 1,
//     borderRadius: 50,
//     padding: 7,
//     paddingHorizontal: 20,
//     marginBottom: 8,
//   },
//   textTwo: {
//     color: "gray",
//     marginLeft: 10,
//     marginBottom: 70,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 50,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ForgetPassword;

//??????????????????????????????????????????????????? Using this code ?????????????????????????????????????????????????????
//! Main Code /////////////////////////////////////////////

// import React, { useLayoutEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   Keyboard,
//   TextInput,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { Button } from "react-native-elements";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";
// import { updatePassword } from "firebase/auth";
// import { auth } from "../firebase";

// const ForgetPassword = ({ navigation }) => {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: "Forget Password",
//       headerTitleStyle: { color: "#fff" },
//       headerLeft: () => (
//         <TouchableOpacity style={styles.iconHeader}>
//           <Ionicons
//             name="chevron-back"
//             size={30}
//             color="#333"
//             onPress={() => navigation.navigate("Login")}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   //   // const handleForgetAccount = async () => {
//   //   //   if (!newPassword || !confirmPassword) {
//   //   //     Alert.alert("Error", "Enter new password and confirm");
//   //   //   } else if (newPassword !== confirmPassword) {
//   //   //     Alert.alert("Error", "Passwords do not match");
//   //   //   } else if (newPassword.length < 8 || confirmPassword.length < 8) {
//   //   //     Alert.alert("Error", "Password must be at least 8 characters long");
//   //   //   } else {
//   //   //     try {
//   //   //       setLoading(true);
//   //   //       const user = auth.currentUser;
//   //   //       if (user) {
//   //   //         await updatePassword(user, newPassword);
//   //   //         Toast.show({
//   //   //           type: "success",
//   //   //           text1: "Password updated successfully!",
//   //   //         });
//   //   //         navigation.navigate("Login");
//   //   //       } else {
//   //   //         Alert.alert("Error", "No user is currently logged in");
//   //   //       }
//   //   //     } catch (error) {
//   //   //       Alert.alert("Error", error.message);
//   //   //     } finally {
//   //   //       setLoading(false);
//   //   //     }
//   //   //   }
//   //   // };

//   const handleForgetAccount = async () => {
//     if (!newPassword || !confirmPassword) {
//       Alert.alert("Error", "Enter new password and confirm");
//     } else if (newPassword !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//     } else if (newPassword.length < 8 || confirmPassword.length < 8) {
//       Alert.alert("Error", "Password must be at least 8 characters long");
//     } else {
//       try {
//         setLoading(true);

//         // Check if the user is authenticated
//         const user = auth.currentUser;
//         if (user) {
//           // Re-authenticate the user with their current password
//           const credential = await promptForCurrentPassword();

//           if (credential) {
//             // Update the password with the new password
//             await updatePassword(user, newPassword);

//             Toast.show({
//               type: "success",
//               text1: "Password updated successfully!",
//             });

//             // Sign out the user and navigate to the Login screen
//             await auth.signOut();
//             navigation.navigate("Login");
//           } else {
//             Alert.alert("Error", "Failed to re-authenticate user");
//           }
//         } else {
//           Alert.alert("Error", "No user is currently logged in");
//         }
//       } catch (error) {
//         Alert.alert("Error", error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   // Helper function to prompt the user for their current password
//   const promptForCurrentPassword = async () => {
//     try {
//       const { value: currentPassword } = await Prompt(
//         "Re-authenticate",
//         "Please enter your current password",
//         [
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//           {
//             text: "OK",
//             onPress: (password) => password,
//           },
//         ],
//         "secure-text"
//       );

//       if (currentPassword) {
//         const credential = EmailAuthProvider.credential(
//           auth.currentUser.email,
//           currentPassword
//         );
//         return credential;
//       }
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <>
//           <SafeAreaView style={styles.innerContainer}>
//             <StatusBar barStyle="light-content" />

//             <View style={styles.containerIn}>
//               <View style={styles.headerTextContainer}>
//                 <Text style={styles.headerText}>Create new password</Text>
//                 <Text style={styles.textTop}>
//                   Please enter below your new password.
//                 </Text>
//               </View>

//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={styles.inputCode}
//                   placeholder="New password"
//                   autoFocus
//                   secureTextEntry={!showPassword}
//                   placeholderTextColor={"gray"}
//                   value={newPassword}
//                   onChangeText={(text) => setNewPassword(text)}
//                 />
//                 <TouchableOpacity
//                   activeOpacity={0.5}
//                   style={styles.icon}
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Ionicons
//                     name={showPassword ? "eye-outline" : "eye-off-outline"}
//                     size={24}
//                     color="black"
//                   />
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.text}>Must be at least 8 characters.</Text>

//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Confirm password"
//                   secureTextEntry={!showConfirmPassword}
//                   placeholderTextColor={"gray"}
//                   value={confirmPassword}
//                   onChangeText={(text) => setConfirmPassword(text)}
//                 />
//                 <TouchableOpacity
//                   activeOpacity={0.5}
//                   style={styles.icon}
//                   onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   <Ionicons
//                     name={
//                       showConfirmPassword ? "eye-outline" : "eye-off-outline"
//                     }
//                     size={24}
//                     color="black"
//                   />
//                 </TouchableOpacity>
//               </View>

//               <Text style={styles.textTow}>Must match new password.</Text>

//               <Button
//                 title={
//                   loading ? (
//                     <ActivityIndicator size="small" color="#ddd" />
//                   ) : (
//                     "Reset password"
//                   )
//                 }
//                 onPress={handleForgetAccount}
//                 containerStyle={styles.button}
//                 buttonStyle={styles.customizeButton}
//                 titleStyle={styles.buttonText}
//                 disabled={loading}
//               />
//             </View>
//           </SafeAreaView>
//         </>
//       </TouchableWithoutFeedback>
//       <Toast ref={(ref) => Toast.setRef(ref)} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 0.8,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//     marginBottom: 40,
//   },
//   iconHeader: {
//     marginLeft: 16,
//   },
//   containerIn: {
//     padding: 14,
//   },
//   headerTextContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "800",
//     color: "#007bff",
//     marginBottom: 50,
//   },
//   textTop: {
//     color: "#555",
//     fontSize: 16,
//   },
//   text: {
//     color: "#555",
//     marginLeft: 10,
//     marginBottom: 35,
//   },
//   textTow: {
//     color: "#555",
//     marginLeft: 10,
//     marginBottom: 25,
//   },
//   button: {
//     marginTop: 40,
//     borderRadius: 50,
//   },
//   customizeButton: {
//     padding: 10,
//     backgroundColor: "#007bff",
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   inputCode: {
//     width: "100%",
//     padding: 7,
//     borderWidth: 1,
//     borderRadius: 50,
//     borderColor: "gray",
//     color: "#333",
//     fontSize: 16,
//     paddingHorizontal: 20,
//     zIndex: 0,
//   },
//   icon: {
//     right: 40,
//     zIndex: 1,
//   },
//   input: {
//     width: "100%",
//     padding: 7,
//     borderWidth: 1,
//     borderRadius: 50,
//     borderColor: "gray",
//     color: "#333",
//     fontSize: 16,
//     paddingHorizontal: 20,
//     zIndex: 0,
//   },
// });

// export default ForgetPassword;

//???????????????????????????????????????????????????????????????????????
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { Button } from "react-native-elements";
// import Toast from "react-native-toast-message";
// import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const ForgetPassword = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSendResetEmail = async (email) => {
//     if (!email) {
//       Alert.alert("Error", "Please enter your email address");
//       return;
//     }

//     try {
//       setLoading(true);
//       const auth = getAuth();
//       await sendPasswordResetEmail(auth, email);
//       Toast.show({
//         type: "success",
//         text1: "Password reset email sent!",
//         text2: "Check your email to reset your password.",
//       });
//       navigation.goBack();
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <View style={styles.innerContainer}>
//           <StatusBar barStyle="light-content" />

//           <View style={styles.headerContainer}>
//             <TouchableOpacity
//               style={styles.iconHeader}
//               onPress={() => navigation.goBack()}
//             >
//               <Ionicons name="chevron-back" size={30} color="#333" />
//             </TouchableOpacity>
//             <Text style={styles.headerText}>Reset Password</Text>
//           </View>

//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor={"gray"}
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//             keyboardType="email-address"
//           />

//           <Button
//             title={
//               loading ? (
//                 <ActivityIndicator size="small" color="#ddd" />
//               ) : (
//                 "Send Reset Email"
//               )
//             }
//             onPress={() => handleSendResetEmail(email)}
//             containerStyle={styles.button}
//             buttonStyle={styles.customizeButton}
//             titleStyle={styles.buttonText}
//             disabled={loading}
//           />
//         </View>
//       </TouchableWithoutFeedback>
//       <Toast ref={(ref) => Toast.setRef(ref)} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//     flexDirection: "row",
//   },
//   iconHeader: {
//     position: "absolute",
//     left: 0,
//   },
//   headerText: {
//     flex: 1,
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#333",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   button: {
//     marginBottom: 20,
//   },
//   customizeButton: {
//     backgroundColor: "#2b68e6",
//   },
//   buttonText: {
//     color: "#fff",
//   },
// });

// export default ForgetPassword;

//******************************* TESTING CODE *************************** */
// import React, { useLayoutEffect, useState } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   Keyboard,
//   TextInput,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { Button } from "react-native-elements";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const ForgetPassword = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: "Reset Password",
//       headerTitleStyle: { color: "#fff" },
//       headerLeft: () => (
//         <TouchableOpacity style={styles.iconHeader}>
//           <Ionicons
//             name="chevron-back"
//             size={30}
//             color="#333"
//             onPress={() => navigation.navigate("Login")}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   const handleResetPassword = async () => {
//     if (!email || !newPassword || !confirmPassword) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     if (newPassword.length < 8) {
//       Alert.alert("Error", "Password must be at least 8 characters long");
//       return;
//     }

//     try {
//       setLoading(true);
//       // Attempt to sign in the user with the provided email and password
//       await signInWithEmailAndPassword(auth, email, newPassword);

//       // If sign-in is successful, update the password
//       await auth.currentUser.updatePassword(newPassword);
//       Toast.show({
//         type: "success",
//         text1: "Password updated successfully!",
//       });

//       // Navigate to the login screen
//       navigation.navigate("Login");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <>
//           <SafeAreaView style={styles.innerContainer}>
//             <StatusBar barStyle="light-content" />

//             <View style={styles.containerIn}>
//               <View style={styles.headerTextContainer}>
//                 <Text style={styles.headerText}>Reset Password</Text>
//                 <Text style={styles.textTop}>
//                   Please enter your email and new password.
//                 </Text>
//               </View>

//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={styles.inputCode}
//                   placeholder="Email"
//                   autoFocus
//                   placeholderTextColor={"gray"}
//                   value={email}
//                   onChangeText={(text) => setEmail(text)}
//                 />
//               </View>

//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={styles.inputCode}
//                   placeholder="New Password"
//                   secureTextEntry
//                   placeholderTextColor={"gray"}
//                   value={newPassword}
//                   onChangeText={(text) => setNewPassword(text)}
//                 />
//               </View>

//               <View style={styles.searchContainer}>
//                 <TextInput
//                   style={styles.inputCode}
//                   placeholder="Confirm Password"
//                   secureTextEntry
//                   placeholderTextColor={"gray"}
//                   value={confirmPassword}
//                   onChangeText={(text) => setConfirmPassword(text)}
//                 />
//               </View>

//               <Button
//                 title={
//                   loading ? (
//                     <ActivityIndicator size="small" color="#ddd" />
//                   ) : (
//                     "Reset Password"
//                   )
//                 }
//                 onPress={handleResetPassword}
//                 containerStyle={styles.button}
//                 buttonStyle={styles.customizeButton}
//                 titleStyle={styles.buttonText}
//                 disabled={loading}
//               />
//             </View>
//           </SafeAreaView>
//         </>
//       </TouchableWithoutFeedback>
//       <Toast ref={(ref) => Toast.setRef(ref)} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     flex: 0.8,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//     marginBottom: 40,
//   },
//   iconHeader: {
//     marginLeft: 16,
//   },
//   containerIn: {
//     padding: 14,
//   },
//   headerTextContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "800",
//     color: "#007bff",
//     marginBottom: 50,
//   },
//   textTop: {
//     color: "#555",
//     fontSize: 16,
//   },
//   button: {
//     marginTop: 40,
//     borderRadius: 50,
//   },
//   customizeButton: {
//     padding: 10,
//     backgroundColor: "#007bff",
//   },
//   buttonText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   inputCode: {
//     width: "100%",
//     padding: 7,
//     borderWidth: 1,
//     borderRadius: 50,
//     borderColor: "gray",
//     color: "#333",
//     fontSize: 16,
//     paddingHorizontal: 20,
//     zIndex: 0,
//   },
// });

// export default ForgetPassword;

//???????????????????????????????????????????????????????????????????????????????????????????/
import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Forget Password",
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => (
        <TouchableOpacity style={styles.iconHeader}>
          <Ionicons
            name="chevron-back"
            size={30}
            color="#333"
            onPress={() => navigation.navigate("Login")}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleForgetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
    } else {
      try {
        setLoading(true);
        await sendPasswordResetEmail(auth, email);
        Toast.show({
          type: "success",
          text1: "Password reset email sent successfully!",
        });
        navigation.navigate("Login");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <SafeAreaView style={styles.innerContainer}>
            <StatusBar barStyle="light-content" />

            <View style={styles.containerIn}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Reset Password</Text>
                <Text style={styles.textTop}>
                  Please enter your email to receive a password reset link.
                </Text>
              </View>

              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.inputCode}
                  placeholder="Email"
                  autoFocus
                  placeholderTextColor={"gray"}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              <Button
                title={
                  loading ? (
                    <ActivityIndicator size="small" color="#ddd" />
                  ) : (
                    "Send Reset Email"
                  )
                }
                onPress={handleForgetPassword}
                containerStyle={styles.button}
                buttonStyle={styles.customizeButton}
                titleStyle={styles.buttonText}
                disabled={loading}
              />
            </View>
          </SafeAreaView>
        </>
      </TouchableWithoutFeedback>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 40,
  },
  iconHeader: {
    marginLeft: 16,
  },
  containerIn: {
    padding: 14,
  },
  headerTextContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#007bff",
    marginBottom: 50,
  },
  textTop: {
    color: "#555",
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    borderRadius: 50,
  },
  customizeButton: {
    padding: 10,
    backgroundColor: "#007bff",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputCode: {
    width: "100%",
    padding: 7,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "gray",
    color: "#333",
    fontSize: 16,
    paddingHorizontal: 20,
    zIndex: 0,
  },
});

export default ForgetPassword;
