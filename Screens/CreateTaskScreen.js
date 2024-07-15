import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import fetchOrganizationUsers from '../utils/fetchOrganizationUsers';
import { OrganizationContext } from '../context/OrganizationContext';
import { useProject } from '../context/ProjectContext';
import { createTask } from '../api';  // Make sure this path is correct

const CreateTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedToUserId, setAssignedToUserId] = useState('');
  const [users, setUsers] = useState([]);

  const { selectedOrganizationId } = useContext(OrganizationContext);
  const { projectId } = useProject();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (selectedOrganizationId) {
          const usersList = await fetchOrganizationUsers(selectedOrganizationId);
          setUsers(usersList);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [selectedOrganizationId]);

  const handleCreateTask = async () => {
    if (!title || !assignedToUserId) {
      Alert.alert('Please enter a task title and select a user');
      return;
    }

    try {
      await createTask({
        title,
        description,
        assignedToUserId,
        projectId,
        organizationId: selectedOrganizationId
      });
      Alert.alert('Success', 'Task created successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating task:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Task</Text>
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
      <Picker
        selectedValue={assignedToUserId}
        onValueChange={(itemValue) => setAssignedToUserId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a user..." value="" />
        {users.map(user => (
          <Picker.Item key={user.id} label={user.displayName || user.email} value={user.id} />
        ))}
      </Picker>
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
  picker: {
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

export default CreateTaskScreen;
