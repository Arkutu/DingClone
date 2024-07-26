import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { CommonActions } from "@react-navigation/native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create New Account",
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
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.textTopContainer}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.textTop}>Login</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleCreateAccount = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter email and password",
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Enter a valid email address",
      });
    } else {
      try {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous",
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Account created successfully!",
        });

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "UserInformation" }],
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

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <StatusBar style="light-content" />

          <SafeAreaView style={styles.innerContainer}>
            <Text style={styles.headerText}>Create your new account</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.inputNext}
                placeholder="Enter your password"
                placeholderTextColor={"gray"}
                value={password}
                onChangeText={setPassword}
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

            <View style={styles.checkboxContainer}>
              <FontAwesome
                name={termsChecked ? "check-circle" : "circle-thin"}
                size={20}
                color={termsChecked ? "#007bff" : "gray"}
                style={styles.checkboxIcon}
                onPress={() => setTermsChecked(!termsChecked)}
              />
              <Text style={styles.textMain}>
                I have read and agree{" "}
                <Text style={styles.textBlue}>
                  Privacy Policy,Terms of Service
                </Text>
              </Text>
            </View>

            <Button
              title={
                loading ? (
                  <ActivityIndicator size="small" color="#007bff" />
                ) : (
                  "Sign In"
                )
              }
              onPress={handleCreateAccount}
              containerStyle={styles.button}
              buttonStyle={styles.customizeButton}
              titleStyle={styles.buttonText}
              disabled={loading}
            />

            <View style={styles.singUpContainer}>
              <View style={styles.line} />
              <Text style={styles.singUpText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              activiteopacity={0.5}
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
    marginLeft: 10,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  textTop: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
  },
  innerContainer: {
    padding: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#007bff",
  },
  input: {
    marginTop: 40,
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
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputNext: {
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  checkboxIcon: {
    marginRight: 6,
    marginBottom: 8,
  },
  textMain: {
    fontSize: 14,
    marginTop: 6,
    color: "gray",
  },
  textBlue: {
    color: "#007bff",
    fontWeight: "500",
  },
  button: {
    borderRadius: 50,
    marginBottom: 70,
  },
  customizeButton: {
    backgroundColor: "#007bff",
    padding: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  singUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 120,
  },
  line: {
    width: 70,
    height: 1,
    backgroundColor: "gray",
    alignItems: "center",
  },
  singUpText: {
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

export default CreateAccountScreen;
