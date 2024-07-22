import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import moment from "moment";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";

const TodoListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment().format("DD MMM"));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "black",
      headerLeft: () => {
        return (
          <View style={styles.headerLeft}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.leftIconContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-sharp" size={30} color="#333" />
            </TouchableOpacity>

            <Text style={styles.currentDate}>{currentDate}</Text>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              marginRight: 13,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate()}
            ></TouchableOpacity>

            <Text style={styles.todo}>Do-tasks</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = auth.currentUser.uid;
        const q = query(collection(db, "tasks"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const fetchedTasks = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Task data:", data); // Log the task data

          // Handle different formats of dueDate
          let dueDate;
          if (data.dueDate instanceof Date) {
            dueDate = data.dueDate;
          } else if (data.dueDate.seconds && data.dueDate.nanoseconds) {
            dueDate = new Date(
              data.dueDate.seconds * 1000 + data.dueDate.nanoseconds / 1000000
            );
          } else {
            dueDate = new Date(data.dueDate);
          }

          return {
            id: doc.id,
            ...data,
            dueDate: dueDate,
          };
        });
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddNewTask = () => {
    navigation.navigate("AddNewTask");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {tasks.length === 0 ? (
          <Text style={styles.noTasksText}>No tasks available</Text>
        ) : (
          tasks.map((task, index) => (
            <View key={index} style={styles.taskContainer}>
              <View style={styles.taskContent}>
                <View>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskTime}>{task.time}</Text>
                  <Text style={styles.taskDate}>
                    Due:{" "}
                    {task.dueDate
                      ? moment(task.dueDate).format("DD MMM YYYY")
                      : "N/A"}
                  </Text>
                </View>
                <Pressable onPress={() => handleDeleteTask(task.id)}>
                  <FontAwesome name="trash" size={24} color="red" />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.floatingButton}
        onPress={handleAddNewTask}
      >
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todo: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIconContainer: {
    marginLeft: 13,
  },
  currentDate: {
    marginLeft: 13,
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
  },
  noTasksText: {
    fontSize: 18,
    color: "#ddd",
    textAlign: "center",
    paddingVertical: 250,
  },

  //? Your styling
  scrollView: {
    marginTop: 20,
  },
  taskContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  taskContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskTime: {
    fontSize: 14,
    color: "#7E7E7E",
    marginTop: 5,
  },
  taskDate: {
    fontSize: 14,
    color: "#7E7E7E",
    marginTop: 5,
  },

  //? Floating button
  floatingButton: {
    position: "absolute",
    top: 630,
    right: 20,
    backgroundColor: "#2b68e6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default TodoListScreen;
