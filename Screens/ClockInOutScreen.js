import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserContext } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const ClockInOutScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [attendanceDocId, setAttendanceDocId] = useState(null);

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
          <Text style={styles.textTop}>Clock In&Out</Text>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const checkIfClockedIn = async () => {
      const q = query(
        collection(db, "attendance"),
        where("userId", "==", user.uid),
        orderBy("clockIn", "desc"),
        limit(1)
      );
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestDoc = querySnapshot.docs[0];
          if (latestDoc.data().clockOut === null) {
            setClockedIn(true);
            setClockInTime(latestDoc.data().clockIn);
            setAttendanceDocId(latestDoc.id);
          }
        }
      } catch (error) {
        console.error("Error checking if clocked in:", error);
      }
    };

    checkIfClockedIn().catch((error) =>
      console.error("Error in useEffect:", error)
    );
  }, [user.uid]);

  const handleClockIn = async () => {
    const currentTime = Timestamp.now();
    setClockInTime(currentTime);
    setClockedIn(true);

    try {
      const docRef = await addDoc(collection(db, "attendance"), {
        userId: user.uid,
        clockIn: currentTime,
        clockOut: null,
      });
      setAttendanceDocId(docRef.id);
    } catch (error) {
      console.error("Error clocking in:", error);
    }
  };

  const handleClockOut = async () => {
    const currentTime = Timestamp.now();
    setClockedIn(false);

    try {
      await updateDoc(doc(db, "attendance", attendanceDocId), {
        clockOut: currentTime,
      });
    } catch (error) {
      console.error("Error clocking out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.avatar}
            />
          )}
          <Text style={styles.name}>{user.displayName || "User Name"}</Text>
        </View>

        <Text style={styles.title}>Attendance Management</Text>

        <View style={styles.buttonContainer}>
          {!clockedIn ? (
            <TouchableOpacity style={styles.button} onPress={handleClockIn}>
              <Text style={styles.buttonText}>Clock In</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button]} onPress={handleClockOut}>
              <Text style={styles.buttonText}>Clock Out</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LeaveRequestScreen")}
          >
            <Text style={styles.buttonText}>Request Leave</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AttendanceChart")}
          >
            <Text style={styles.buttonText}>View Attendance Chart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
  },
  innerContainer: {
    padding: 10,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    color: "#eee",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 50,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
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

export default ClockInOutScreen;
