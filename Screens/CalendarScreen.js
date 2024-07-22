import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import * as Calendar from "expo-calendar";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const CalendarScreen = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [eventTitle, setEventTitle] = useState("");
  const [showEvent, setShowEvent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Calendar",
      headerTitleStyle: {
        color: "#fff",
      },
      headerTitle: () => (
        <View>
          <Text style={styles.dateText}>{formatDate()}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={30} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const status = await Calendar.requestCalendarPermissionsAsync();
      if (status.status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:", calendars);
      }
    })();
    fetchEvents();
  }, []);

  const toggleShowEvent = () => {
    setShowEvent(!showEvent);
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const fetchEvents = async () => {
    const eventsSnapshot = await getDocs(collection(db, "events"));
    const fetchedEvents = {};
    eventsSnapshot.forEach((doc) => {
      const data = doc.data();
      const strTime = data.startDate.toISOString().split("T")[0];
      if (!fetchedEvents[strTime]) {
        fetchedEvents[strTime] = [];
      }
      fetchedEvents[strTime].push({
        name: data.title,
        height: 50,
      });
    });
    setItems(fetchedEvents);
  };

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = {};
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = new Date(time).toISOString().split("T")[0];
        if (!items[strTime]) {
          newItems[strTime] = [];
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
    try {
      const defaultCalendarSource =
        Platform.OS === "ios"
          ? await getDefaultCalendarSource()
          : { isLocalAccount: true, name: "Expo Calendar" };

      const newCalendarID = await Calendar.createCalendarAsync({
        title: "Expo Calendar",
        // color: "blue",
        color: "#333",
        entityType: Calendar.EntityTypes.EVENT,
        sourceId: defaultCalendarSource.id,
        source: defaultCalendarSource,
        name: "internalCalendarName",
        ownerAccount: "personal",
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
      });

      const eventStartDate = new Date(eventDate);
      const eventEndDate = new Date(eventStartDate);
      eventEndDate.setHours(eventStartDate.getHours() + 1);

      const eventId = await Calendar.createEventAsync(newCalendarID, {
        title: eventTitle,
        startDate: eventStartDate,
        endDate: eventEndDate,
        timeZone: "GMT",
        location: "Location",
      });

      // Store event in Firestore
      await addDoc(collection(db, "events"), {
        title: eventTitle,
        description: "Description of the event", // Add this if you want to store descriptions
        startDate: eventStartDate,
        endDate: eventEndDate,
        location: "Location",
        calendarId: newCalendarID,
        eventId: eventId,
      });

      console.log(`Event created with ID: ${eventId}`);
      alert(`Event created with ID: ${eventId}`);
      fetchEvents(); // Refresh the events after adding a new one
    } catch (error) {
      console.error("Error creating event: ", error);
      alert("Failed to create event");
    }
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split("T")[0]}
        renderItem={renderItem}
        theme={{
          agendaDayTextColor: "#333",
          agendaDayNumColor: "#333",
          agendaTodayColor: "blue",
          agendaKnobColor: "#333",
          backgroundColor: "#fff",
          calendarBackground: "#fff",
          textSectionTitleColor: "#333",
          selectedDayBackgroundColor: "#333",
          selectedDayTextColor: "#fff",
          todayTextColor: "blue",
          dayTextColor: "#333",
          textDisabledColor: "gray",
          dotColor: "blue",
          selectedDotColor: "blue",
          arrowColor: "#333",
          monthTextColor: "#333",
          indicatorColor: "#fff",
        }}
      />

      {showEvent && (
        <View style={styles.eventContainer}>
          <View style={styles.todoTastContainer}>
            <TouchableOpacity onPress={toggleShowEvent} activeOpacity={0.5}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.todoText}>Set Event</Text>

            <TouchableOpacity onPress={createCalendarEvent} activeOpacity={0.5}>
              <Text style={styles.confBtn}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TextInput
              style={styles.textInput}
              autoFocus
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={eventTitle}
              onChangeText={setEventTitle}
              placeholder="Event Title"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.dateInput}
              value={eventDate}
              onChangeText={setEventDate}
              placeholder="Event Date"
              placeholderTextColor="#888"
            />
          </View>
        </View>
      )}

      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.floatingButton}
          onPress={toggleShowEvent}
        >
          <AntDesign name="form" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#fff",
    // backgroundColor: "#00072d",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 8,
    color: "white",
  },

  //? floating button
  floatingButtonsContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  floatingButton: {
    backgroundColor: "#2b68e6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },

  //? Events
  eventContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  todoTastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  confBtn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2b68e6",
  },
  footer: {
    marginTop: 20,
  },
  textInput: {
    height: 40,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateInput: {
    marginTop: 10,
    height: 40,
    color: "#000",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default CalendarScreen;
