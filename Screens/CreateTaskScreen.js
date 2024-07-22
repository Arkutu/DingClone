import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import fetchOrganizationUsers from "../utils/fetchOrganizationUsers";
import { OrganizationContext } from "../context/OrganizationContext";
import { useProject } from "../context/ProjectContext";
import { createTask } from "../api"; // Make sure this path is correct
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToUserId, setAssignedToUserId] = useState("");
  const [users, setUsers] = useState([]);

  const { selectedOrganizationId } = useContext(OrganizationContext);
  const { projectId } = useProject();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: {
        backgroundColor: "#ccc",
      },
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
      headerRight: () => {
        return (
          <View>
            <Text style={styles.textTop}>Tasks</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (selectedOrganizationId) {
          const usersList = await fetchOrganizationUsers(
            selectedOrganizationId
          );
          setUsers(usersList);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [selectedOrganizationId]);

  const handleCreateTask = async () => {
    if (!title || !assignedToUserId) {
      Alert.alert("Please enter a task title and select a user");
      return;
    }

    try {
      await createTask({
        title,
        description,
        assignedToUserId,
        projectId,
        organizationId: selectedOrganizationId,
      });
      Alert.alert("Success", "Task created successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating task:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <View style={styles.innerContainer}>
              <TextInput
                style={styles.input}
                placeholder="Task Title"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
              />

              <View style={styles.taskContainer}>
                <Picker
                  selectedValue={assignedToUserId}
                  onValueChange={(itemValue) => setAssignedToUserId(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select a user..." value="" />
                  {users.map((user) => (
                    <Picker.Item
                      key={user.id}
                      label={user.displayName || user.email}
                      value={user.id}
                    />
                  ))}
                </Picker>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCreateTask}
                >
                  <Text style={styles.buttonText}>Create Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 10,
  },
  textTop: {
    fontSize: 24,
    color: "#555",
    marginRight: 14,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    marginTop: 100,
  },
  input: {
    height: 50,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eee",
    paddingHorizontal: 15,
    color: "#333",
    backgroundColor: "#eee",
    marginBottom: 20,
  },
  taskContainer: {},
  picker: {
    height: 50,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: "#000",
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
  },
  buttonText: {
    color: "#eee",
    fontSize: 17,
  },
});

export default CreateTaskScreen;
