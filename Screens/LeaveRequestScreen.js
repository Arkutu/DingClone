import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserContext } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const LeaveRequestScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [reason, setReason] = useState("");

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
          <Text style={styles.textTop}>Request</Text>
        </View>
      ),
    });
  }, [navigation]);

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "leaverequests"), {
        userId: user.uid,
        requestDate: Timestamp.now(),
        leaveStartDate: Timestamp.fromDate(new Date(leaveStartDate)),
        leaveEndDate: Timestamp.fromDate(new Date(leaveEndDate)),
        status: "pending",
        reason: reason,
      });
      setLeaveStartDate("");
      setLeaveEndDate("");
      setReason("");
      alert("Leave request submitted successfully!");
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.innerContainer}>
        <StatusBar />
        <Text style={styles.title}>Submit Leave Request</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={leaveStartDate}
            onChangeText={setLeaveStartDate}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="End Date (YYYY-MM-DD)"
            value={leaveEndDate}
            onChangeText={setLeaveEndDate}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Reason"
            value={reason}
            onChangeText={setReason}
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  textTop: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
  },
  innerContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "#eee",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 50,
  },
  inputContainer: {
    paddingVertical: 20,
    paddingHorizontal: 6,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eee",
    paddingHorizontal: 10,
    color: "#333",
    backgroundColor: "#eee",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#555",
    backgroundColor: "#555",
    padding: 13,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#eee",
    fontSize: 17,
  },
});

export default LeaveRequestScreen;
