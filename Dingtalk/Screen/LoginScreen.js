import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// const LoginScreen = ({ navigation }) => {
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const navigation = useNavigation();
  const route = useRoute();

  const handleLogin = () => {
    // Add your login logic here (e.g., API call)
    if (!email || !password) {
      alert("Enter email and password");
    } else {
      navigation.navigate("Home");
    }
  };

  const handelEmailChange = (text) => {
    setEmail(text);
    // console.log(email);
  };
  const handelPhoneChange = (text) => {
    setPassword(text);
    // console.log(password);
  };

  const goBack = () => {
    const from = route.params?.form || "Welcome";
    navigation.navigate(from);
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateNewAccount", { from: "Login" });
  };

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
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
          <View style={styles.image}>
            {/* <image source={require("../assets/")} style={styles.logo} /> */}
          </View>

          <Text style={styles.headerTextOne}>Make it yours!</Text>
          <Text style={styles.headerTextTwo}>Sign In {"\n"}Now</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputCode}
              placeholder="Email"
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={(text) => handelEmailChange(text)}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
              value={password}
              onChangeText={(text) => handelPhoneChange(text)}
            />
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>

          <View style={styles.textContainer}>
            <Text style={styles.textTwo} onPress={handleForgetPassword}>
              Forget Password
            </Text>
          </View>

          <View>
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <Pressable style={styles.buttonTwo} onPress={handleCreateAccount}>
              <Text style={styles.buttonTextTwo}>Create New Account</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101223",
    padding: 16,
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
  image: {
    marginBottom: 50,
  },
  headerTextOne: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerTextTwo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 50,
  },
  inputCode: {
    marginBottom: 30,
    borderWidth: 1,
    padding: 7,
    borderRadius: 50,
    paddingHorizontal: 20,
    borderColor: "gray",
  },
  input: {
    marginBottom: 50,
    borderWidth: 1,
    padding: 7,
    borderRadius: 50,
    paddingHorizontal: 20,
    borderColor: "gray",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
    // marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textContainer: {
    marginTop: 14,
    marginBottom: 80,
  },
  textTwo: {
    color: "gray",
  },
  textOne: {
    color: "#fff",
    fontWeight: "500",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
    marginBottom: 16,
  },
  line: {
    width: 80,
    height: 1,
    backgroundColor: "gray",
    alignItems: "center",
  },
  orText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "gray",
  },
  buttonTwo: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
  },
  buttonTextTwo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
