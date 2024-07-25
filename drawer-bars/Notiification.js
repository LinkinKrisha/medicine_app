import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Message', description: 'You have a new message from John Doe' },
    { id: 2, title: 'Reminder', description: 'Reminder: Meeting at 3 PM' },
    { id: 3, title: 'Update', description: 'App update available. Tap to download.' },
  ]);

  const handleNotificationPress = (item) => {
    alert(item.description);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationPress(item)}>
      <View style={styles.notificationIcon}>
        <Icon name="notifications-outline" size={25} color="#900" />
      </View>
      <View style={styles.notificationDetails}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* List of notifications */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
    paddingHorizontal: 15,
    paddingTop: 100,
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
    marginLeft:60
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationDetails: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#51aca5',
  },
  notificationDescription: {
    fontSize: 16,
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    color: '#666',
  },
});

export default NotificationScreen;
