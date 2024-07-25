import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State to track expanded order
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch user orders');
      }
      const ordersData = await response.json();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching user orders:', error.message);
      Alert.alert('Error', 'Failed to fetch user orders. Please try again later.');
    }
  };

  const handleToggleOrder = (orderId) => {
    // If the tapped orderId is the expandedOrderId, navigate back to user orders
    if (orderId === expandedOrderId) {
      setExpandedOrderId(null); // Collapse the order
    } else {
      // Otherwise, navigate to track order screen with orderId and expand it
      navigation.navigate('trackorder', { orderId });
      setExpandedOrderId(orderId); // Set as expanded
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'denied':
        return 'red';
      case 'approved':
        return 'green';
      case 'pending':
        return 'blue';
      default:
        return 'black';
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleToggleOrder(item.id)} style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}> {item.id}</Text>
        <Text style={styles.productName}>{item.items[0]?.label || 'Unknown Product'}</Text>
        <Text style={[styles.orderStatus, { color: getStatusColor(item.status) }]}>Status: {item.status}</Text>
      </View>
      {item.id === expandedOrderId && (
        <View style={styles.orderDetails}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.text}>{item.address}</Text>
          <Text style={styles.label}>Amount</Text>
          <Text style={[styles.text, styles.amountText]}>RS: {item.total_amount}</Text>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.text}>{item.payment_method}</Text>
          <Text style={styles.label}>Created At</Text>
          <Text style={styles.text}>{item.created_at}</Text>
          <Text style={styles.label}>Products</Text>
          {item.items.map((product, index) => (
            <View key={index}>
              <Text style={styles.productText}>{product.label}</Text>
              <Text style={styles.productText}>Qty: {product.quantity}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.trackOrderButton}>
        <Icon name="track-changes" size={20} color="#ffffff" style={styles.icon} />
        <Text style={styles.trackOrderButtonText}>{item.id === expandedOrderId ? 'Close Order' : 'Track Order'}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>My Orders</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  orderContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 3,
    flexWrap: 'wrap',
  },
  orderStatus: {
    fontWeight: 'bold',
  },
  orderDetails: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 10,
  },
  amountText: {
    color: 'red',
  },
  productText: {
    marginBottom: 5,
  },
  trackOrderButton: {
    backgroundColor: '#51aca5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackOrderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default UserOrderScreen;
