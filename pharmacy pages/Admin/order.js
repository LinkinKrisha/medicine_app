
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminOrdersTabNavigator from './Admintabnavigator';

const MyOrdersPage = ({ route }) => {
  const { adminName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 24/7 pharmacy! {adminName}</Text>
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
    margin: 30,
    textAlign: 'center',

  },
});

export default MyOrdersPage;
