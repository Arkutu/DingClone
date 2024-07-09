import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Welcome = () => {
  const navigation = useNavigation();

  const handleHome = () => {
    navigation.navigate("Home");
  };
  const handleSignIn = () => {
    navigation.navigate("Login", { from: "Welcome" });
  };
  const handleSignUp = () => {
    navigation.navigate("CreateNewAccount", { from: "Welcome" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>OfficeComms</Text>

      <View style={{ marginBottom: 50 }} />

      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nextText}>Get started with your account</Text>
        </View>
         <Pressable style={styles.btn} onPress={() => navigation.navigate("CreateOrganization")}>
        <Text style={styles.btnText}>Skip for now</Text>
         </Pressable>
        <View style={styles.btnTwoContainer}>
          <Pressable style={styles.btnTwo} onPress={handleSignUp}>
            <Text style={styles.btnText}>Sign up</Text>
          </Pressable>
          <Pressable style={styles.btnThree} onPress={handleSignIn}>
            <Text style={styles.btnText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
    alignItems: "center",
    paddingTop: 150,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 200,
  },
  mainContainer: {
    width: "100%",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#101223",
  },
  topContainer: {
    alignItems: "center",
    color: "#FFFFFF",
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
  btn: {
    marginHorizontal: 30,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  btnTwoContainer: {
    marginHorizontal: 20,
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
