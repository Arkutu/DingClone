// OfficeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons, SimpleLineIcons, MaterialIcons, Entypo } from '@expo/vector-icons';

const MenuButton = ({ title, onPress, icon: Icon, iconName }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={iconName} size={28} color="#FFF" style={styles.buttonIcon} />
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const OfficeScreen = ({ route, navigation }) => {
  const { organizationName } = route.params || {};
  const [searchText, setSearchText] = useState('');

  const firstLetter = organizationName ? organizationName.charAt(0).toUpperCase() : '';

  const getActiveRoute = () => navigation.getState().routes[navigation.getState().index].name;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>{firstLetter}</Text>
            </View>
            <Text style={styles.headerTitle}>{organizationName}</Text>
            <TouchableOpacity>
              <Ionicons name="person-circle" size={40} color="#FFF" />
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
            <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('TodoListScreen')}>
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

        <View style={styles.mainContent}>
          <View style={styles.row}>
            <MenuButton title="New Chat" icon={Ionicons} iconName="chatbox-outline" />
            <MenuButton title="Add Contact" icon={AntDesign} iconName="contacts" />
            <MenuButton title="Cast" icon={Feather} iconName="cast" />
            <MenuButton title="Scan QR Code" icon={AntDesign} iconName="qrcode" />
          </View>
          <View style={styles.row}>
            <MenuButton title="Create/Join organization" icon={SimpleLineIcons} iconName="organization" />
            <MenuButton title="Join" icon={MaterialCommunityIcons} iconName="vector-combine" />
            <MenuButton title="Watermark" icon={MaterialCommunityIcons} iconName="watermark" />
          </View>
          <View style={styles.row}>
            <MenuButton title="Start Meeting" icon={MaterialIcons} iconName="meeting-room" onPress={() => navigation.navigate('VideoCall')} />
            <MenuButton title="Start Live" icon={MaterialIcons} iconName="live-tv" />
            <MenuButton title="New Event" icon={MaterialIcons} iconName="event" />
            <MenuButton title="Create to-do" icon={Entypo} iconName="add-to-list" />
          </View>
        </View>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MainHome')}>
            <Ionicons name="home" size={28} color={getActiveRoute() === 'MainHome' ? '#0d6efd' : '#FFF'} />
            <Text style={getActiveRoute() === 'MainHome' ? styles.navTextActive : styles.navTextInactive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('OfficeScreen', { organizationName })}>
            <MaterialCommunityIcons name="office-building" size={28} color={getActiveRoute() === 'OfficeScreen' ? '#0d6efd' : '#FFF'} />
            <Text style={getActiveRoute() === 'OfficeScreen' ? styles.navTextActive : styles.navTextInactive}>Office</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Activity')}>
            <Ionicons name="notifications" size={28} color={getActiveRoute() === 'Activity' ? '#0d6efd' : '#FFF'} />
            <Text style={getActiveRoute() === 'Activity' ? styles.navTextActive : styles.navTextInactive}>Activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072d',
  },
  headerContainer: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingTop: 40,
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
    marginRight: 10,
  },
  iconText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    color: '#FFF',
    paddingVertical: 10,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b2b40',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
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
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00072d',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonIcon: {
    marginBottom: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
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
  },
  navTextInactive: {
    color: '#888',
    fontSize: 12,
  },
});

export default OfficeScreen;
