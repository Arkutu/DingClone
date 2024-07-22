import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { Ionicons, FontAwesome6, Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { useAppContext } from "../context/AppContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const screenWidth = Dimensions.get("window").width;

const Work = ({ navigation }) => {
  const [channels, setChannels] = useState([]);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const { orgName, setOrgName } = useAppContext();
  const [activeSection, setActiveSection] = useState(0);
  const scrollViewRef = React.createRef();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#333" },
      headerLeft: () => <View></View>,
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          //   onPress={() => navigation.navigate("UserInformation")}
          //   onPress={() => navigation.navigate("AddNewTask")}
          onPress={() => navigation.navigate("CreateOrganization")}
        >
          <View style={styles.iconTop}>
            <Entypo name="add-to-list" size={30} color="black" />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Fetch channels and organization members
  useEffect(() => {
    const fetchChannelsAndMembers = async () => {
      try {
        // Fetch channels
        const channelsSnapshot = await getDocs(
          collection(db, "organizations", orgName, "channels")
        );
        const fetchedChannels = channelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChannels(fetchedChannels);

        // Fetch organization members (simplified for this example)
        const membersSnapshot = await getDocs(
          collection(db, "organizations", orgName, "members")
        );
        const fetchedMembers = membersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrganizationMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching channels and members:", error);
      }
    };

    fetchChannelsAndMembers();
  }, [orgName]);

  const openChannel = (channel) => {
    navigation.navigate("Chat", {
      channelName: channel.name,
      channelDescription: channel.description,
      isDirectMessage: false,
    });
  };

  const handleSectionChange = (index) => {
    scrollViewRef.current.scrollTo({ x: index * screenWidth });
    setActiveSection(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.navBar}>
        {[
          { name: "location", icon: "location-outline" },
          { name: "phone", icon: "person-outline" },
          { name: "video call", icon: "call-outline" },
          { name: "cloud", icon: "cloud-outline" },
          { name: "messages", icon: "chatbubbles-outline" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSectionChange(index)}
            style={styles.navItem}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={activeSection === index ? "#007bff" : "#555"}
            />
            <View
              style={[
                styles.selectionBorder,
                activeSection === index && styles.activeSelectionBorder,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Sections */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const sectionIndex = Math.floor(contentOffsetX / screenWidth);
          setActiveSection(sectionIndex);
        }}
        scrollEventThrottle={16}
      >
        <ImageBackground
          source={require("../assets/1.png")}
          style={styles.section}
        >
          <Text style={styles.sectionText}>Phone</Text>
          <Text>Phone</Text>

          <Text>Walker</Text>
        </ImageBackground>

        <ImageBackground
          source={require("../assets/3.png")}
          style={styles.section}
        >
          <Text style={styles.sectionText}>Location</Text>
        </ImageBackground>

        <ImageBackground
          source={require("../assets/4.png")}
          style={styles.section}
        >
          <Text style={styles.sectionText}>Video Call</Text>
        </ImageBackground>

        <ImageBackground
          source={require("../assets/5.png")}
          style={styles.section}
        >
          <Text style={styles.sectionText}>Cloud</Text>
        </ImageBackground>

        <ImageBackground
          source={require("../assets/2.png")}
          style={styles.section}
        >
          <Text style={styles.sectionText}>Messages</Text>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  iconTop: {
    marginRight: 15,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  selectionBorder: {
    width: 24,
    height: 2,
    backgroundColor: "transparent",
    marginTop: 5,
  },
  activeSelectionBorder: {
    backgroundColor: "#007bff",
  },
  section: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  sectionText: {
    fontSize: 18,
    color: "#333",
  },
});

export default Work;
