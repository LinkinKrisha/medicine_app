import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CheckoutScreen = ({ navigation, route }) => {
  const { cartItems: initialCartItems, clearCart } = route.params;
  const defaultAddress = 'Wise Tech Source, 8 ft Rd, Anna Nagar, Madurai, 625020';
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.quantity * parseFloat(item.price.replace(/[^0-9.]/g, '')),
      0
    );
  };

  const totalAmount = calculateTotalAmount();

  // Delivery charge (you can define or calculate this based on your logic)
  const deliveryCharge = 50; // Example: Fixed delivery charge

  // Calculate total amount including delivery charge
  const totalAmountWithDelivery = totalAmount + deliveryCharge;

  // Modal state for editing or adding address
  const [modalVisible, setModalVisible] = useState(false);
  const [houseDetails, setHouseDetails] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Madurai');
  const [state, setState] = useState('Tamil Nadu');
  const [isEditing, setIsEditing] = useState(false); // Flag to differentiate edit and add

  // Transaction history state
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactionHistory(); // Fetch transaction history when component mounts
  }, []);

  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch('http://192.168.43.59:3000/transactions');
  
      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }
  
      const transactionData = await response.json();
      console.log('Transaction history:', transactionData);
      // Set state or process transactionData as needed
  
    } catch (error) {
      console.error('Error fetching transaction history:', error.message);
      // Handle specific error cases (e.g., network error, server error)
      Alert.alert('Error', 'Failed to fetch transaction history. Please try again later.');
    }
  };
  
  // Handle Edit Address
  const handleEditAddress = () => {
    setIsEditing(true); // Set edit mode
    setModalVisible(true);
  };

  // Handle Add Address
  const handleAddAddress = () => {
    setIsEditing(false); // Clear edit mode
    setModalVisible(true);
  };

  // Handle Submit Address
  const handleSubmitAddress = () => {
    if (!houseDetails || !landmark || !city || !state) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (city !== 'Madurai') {
      Alert.alert('Error', 'Delivery is only available within Madurai.');
      return;
    }
    setSelectedAddress(`${houseDetails}, ${landmark}, ${city}, ${state}`);
    setModalVisible(false);
  };

  // Increase quantity of item
  const increaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Decrease quantity of item
  const decreaseQuantity = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

 
  const handleCheckout = async () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }
    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    
    try {
      const response = await fetch('http://192.168.43.59:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: selectedAddress,
          items: cartItems,
          totalAmount: totalAmountWithDelivery,
          paymentMethod: selectedPaymentMethod,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
  
      clearCart();
      navigateToSuccessScreen();
      
    } catch (error) {
      console.error('Error placing order:', error.message);
      Alert.alert('Error', 'Failed to place order. Please try again later.');
    }
  };
  const navigateToSuccessScreen = () => {
    navigation.navigate('OrderSuccessScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color="#51aca5" />
          </TouchableOpacity>
          <Text style={styles.heading}>Checkout</Text>
          <TouchableOpacity style={styles.bagContainer}>
            <Icon name="bag-outline" size={30} color="#51aca5" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.sectionHeading}>Delivery Address</Text>
          <TouchableOpacity onPress={handleEditAddress} style={styles.editButton}>
            <Icon name="create-outline" size={30} color="#51aca5" />
          </TouchableOpacity>
          <View style={styles.addressDetails}>
            <Text style={styles.addressText}>{selectedAddress}</Text>
          </View>
        </View>
        <View style={styles.transactionHistoryContainer}>
          <Text style={styles.sectionHeading}>Transaction History</Text>
          {transactions.length === 0 ? (
            <Text>No transactions found.</Text>
          ) : (
            <FlatList
              data={transactions}
              renderItem={({ item }) => (
                <View style={styles.transactionItem}>
                  <Text>Transaction ID: {item.id}</Text>
                  <Text>Amount: Rs {item.total_amount}</Text>
                  <Text>Date: {new Date(item.created_at).toLocaleString()}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
        {/* Order Summary Section */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionHeading}>Order Summary</Text>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.summaryItem}>
                <Text>
                  {item.label} x {item.quantity}
                </Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Icon name="remove-circle-outline" size={25} color="#51aca5" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Icon name="add-circle-outline" size={25} color="#51aca5" />
                  </TouchableOpacity>
                </View>
                <Text>Rs {parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.summaryLine} />
          <View style={styles.totalRow}>
            <Text>Total Items</Text>
            <Text>{totalItems}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Total Amount</Text>
            <Text>Rs {totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Delivery Charge</Text>
            <Text>Rs {deliveryCharge}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>Rs {totalAmountWithDelivery.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.paymentContainer}>
          <Text style={styles.sectionHeading}>Payment Method</Text>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'COD' ? styles.selectedPaymentOption : null,
            ]}
            onPress={() => setSelectedPaymentMethod('COD')}
          >
            <Text style={styles.paymentOptionText}>Cash on Delivery (COD)</Text>
            {selectedPaymentMethod === 'COD' && (
              <FontAwesomeIcon name="check-circle" size={25} color="#51aca5" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentOption,
              selectedPaymentMethod === 'GooglePay' ? styles.selectedPaymentOption : null,
            ]}
            onPress={() => setSelectedPaymentMethod('GooglePay')}
          >
            <Text style={styles.paymentOptionText}>Google Pay</Text>
            {selectedPaymentMethod === 'GooglePay' && (
              <FontAwesomeIcon name="check-circle" size={25} color="#51aca5" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>

      {/* Address Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeading}>
              {isEditing ? 'Edit Address' : 'Add New Address'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="House / Flat No."
              value={houseDetails}
              onChangeText={(text) => setHouseDetails(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Landmark"
              value={landmark}
              onChangeText={(text) => setLandmark(text)}
            />
            <View style={styles.modalRow}>
              <TextInput
                style={[styles.modalInput, styles.halfInput]}
                placeholder="City"
                value={city}
                onChangeText={(text) => setCity(text)}
              />
              <TextInput
                style={[styles.modalInput, styles.halfInput]}
                placeholder="State"
                value={state}
                onChangeText={(text) => setState(text)}
              />
            </View>
            <View style={styles.modalButtonRow}>
              <Button
                title="Cancel"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Button title="Submit" onPress={handleSubmitAddress} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 30,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color:'#51aca5'
  },
  bagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 15,
    marginLeft: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color:'#51aca5',
  },
  editButton: {
    position: 'absolute',
    right: 0,
  },
  addressDetails: {
    borderWidth: 2,
    borderColor: '#51aca5',
    padding: 10,
    borderRadius: 5,
  },
  addressText: {
    color:'#51aca5',
    fontSize: 17,
  },
  transactionHistoryContainer: {
    marginBottom: 20,
  },
  transactionItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,

    
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    marginLeft: 5,
  },
  quantityText: {
    fontSize: 19,
    marginHorizontal: 5,
    color:'red'
  },
  summaryLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#51aca5',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    color:'red'
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 19,
    color:'red'
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  selectedPaymentOption: {
    borderWidth: 1,
    borderColor: '#51aca5',
    borderRadius: 5,
    padding: 8,
    color:'#51aca5'
  },
  paymentOptionText: {
    fontSize: 18,
    marginLeft: 10,
    color:'#51aca5'

  },
  checkoutButton: {
    backgroundColor: '#51aca5',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  checkoutText:{
    color:'white',
    fontSize:17,
    fontWeight: 'bold',

  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    color:'white'
  },
});

export default CheckoutScreen;
