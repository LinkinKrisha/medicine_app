import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PatientDetails = ({ route, navigation }) => {
  const { patient } = route.params;
  const [details, setDetails] = useState(patient.details);

  const handleUpdate = () => {
    // Add update logic here
    alert('Patient details updated');
    navigation.goBack();
  };

  const handleDelete = () => {
    // Add delete logic here
    alert('Patient record deleted');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <TextInput
        style={styles.input}
        value={details}
        onChangeText={setDetails}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
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
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
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

export default PatientDetails;
