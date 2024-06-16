import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// const CreateAccountScreen = ({ navigation }) => {
const CreateAccountScreen = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const handleCreateAccount = () => {
    //* Add your account creation logic here (e.g., API call)
    if (!email) {
      alert("Enter email");
    } else {
      navigation.navigate("VerifyScreen");
    }
  };

  const handlePrivacyTerms = () => {
    navigation.navigate("PrivacyTermsScreen");
  };

  const handelEmailChange = (text) => {
    setEmail(text);
    // console.log(password);
  };

  const goBack = () => {
    const from = route.params?.form || "Welcome";
    navigation.navigate(from);
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
          <Text style={styles.headerText}>Create your new account</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={(text) => handelEmailChange(text)}
            />
          </View>

          <Text style={styles.textMain}>
            I have read and agree{" "}
            <Text style={styles.textBlue} onPress={handlePrivacyTerms}>
              Privacy Policy,Terms of Service
            </Text>
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          <View style={styles.singUpContainer}>
            <View style={styles.line} />
            <Text style={styles.singUpText}>or sign up with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.iconContainer}>
            <View style={styles.iconOne}></View>
            <View style={styles.iconTwo}></View>
          </View>
        </View>
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
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 18,
    marginBottom: 12,
  },
  textMain: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 50,
    color: "#fff",
  },
  textBlue: {
    color: "#007bff",
    fontWeight: "500",
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
    marginBottom: 150,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  singUpContainer: {
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
    alignItems: "center",
  },
  singUpText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "gray",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  iconOne: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  iconTwo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginRight: 10,
  },
});

export default CreateAccountScreen;
