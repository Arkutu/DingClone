import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { OrganizationContext } from "../context/OrganizationContext";

const ExistingOrganizations = ({ navigation }) => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedOrganizationId } = useContext(OrganizationContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#ccc" },
      headerStyle: { backgroundColor: "#ccc" },
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
            <Text style={styles.textTop}>Organizations</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User data:", userData);

          if (userData.organizations) {
            console.log("Organizations array:", userData.organizations);
            // Trim organization names to remove trailing spaces
            const trimmedOrganizations = userData.organizations.map((org) =>
              org.trim()
            );
            setOrganizations(trimmedOrganizations);
          } else {
            setOrganizations([]);
          }
        }
      } catch (error) {
        Alert.alert("Error fetching organizations", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const handleDelete = async (organizationName) => {
    try {
      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);

      // Remove organization from the user's document
      await updateDoc(userRef, {
        organizations: arrayRemove(organizationName),
      });

      // Remove organization from state
      setOrganizations((prevOrganizations) =>
        prevOrganizations.filter((org) => org !== organizationName)
      );

      Alert.alert("Organization deleted successfully");
    } catch (error) {
      Alert.alert("Error deleting organization", error.message);
    }
  };

  const handleOrganizationPress = (organizationName) => {
    setSelectedOrganizationId(organizationName);
    navigation.navigate("MainHome", { organizationName });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={organizations}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleOrganizationPress(item)}
          >
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.organizationText}>{item}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => handleDelete(item)}
                >
                  <Ionicons name="trash-bin" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 14,
  },
  textTop: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
  },
  card: {
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  organizationText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
});

export default ExistingOrganizations;
