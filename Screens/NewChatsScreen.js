import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { OrganizationContext } from "../context/OrganizationContext";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";

const NewChatsScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { selectedOrganizationId } = useContext(OrganizationContext);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: { color: "#fff" },
      headerTintColor: "black",
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
            <Text style={styles.textTop}>New Chats</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedOrganizationId) {
        console.log("No organization selected");
        setLoading(false);
        return;
      }

      console.log("Selected Organization ID:", selectedOrganizationId);
      try {
        const orgDoc = await getDoc(
          doc(db, "organizations", selectedOrganizationId.trim())
        );
        if (!orgDoc.exists()) {
          console.log("Organization document does not exist");
          setMembers([]);
          return;
        }

        const membersData = orgDoc.data().members || [];
        console.log("Members Data:", membersData);

        if (membersData.length === 0) {
          console.log("No members in the organization");
          setMembers([]);
          return;
        }

        const userPromises = membersData.map((memberId) =>
          getDoc(doc(db, "users", memberId))
        );
        const users = await Promise.all(userPromises);
        const members = users.map((user) => ({
          uid: user.id,
          displayName: user.data().displayName,
        }));
        console.log("Fetched Members:", members);
        setMembers(members);
        setFilteredMembers(members);
      } catch (error) {
        console.error("Error fetching members:", error);
        Alert.alert("Error", "Failed to fetch members.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [selectedOrganizationId]);

  useEffect(() => {
    const filtered = members.filter((member) =>
      member.displayName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchText, members]);

  const startChat = (member) => {
    navigation.navigate("Chat", {
      recipientId: member.uid,
      recipientName: member.displayName,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#555" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.searchContainer}>
        <View style={styles.icon}>
          <AntDesign name="search1" size={18} color="gray" />
        </View>
        <TextInput
          placeholder="Search members..."
          placeholderTextColor={"gray"}
          value={searchText}
          onChange={setSearchText}
          //onSubmitEditing={} //! Set this to the enter key
          style={styles.search}
        />
      </View>

      <ScrollView>
        {filteredMembers.map((member, index) => (
          <TouchableOpacity
            key={index}
            style={styles.memberItem}
            activeOpacity={0.5}
            onPress={() => startChat(member)}
          >
            <Text style={styles.memberName}>{member.displayName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  textTop: {
    fontSize: 23,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
    marginRight: 10,
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  search: {
    position: "absolute",
    width: "94%",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 4,
    fontSize: 16,
    paddingHorizontal: 40,
    color: "#333",
    marginLeft: 10,
    zIndex: 0,
  },
  icon: {
    marginLeft: 20,
    zIndex: 1,
  },

  //? Your styling
  memberItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  memberName: {
    // color: "#FFF",
    color: "#555",
    fontSize: 16,
    flex: 1, //? Why always flex: 1
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default NewChatsScreen;
