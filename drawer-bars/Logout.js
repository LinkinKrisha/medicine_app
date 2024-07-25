import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, Animated, Easing, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon


const LogoutScreen = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  // Animated value for footer opacity
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    navigation.navigate('Slider'); // Navigate to login screen after logout
  };

  const cancelLogout = () => {
    setModalVisible(false);
    navigation.navigate('mainpage'); // Navigate to front page screen
  };

  // Fade in animation for footer
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerText}>Logout</Text>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png' }} // Pharmacy logo image
        style={styles.logo}
      />
      <Text style={styles.userText}>HI USER!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.footerText}>© {new Date().getFullYear()} 24/7 pharmacy All rights reserved.</Text>
      </Animated.View>

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
            <Text style={styles.modalText}>Are you sure you want to logout the app?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={cancelLogout}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={confirmLogout}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51aca5', // Background color for the screen
    padding: 20, // Padding around the content
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Text color for header
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 50, // Rounded corners for the logo
  },
  userText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  footerText: {
    marginTop: 30,
    fontSize: 15,
    color: '#fff', // Text color for footer
    textAlign: 'center',
    opacity: 0.8, // Opacity for the footer text
  },
  logoutButton: {
    backgroundColor: '#ff5c5c',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    backgroundColor: '#fff',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: '#51aca5',
  },
  buttonConfirm: {
    backgroundColor: '#ff5c5c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LogoutScreen;
