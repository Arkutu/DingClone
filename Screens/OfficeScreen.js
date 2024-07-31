import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Platform, 
  Image,
  Modal,
  TouchableWithoutFeedback 
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'


import { UserContext } from '../context/UserContext';
import { useAppContext } from '../context/AppContext';

const MenuButton = ({ title, onPress, icon: Icon, iconName }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <Icon name={iconName} size={24} color="#000" />
    </View>
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const OfficeScreen = ({ route, navigation }) => {
  const { organizationName } = useAppContext();
  const [searchText, setSearchText] = useState('');
  const { user } = useContext(UserContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const getActiveRoute = () => navigation.getState().routes[navigation.getState().index].name;

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
            <TouchableOpacity style={styles.addButton} onPress={toggleMenu}>
              <MaterialCommunityIcons name="view-list" size={26} color="#FFF" />
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

        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('CalendarScreen')}>
              <Text style={styles.tabText}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ToDo')}>
              <Text style={styles.tabText}>To-do</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('DING')}>
              <Text style={styles.tabText}>DING</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Docs')}>
              <Text style={styles.tabText}>Docs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('More')}>
              <Text style={styles.tabText}>More</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Add your main content here */}
      </ScrollView>

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

      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.menuContainer}>
              <Text style={styles.menuTitle}>Menu</Text>
              <View style={styles.menuGrid}>
                <MenuButton title="Chat Bot" icon={ FontAwesome6 } iconName="robot" onPress={() => navigation.navigate('Chatbot')} />
                <MenuButton title="Clock In/Out" icon={Feather} iconName="clock" onPress={() => navigation.navigate('ClockInOutScreen')} />
                <MenuButton title="Scan QR Code" icon={AntDesign} iconName="qrcode" onPress={() => navigation.navigate('CodeScan')} />
                <MenuButton title="Create/Join organization" icon={SimpleLineIcons} iconName="organization" onPress={() => navigation.navigate('CreateOrganization')} />
                <MenuButton title="Join" icon={MaterialCommunityIcons} iconName="vector-combine" onPress={() => navigation.navigate('JoinMeetingScreen')} />
                <MenuButton title="Start Meeting" icon={MaterialIcons} iconName="meeting-room" onPress={() => navigation.navigate('MeetingScreen')} />
                <MenuButton title="Start Live" icon={MaterialIcons} iconName="live-tv" onPress={() => {}} />
                <MenuButton title="Projects" icon={MaterialIcons} iconName="event" onPress={() => navigation.navigate('ProjectListScreen')} />
                <MenuButton title="Create Project" icon={Entypo} iconName="add-to-list" onPress={() => navigation.navigate('ProjectScreen')} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072d',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 60, 
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
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabItem: {
    marginHorizontal: 10,
  },
  tabText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#00072d',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuText: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a2e',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navTextActive: {
    color: '#0d6efd',
    fontSize: 12,
  },
  navTextInactive: {
    color: '#888',
    fontSize: 12,
  },
});

export default OfficeScreen;