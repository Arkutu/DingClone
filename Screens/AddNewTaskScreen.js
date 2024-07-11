import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const AddNewTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    const userId = auth.currentUser.uid;
    const dueDate = Timestamp.fromDate(date); // Convert date to Firestore Timestamp
    const newTask = { title, time, userId, dueDate };

    try {
      await addDoc(collection(db, 'tasks'), newTask);
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={24} color="white" onPress={goBack} style={styles.icon} />
      <Text style={styles.headerText}>Add New Task</Text>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor={"gray"}
      />
      <Text style={styles.label}>Task Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="Enter task time"
        placeholderTextColor={"gray"}
      />
      <Text style={styles.label}>Due Date</Text>
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>{moment(date).format('DD MMM YYYY')}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#101223',
  },
  icon: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 18,
    marginBottom: 12,
    color: 'black',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    marginTop: 10,
  },
  datePickerText: {
    fontSize: 18,
    color: '#333333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 50,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddNewTaskScreen;
