import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const CreateOrganization = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 13 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.leftIconContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-sharp" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerText}>
        <Image source={require("../assets/octext.png")} style={styles.img} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextBlack}>ffice</Text>
          <Text style={styles.headerTextBlue}>Comms</Text>
        </View>
      </View>

      {/* <View style={{ marginBottom: 120 }} /> */}

      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Create Organization</Text>
        <Text style={styles.nextText}>
          Get started with creating your organization
        </Text>
      </View>

      <View style={styles.buttomBottomContainer}>
        <Button
          title="Create Organization"
          onPress={() => navigation.navigate("OrganizationScreen")}
          containerStyle={styles.buttonOne}
          buttonStyle={styles.customizeButtonOne}
          titleStyle={styles.buttonTextOne}
        />
        <Button
          title="Existing Organizations"
          onPress={() => navigation.navigate("ExistingOrganizations")}
          containerStyle={styles.buttonTwo}
          buttonStyle={styles.customizeButtonTwo}
          titleStyle={styles.buttonTextTwo}
        />
        <Button
          title="Invite Link"
          onPress={() => navigation.navigate("InviteLinkScreen")}
          containerStyle={styles.buttonTwo}
          buttonStyle={styles.customizeButtonTwo}
          titleStyle={styles.buttonTextTwo}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150,
    marginBottom: 120,
  },
  img: {
    width: 100,
    height: 100,
    top: 5,
    right: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    right: 20,
    marginRight: 20,
  },
  headerTextBlack: {
    color: "#444",
    fontSize: 35,
    fontWeight: "800",
  },
  headerTextBlue: {
    color: "#007bff",
    fontSize: 35,
    fontWeight: "800",
  },
  topContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
  nextText: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  buttomBottomContainer: {
    width: "95%",
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
  },
  customizeButton: {
    backgroundColor: "#007bff",
    padding: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonOne: {
    borderRadius: 5,
  },
  customizeButtonOne: {
    backgroundColor: "#555",
    padding: 10,
  },
  buttonTextOne: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonTwo: {
    marginTop: 20,
    borderRadius: 5,
  },
  customizeButtonTwo: {
    backgroundColor: "#555",
    padding: 10,
  },
  buttonTextTwo: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default CreateOrganization;
