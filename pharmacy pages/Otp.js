import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert,Image } from 'react-native';
const OTPVerification = ({ navigation }) => {
  const [otp1, setOTP1] = useState('');
  const [otp2, setOTP2] = useState('');
  const [otp3, setOTP3] = useState('');
  const [otp4, setOTP4] = useState('');

  const handleVerifyOTP = () => {
    const storedOTP = '1234'; 

    const enteredOTP = otp1 + otp2 + otp3 + otp4;

    if (enteredOTP === storedOTP) {
      Alert.alert('Success', 'OTP verified successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('login')},
      ]);
    } else {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  const handleInputChange = (value, nextField) => {
    if (value.length === 1 && nextField) {
      nextField.focus();
    }
  };
  return (
    <View style={styles.container}>
        <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/1872/1872038.png'}} style={styles.logo}></Image>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subTitle}>Please enter the OTP to confirm the registration process!</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.input}
          placeholder=""
          keyboardType="numeric"
          maxLength={1}
          value={otp1}
          onChangeText={(text) => { setOTP1(text);handleInputChange(text, otp2Ref);}}/>
        <TextInput
          ref={(input) => otp2Ref = input}
          style={styles.input}
          placeholder=""
          keyboardType="numeric"
          maxLength={1}
          value={otp2}
          onChangeText={(text) => {
            setOTP2(text);
            handleInputChange(text, otp3Ref);
          }}
        />
        <TextInput
          ref={(input) => otp3Ref = input}
          style={styles.input}
          placeholder=""
          keyboardType="numeric"
          maxLength={1}
          value={otp3}
          onChangeText={(text) => {
            setOTP3(text);
            handleInputChange(text, otp4Ref);
          }}
        />
        <TextInput
          ref={(input) => otp4Ref = input}
          style={styles.input}
          placeholder=""
          keyboardType="numeric"
          maxLength={1}
          value={otp4}
          onChangeText={(text) => {
            setOTP4(text);
            handleInputChange(text, null); 
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 30,
  },
  input: {
    width: '20%',
    height: 50,
    borderColor: '#51aca5',
    borderWidth: 1.5,
    borderRadius: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#51aca5',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  logo: {
    width: 170,
    height: 170,
    borderRadius: 150,
  },
});

export default OTPVerification;
