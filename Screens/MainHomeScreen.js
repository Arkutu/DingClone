import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator, Modal, TouchableWithoutFeedback  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from '../context/UserContext';
import { useAppContext } from '../context/AppContext';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const MainHomeScreen = ({ route, navigation }) => {
  const { organizationName: routeOrganizationName } = route.params || {};
  const { user, loading } = useContext(UserContext);
  const { organizationName: contextOrganizationName, setOrganizationName, selectedMembers, setSelectedMembers } = useAppContext();
  const [activeSection, setActiveSection] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const organizationName = routeOrganizationName || contextOrganizationName;
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [channels, setChannels] = useState([
    { name: 'general', description: 'General is a messaging app for groups of people who work together. You can send updates, share files, and organize conversations so that everyone is in the loop.' },
    { name: 'meeting', description: 'Meeting channel for discussing various topics and holding meetings.' },
    { name: 'random', description: 'Random channel for off-topic discussions and fun.' },
  ]);

  useEffect(() => {
    if (routeOrganizationName && routeOrganizationName !== contextOrganizationName) {
      setOrganizationName(routeOrganizationName);
    }
  }, [routeOrganizationName, contextOrganizationName, setOrganizationName]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (organizationName) {
        try {
          const orgDoc = await getDoc(doc(db, 'organizations', organizationName));
          if (orgDoc.exists()) {
            const membersData = orgDoc.data().members || [];
            if (membersData.length > 0) {
              const userPromises = membersData.map(memberId => getDoc(doc(db, 'users', memberId)));
              const users = await Promise.all(userPromises);
              const members = users.map(user => ({
                uid: user.id,
                displayName: user.data().displayName,
                photoURL: user.data().photoURL,
              }));
              setOrganizationMembers(members);
            } else {
              setOrganizationMembers([]);
            }
          } else {
            setOrganizationMembers([]);
          }
        } catch (error) {
          console.error('Error fetching members:', error);
          setOrganizationMembers([]);
        }
      }
    };

    const fetchDirectMessages = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const directMessages = userDoc.data().directMessages || [];
            setSelectedMembers(directMessages);
          }
        } catch (error) {
          console.error('Error fetching direct messages:', error);
        }
      }
    };

    fetchMembers();
    fetchDirectMessages();
  }, [organizationName, user, setSelectedMembers]);

  const firstLetter = organizationName ? organizationName.charAt(0).toUpperCase() : '';

  const getActiveRoute = () => navigation.getState().routes[navigation.getState().index].name;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0d6efd" />
      </View>
    );
  }

  const filteredChannels = channels.filter(channel =>
    !searchText || (channel.name && channel.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const startChat = async (member) => {
    // Save direct message member to Firestore
    try {
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        directMessages: [...selectedMembers, member.uid],
      });
      setSelectedMembers([...selectedMembers, member.uid]);
    } catch (error) {
      console.error('Error saving direct message member:', error);
    }

    navigation.navigate('Chat', { recipientId: member.uid, recipientName: member.displayName, isDirectMessage: true });
  };

  const openChannel = (channel) => {
    navigation.navigate('Chat', { channelName: channel.name, channelDescription: channel.description, isDirectMessage: false });
  };

  const selectedOrganizationMembers = organizationMembers.filter(member => selectedMembers.includes(member.uid));


  const handleSectionChange = (index) => {
  setActiveSection(index);
};





  const toggleDropdown = () => {
  setIsDropdownVisible(!isDropdownVisible);
  };

  const renderDropdown = () => (

    <Modal
      transparent={true}
      visible={isDropdownVisible}
      onRequestClose={toggleDropdown}
    >
      <TouchableWithoutFeedback onPress={toggleDropdown}>
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Ionicons name="chatbubble-outline" size={20} color="#FFF" />
                <Text style={styles.dropdownText}>New Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Ionicons name="people-outline" size={20} color="#FFF" />
                <Text style={styles.dropdownText}>Create/Join organization</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Ionicons name="person-add-outline" size={20} color="#FFF" />
                <Text style={styles.dropdownText}>Switch account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Ionicons name="person-circle-outline" size={20} color="#FFF" />
                <Text style={styles.dropdownText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem}>
                <Ionicons name="settings-outline" size={20} color="#FFF" />
                <Text style={styles.dropdownText}>Settings & Privacy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={toggleDropdown}>
                <Ionicons name="close-outline" size={20} color="#FFF" />
                <Text style={styles.dropdownText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  );




  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                
                 <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  {user && user.photoURL ? (
                    <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
                  ) : (
                    <Ionicons name="person-circle" size={40} color="#FFF" />
                  )}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{organizationName}</Text>
                <TouchableOpacity style={styles.addButton} onPress={toggleDropdown}>
                  <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
  
 


              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Jump to or search..."
                  placeholderTextColor="#888"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>

              
          </View>
               <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View style={styles.navBar}>
                      {["All", "Messages", "Chats", "Channels"].map(
                        (title, index) => (
                        <TouchableOpacity
                         key={title}
                         onPress={() => handleSectionChange(index)}
                        style={[
                        styles.navItems,
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
                
                  

            <ScrollView style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Workspace</Text>
                {filteredChannels.map((channel, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.channelItem}
                    onPress={() => openChannel(channel)}
                  >
                    <Text style={styles.channelText}># {channel.name}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.addChannel}
                  onPress={() => navigation.navigate('ChannelBrowser')}
                >
                  <Text style={styles.addChannelText}>+ Add channel</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Direct messages</Text>
                {selectedOrganizationMembers.length > 0 ? (
                  selectedOrganizationMembers.map((member, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.channelItem}
                      onPress={() => startChat(member)}
                    >
                      {member.photoURL ? (
                        <Image source={{ uri: member.photoURL }} style={styles.profileImage} />
                      ) : (
                        <Ionicons name="person-circle" size={40} color="#FFF" />
                      )}
                      <Text style={styles.channelText}>{member.displayName}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noMembersText}>No members available for direct messages.</Text>
                )}
              </View>

              <View style={styles.suggestion}>
                <Text style={styles.suggestionText}>Next, you could...</Text>
                <TouchableOpacity style={styles.suggestionButton} onPress={() => navigation.navigate('MembersScreen')}>
                  <Text style={styles.suggestionButtonText}>Add teammates</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
        {renderDropdown()}
      </KeyboardAvoidingView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MainHome')}>
          <Ionicons name="home" size={28} color={getActiveRoute() === 'MainHome' ? '#0d6efd' : '#FFF'} />
          <Text style={getActiveRoute() === 'MainHome' ? styles.navTextActive : styles.navTextInactive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('OfficeScreen', { organizationName })}>
          <FontAwesome5 name="briefcase" size={28} color={getActiveRoute() === 'OfficeScreen' ? '#0d6efd' : '#FFF'} />
          <Text style={getActiveRoute() === 'OfficeScreen' ? styles.navTextActive : styles.navTextInactive}>Office</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Activity')}>
          <Ionicons name="notifications" size={28} color={getActiveRoute() === 'Activity' ? '#0d6efd' : '#FFF'} />
          <Text style={getActiveRoute() === 'Activity' ? styles.navTextActive : styles.navTextInactive}>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Feather name="users" size={28} color={getActiveRoute() === 'Profile' ? '#0d6efd' : '#FFF'} />
          <Text style={getActiveRoute() === 'Profile' ? styles.navTextActive : styles.navTextInactive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072d',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00072d',
  },
  headerContainer: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: '#0d6efd',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b2b40',
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0d6efd',
  },
  channelText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 10,
  },
  addChannel: {
    paddingVertical: 10,
  },
  addChannelText: {
    color: '#0d6efd',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noMembersText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
  suggestion: {
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  suggestionText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
  suggestionButton: {
    backgroundColor: '#0d6efd',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  suggestionButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navTextActive: {
    color: '#0d6efd',
    fontSize: 12,
    marginTop: 2,
  },
  navTextInactive: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 2,
  },

navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 25,
    padding: 5,
    marginVertical: 9,
},
navItems: {
   paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
},
activeNavItem: {
  backgroundColor: '#0d6efd',
},
inactiveNavItem: {
  backgroundColor: 'transparent',
},
activeNavText: {
  color: '#FFF',
  fontWeight: 'bold',
},
inactiveNavText: {
  color: '#888',
},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  dropdownContainer: {
    width: '80%',
    maxWidth: 300,
    marginTop: 60, // Adjust this value to position the dropdown below the header
    marginRight: 20,
  },
  dropdown: {
    backgroundColor: '#2a2a3e',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    color: '#FFF',
    marginLeft: 10,
  },

});

export default MainHomeScreen;
