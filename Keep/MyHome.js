//?????????????????????? Trying code ??????????????
import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
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
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
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
  const [channels, setChannels] = useState([]);
  const scrollViewRef = useRef(null);
  const route = useRoute();
  const [activeSection, setActiveSection] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Profile")}
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
              {user?.displayName || "User Name"}
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
  }, [navigation, isMenuVisible]);

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
              email: currentUser.email,
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
  }, [setUser]);

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

    if (user?.uid && organizationName) {
      fetchData();
    }
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.searchContainer}
          onPress={() => navigation.navigate("Search")}
        >
          <View style={styles.search}>
            <AntDesign name="search1" size={20} color="gray" />
            <Text style={styles.searchText}>Search...</Text>
          </View>
        </TouchableOpacity>

        <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.channelContainer}>
            <View style={styles.containerChannel}>
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
                style={styles.actionsLast}
                onPress={() => navigation.navigate("Docs")}
              >
                Docs
              </Text>
              <FlatList
                data={channels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => openChannel(item)}
                    style={styles.channelItem}
                  >
                    <Text style={styles.channelName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                horizontal
                contentContainerStyle={styles.flatListContent}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => handleSectionChange(0)}
            style={styles.navItem}
          >
            <Text
              style={
                activeSection === 0 ? styles.activeNavText : styles.navText
              }
            >
              All
            </Text>
            {activeSection === 0 && <View style={styles.activeBorder} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSectionChange(1)}
            style={styles.navItem}
          >
            <Text
              style={
                activeSection === 1 ? styles.activeNavText : styles.navText
              }
            >
              Messages
            </Text>
            {activeSection === 1 && <View style={styles.activeBorder} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSectionChange(2)}
            style={styles.navItem}
          >
            <Text
              style={
                activeSection === 2 ? styles.activeNavText : styles.navText
              }
            >
              Channels
            </Text>
            {activeSection === 2 && <View style={styles.activeBorder} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSectionChange(3)}
            style={styles.navItem}
          >
            <Text
              style={
                activeSection === 3 ? styles.activeNavText : styles.navText
              }
            >
              Chats
            </Text>
            {activeSection === 3 && <View style={styles.activeBorder} />}
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const sectionIndex = Math.floor(contentOffsetX / screenWidth);
            setActiveSection(sectionIndex);
          }}
        >
          <View style={styles.section}>
            <Text>All Section Content</Text>
          </View>
          <View style={styles.section}>
            <FlatList
              data={filteredDirectMessages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => startChat(item)}
                  style={styles.messageItem}
                >
                  <Image
                    source={{ uri: item.recipientPhotoURL }}
                    style={styles.messageAvatar}
                  />
                  <View style={styles.messageContent}>
                    <Text style={styles.messageName}>{item.recipientName}</Text>
                    <Text style={styles.messageText}>{item.lastMessage}</Text>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
          <View style={styles.section}>
            <FlatList
              data={channels}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => openChannel(item)}
                  style={styles.channelItem}
                >
                  <Text style={styles.channelName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
          <View style={styles.section}>
            <Text>Chats Section Content</Text>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    padding: 16,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgTop: {
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  iconTop: {
    padding: 10,
  },
  searchContainer: {
    marginBottom: 16,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  searchText: {
    marginLeft: 8,
    color: "gray",
  },
  scrollViewContent: {
    flexDirection: "row",
  },
  channelContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
  containerChannel: {
    flex: 1,
  },
  actions: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionsLast: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#00f",
  },
  channelItem: {
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  channelName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  navText: {
    fontSize: 16,
    color: "gray",
  },
  activeNavText: {
    fontSize: 16,
    color: "#00f",
    fontWeight: "bold",
  },
  activeBorder: {
    height: 2,
    backgroundColor: "#00f",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  section: {
    width: screenWidth,
    padding: 16,
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageText: {
    color: "gray",
  },
  flatListContent: {
    paddingVertical: 10,
  },
});

export default MainHome;
