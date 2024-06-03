import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

const CreateAccountScreen = ({ navigation }) => {
  //   const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    // Add your account creation logic here (e.g., API call)
    navigation.navigate("Home"); // Navigate to HomeScreen after successful account creation
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.textBlue}>Privacy Policy,Terms of Service</Text>
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
  innerContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
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
    // paddingHorizontal: 8,
  },
  textBlue: {
    color: "#007bff",
    // fontWeight: "bold",
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
