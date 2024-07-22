import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { useRoute } from "@react-navigation/native";

const Activity = ({ navigation }) => {
  const { user } = useContext(UserContext); // Assuming you have a UserContext to provide the logged-in user
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("Fetching notifications for user:", user.uid);
        const q = query(
          collection(db, "notifications"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        let notificationsData = [];
        querySnapshot.forEach((doc) => {
          notificationsData.push({ id: doc.id, ...doc.data() });
        });

        console.log("Fetched Notifications:", notificationsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.uid) {
      fetchNotifications();
    } else {
      console.log("No user logged in.");
      setLoading(false);
    }
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      console.log("Marking notification as read:", notificationId);
      const notificationRef = doc(db, "notifications", notificationId);
      await updateDoc(notificationRef, { read: true });
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationContainer,
        item.read ? styles.read : styles.unread,
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp.seconds * 1000).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text>No notifications available</Text>
      )}

      {/* Navigation bar */}
      <Navbar navigation={navigation} currentRoute={route.name} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6F8FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F8FA",
  },
  list: {
    paddingBottom: 20,
  },
  notificationContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  read: {
    opacity: 0.5,
  },
  unread: {
    opacity: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    marginVertical: 5,
  },
  timestamp: {
    fontSize: 14,
    color: "#7E7E7E",
  },
});

export default Activity;
