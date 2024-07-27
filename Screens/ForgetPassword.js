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
