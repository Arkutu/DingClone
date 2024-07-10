import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Platform, TextInput } from 'react-native';
import { Agenda } from 'react-native-calendars';
import * as Calendar from 'expo-calendar';

const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = {};
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = new Date(time).toISOString().split('T')[0];
        if (!items[strTime]) {
          newItems[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            newItems[strTime].push({
              name: 'Event ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        } else {
          newItems[strTime] = items[strTime];
        }
      }
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const createCalendarEvent = async () => {
    const defaultCalendarSource = Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'internalCalendarName',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    const eventId = await Calendar.createEventAsync(newCalendarID, {
      title: eventTitle,
      startDate: new Date(eventDate),
      endDate: new Date(new Date(eventDate).setHours(new Date(eventDate).getHours() + 1)),
      timeZone: 'GMT',
      location: 'Location',
    });

    console.log(`Your new event ID is: ${eventId}`);
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
        theme={{
          agendaDayTextColor: 'white',
          agendaDayNumColor: 'white',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
          backgroundColor: '#00072d',
          calendarBackground: '#00072d',
          textSectionTitleColor: 'white',
          selectedDayBackgroundColor: 'blue',
          selectedDayTextColor: 'white',
          todayTextColor: 'red',
          dayTextColor: 'white',
          textDisabledColor: 'gray',
          dotColor: 'red',
          selectedDotColor: 'red',
          arrowColor: 'white',
          monthTextColor: 'white',
          indicatorColor: 'blue',
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        placeholderTextColor="#888"
        value={eventTitle}
        onChangeText={setEventTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        placeholderTextColor="#888"
        value={eventDate}
        onChangeText={setEventDate}
      />
      <Button title="Create Event" onPress={createCalendarEvent} />
    </View>
  );
};

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00072d',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 8,
    color: 'white',
  },
});

export default CalendarScreen;
