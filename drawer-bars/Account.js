import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AccountScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handleCreateAccount = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
      Alert.alert('Success', 'Account created successfully! Your account will be approved within 24 hours.');
      navigation.navigate('maiinpage');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={25} color="#51aca5" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={{ uri: 'https://thekooltech.com/wp-content/uploads/2023/05/d7bf7f1b-91d8-429e-ac22-9abc3c17a606-1.jpg' }}
          style={styles.advertisement}
        />

        <Text style={styles.title}>Create Your Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#51aca5"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
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
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#51aca5"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Coupon Code (Optional)"
            placeholderTextColor="#51aca5"
            value={couponCode}
            onChangeText={setCouponCode}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  advertisement: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: '#51aca5',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
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
  input: {
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    color: '#51aca5',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#51aca5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 250,
    fontSize: 19,
  },
});

export default AccountScreen;
