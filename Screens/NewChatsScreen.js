import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../context/UserContext';
import { OrganizationContext } from '../context/OrganizationContext';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const NewChatsScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { selectedOrganizationId } = useContext(OrganizationContext);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedOrganizationId) {
        console.log('No organization selected');
        setLoading(false);
        return;
      }

      console.log('Selected Organization ID:', selectedOrganizationId);
      try {
        const orgDoc = await getDoc(doc(db, 'organizations', selectedOrganizationId.trim()));
        if (!orgDoc.exists()) {
          console.log('Organization document does not exist');
          setMembers([]);
          return;
        }

        const membersData = orgDoc.data().members || [];
        console.log('Members Data:', membersData);

        if (membersData.length === 0) {
          console.log('No members in the organization');
          setMembers([]);
          return;
        }

        const userPromises = membersData.map(memberId => getDoc(doc(db, 'users', memberId)));
        const users = await Promise.all(userPromises);
        const members = users.map(user => ({
          uid: user.id,
          displayName: user.data().displayName,
        }));
        console.log('Fetched Members:', members);
        setMembers(members);
        setFilteredMembers(members);
      } catch (error) {
        console.error('Error fetching members:', error);
        Alert.alert('Error', 'Failed to fetch members.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [selectedOrganizationId]);

  useEffect(() => {
    const filtered = members.filter(member =>
      member.displayName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchText, members]);

  const startChat = (member) => {
    navigation.navigate('Chat', { recipientId: member.uid, recipientName: member.displayName });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0d6efd" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50 }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chats</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search members..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView>
        {filteredMembers.map((member, index) => (
          <TouchableOpacity
            key={index}
            style={styles.memberItem}
            onPress={() => startChat(member)}
          >
            <Text style={styles.memberName}>{member.displayName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b2b40',
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
  },
  memberItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberName: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00072d',
  },
});

export default NewChatsScreen;
