import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreateAccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleCreateAccount = () => {
    //* Add your account creation logic here (e.g., API call)
    if (!email) {
      alert("Enter email");
    } else {
      navigation.navigate("Home");
    }
    // navigation.navigate("Home");
    //! Navigate to HomeScreen after successful account creation
  };

  const handlePrivacyTerms = () => {
    navigation.navigate("PrivacyTermsScreen");
  };

  const goBack = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons
          name="chevron-back"
          size={24}
          //   color="black"
          onPress={goBack}
        />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>Create New Account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text>
          I have read and agree{" "}
          <Text style={styles.textBlue} onPress={handlePrivacyTerms}>
            Privacy Policy,Terms of Service
          </Text>
        </Text>

        <Pressable style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Agree and Register</Text>
        </Pressable>
        <View style={styles.push}></View>
      </View>
    </View>
  );
};

CreateAccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  icon: {
    marginTop: 40,
    marginBottom: 50,
    fontSize: 25,
  },
  innerContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputText: {
    fontSize: 16,
    color: "grey",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 12,
  },
  textBlue: {
    color: "#007bff",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  push: {
    height: 450,
  },
});

export default CreateAccountScreen;
