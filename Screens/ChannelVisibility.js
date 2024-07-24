import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserContext } from "../context/UserContext";

const ChannelVisibility = ({ route, navigation }) => {
  const { channelName } = route.params;
  const [visibility, setVisibility] = useState("Public");
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: {
        backgroundColor: "#ccc",
      },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 13 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-sharp" size={28} color="#333" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <Text style={styles.textTop}>Visibility</Text>
        </View>
      ),
    });
  }, [navigation]);

  const createChannel = async () => {
    const newChannel = {
      name: channelName,
      visibility,
      members: visibility === "Private" ? [user.uid] : [],
      createdAt: Timestamp.now(),
    };
    await addDoc(collection(db, "channels"), newChannel);
    navigation.navigate("ChannelBrowser");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setVisibility("Public")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Public - Anyone in OfficeComms</Text>
          {visibility === "Public" && (
            <Ionicons name="checkmark" size={24} color="#00F" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setVisibility("Private")}
          style={styles.option}
        >
          <Text style={styles.optionText}>Private - Only specific people</Text>
          {visibility === "Private" && (
            <Ionicons name="checkmark" size={24} color="#00F" />
          )}
        </TouchableOpacity>

        <View style={styles.btn}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={createChannel}
            style={styles.createBtnContainer}
          >
            <Text style={styles.createButton}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  innerContainer: {
    marginTop: 50,
    padding: 10,
    justifyContent: "center",
  },
  textTop: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
  },
  btn: {
    padding: 10,
  },
  createBtnContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#555",
    backgroundColor: "#555",
    padding: 13,
    alignItems: "center",
    marginTop: 20,
  },
  createButton: {
    color: "#eee",
    fontSize: 17,
  },
  label: {
    color: "#FFF",
    fontSize: 18,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  optionText: {
    color: "#555",
    fontSize: 16,
    flex: 1,
  },
});

export default ChannelVisibility;
