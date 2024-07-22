import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserContext } from "../context/UserContext";

const defaultChannels = [
  {
    name: "general",
    description: "General channel for general discussions.",
    visibility: "Public",
  },
  {
    name: "meeting",
    description: "Channel for meetings.",
    visibility: "Public",
  },
  {
    name: "random",
    description: "Channel for random discussions.",
    visibility: "Public",
  },
];

const ChannelBrowser = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [channels, setChannels] = useState(defaultChannels);
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Workspace Browser",
      headerTitleStyle: {
        color: "#555",
        marginLeft: 30,
        justifyContent: "center",
      },
      headerStyle: { backgroundColor: "#fff" },
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
            <Text style={styles.memberCount}>{channels.length} cha...</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchChannels = async () => {
      const querySnapshot = await getDocs(collection(db, "channels"));
      const channelsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const allChannels = [...defaultChannels, ...channelsData];
      setChannels(allChannels);
    };

    fetchChannels();
  }, []);

  const handleAddChannel = async () => {
    const newChannel = {
      name: `new-channel-${Date.now()}`, // Replace with your desired channel name logic
      description: "Newly created channel.",
      visibility: "Public",
      createdAt: new Date(),
    };
    await addDoc(collection(db, "channels"), newChannel);
    setChannels((prevChannels) => [...prevChannels, newChannel]);
  };

  const filteredChannels = channels.filter(
    (channel) =>
      channel.name &&
      channel.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.icon}>
          <AntDesign name="search1" size={18} color="gray" />
        </View>
        <TextInput
          placeholder="Search for channels"
          placeholderTextColor={"gray"}
          value={searchText}
          onChangeText={setSearchText}
          style={styles.search}
        />
      </View>

      <ScrollView>
        {filteredChannels.map((channel, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={index}
            style={styles.channelItem}
            onPress={() =>
              navigation.navigate("Chat", {
                channelName: channel.name,
                channelDescription: channel.description,
              })
            }
          >
            <Text style={styles.channelName}>#{channel.name}</Text>
            <Text style={styles.channelStatus}>
              {channel.visibility === "Public"
                ? "Public Channel"
                : `Private Channel - ${channel.members?.length || 0} members`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddChannel}>
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  memberCount: {
    color: "#888",
    marginRight: 10,
    fontSize: 16,
    textAlign: "center",
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
    borderColor: "#eee",
    borderRadius: 5,
    backgroundColor: "#eee",
    padding: 4,
    fontSize: 16,
    paddingHorizontal: 30,
    color: "#333",
    marginLeft: 10,
    zIndex: 0,
  },
  icon: {
    marginLeft: 20,
    zIndex: 1,
  },
  channelItem: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  channelName: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  channelStatus: {
    color: "#888",
    fontSize: 14,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2b68e6",
    borderRadius: 30,
    padding: 15,
  },
});

export default ChannelBrowser;
