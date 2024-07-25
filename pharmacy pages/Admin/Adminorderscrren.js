import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminOrdersTabNavigator from './Admintabnavigator';

const AdminOrder = ({ route }) => {
  const { adminName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {adminName}</Text>
      <AdminOrdersTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
});

export default AdminOrder;
