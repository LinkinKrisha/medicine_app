import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pharmacy pages/Homepage';
import OffersScreen from './offers';
import AccountScreen from './Account';
import SavedAddressScreen from './Savedadress';
import MyOrdersScreen from './Myorder';
import NotificationsScreen from './Notiification';
import SettingsScreen from './Setting';
import LogoutScreen from './Logout';
import HelpScreen from './Help';
import Cart from './Cart';


const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Display">
      <Stack.Screen name="homepage" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="offers" component={OffersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="account" component={AccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="adress" component={SavedAddressScreen} options={{ headerShown: false }} />
      <Stack.Screen name="orders" component={MyOrdersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="noification" component={NotificationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="help" component={HelpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="setting" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="logout" component={LogoutScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
