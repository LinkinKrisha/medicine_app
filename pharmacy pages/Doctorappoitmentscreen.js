import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const DoctorAppointmentScreen = ({ navigation }) => {
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState(''); // 'male' or 'female'
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddMember = () => {
    setShowAddMemberModal(true);
  };

  const handleSaveMember = () => {
    if (!firstName || !lastName || !gender || !dateOfBirth) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    // Perform save logic here (e.g., save to state or send to backend)

    // Clear fields
    setFirstName('');
    setLastName('');
    setGender('');
    setDateOfBirth('');

    // Close modal
    setShowAddMemberModal(false);
  };

  const handleCancelMember = () => {
    // Clear fields
    setFirstName('');
    setLastName('');
    setGender('');
    setDateOfBirth('');

    // Close modal
    setShowAddMemberModal(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate.toLocaleDateString());
  };

  const handleBookAppointment = () => {
    // Perform booking appointment logic (e.g., navigate to appointment booking screen)
    navigation.navigate('AppointmentBooking', {
      firstName,
      lastName,
      gender,
      dateOfBirth,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={25} color="#51aca5" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Book Doctor Appointment</Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>Hi there!</Text>
        <Text style={styles.description}>
          Please provide the required details to book your doctor appointment.
        </Text>
      </View>

      {/* Image Sections */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://img.freepik.com/premium-vector/flat-online-medical-conference_23-2148897751.jpg?w=900' }}
          style={styles.image}
        />
      </View>

      {/* Assessment Section */}
      <View style={styles.assessmentContainer}>
        <Text style={styles.assessmentTitle}>Patient Details</Text>
        <TouchableOpacity style={styles.addMemberButton} onPress={handleAddMember}>
          <Text style={styles.addMemberButtonText}>+ Add Member</Text>
        </TouchableOpacity>
        {/* Modal for Add Member */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAddMemberModal}
          onRequestClose={() => setShowAddMemberModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[styles.genderOption, gender === 'male' ? styles.genderOptionSelected : null]}
                  onPress={() => setGender('male')}
                >
                  <Text style={styles.genderOptionText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderOption, gender === 'female' ? styles.genderOptionSelected : null]}
                  onPress={() => setGender('female')}
                >
                  <Text style={styles.genderOptionText}>Female</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#51aca5' }]} onPress={handleSaveMember}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ccc' }]} onPress={handleCancelMember}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Book Appointment Button */}
        <TouchableOpacity style={styles.bookAppointmentButton} onPress={handleBookAppointment}>
          <Text style={styles.bookAppointmentButtonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#51aca5',
    marginLeft: 15,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51aca5',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 550,
    height: 200,
    resizeMode: 'contain',
  },
  assessmentContainer: {
    paddingHorizontal: 20,
  },
  assessmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#51aca5',
    marginBottom: 10,
  },
  addMemberButton: {
    backgroundColor: '#51aca5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  addMemberButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderOption: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  genderOptionSelected: {
    backgroundColor: '#51aca5',
  },
  genderOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAppointmentButton: {
    backgroundColor: '#51aca5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookAppointmentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DoctorAppointmentScreen;
