import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-elements";
import { useRoute, CommonActions } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => (
        <TouchableOpacity style={styles.iconHeader}>
          <Ionicons
            name="chevron-back"
            size={30}
            color="#333"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter email and password",
      });
    } else {
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Update user information in Firestore
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Anonymous",
            photoURL: user.photoURL || "",
            lastLogin: new Date(),
          },
          { merge: true }
        );

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login successful!",
        });

        //navigation.navigate("CreateOrganization"); // Navigate to CreateOrganization

        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: ("MainTabs", { screen: "MainHome" }) }],
        //     // routes: [{ name: "MainHome" }],
        //   })
        // );
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
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setButtonLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Update user information in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous",
          photoURL: user.photoURL || "",
          lastLogin: new Date(),
        },
        { merge: true }
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful!",
      });
      setLoading(false);
      //navigation.navigate("CreateOrganization"); // Navigate to CreateOrganization

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainHome" }],
        })
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.innerContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTextOne}>Make it yours!</Text>
              <Text style={styles.headerTextTwo}>Sign In {"\n"}Now</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              autoFocus
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Enter your password"
                placeholderTextColor={"gray"}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <Button
              title={
                loading ? (
                  <ActivityIndicator size="small" color="#007bff" />
                ) : (
                  "Login"
                )
              }
              onPress={handleLogin}
              containerStyle={styles.button}
              buttonStyle={styles.customizeButton}
              titleStyle={styles.buttonText}
              disabled={loading}
            />

            <Text
              style={styles.text}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              Forget Password
            </Text>

            <View style={styles.signInContainer}>
              <View style={styles.line} />
              <Text style={styles.signInText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              activiteopacity={0.5}
              onPress={handleGoogleSignIn}
              style={styles.iconContainer}
            >
              <Image
                source={require("../assets/google.png")}
                style={styles.iconGoogle}
              />
              <Text style={styles.iconText}>Continue with Google</Text>
            </TouchableOpacity>
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
    padding: 10,
    backgroundColor: "#fff",
  },
  iconHeader: {
    marginLeft: 15,
    alignItems: "center",
    // marginBottom: 20,
  },
  innerContainer: {
    padding: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerTextOne: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
  },
  headerTextTwo: {
    fontSize: 30,
    fontWeight: "800",
    color: "#007bff",
  },
  input: {
    width: "100%",
    padding: 7,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "gray",
    color: "#333",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  inputPassword: {
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
  icon: {
    right: 40,
    zIndex: 1,
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
  text: {
    marginTop: 14,
    marginBottom: 210,
    marginLeft: 10,
    color: "gray",
    fontWeight: "500",
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    marginBottom: 16,
  },
  line: {
    width: 70,
    height: 1,
    backgroundColor: "gray",
  },
  signInText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "gray",
  },
  iconContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  iconGoogle: {
    width: 20,
    height: 20,
  },
});

export default LoginScreen;
