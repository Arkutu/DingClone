import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";

// const Welcome = ({ navigation }) => {
const Welcome = () => {
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate("Home");
  };
  const handleSingIn = () => {
    navigation.navigate("Login", { from: "Welcome" });
  };
  const handleSignUp = () => {
    navigation.navigate("CreateNewAccount", { from: "Welcome" });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>OfficeComms</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nextText}>Get started with your account</Text>
        </View>

        <View style={styles.btnOneContainer}>
          <Pressable style={styles.btn} onPress={handleHome}>
            <Text style={styles.btnText}>skip for now</Text>
          </Pressable>
        </View>

        <View style={styles.btnTwoContainer}>
          <Pressable style={styles.btnTwo} onPress={handleSignUp}>
            <Text style={styles.btnText}>Sign up</Text>
          </Pressable>

          <Pressable style={styles.btnThree} onPress={handleSingIn}>
            <Text style={styles.btnText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
    alignItems: "center",
    paddingTop: 200,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 30,

    fontWeight: "bold",
    marginBottom: 200,
  },
  mainContainer: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#101223",
  },
  topContainer: {
    alignItems: "center",
    color: "#FFFFFF",
    lineHeight: 0,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  nextText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 30,
  },
  btnOneContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  btn: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTwoContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  btnTwo: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  btnThree: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default Welcome;
