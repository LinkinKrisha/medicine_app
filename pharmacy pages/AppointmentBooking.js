import React from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';

const AppointmentBooking = ({ route }) => {
  const { firstName, lastName, gender, dateOfBirth } = route.params;

  // Sample validation for appointment date
  const validateAppointmentDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    
    if (selectedDate < currentDate) {
      return false; // Appointment date must be in the future
    }
    
    // Additional validation logic if needed

    return true;
  };

  const handleBookAppointment = () => {
    // Sample validation for appointment date
    const appointmentDate = '2024-07-01'; // Replace with actual date logic
    const isDateValid = validateAppointmentDate(appointmentDate);

    if (!isDateValid) {
      alert('Please select a valid appointment date.');
      return;
    }

    // Perform booking logic here (e.g., send data to backend)
    // For demonstration, just showing the booked details
    alert(`Appointment booked successfully!\n\nPatient: ${firstName} ${lastName}\nGender: ${gender}\nDate of Birth: ${dateOfBirth}\nAppointment Date: ${appointmentDate}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Booking Confirmation</Text>
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{`${firstName} ${lastName}`}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{gender}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{dateOfBirth}</Text>
        </View>
      </View>

      {/* Date Picker */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerLabel}>Appointment Date:</Text>
        {/* Replace with your date picker component */}
        <Text style={styles.datePickerValue}>Select date picker component here</Text>
      </View>

      {/* Book Appointment Button */}
      <TouchableOpacity style={styles.bookAppointmentButton} onPress={handleBookAppointment}>
        <Text style={styles.bookAppointmentButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#51aca5',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerLabel: {
    width: 150,
    fontWeight: 'bold',
  },
  datePickerValue: {
    flex: 1,
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

export default AppointmentBooking;
