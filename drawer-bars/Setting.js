import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme mode

  // Handle logout button press
  const handleLogout = () => {
    // Example logout functionality
    // Implement your logout logic here
    // For demonstration purposes, navigate to 'Logout' screen
    navigation.navigate('Logout');
  };

  // Handle notifications toggle switch
  const handleNotificationsToggle = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  // Handle date press to show DatePicker
  const handleDatePress = () => {
    if (Platform.OS === 'android') {
      showDatePickerAndroid();
    } else {
      setShowDatePicker(true);
    }
  };

  // Handle time press to show TimePicker
  const handleTimePress = () => {
    if (Platform.OS === 'android') {
      showTimePickerAndroid();
    } else {
      setShowTimePicker(true);
    }
  };

  // Show DatePicker for Android
  const showDatePickerAndroid = () => {
    setShowDatePicker(true);
  };

  // Show TimePicker for Android
  const showTimePickerAndroid = () => {
    setShowTimePicker(true);
  };

  // Hide DatePicker
  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  // Hide TimePicker
  const hideTimePicker = () => {
    setShowTimePicker(false);
  };

  // Handle date change
  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setSelectedDate(currentDate);
    if (Platform.OS === 'android') {
      hideDatePicker(); // Hide DatePicker on Android after selection
    }
  };

  // Handle time change
  const handleTimeChange = (event, newTime) => {
    const currentTime = newTime || selectedTime;
    setSelectedTime(currentTime);
    if (Platform.OS === 'android') {
      hideTimePicker(); // Hide TimePicker on Android after selection
    }
  };

  // Toggle theme mode (dark/light)
  const toggleTheme = () => {
    setIsDarkMode(previousMode => !previousMode);
  };

  // Handle Edit button press to navigate to EditLoginDetails screen
  const handleEditLoginDetails = () => {
    navigation.navigate('login');
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode ? styles.darkModeText : null]}>Settings</Text>
      </View>

      {/* Account Settings Option */}
      <View style={[styles.settingsOption, isDarkMode ? styles.darkModeCard : null]}>
        <Text style={[styles.optionText, isDarkMode ? styles.darkModeText : null]}>Change Account</Text>
        <TouchableOpacity style={styles.optionButton} onPress={handleEditLoginDetails}>
          <Text style={styles.optionButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications Option */}
      <View style={[styles.settingsOption, isDarkMode ? styles.darkModeCard : null]}>
        <Text style={[styles.optionText, isDarkMode ? styles.darkModeText : null]}>Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleNotificationsToggle}
          value={notificationsEnabled}
        />
      </View>

      {/* Date Setting */}
      <View style={[styles.settingsOption, isDarkMode ? styles.darkModeCard : null]}>
        <Text style={[styles.optionText, isDarkMode ? styles.darkModeText : null]}>Date</Text>
        <TouchableOpacity style={styles.optionButton} onPress={handleDatePress}>
          <Text style={styles.optionButtonText}>
            {selectedDate.toLocaleDateString()} {/* Display selected date */}
          </Text>
        </TouchableOpacity>
        {/* Date TimePicker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
        )}
        {/* Cancel button for Android */}
        {showDatePicker && Platform.OS === 'android' && (
          <TouchableOpacity style={styles.cancelButton} onPress={hideDatePicker}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Time Setting */}
      <View style={[styles.settingsOption, isDarkMode ? styles.darkModeCard : null]}>
        <Text style={[styles.optionText, isDarkMode ? styles.darkModeText : null]}>Time</Text>
        <TouchableOpacity style={styles.optionButton} onPress={handleTimePress}>
          <Text style={styles.optionButtonText}>
            {selectedTime.toLocaleTimeString()} {/* Display selected time */}
          </Text>
        </TouchableOpacity>
        {/* Time DateTimePicker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
        {/* Cancel button for Android */}
        {showTimePicker && Platform.OS === 'android' && (
          <TouchableOpacity style={styles.cancelButton} onPress={hideTimePicker}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Appearance Option */}
      <View style={[styles.settingsOption, isDarkMode ? styles.darkModeCard : null]}>
        <Text style={[styles.optionText, isDarkMode ? styles.darkModeText : null]}>Appearance</Text>
        <TouchableOpacity style={styles.optionButton} onPress={toggleTheme}>
          <Text style={styles.optionButtonText}>Change Theme</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.logoutButton, isDarkMode ? styles.darkModeCard : null]} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#fff" />
        <Text style={[styles.logoutButtonText, isDarkMode ? styles.darkModeText : null]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
    paddingHorizontal: 15,
    paddingTop: 90,
  },
  darkModeContainer: {
    backgroundColor: '#1f1f1f', // Dark mode background color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 100,
  },
  settingsOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  darkModeCard: {
    backgroundColor: '#333333', // Dark mode card background color
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#51aca5',
  },
  darkModeText: {
    color: '#fff', // Dark mode text color
  },
  optionButton: {
    backgroundColor: '#51aca5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 20, // Adds margin at the bottom
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#333',
    textAlign: 'center',
  },
});

export default SettingsScreen;
