import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const adminCredentials = [
  { username: 'thejas', password: 'admin', name: 'thejas' },
  { username: 'admin2', password: 'password2', name: 'admin2' },
];

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    setUsernameError(null);
    setPasswordError(null);

    if (!username.trim()) {
      setUsernameError('Username is required');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    const admin = adminCredentials.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (admin) {
      setIsLoggedIn(true);
      navigation.navigate('orderpage', { adminName: admin.name });

    } else {
      setAlertTitle('Login Failed');
      setAlertMessage('Invalid username or password.');
      setShowAlert(true);
    }
  };

  const closeModal = () => {
    setShowAlert(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={25} color="white" />
      </TouchableOpacity>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/026/983/035/small_2x/one-single-line-drawing-of-young-happy-female-doctor-pose-standing-and-holding-stethoscope-at-hospital-medical-health-care-service-excellence-concept-continuous-line-draw-design-illustration-png.png' }}
          style={styles.logo}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.heading}>24/7 pharmacy Login</Text>

        <View style={styles.inputContainer}>
          <Icon name="user" size={25} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#51aca5"
          />
        </View>
        {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={25} color="white" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="#51aca5"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={isPasswordVisible ? "eye" : "eye-slash"} size={25} color="#51aca5" />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAlert}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{alertTitle}</Text>
            <Text style={styles.modalText}>{alertMessage}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#51aca5' }}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  topContainer: {
    flex: 1,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
    marginTop: 15,
  },
  topTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25, 
    opacity: 0.9,
    marginTop: 30,
  },
  logo: {
    width: '125%',
    height: '100%',
    resizeMode: 'contain',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    top: 35,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#51aca5',
    marginBottom: 50,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    width: 338,
    borderColor: '#51aca5',
    borderWidth: 2,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#51aca5',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.50,
    shadowRadius: 1.67,
    elevation: 25,
    borderRadius: 25,
  },
  icon: {
    padding: 15,
    color: '#51aca5',
  },
  eyeIcon: {
    padding: 15,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 17,
    color: '#51aca5',
  },
  loginButton: {
    width: '55%',
    height: 70,
    backgroundColor: '#51aca5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    minWidth: 300,
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    marginTop: 20,
    minWidth: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AdminLoginPage;
