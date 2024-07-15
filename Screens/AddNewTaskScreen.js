import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const CreateTaskScreen = ({ navigation, route }) => {
  const { projectId } = route.params; // Ensure projectId is passed through route.params
  const [taskTitle, setTaskTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);
  
  // Assuming you have a way to get the current organizationId, e.g., from context or auth user details
  const currentUser = auth.currentUser;
  const organizationId = currentUser?.organizations?.[0]; // Assuming user belongs to only one organization

  useEffect(() => {
    const fetchUsers = async () => {
      if (organizationId) {
        const q = query(collection(db, 'users'), where('organizations', 'array-contains', organizationId));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      }
    };

    fetchUsers();
  }, [organizationId]);

  const handleCreateTask = async () => {
    if (!taskTitle || !assignedTo) {
      Alert.alert('Please enter a task title and select a user');
      return;
    }

    try {
      const taskRef = await addDoc(collection(db, 'taskmanage'), {
        title: taskTitle,
        assignedTo: assignedTo,
        projectId: projectId,
        status: 'Not Started',
        createdAt: new Date(),
      });

      Alert.alert('Success', 'Task created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const userOptions = users.map(user => ({
    label: user.displayName || user.email,
    value: user.uid,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        placeholderTextColor="#888"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <RNPickerSelect
        onValueChange={(value) => setAssignedTo(value)}
        items={userOptions}
        placeholder={{ label: 'Select a user...', value: null }}
        style={pickerSelectStyles}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#0d6efd',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: '#000',
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0d6efd',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
});

export default CreateTaskScreen;
