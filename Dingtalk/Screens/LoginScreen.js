import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

// const LoginScreen = ({ navigation }) => {
const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginByEmail, setLoginByEmail] = useState(true);
  const [value, setValue] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  //!
  const navigation = useNavigation();
  const route = useRoute();
  //   const selectedCode = route.params?.selectedCode || "+1";

  // useEffect(() => {
  //   if (route.params?.selectedCode) {
  //     setCountryCode(route.params.selectedCode);
  //   }
  // }, [route.params?.selectedCode]);

  // //!

  const handleLogin = () => {
    // Add your login logic here (e.g., API call)
    navigation.navigate("Home");
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const handleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  const handleCountryCodeInput = () => {
    navigation.navigate("CountryCodeInput");
  };

  //* Swap between login by email and login by phone number
  const handleToggleLoginMethod = () => {
    setLoginByEmail(!loginByEmail);
    setUsername(""); //!Clear the username input when switching
  };

  //* Change the value of text input to number
  const handelChange = (text) => {
    setValue(Number(text));
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.image}>
          {/* <image source={require("../assets/")} style={styles.logo} /> */}
        </View>

        <Text style={styles.headerText}>Welcome to DingTalk</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.textInputText}>
            {loginByEmail ? "Email" : "Phone Number"}
          </Text>

          <View style={styles.codeContainer}>
            {loginByEmail ? (
              ""
            ) : (
              <View style={styles.codeContain}>
                <Text style={styles.codeText}>{selectedCode}</Text>
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color="black"
                  marginRight={10}
                  onPress={handleCountryCodeInput}
                />
              </View>
            )}

            <TextInput
              style={styles.inputCode}
              placeholder={
                loginByEmail
                  ? "Enter your email address"
                  : "Enter your phone number"
              }
              value={loginByEmail ? username : value.toString()}
              onChangeText={loginByEmail ? setUsername : handelChange}
              keyboardType={loginByEmail ? "email-address" : "numeric"}
            />
          </View>

          <Text style={styles.textInputText}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        <View style={styles.textContainer}>
          <Text style={styles.textOne} onPress={handleToggleLoginMethod}>
            {loginByEmail ? "Log in by Phone Number" : "Log in by Email"}
          </Text>
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
  );
};

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  innerContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    marginBottom: 110,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 30,
  },
  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  codeContain: {
    flexDirection: "row",
    alignItems: "center",
  },
  codeText: {
    fontSize: 18,
    marginRight: 3,
  },
  inputCode: {
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderColor: "#EEEEEE",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  textInputText: {
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonTwo: {
    backgroundColor: "#7EA1FF",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextTwo: {
    color: "#007bff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 220,
  },
  textOne: {
    color: "#007bff",
    fontWeight: "500",
  },
  textTwo: {
    color: "black",
    fontWeight: "400",
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
    backgroundColor: "#EEEEEE",
    alignItems: "center",
  },
  orText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#EEEEEE",
  },
});

export default LoginScreen;
