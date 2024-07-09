import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ForgetPassword = ({ navigation }) => {
  const [userphoneone, setUserphoneone] = useState("");
  const [userphone, setUserphone] = useState();

  const handleForgetAccount = () => {
    // Add your account creation logic here (e.g., API call)

    if (!userphone || !userphoneone) {
      alert("Enter new password and confirm");
    } else if (userphone !== userphoneone) {
      alert("Mismatch password");
    } else {
      navigation.navigate("Home");
    }
  };

  const handelPhoneChange = (text) => {
    setUserphone(text);
    // console.log(userphone);
  };

  const handelPhoneChangeTwo = (text) => {
    setUserphoneone(text);
    // console.log(userphoneone);
  };

  const goBack = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innContainer}>
        <View style={styles.icon}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="white"
            onPress={goBack}
          />
        </View>

        <View style={styles.innerContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Create new password</Text>
          </View>

          <View>
            <View style={styles.textTopContainer}>
              <Text style={styles.textTop}>
                Please enter below your new password.
              </Text>
            </View>

            <TextInput
              style={styles.inputCode}
              placeholder="New password"
              placeholderTextColor={"gray"}
              value={userphone}
              onChangeText={(text) => handelPhoneChange(text)}
              // keyboardType="numeric"
            />
            <Text style={styles.textOne}>Must be at least 8 characters.</Text>

            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor={"gray"}
              value={userphoneone}
              onChangeText={(text) => handelPhoneChangeTwo(text)}
              // keyboardType="numeric"
            />
            <Text style={styles.textTwo}>Must match new password.</Text>
          </View>

          <Pressable style={styles.button} onPress={handleForgetAccount}>
            <Text style={styles.buttonText}>Reset password</Text>
          </Pressable>
        </View>
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
    backgroundColor: "#101223",
  },
  innContainer: {
    marginTop: 40,
  },
  icon: {
    marginBottom: 50,
  },
  innerContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerTextContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
  },
  textTopContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  textTop: {
    color: "gray",
    alignItems: "center",
  },
  inputCode: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    padding: 7,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  textOne: {
    color: "gray",
    marginLeft: 10,
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    padding: 7,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  textTwo: {
    color: "gray",
    marginLeft: 10,
    marginBottom: 70,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgetPassword;
