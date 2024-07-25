import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, Image, FlatList, Animated, Modal, ScrollView } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons'; // Import FontAwesome
import { useNavigation, useRoute } from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [searchText, setSearchText] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addressType, setAddressType] = useState('');
  const [addresses, setAddresses] = useState([{ text: 'find the Address of a place through Google Maps ', type: 'Home/Office  >>' }]);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [mobileNumber, setMobileNumber] = useState('');
  const [houseDetails, setHouseDetails] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('Madurai');
  const [state, setState] = useState('Tamil Nadu');
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    if (route.params?.selectedAddress) {
      setSearchText(route.params.selectedAddress);
      setSelectedAddress(route.params.selectedAddress);
    }
  }, [route.params?.selectedAddress]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    const sampleData = [
      { text: 'Madurai Anna Nagar, Home', type: 'Home' },
      { text: 'Madurai Periyar, Office', type: 'Office' },
      { text: 'Madurai Gandhi Museum, Office', type: 'Office' },
      { text: 'Madurai wisetech source,Anna nagar', type: 'office' },
      { text: 'Madurai Annabustand', type: 'Home' },
      { text: 'Madurai goripalayam', type: 'ofice' },
      { text: 'Madurai thallakulam', type: 'Home' }
    ];
    const filteredResults = sampleData.filter(item=>
      item.text.toLowerCase().includes(
        searchText.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSelectAddress = (address) => {
    setSearchText(address.text);
    setSelectedAddress(address.text);
    setAddressType(address.type);
    setSearchResults([]);
    fadeOut();
  };

  const handleEdit = (index) => {
    const addressToEdit = addresses[index];
    setSearchText(addressToEdit.text);
    setAddressType(addressToEdit.type);
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (addressType && searchText) {
      setAddresses([...addresses, { text: searchText, type: addressType }]);
      setSearchText('');
      setAddressType('');
      Alert.alert('Address Saved', `Address type: ${addressType}`);
      fadeOut();
    } else {
      Alert.alert('Incomplete Information', 'Please enter address and select address type.');
    }
  };

  const handleDelete = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
    Alert.alert('Address Deleted', 'The address has been deleted.');
    fadeOut();
  };

  const handleHomePress = () => {
    navigation.navigate('FullScreenMap', { selectedAddress: 'Madurai Anna Nagar, Home' });
  };

  const handleOfficePress = () => {
    navigation.navigate('FullScreenMap', { selectedAddress: 'Madurai Periyar, Office' });
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('mainpage');
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFormSubmit = () => {
    // Validate inputs
    if (!mobileNumber.trim()) {
      Alert.alert('Incomplete Information', 'Please enter mobile number.');
      return;
    }

    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNumber.trim())) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!houseDetails.trim()) {
      Alert.alert('Incomplete Information', 'Please enter house details or apartment name.');
      return;
    }

    if (!pincode.trim()) {
      Alert.alert('Incomplete Information', 'Please enter pincode.');
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      Alert.alert('Invalid Pincode', 'Please enter a valid 6-digit pincode.');
      return;
    }

    if (!city.trim()) {
      Alert.alert('Incomplete Information', 'Please enter city.');
      return;
    }

    if (!state.trim()) {
      Alert.alert('Incomplete Information', 'Please enter state.');
      return;
    }

    if (!patientName.trim()) {
      Alert.alert('Incomplete Information', 'Please enter patient name.');
      return;
    }

    const addressText = `${houseDetails.trim()}, ${landmark.trim() ? landmark.trim() + ', ' : ''}${city.trim()}, ${state.trim()}`;

    setAddresses([...addresses, { text: addressText, type: 'Custom' }]);
    setMobileNumber('');
    setHouseDetails('');
    setLandmark('');
    setPincode('');
    setCity('Madurai');
    setState('Tamil Nadu');
    setPatientName('');

    toggleModal();

    fadeOut();
  };

  return (
    <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.back}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png' }}
          style={styles.logo}
        />
      </View>

      <View style={styles.middleContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Deliver To</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <FontAwesome name="search" color={'#51aca5'} size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchBox}
            placeholder="Search Location"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <FontAwesome name="close" color={'#51aca5'} size={20} style={styles.closeIcon} />
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.addressContainer} onPress={() => handleSelectAddress(item)}>
              <Text style={styles.addressText}>{item.text}</Text>
              <Text style={styles.currentLocationText}>{item.type}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
          data={addresses}
          renderItem={({ item, index }) => (
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>{item.text}</Text>
              <Text style={styles.currentLocationText}>{item.type}</Text>
              <View style={styles.addressActions}>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Save address button */}
      <View style={styles.editSaveContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <FontAwesome name="plus" color={'#fff'} size={16} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addressButton} onPress={handleHomePress}>
          <FontAwesome name="home" color={'#fff'} size={20} />
          <Text style={styles.addressButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addressButton} onPress={handleOfficePress}>
          <FontAwesome name="briefcase" color={'#fff'} size={20} />
          <Text style={styles.addressButtonText}>Office</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalTitle}>Select Delivery Location</Text>
            <Text style={styles.modalNote}>Note: For Rx medicines the order will be billed on patient’s name</Text>
            <TextInput
              style={styles.input}
              placeholder="Patient Name*"
              value={patientName}
              onChangeText={setPatientName}
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile number*"
              keyboardType="phone-pad"
              maxLength={13}
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="House no | Apartment name*"
              maxLength={60}
              value={houseDetails}
              onChangeText={setHouseDetails}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark (Optional)"
              maxLength={50}
              value={landmark}
              onChangeText={setLandmark}
            />
            <TextInput
              style={styles.input}
              placeholder="Pincode*"
              keyboardType="number-pad"
              maxLength={6}
              value={pincode}
              onChangeText={setPincode}
            />
            <TextInput
              style={styles.input}
              placeholder="City*"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={styles.input}
              placeholder="State*"
              value={state}
              onChangeText={setState}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleFormSubmit}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalcancel} onPress={toggleModal}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topContainer: {
    backgroundColor: '#51aca5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    flexDirection: 'row',
    borderRadius:5
  },
  logo: {
    width: 130,
    height: 130,
    marginRight: 'auto',
  },
  middleContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 20,
    marginTop: -20,
    marginLeft:5,
    marginRight:5
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#51aca5',
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#51aca5',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
  },
  closeIcon: {
    marginLeft: 10,
  },
  addressContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentLocationText: {
    color: '#777',
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#ff9800',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
  },
  editSaveContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 30,
    flex: 1,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  addButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 25,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 20,
  },
  back: {
    marginRight: 'auto',
  },
  addressButton: {
    backgroundColor: '#51aca5',
    padding: 15,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  addressButtonText: {
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10,
    fontSize:17
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 100

  },
  modalTitle: {
    color: '#51aca5',
    textAlign: 'center',
    fontSize: 27,
    marginBottom:20,
    fontWeight:'bold'
  },
  modalNote: {
    fontSize: 15,
    color: '#777',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#51aca5',
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
    
  },
  modalButton: {
    backgroundColor: 'green',
    borderColor: 'white',
    padding: 10,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalcancel:{
    backgroundColor: 'red',
    borderColor: 'white',
    padding: 10,
    borderRadius: 50,
    flex: 1,
    marginHorizontal: 5,

  },
  cancel:{
    color: '#fff',
    textAlign: 'center',
  }
});

export default WelcomePage;
