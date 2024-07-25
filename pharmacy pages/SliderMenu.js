import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Frontpage = () => {
  // Dummy function for menu item press
  const handleMenuItemPress = (item) => {
    console.log(`Pressed ${item}`);
    // Add logic to navigate or perform actions based on the item
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="bars" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>24/7 Pharmacy</Text>

        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{uri: "https://img.icons8.com/?size=100&id=NpdrhxFy2nPV&format=png&color=000000"}}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Menu Bar */}
      <View style={styles.menuBar}>
        <MenuItem icon="home" text="Home" onPress={() => handleMenuItemPress('Home')} backgroundColor="#64b5f6" />
        <MenuItem icon="percent" text="Offers" onPress={() => handleMenuItemPress('Offers')} backgroundColor="#81c784" />
        <MenuItem icon="shopping-cart" text="Cart" onPress={() => handleMenuItemPress('Cart')} backgroundColor="#ffb74d" />
        <MenuItem icon="user" text="Account" onPress={() => handleMenuItemPress('Account')} backgroundColor="#ba68c8" />
        <MenuItem icon="map-marker" text="Saved Address" onPress={() => handleMenuItemPress('Saved Address')} backgroundColor="#4db6ac" />
        <MenuItem icon="list-alt" text="My Orders" onPress={() => handleMenuItemPress('My Orders')} backgroundColor="#ffd54f" />
        <MenuItem icon="map-pin" text="Track Order" onPress={() => handleMenuItemPress('Track Order')} backgroundColor="#4dd0e1" />
        <MenuItem icon="bell" text="Notifications" onPress={() => handleMenuItemPress('Notifications')} backgroundColor="#f06292" />
        <MenuItem icon="cog" text="Settings" onPress={() => handleMenuItemPress('Settings')} backgroundColor="#90a4ae" />
        <MenuItem icon="question-circle" text="Help" onPress={() => handleMenuItemPress('Help')} backgroundColor="#ff8a65" />
        <MenuItem icon="sign-out" text="Logout" onPress={() => handleMenuItemPress('Logout')} backgroundColor="#e57373" />
      </View>
    </View>
  );
};

const MenuItem = ({ icon, text, onPress, backgroundColor }) => (
  <TouchableOpacity style={[styles.menuItem, { backgroundColor }]} onPress={onPress}>
    <FontAwesome name={icon} size={20} color="#fff" style={styles.menuItemIcon} />
    <Text style={styles.menuItemText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51aca5',
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 5,
  },
  menuButton: {
    padding: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    textAlign: 'center',
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  menuBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  menuItem: {
    width: '30%',
    aspectRatio: 1, // Aspect ratio to make each item square
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    elevation: 3,
  },
  menuItemIcon: {
    marginBottom: 5,
  },
  menuItemText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Frontpage;
