import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChannelBrowser = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');

  const channels = [
    { name: 'general', memberStatus: 'You are a member' },
    { name: 'meeting', memberStatus: 'You are a member' },
    { name: 'random', memberStatus: 'You are a member' },
  ];

  return (
    <View style={styles.container}>
        <View style={{ marginBottom: 40 }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Workspace Browser</Text>
          <Text style={styles.memberCount}>{channels.length} channels</Text>
        </View>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for channels"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView>
        {channels.map((channel, index) => (
          <View key={index} style={styles.channelItem}>
            <Text style={styles.channelName}>#{channel.name}</Text>
            <Text style={styles.channelStatus}>{channel.memberStatus}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CreateChannel')}>
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072d',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerInfo: {
    marginLeft: 10,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  memberCount: {
    color: '#888',
  },
  searchInput: {
    backgroundColor: '#2b2b40',
    padding: 10,
    color: '#FFF',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 20,
  },
  channelItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  channelName: {
    color: '#FFF',
    fontSize: 16,
  },
  channelStatus: {
    color: '#888',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EA',
    borderRadius: 30,
    padding: 15,
  },
});

export default ChannelBrowser;
