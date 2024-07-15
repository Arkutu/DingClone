import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UserContext } from '../context/UserContext';

const defaultChannels = [
  { name: 'general', description: 'General channel for general discussions.', visibility: 'Public' },
  { name: 'meeting', description: 'Channel for meetings.', visibility: 'Public' },
  { name: 'random', description: 'Channel for random discussions.', visibility: 'Public' },
];

const ChannelBrowser = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [channels, setChannels] = useState(defaultChannels);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchChannels = async () => {
      const querySnapshot = await getDocs(collection(db, 'channels'));
      const channelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const allChannels = [...defaultChannels, ...channelsData];
      setChannels(allChannels);
    };

    fetchChannels();
  }, []);

  const handleAddChannel = async () => {
    const newChannel = {
      name: `new-channel-${Date.now()}`, // Replace with your desired channel name logic
      description: 'Newly created channel.',
      visibility: 'Public',
      createdAt: new Date(),
    };
    await addDoc(collection(db, 'channels'), newChannel);
    setChannels(prevChannels => [...prevChannels, newChannel]);
  };

  const filteredChannels = channels.filter(channel =>
    channel.name && channel.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
        {filteredChannels.map((channel, index) => (
          <TouchableOpacity
            key={index}
            style={styles.channelItem}
            onPress={() => navigation.navigate('Chat', { channelName: channel.name, channelDescription: channel.description })}
          >
            <Text style={styles.channelName}>#{channel.name}</Text>
            <Text style={styles.channelStatus}>
              {channel.visibility === 'Public'
                ? 'Public Channel'
                : `Private Channel - ${channel.members?.length || 0} members`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddChannel}>
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
