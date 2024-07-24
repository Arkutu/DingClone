import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const Logout = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: {
        backgroundColor: "#ccc",
      },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 13 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-sharp" size={28} color="#333" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <Text style={styles.textTop}>Logout</Text>
        </View>
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logout successful!",
      });

      // Reset the navigation stack to prevent the user from going back to protected screens
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Are you sure you want to log out?</Text>

        <Button
          title={
            loading ? (
              <ActivityIndicator size="small" color="#ddd" />
            ) : (
              "Log Out"
            )
          }
          onPress={handleLogout}
          containerStyle={styles.button}
          buttonStyle={styles.customizeButton}
          titleStyle={styles.buttonText}
          disabled={loading}
        />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ccc",
  },
  textTop: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    borderRadius: 50,
    width: "80%",
  },
  customizeButton: {
    padding: 10,
    backgroundColor: "#ff4444",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});
