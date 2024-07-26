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
import { fonts } from "react-native-elements/dist/config";
import { color } from "react-native-elements/dist/helpers";

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
        // showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Locaiton */}
        <ImageBackground
          source={require("../assets/1.png")}
          style={styles.section}
        >
          <View style={styles.linIcon}>
            <Text style={styles.inText}>OfficeComms Attendance</Text>
            <Text style={styles.inTextNext}>
              Create or join a organization, you will get
            </Text>
          </View>

          <View style={styles.lsectionTextHeader}>
            <View style={styles.textFC}>
              <Text style={styles.textF}>
                Salary calculation efficiency raises
              </Text>
              <Text style={styles.NumOne}>400%</Text>
            </View>

            <View style={styles.textFC}>
              <Text style={styles.textF}>Company expense reduces</Text>
              <Text style={styles.NumOne}>100%</Text>
            </View>
          </View>

          <View style={styles.sectionTextContain}>
            <Text style={styles.sectionText}>
              Check your team status on mobile and generate attendance report in
              one step
            </Text>
          </View>
        </ImageBackground>

        {/* Person */}
        <ImageBackground
          source={require("../assets/3.png")}
          style={styles.section}
        >
          <View style={styles.pinIcon}>
            <Text style={styles.inText}>OfficeComms Approval</Text>
            <Text style={styles.inTextNext}>
              Create or join a organization, you will get
            </Text>
          </View>

          <View style={styles.psectionTextHeader}>
            <View style={styles.textFC}>
              <Text style={styles.textF}>Company OA expense reduces</Text>
              <Text style={styles.NumOne}>$10,000</Text>
            </View>

            <View style={styles.textFC}>
              <Text style={styles.textF}>Approval process raises</Text>
              <Text style={styles.NumOne}>10X</Text>
            </View>
          </View>

          <View style={styles.sectionTextContain}>
            <Text style={styles.sectionText}>
              Customised templates suit all types of business connecting to
              Attendance system and Office
            </Text>
          </View>
        </ImageBackground>

        {/* Video Call */}
        <ImageBackground
          source={require("../assets/4.png")}
          style={styles.section}
        >
          <View style={styles.vcinIcon}>
            <Text style={styles.inText}>Unified Communucation</Text>
            <Text style={styles.inTextNext}>
              Create or join a organization, you will get
            </Text>
          </View>

          <View style={styles.vcsectionTextHeader}>
            <View style={styles.textFC}>
              <Text style={styles.textF}>Company expense reduces</Text>
              <Text style={styles.NumOne}>$10,000</Text>
              <Text style={styles.textF}>/yr</Text>
            </View>

            <View style={styles.textFC}>
              <Text style={styles.textF}>Deployment expense reduces</Text>
              <Text style={styles.NumOne}>99%</Text>
            </View>
          </View>

          <View style={styles.sectionTextContain}>
            <Text style={styles.sectionText}>
              Free internet call and conference for internal and external
              contacts
            </Text>
          </View>
        </ImageBackground>

        {/* Cloud */}
        <ImageBackground
          source={require("../assets/5.png")}
          style={styles.section}
        >
          <View style={styles.inIcon}>
            <Text style={styles.inText}>OfficeComms</Text>
            <Text style={styles.inTextNext}>
              Create or join a organization, you will get
            </Text>
          </View>

          <View style={styles.sectionTextHeader}>
            <View style={styles.textFC}>
              <Text style={styles.textF}>Deployment expense reduces</Text>
              <Text style={styles.NumOne}>$10,000</Text>
            </View>

            <View style={styles.textFC}>
              <Text style={styles.textF}>Daily work saves</Text>
              <Text style={styles.NumOne}>60</Text>
              <Text style={styles.textF}>min/day</Text>
            </View>
          </View>

          <View style={styles.sectionTextContain}>
            <Text style={styles.sectionText}>
              Free with permission management to keep bank level data security
              Easy to store enables collabrate easily with external contacts
            </Text>
          </View>
        </ImageBackground>

        {/* Messages */}
        <ImageBackground
          source={require("../assets/2.png")}
          style={styles.section}
        >
          <View style={styles.minIcon}>
            <Text style={styles.inText}>OfficeComms Mail</Text>
            <Text style={styles.inTextNext}>
              Create or join a organization, you will get
            </Text>
          </View>

          <View style={styles.msectionTextHeader}>
            <View style={styles.textFC}>
              <Text style={styles.textF}>Company expense reduces</Text>
              <Text style={styles.NumOne}>$10,000</Text>
              <Text style={styles.textF}>/yr</Text>
            </View>

            <View style={styles.textFC}>
              <Text style={styles.textF}>Deployment efficiency raises</Text>
              <Text style={styles.NumOne}>90%</Text>
            </View>
          </View>

          <View style={styles.sectionTextContain}>
            <Text style={styles.sectionText}>
              Mobile based management, integrated with IM and one step
              transforming into Office notice
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>

      <View style={styles.chaOrgContainer}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.5}
          onPress={() => navigation.navigate()}
        >
          <Text style={styles.addButtonText}>Find Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addTeam}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("OrganizationScreen")}
        >
          <Text style={styles.addTeamText}>Create organization</Text>
        </TouchableOpacity>
      </View>
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

  // ? Paragraph
  // ? Person
  pinIcon: {
    marginTop: 180,
    width: "100%",
  },
  psectionTextHeader: {
    marginTop: 20,
    marginBottom: 130,
  },

  // ? Location
  linIcon: {
    marginTop: 180,
    width: "100%",
  },
  lsectionTextHeader: {
    marginTop: 20,
    marginBottom: 130,
  },

  //? Message
  minIcon: {
    marginTop: 180,
    width: "100%",
  },
  msectionTextHeader: {
    marginTop: 20,
    marginBottom: 130,
  },

  //? VCall
  vcinIcon: {
    marginTop: 180,
    width: "100%",
  },
  vcsectionTextHeader: {
    marginTop: 20,
    marginBottom: 140,
  },

  //?Cloud
  inIcon: {
    marginTop: 190,
    width: "100%",
  },
  inText: {
    fontSize: 18,
    color: "#fff",
  },
  inTextNext: {
    fontSize: 15,
    color: "#fff",
  },
  sectionTextHeader: {
    marginTop: 20,
    marginBottom: 110,
  },
  textFC: {
    flexDirection: "row",
    alignItems: "center",
  },
  textF: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
  },
  NumOne: {
    marginLeft: 5,
    color: "#333",
    fontSize: 30,
    fontWeight: "700",
  },
  sectionTextContain: {
    width: "100%",
  },
  sectionText: {
    fontSize: 16,
    color: "#aaa",
  },

  // ?
  chaOrgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 15,
  },
  addTeam: {
    width: 160,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  addButton: {
    width: 160,
    backgroundColor: "#eee",
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
});

export default Work;
