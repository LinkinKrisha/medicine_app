import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedAddressScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Saved Address Screen</Text>
      {/* Add your saved address screen content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SavedAddressScreen;
