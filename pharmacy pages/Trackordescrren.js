import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, Easing, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment'; // Assuming moment.js is installed for date formatting

const TrackOrderScreen = () => {
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { navigate } = useNavigation();
  const route = useRoute();

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    
    try {
      const orderId = route.params?.orderId;
      if (!orderId) {
        throw new Error('Order ID not provided or invalid');
      }
      const response = await fetch(`http://192.168.43.59:3000/orders/${orderId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }
      const orderData = await response.json();
      setOrderDetails(orderData);
    } catch (error) {
      console.error('Error fetching order details:', error.message);
    }
  };

  const handleBackToMyOrders = () => {
    navigate('myOrders'); // Navigate to the My Orders screen
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        {/* Header Text and Close Icon */}
        <Text style={styles.headerText}>Order Receipt</Text>
        <TouchableOpacity onPress={handleBackToMyOrders}>
          <Icon name="close" size={25} color="#5fb2b5" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://th.bing.com/th/id/OIP.ydSLyykSDDELtS502ru22gAAAA?rs=1&pid=ImgDetMain' }}
              style={styles.successImage}
            />
          </View>
          {orderDetails ? (
            <>
              <View style={styles.orderSummary}>
                <Text style={styles.boldText}>Order ID: <Text style={styles.regularText}>{orderDetails.id}</Text></Text>
                <Text style={styles.boldText}>Order Date: <Text style={styles.regularText}>{orderDetails.created_at}</Text></Text>
                <Text style={styles.boldText}>Status:</Text>
                <Text style={styles.regularText}>
                  {orderDetails.status === 'Approved' && (
                    <View>
                      <Icon name="schedule" size={26} color="red" style={{ marginRight: 30 }} />
                      <Text style={styles.boldText}>Estimated At: <Text style={styles.time}>{moment(orderDetails.estimated_at).format('MMMM Do YYYY, h:mm:ss a')}</Text></Text>
                    </View>
                  )}
                  {orderDetails.status === 'Approved'
                    ? 'Approved, estimated delivery in 24 hours'
                    : orderDetails.status === 'Denied'
                    ? 'Sorry, your product has been cancelled'
                    : 'Your order is still pending'}
                </Text>
              </View>

              <View style={styles.orderItemsContainer}>
                {orderDetails.items.map((product, index) => (
                  <View key={index} style={styles.orderItem}>
                    <View style={styles.productContainer}>
                      <Image
                        source={{ uri: product.image }} 
                        style={styles.productImage}
                      />
                      <View style={styles.productDetails}>
                        <Text style={styles.productName}>{product.label}</Text>
                        <Text style={styles.productQuantity}>Qty: {product.quantity}</Text>
                        <Text style={styles.productPrice}>Price: {product.price}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.paymentDetails}>
                <Text style={styles.sectionTitle}>Payment Details</Text>
                <Text style={styles.boldText}>Total Amount: </Text>
                <Text style={styles.section}>RS: {orderDetails.total_amount}</Text>
                <Text style={styles.boldText}>Payment Method: </Text>
                <Text style={styles.section}>{orderDetails.payment_method}</Text>
                <View style={styles.deliveryDetails}>
                  <Text style={styles.boldText}>Delivery Address: </Text>
                  <Text style={styles.section}>{orderDetails.address}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text>Loading order details...</Text>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5fb2b5',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successImage: {
    width: 500,
    height: 200,
    resizeMode: 'contain',
  },
  orderSummary: {
    marginBottom: 20,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#51aca5',
  },
  time:{
    fontSize: 13,
    marginBottom: 5,
    color: 'red',
  },
  regularText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'red',
  },
  orderItemsContainer: {
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#5fb2b5',
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  productQuantity: {
    fontSize: 17,
    marginBottom: 5,
    color: 'red',
  },
  productPrice: {
    color: 'red',
  },
  paymentDetails: {
    borderTopWidth: 2,
    borderTopColor: '#51aca5',
    paddingTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51aca5',
  },
  section: {
    color: 'red',
  },
  deliveryDetails: {
    marginTop: 10,
  },
});

export default TrackOrderScreen;
