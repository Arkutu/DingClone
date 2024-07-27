import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { UserContext } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { AntDesign, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import MenuComponent from "../components/MenuComponent";
import { StatusBar } from "expo-status-bar";

const screenWidth = Dimensions.get("window").width;

const MainHome = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const { selectedMembers, setSelectedMembers, organizationName } =
    useAppContext();
  const [directMessages, setDirectMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const scrollViewRef = React.createRef();
  const route = useRoute();
  const [channels, setChannels] = useState([
    {
      name: "general",
      description:
        "General is a messaging app for groups of people who work together. You can send updates, share files, and organize conversations so that everyone is in the loop.",
    },
    {
      name: "meeting",
      description:
        "Meeting channel for discussing various topics and holding meetings.",
    },
    {
      name: "random",
      description: "Random channel for off-topic discussions and fun.",
    },
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              email: userData.email || currentUser.email,
              displayName: userData.displayName || currentUser.displayName,
              photoURL: userData.photoURL || currentUser.photoURL,
            });
          } else {
            setUser({
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No user is signed in.");
      }
    };

    fetchUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.userInfoContainer}
        >
          <View style={styles.imgTop}>
            <Image
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/avart.png")
              }
              style={styles.avatar}
            />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.displayName || "Anonymous"}
            </Text>
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.iconTop}
            onPress={toggleMenu}
          >
            <AntDesign name="plus" size={30} color="black" />
          </TouchableOpacity>

          <MenuComponent
            isVisible={isMenuVisible}
            onClose={toggleMenu}
            navigation={navigation}
          />
        </View>
      ),
    });
  }, [navigation, isMenuVisible, user]);

  useEffect(() => {
    const fetchDirectMessages = async () => {
      try {
        const dmsSnapshot = await getDocs(
          collection(db, "users", user.uid, "directMessages")
        );
        const fetchedDMs = dmsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDirectMessages(fetchedDMs);
      } catch (error) {
        console.error("Error fetching direct messages:", error);
      }
    };

    fetchDirectMessages();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch direct messages
        const dmsSnapshot = await getDocs(
          collection(db, "users", user.uid, "directMessages")
        );
        const fetchedDMs = dmsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDirectMessages(fetchedDMs);

        // Fetch channels
        const channelsSnapshot = await getDocs(
          collection(db, "organizations", organizationName, "channels")
        );
        const fetchedChannels = channelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChannels(fetchedChannels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, organizationName]);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const startChat = async (member) => {
    try {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        directMessages: [...selectedMembers, member.uid],
      });
      setSelectedMembers([...selectedMembers, member.uid]);
      navigation.navigate("Chat", {
        recipientId: member.uid,
        recipientName: member.displayName,
        isDirectMessage: true,
      });
    } catch (error) {
      console.error("Error saving direct message member:", error);
    }
  };

  const filteredDirectMessages = directMessages.filter((dm) =>
    dm.recipientName.toLowerCase().includes(searchText.toLowerCase())
  );

  const openChannel = (channel) => {
    navigation.navigate("Chat", {
      channelName: channel.name,
      channelDescription: channel.description,
      isDirectMessage: false,
    });
  };

  const handleSectionChange = (index) => {
    scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
    setActiveSection(index);
  };

  const handleSearch = () => {
    navigation.navigate("Search", { searchText });
  };

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar />
      <View style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.searchContainer}
          onPress={handleSearch}
        >
          <View style={styles.search}>
            <View>
              <AntDesign name="search1" size={20} color="gray" />
            </View>
            <Text style={styles.searchText}>Search...</Text>
          </View>
        </TouchableOpacity>

        <View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.actionContainer}>
              <View style={styles.actionInner}>
                <Text
                  style={styles.actions}
                  onPress={() => navigation.navigate("CalendarScreen")}
                >
                  Calendar
                </Text>
                <Text
                  style={styles.actions}
                  onPress={() => navigation.navigate("ToDo")}
                >
                  To-do
                </Text>
                <Text
                  style={styles.actions}
                  onPress={() => navigation.navigate("Docs")}
                >
                  Docs
                </Text>
                <Text
                  style={styles.actionsLast}
                  onPress={() => navigation.navigate("ExistingOrganizations")}
                >
                  Organizations
                </Text>
                <Text
                  style={styles.actionsLast}
                  onPress={() => navigation.navigate()}
                >
                  Users
                </Text>
              </View>
            </View>
          </ScrollView>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <View style={styles.navBar}>
              {["All", "Messages", "Chats", "Channels", "Friends"].map(
                (title, index) => (
                  <TouchableOpacity
                    key={title}
                    onPress={() => handleSectionChange(index)}
                    style={[
                      styles.navItem,
                      activeSection === index
                        ? styles.activeNavItem
                        : styles.inactiveNavItem,
                    ]}
                  >
                    <Text
                      style={
                        activeSection === index
                          ? styles.activeNavText
                          : styles.inactiveNavText
                      }
                    >
                      {title}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(e) => {
            const contentOffsetX = e.nativeEvent.contentOffset.x;
            const index = Math.floor(contentOffsetX / screenWidth);
            setActiveSection(index);
          }}
        >
          {/* All */}
          <View style={styles.pageContainer}>
            {/* AI */}
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.imgContainer}
                onPress={() => navigation.navigate("Aichat")}
              >
                <Image
                  source={require("../assets/ocicon.png")}
                  style={styles.img}
                />

                <View style={styles.aitext}>
                  <Text style={styles.ai}>OfficeComms Assisstant AI</Text>
                  <Text style={styles.AI}>The Experience</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Button to navigate you to users */}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.floatingButton}
              onPress={() => navigation.navigate("NewChatsScreen")}
            >
              <FontAwesome6 name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <View style={styles.pageContainer}>
            {/* I think something is missing here */}
            <FlatList
              data={directMessages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.messageItem}
                  onPress={() => startChat(item)}
                >
                  <Image
                    source={
                      item.photoURL
                        ? { uri: item.photoURL }
                        : require("../assets/avart.png")
                    }
                    style={styles.avatar}
                  />
                  <Text style={styles.messageText}>{item.recipientName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Chats */}
          <View style={styles.pageContainer}>
            {/* I'm think of removing this but i will leave it for displaying chats */}

            {/* Button to navigate you to users */}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.floatingButton}
              onPress={() => navigation.navigate("NewChatsScreen")}
            >
              <FontAwesome6 name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Channels */}
          <View style={styles.pageContainer}>
            {/* General, Meetings and Random Chats */}
            {channels.map((channel, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                style={styles.channelItem}
                onPress={() => openChannel(channel)}
              >
                <Text style={styles.channelName}># {channel.name}</Text>

                <MaterialIcons
                  name="arrow-forward-ios"
                  size={18}
                  color="#333"
                />
              </TouchableOpacity>
            ))}

            {/* Browse Channel */}
            <TouchableOpacity
              style={styles.addChannel}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("ChannelBrowser")}
            >
              <Text style={styles.addChannelText}>Browse Channel</Text>
            </TouchableOpacity>
          </View>

          {/* Friends */}
          <View style={styles.pageContainer}>
            {/* Will display user friends */}
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.5}
              onPress={() => navigation.navigate()}
            >
              <Text style={styles.addButtonText}>Find Friends</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 8,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    marginLeft: 5,
    color: "gray",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  imgTop: {
    borderWidth: 2,
    borderColor: "#444",
    borderRadius: 50,
    padding: 2,
  },
  userInfo: {
    marginLeft: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconTop: {
    marginRight: 10,
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  actions: {
    marginHorizontal: 10,
    color: "#007bff",
    fontWeight: "bold",
  },
  actionsLast: {
    marginHorizontal: 10,
    color: "#007bff",
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
  },
  navItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeNavItem: {
    backgroundColor: "#007bff",
  },
  inactiveNavItem: {
    backgroundColor: "#f8f9fa",
  },
  activeNavText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveNavText: {
    color: "#007bff",
  },
  pageContainer: {
    width: screenWidth,
    padding: 10,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  messageText: {
    fontWeight: "bold",
    color: "#000",
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  channelName: {
    fontWeight: "bold",
    color: "#000",
  },
  addChannel: {
    width: 160,
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    top: 245,
    left: 180,
  },
  addChannelText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "800",
  },
  //? AI
  imgContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "#ddd",
  },
  aitext: {
    marginLeft: 10,
  },
  ai: {
    fontSize: 16,
    color: "#444",
  },
  AI: {
    fontSize: 14,
    color: "#555",
  },
  //? Floating Button Styling
  floatingButton: {
    position: "absolute",
    top: 430,
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
  //?Find friends
  addButton: {
    width: 160,
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    top: 430,
    left: 180,
  },
  addButtonText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "800",
  },
});

export default MainHome;
