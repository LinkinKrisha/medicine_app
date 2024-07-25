import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';

const AdminTransactionsScreen = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://192.168.43.59:3000/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const ordersData = await response.json();
      // Ensure status is set (default to "Pending" if not provided by backend)
      const ordersWithDefaultStatus = ordersData.map(order => ({
        ...order,
        status: order.status || 'Pending'
      }));
      setOrders(ordersWithDefaultStatus.reverse()); // Reverse the array here
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      // Handle error as per your app's requirements
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
  
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating order status:', error.message);
      Alert.alert('Error', 'Failed to update order status. Please try again later.');
    }
  };
  

  const filteredOrders = orders.filter(order => filter === 'All' || order.status === filter);

  const renderOrderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <ScrollView horizontal>
        <View style={[styles.cell, { flex: 0.1 }]}>
          <Text style={styles.label}>ID</Text>
          <Text style={styles.text}>{item.id}</Text>
        </View>
        <View style={[styles.cell, { flex: 0.25 }]}>
          <Text style={styles.label}>Address</Text>
          <Text style={[styles.text, styles.addressText]}>{item.address}</Text>
        </View>
        <View style={[styles.cell, { flex: 0.15 }]}>
          <Text style={styles.label}>Amount</Text>
          <Text style={[styles.text, styles.amountText]}>RS:{item.total_amount}</Text>
        </View>
        <View style={[styles.cell, { flex: 0.15 }]}>
          <Text style={styles.label}>Payment</Text>
          <Text style={styles.text}>{item.payment_method}</Text>
        </View>
        <View style={[styles.cell, { flex: 0.15 }]}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.text}>{item.created_at}</Text>
        </View>
        <View style={[styles.cell, { flex: 0.2 }]}>
          <Text style={styles.label}>Products</Text>
          <View>
            {item.items.map((product, index) => (
              <View key={index}>
                <Text style={styles.productText}>{product.label}</Text>
                <Text style={styles.productText}>Qty: {product.quantity}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.cell, { flex: 0.15 }]}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: item.status === 'Pending' ? '#ffcc00' : '#aaa' }]}
              onPress={() => handleStatusChange(item.id, 'Pending')}
              disabled={item.status === 'Pending'}
            >
              <Text style={styles.statusText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: item.status === 'Approved' ? '#00cc00' : '#aaa' }]}
              onPress={() => handleStatusChange(item.id, 'Approved')}
              disabled={item.status === 'Approved'}
            >
              <Text style={styles.statusText}>Approved</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: item.status === 'Denied' ? '#cc0000' : '#aaa' }]}
              onPress={() => handleStatusChange(item.id, 'Denied')}
              disabled={item.status === 'Denied'}
            >
              <Text style={styles.statusText}>Denied</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <View style={styles.filterContainer}>
        {['All', 'Approved', 'Pending', 'Denied'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filter === status && styles.selectedFilterButton]}
            onPress={() => setFilter(status)}
          >
            <Text style={styles.filterButtonText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredOrders}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#4CAF50', // Change this color to any color you prefer
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
  },
  text: {
    marginBottom: 5,
    fontSize: 15,
    color: 'white',
  },
  amountText: {
    color: 'red',
  },
  addressText: {
    marginBottom: 5,
    fontSize: 14,
    flexWrap: 'wrap',
    width: 150, // You can adjust the width to your requirement
    color: 'white',
  },
  productText: {
    marginBottom: 2,
    fontSize: 16,
    color: 'white',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#aaa',
  },
  statusText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});

export default AdminTransactionsScreen;
