import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

const ForgetPassword = ({ navigation }) => {
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [value, setValue] = useState("");

  const handleForgetAccount = () => {
    // Add your account creation logic here (e.g., API call)

    // navigation.navigate("");  //This is not where we want to nagigate to but is for trying

    navigation.navigate("Home");
  };

  // Change the value of text input to number
  const handelChange = (text) => {
    setValue(Number(text));
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerText}>Enter your phone Number</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={value.toString()}
            onChangeText={handelChange}
            keyboardType="numeric"
          />
        </View>

        <Pressable style={styles.button} onPress={handleForgetAccount}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>

        <Text style={styles.textBlue}>Find your password by email</Text>
        <View style={styles.push}></View>
      </View>
    </View>
  );
};

ForgetPassword.propTypes = {
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
    marginTop: 12,
    // fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginTop: 7,
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

export default ForgetPassword;
