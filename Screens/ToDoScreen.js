import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ToDoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), text: taskText }]);
    setTaskText('');
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        placeholderTextColor="#888"
        value={taskText}
        onChangeText={setTaskText}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072d',
    padding: 20,
  },
  input: {
    backgroundColor: '#1a1a2e',
    color: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  taskList: {
    marginTop: 20,
  },
  taskContainer: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ToDoScreen;
