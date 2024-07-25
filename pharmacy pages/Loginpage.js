import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Animated, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Loginpage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State to toggle password visibility
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const logoOpacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleButtonClick = async () => {
    // Clear previous error message
    setErrorMessage('');

    // Validate username and password
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    try {
      // Perform login request
      const response = await fetch('http://192.168.43.59:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to home screen on successful login
        navigation.navigate('home');
      } else {
        // Display error message if login fails
        setErrorMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error during login:', error);
      setErrorMessage('Check your network connection and try again');
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleButtonPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={25} color="#51aca5" />
        </TouchableOpacity>
      </View>

      {/* Logo section */}
      <Animated.View style={{ opacity: logoOpacity }}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png' }}
          style={styles.logo}
        />
      </Animated.View>

      {/* Login form */}
      <View style={styles.loginContainer}>
        {/* Title */}
        <Text style={styles.title}>Log-In</Text>

        {/* Username input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" color={'#240541'} size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#51aca5"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" color={'#240541'} size={25} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#51aca5"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
            <FontAwesome name={secureTextEntry ? 'eye' : 'eye-slash'} color="#51aca5" size={20} />
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleButtonClick}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Error message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Register link */}
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.registerLink}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  backButton: {
    padding: 10,
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    opacity: 0.89,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 45,
    color: '#51aca5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
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
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 8,
    borderRadius: 25,
  },
  icon: {
    padding: 15,
    color: '#51aca5',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 15,
    color: '#51aca5',
  },
  button: {
    marginTop: 50,
    backgroundColor: '#51aca5',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 250,
    height: 50,
    fontSize: 19,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    fontSize: 16,
    color: '#51aca5',
    textDecorationLine: 'underline',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '30%',
  },
});

export default Loginpage;
