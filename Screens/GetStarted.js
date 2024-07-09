import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const GetStarted = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate("Home");
  };

  const goBack = () => {
    navigation.navigate("Startchart");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.btnIcon}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="white"
              onPress={goBack}
            />
          </Pressable>

          <Text style={styles.headerText}>Let's get started</Text>
        </View>

        <View style={styles.boxContainer}>
          <View style={styles.boxCircle}>
            <Text style={styles.boxText}>KK</Text>
            <View style={styles.boxTextTwoContainer}>
              <TouchableOpacity>
                <Text style={styles.boxTextTwo}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.boxTextName}>Kelvin Kuffour</Text>
        </View>

        <View style={styles.mainComtainer}>
          <View style={styles.textEmail}>
            <Text style={styles.email}>KK@gmail.com</Text>
          </View>

          <View style={styles.conOne}>
            <Text style={styles.textOne}>
              Your profile picture and email address are visible in search. You
              may receive emails from Starchat regardless of visiblity settings.
            </Text>
          </View>

          <View>
            {/* <Text style={styles.textTwo}>Learn more</Text> */}

            <Text style={styles.textThree}>Terms of use</Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={handleNext}>
            <Text style={styles.btnText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#101223",
  },
  innerContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginLeft: 70,
  },
  boxContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 100,
  },
  boxCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#d3a375",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  boxText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    marginTop: 40,
  },
  boxTextTwoContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  boxTextTwo: {
    color: "#fff",
    fontSize: 12,
    padding: 4,
  },
  boxTextName: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginTop: 5,
  },
  mainComtainer: {
    marginTop: 50,
    marginBottom: 30,
  },
  email: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  textOne: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
    marginBottom: 10,
  },
  //   textTwo: {
  //     textAlign: "center",
  //     color: "#007bff",
  //     fontSize: 14,
  //     fontWeight: "bold",
  //   },
  textThree: {
    textAlign: "center",
    color: "#007bff",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  btnContainer: {
    marginLeft: 60,
    marginRight: 60,
  },
  btn: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default GetStarted;
