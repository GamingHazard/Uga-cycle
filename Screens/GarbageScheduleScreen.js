import React, { useState, useEffect } from "react";
import { View, Text, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";

const TrashReminder = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Request permission to show notifications
  useEffect(() => {
    const requestPermissions = async () => {
      await Notifications.requestPermissionsAsync();
    };
    requestPermissions();
  }, []);

  // Show the time picker when choosing a time
  const showTimePickerHandler = () => {
    setShowTimePicker(true);
  };

  // Handle time selection
  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  // Schedule notification
  const scheduleNotification = async () => {
    // Get the day and time for the notification
    const dayIndex = daysOfWeek.indexOf(selectedDay);
    const notificationTime = new Date();
    notificationTime.setDate(
      notificationTime.getDate() +
        ((dayIndex - notificationTime.getDay() + 7) % 7)
    );
    notificationTime.setHours(selectedTime.getHours());
    notificationTime.setMinutes(selectedTime.getMinutes());
    notificationTime.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Trash Reminder",
        body: "Time to take out the trash!",
      },
      trigger: {
        weekday: dayIndex + 1, // 1 for Sunday, 2 for Monday, ..., 7 for Saturday
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes(),
        repeats: true, // Repeat weekly on the selected day and time
      },
    });

    alert(
      `Reminder set for ${selectedDay} at ${selectedTime.toLocaleTimeString()}`
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Select Day:</Text>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {daysOfWeek.map((day) => (
          <Button
            key={day}
            title={day}
            onPress={() => setSelectedDay(day)}
            color={selectedDay === day ? "#547c5c" : "#ccc"}
          />
        ))}
      </View>

      <Text>Select Time:</Text>
      <Button title="Pick Time" onPress={showTimePickerHandler} />
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}
      <Text>
        Selected: {selectedDay} at {selectedTime.toLocaleTimeString()}
      </Text>

      <Button title="Set Reminder" onPress={scheduleNotification} />
    </View>
  );
};

export default TrashReminder;
