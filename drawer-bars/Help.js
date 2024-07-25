import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const HelpScreen = () => {
  const navigation = useNavigation();

  const [issueDescription, setIssueDescription] = useState('');
  const [previousOrders, setPreviousOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [error, setError] = useState('');

  const faq = {
    question: 'How do I order medicines on 24/7 Pharmacy using an e-prescription/physical prescription?',
    answer: [
      'E-Prescription:',
      'Get an online consultation with the required specialist.',
      'Receive an e-prescription after a successful consultation in the chat room.',
      'On the e-prescription, click on the ‘Order Meds & Tests’ tab to add prescribed medicines to your cart.',
      'Place the order by selecting/entering your address and payment method.',
      'Physical Prescription:',
      'Take a clear picture of the prescription.',
      'Go to the ‘Buy Medicine’ section, select the ‘Upload Prescription’ tab, and click ‘Choose from Gallery’.',
      'Choose a delivery address and click on the ‘Submit Prescription’ tab.',
      'Your prescription will be verified, and medicines will be added to your cart.',
    ],
  };

  const handleSubmitIssue = () => {
    if (issueDescription.trim() === '') {
      setError('Please enter a description for your issue.');
    } else {
      setModalMessage('Your issue has been submitted.');
      setModalVisible(true);
      setIssueDescription('');
      setError('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png' }} style={styles.logo} />
      </View>

      <Text style={styles.header}>Help Screen</Text>

      <View style={styles.faqContainer}>
        <Text style={styles.question}>{faq.question}</Text>
        {faq.answer.map((line, index) => (
          <Text key={index} style={styles.answerText}>{line}</Text>
        ))}
      </View>

      <Text style={styles.subHeader}>Need Help?</Text>
      <Text style={styles.prompt}>TELL US WHAT YOU NEED HELP WITH</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Describe your issue here..."
        value={issueDescription}
        onChangeText={(text) => setIssueDescription(text)}
        multiline
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Submit" onPress={handleSubmitIssue} color="red" />

      <Text style={styles.subHeader}>Previous Orders</Text>
      {previousOrders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        previousOrders.map((order, index) => (
          <Text key={index} style={styles.orderText}>Order #{order.id}: {order.details}</Text>
        ))
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#51aca5',
  },
  backButton: {
    paddingVertical: 10,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  faqContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  question: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51aca5',
  },
  answerText: {
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  prompt: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  noOrdersText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
  },
  orderText: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonConfirm: {
    backgroundColor: '#ff5c5c',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HelpScreen;
