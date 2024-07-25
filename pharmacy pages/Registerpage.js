import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Registerpage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); // State to toggle password visibility

  // Function to toggle password visibility
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleRegisterClick = async () => {
    try {
      // Validation for username
      if (!/^[a-zA-Z ]+$/.test(username)) {
        throw new Error('Username can only contain alphabets and spaces');
      }

      // Proceed with registration
      const response = await fetch('http://192.168.43.59:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Username or email already exists');
        } else {
          throw new Error('Registration failed');
        }
      }
      navigation.navigate('otpverification');
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png' }} style={styles.logo} />
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <FontAwesome name="user" color={'#51aca5'} size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#51aca5"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" color={'#51aca5'} size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#51aca5"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" color={'#51aca5'} size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={secureTextEntry} // Toggle secure text entry based on state
          placeholderTextColor="#51aca5"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <FontAwesome name={secureTextEntry ? 'eye' : 'eye-slash'} color="#51aca5" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" color={'#51aca5'} size={25} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={secureTextEntry} // Toggle secure text entry based on state
          placeholderTextColor="#51aca5"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <FontAwesome name={secureTextEntry ? 'eye' : 'eye-slash'} color="#51aca5" size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegisterClick}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.login}>Already have an account? Login Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 45,
    color: '#51aca5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    width: '100%',
    borderColor: '#51aca5',
    borderWidth: 1.5,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#000',
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
  login: {
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

export default Registerpage;
