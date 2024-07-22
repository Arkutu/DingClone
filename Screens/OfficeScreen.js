import React, {
  useState,
  useContext,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
  Image,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { UserContext } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useRoute } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const MenuButton = ({ title, onPress, icon: Icon, iconName }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={iconName} size={28} color="#333" style={styles.buttonIcon} />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const OfficeScreen = ({ navigation }) => {
  const { organizationName } = useAppContext();
  const [searchText, setSearchText] = useState("");
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenHeight / 2 + 50)).current;
  const route = useRoute();

  //? Channel
  const [channels, setChannels] = useState([]);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const { orgName, setOrgName } = useAppContext();

  //? Scrolling slider
  const [activeSection, setActiveSection] = useState(0);
  const scrollViewRef = React.createRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Profile")}
          style={styles.userInfoContainer}
        >
          {user && user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={styles.profileImage}
            />
          ) : (
            <Ionicons name="person-circle" size={50} color="#333" />
          )}

          <View style={styles.userInfo}>
            <Text style={styles.userName}>Name</Text>
            {/* <Text style={styles.userName}>{user.displayName}</Text> */}
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Feather name="menu" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  //? Fetch channels and organization members
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

        //? Fetch organization members (simplified for this example)
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

  //? open channel
  const openChannel = (channel) => {
    navigation.navigate("Chat", {
      channelName: channel.name,
      channelDescription: channel.description,
      isDirectMessage: false,
    });
  };

  // const firstLetter = organizationName
  //   ? organizationName.charAt(0).toUpperCase()
  //   : "";

  // const getActiveRoute = () =>
  //   navigation.getState().routes[navigation.getState().index].name;

  const toggleMenu = () => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: -screenHeight / 2 + 50,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (visible) {
        toggleMenu();
      }
    });

    return unsubscribe;
  }, [navigation, visible]);

  //? Scrolling function
  const handleSectionChange = (index) => {
    scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
    setActiveSection(index);
  };

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{firstLetter}</Text>
            </View>
            <Text style={styles.headerTitle}>{organizationName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              {user && user.photoURL ? (
                <Image
                  source={{ uri: user.photoURL }}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons name="person-circle" size={40} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Jump to or search..."
              placeholderTextColor="#888"
              value={searchText}
              // onChangeText={setSearchText}
            />
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => navigation.navigate("CalendarScreen")}
            >
              <Text style={styles.tabText}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => navigation.navigate("TodoListScreen")}
            >
              <Text style={styles.tabText}>To-do</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => navigation.navigate("DING")}
            >
              <Text style={styles.tabText}>DING</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => navigation.navigate("Docs")}
            >
              <Text style={styles.tabText}>Docs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => navigation.navigate("More")}
            >
              <Text style={styles.tabText}>More</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.mainContent}></View>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("MainHome")}
          >
            <Ionicons
              name="home"
              size={28}
              color={getActiveRoute() === "MainHome" ? "#0d6efd" : "#FFF"}
            />
            <Text
              style={
                getActiveRoute() === "MainHome"
                  ? styles.navTextActive
                  : styles.navTextInactive
              }
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>
              navigation.navigate("OfficeScreen", { organizationName })
            }
          >
            <MaterialCommunityIcons
              name="office-building"
              size={28}
              color={getActiveRoute() === "OfficeScreen" ? "#0d6efd" : "#FFF"}
            />
            <Text
              style={
                getActiveRoute() === "OfficeScreen"
                  ? styles.navTextActive
                  : styles.navTextInactive
              }
            >
              Office
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Activity")}
          >
            <Ionicons
              name="notifications"
              size={28}
              color={getActiveRoute() === "Activity" ? "#0d6efd" : "#FFF"}
            />
            <Text
              style={
                getActiveRoute() === "Activity"
                  ? styles.navTextActive
                  : styles.navTextInactive
              }
            >
              Activity
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView> */}

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => handleSectionChange(0)}
          style={styles.navItem}
        >
          <Text
            style={activeSection === 0 ? styles.activeNavText : styles.navText}
          >
            Channel
          </Text>
          {activeSection === 0 && <View style={styles.activeBorder} />}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSectionChange(1)}
          style={styles.navItem}
        >
          <Text
            style={activeSection === 1 ? styles.activeNavText : styles.navText}
          >
            Organization
          </Text>
          {activeSection === 1 && <View style={styles.activeBorder} />}
        </TouchableOpacity>
      </View>

      {/* Scrollable Sections */}
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
        scrollEventThrottle={16}
      >
        {/* Channel */}
        <View style={styles.section}>
          <FlatList
            data={channels}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => openChannel(item)}
                style={styles.channelItem}
              >
                <Text style={styles.channelName}>#{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Organization */}
        <View style={styles.section}>
          {/* <Text style={styles.sectionText}>Content for Section 2</Text> */}
          <FlatList
            data={organizationMembers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.memberItem}>
                <Text style={styles.memberName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* Channels and add team */}
      <Text style={styles.organizationName}>{organizationName}</Text>

      <View style={styles.chaOrgContainer}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("ChannelBrowser")}
        >
          <Text style={styles.addButtonText}>Add Channel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addTeam}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("MembersScreen")}
        >
          <Text style={styles.addTeamText}>Add Teammates</Text>
        </TouchableOpacity>
      </View>

      {/* ShowDown menu */}
      {visible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={visible}
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity style={styles.overlay} onPress={toggleMenu}>
            <Animated.View
              style={[
                styles.dropdown,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Text style={styles.dropdownTitle}>Menu</Text>

              <View style={styles.row}>
                <MenuButton
                  title="New Chat"
                  icon={Ionicons}
                  iconName="chatbox-outline"
                  onPress={() => {
                    navigation.navigate("NewChatsScreen");
                    toggleMenu();
                  }}
                />
                {/* <MenuButton
                  title="Add Contact"
                  icon={AntDesign}
                  iconName="contacts"
                /> */}
                <MenuButton
                  title="Clock In/Out"
                  icon={Feather}
                  iconName="clock"
                  onPress={() => {
                    navigation.navigate("ClockInOutScreen");
                    toggleMenu();
                  }}
                />
                <MenuButton
                  title="Scan QR Code"
                  icon={AntDesign}
                  iconName="qrcode"
                  onPress={() => {
                    navigation.navigate("ScanQRCodeScreen");
                    toggleMenu();
                  }}
                />
              </View>
              <View style={styles.row}>
                <MenuButton
                  title="Create/Join organization"
                  icon={SimpleLineIcons}
                  iconName="organization"
                  onPress={() => {
                    navigation.navigate("CreateOrganization");
                    toggleMenu();
                  }}
                />
                <MenuButton
                  title="Join"
                  icon={MaterialCommunityIcons}
                  iconName="vector-combine"
                  onPress={() => {
                    navigation.navigate("JoinScreen");
                    toggleMenu();
                  }}
                />
                {/* <MenuButton
                  title="Watermark"
                  icon={MaterialCommunityIcons}
                  iconName="watermark"
                  onPress={() => {
                    navigation.navigate("WatermarkScreen");
                    toggleMenu();
                  }}
                /> */}

                <MenuButton
                  title="Start Meeting"
                  icon={MaterialIcons}
                  iconName="meeting-room"
                  onPress={() => {
                    navigation.navigate("VideoCall");
                    toggleMenu();
                  }}
                />
              </View>
              <View style={styles.row}>
                {/* <MenuButton
                  title="Start Meeting"
                  icon={MaterialIcons}
                  iconName="meeting-room"
                  onPress={() => {
                    navigation.navigate("VideoCall");
                    toggleMenu();
                  }}
                /> */}
                <MenuButton
                  title="Start Live"
                  icon={MaterialIcons}
                  iconName="live-tv"
                  onPress={() => {
                    navigation.navigate("StartLiveScreen");
                    toggleMenu();
                  }}
                />
                <MenuButton
                  title="Projects"
                  icon={MaterialIcons}
                  iconName="event"
                  onPress={() => {
                    navigation.navigate("ProjectListScreen");
                    toggleMenu();
                  }}
                />
                <MenuButton
                  title="Create Project"
                  icon={Entypo}
                  iconName="add-to-list"
                  onPress={() => {
                    navigation.navigate("ProjectScreen");
                    toggleMenu();
                  }}
                />
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  //? Header Styling
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  userInfo: {
    marginLeft: 2,
  },
  userName: {
    color: "#555",
    textAlign: "center",
  },
  iconTop: {
    marginRight: 12,
  },

  //?
  // headerContainer: {
  //   backgroundColor: "#1a1a2e",
  //   paddingHorizontal: 20,
  //   paddingTop: 45,
  //   paddingBottom: 10,
  // },
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // iconContainer: {
  //   backgroundColor: "#0d6efd",
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // iconText: {
  //   color: "#FFF",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // headerTitle: {
  //   color: "#FFF",
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
  // profileImage: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  // },
  // searchContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#2b2b40",
  //   paddingHorizontal: 10,
  //   paddingVertical: 8,
  //   borderRadius: 30,
  // },
  // searchInput: {
  //   flex: 1,
  //   color: "#FFF",
  //   marginLeft: 10,
  // },
  // tabsContainer: {
  //   flexDirection: "row",
  //   backgroundColor: "#1a1a2e",
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  // },
  // tabItem: {
  //   marginHorizontal: 10,
  // },
  // tabText: {
  //   color: "#FFF",
  //   fontSize: 16,
  // },
  // mainContent: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  // bottomNav: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   backgroundColor: "#1a1a2e",
  //   paddingVertical: 10,
  // },
  // navItem: {
  //   alignItems: "center",
  // },
  // navTextActive: {
  //   color: "#0d6efd",
  //   fontSize: 12,
  // },
  // navTextInactive: {
  //   color: "#888",
  //   fontSize: 12,
  // },

  //? Scrolling stying
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    // borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 16,
    color: "#555",
  },
  activeNavText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
  },
  activeBorder: {
    marginTop: 5,
    height: 2,
    width: "100%",
    backgroundColor: "#007bff",
  },
  section: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sectionText: {
    fontSize: 18,
    color: "#333",
  },
  //? Channel styling
  organizationName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  channelItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  channelName: {
    fontSize: 16,
  },
  memberItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  memberName: {
    fontSize: 16,
  },
  chaOrgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 15,
  },
  addButton: {
    width: 160,
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  addTeam: {
    width: 160,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "800",
  },
  addTeamText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  //? Show down menu style
  menuButton: {
    padding: 10,
    // marginRight: 2,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdown: {
    position: "absolute",
    top: -50,
    width: "100%",
    height: screenHeight / 2,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 6,
    width: "22%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    marginBottom: 5,
  },
  buttonText: {
    color: "#555",
    fontSize: 12,
    textAlign: "center",
  },
});

export default OfficeScreen;
