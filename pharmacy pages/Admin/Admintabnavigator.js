import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CategoriesScreen from './Categoriey';
import ProductsScreen from './Products';
import AdminTransactionsScreen from './Transactions';
import Adminlogout from './Adminlogout';

const Tab = createBottomTabNavigator();

const AdminOrdersTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { fontSize: 13 }, // Adjust label font size
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Categories') {
            iconName = 'th-large';
          } else if (route.name === 'Products') {
            iconName = 'plus-circle'; // Plus icon next to Products
          } else if (route.name === 'Transactions') {
            iconName = 'exchange'; // Icon for Transactions
          } else if (route.name === 'Logout') {
            iconName = 'sign-out'; // Logout icon
          } else {
            iconName = 'list-alt'; // Default icon for other tabs (like Orders)
          }
          return <FontAwesome name={iconName} size={focused ? 30 : 30} color={focused ? '#ff6347' : '#51aca5'} />;
        },
        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: '#51aca5',
      })}
    >
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ tabBarLabel: () => null }} // Hide label for Categories tab
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{ tabBarLabel: () => null }} // Hide label for Products tab
      />
      <Tab.Screen
        name="Transactions"
        component={AdminTransactionsScreen} // Assuming this is where transaction-related content is
        options={{ tabBarLabel: () => null  }} // Display label for Transactions tab
      />
      <Tab.Screen
        name="Logout"
        component={Adminlogout}
        options={{ tabBarLabel: ()=> null}}
      />
    </Tab.Navigator>
  );
};

export default AdminOrdersTabNavigator;
