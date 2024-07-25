import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RequestDetails = ({ route, navigation }) => {
  const { request } = route.params;

  const handleApprove = () => {
    // Add approve logic here
    alert('Request approved');
    navigation.goBack();
  };

  const handleReject = () => {
    // Add reject logic here
    alert('Request rejected');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{request.patientName}</Text>
      <Text>{request.medicine || request.test}</Text>
      <Text>Status: {request.status}</Text>
      <TouchableOpacity style={styles.button} onPress={handleApprove}>
        <Text style={styles.buttonText}>Approve</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleReject}>
        <Text style={styles.buttonText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#51aca5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RequestDetails;
