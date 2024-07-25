import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DisplayPage from './pharmacy pages/Displaypage';
import SliderPage from './pharmacy pages/Sliderpage';
import Loginpage from './pharmacy pages/Loginpage';
import Registerpage from './pharmacy pages/Registerpage';
import OTPVerification from './pharmacy pages/Otp';
import HomePage from './pharmacy pages/Homepage';
import FullScreenMapScreen from './pharmacy pages/Fullscreenmap';
import WelcomePage from './pharmacy pages/Welcomepage';
import Frontpage from './pharmacy pages/Frontpage';
import OffersScreen from './drawer-bars/offers';
import CartScreen from './drawer-bars/Cart';
import AccountScreen from './drawer-bars/Account';
import MyOrdersScreen from './drawer-bars/Myorder';
import NotificationsScreen from './drawer-bars/Notiification';
import SettingsScreen from './drawer-bars/Setting';
import HelpScreen from './drawer-bars/Help';
import LogoutScreen from './drawer-bars/Logout';
import DoctorAppointmentScreen from './pharmacy pages/Doctorappoitmentscreen';
import AdminLoginPage from './pharmacy pages/Admin/Adminlogin';
import PatientDetails from './pharmacy pages/Admin/PatientDetails';
import RequestDetails from './pharmacy pages/Admin/Requestdetails';
import MyOrdersPage from './pharmacy pages/Admin/order';
import CheckoutScreen from './drawer-bars/Checkout';
import OrderSuccessScreen from './drawer-bars/Ordersucessscrren';
import Wishlist from './pharmacy pages/Wishlist';
import CategoryProductsScreen from './pharmacy pages/Catogryproductscreen';
import ProductDetail from './pharmacy pages/Productdetails';
import TrackOrderScreen from './pharmacy pages/Trackordescrren';
import UserOrderScreen from './drawer-bars/Myorder';
import ProductListScreen from './pharmacy pages/Admin/ProductList';
import AddProductScreen from './pharmacy pages/Admin/Addproduct';
import UserProductListScreen from './pharmacy pages/Userproductlist';
import Cart from './drawer-bars/Cart';
import AppointmentBooking from './pharmacy pages/AppointmentBooking';

// Create stack, drawer, and tab navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Custom drawer content component
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} style={styles.drawerContent}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);
const MainNavigator = () => (
  <Stack.Navigator initialRouteName="display">
    <Stack.Screen name="Slider" component={SliderPage} options={{ headerShown: false }} />
    <Stack.Screen name="display" component={DisplayPage} options={{ headerShown: false }} />
    <Stack.Screen name="login" component={Loginpage} options={{ headerShown: false }} />
    <Stack.Screen name="welcome" component={WelcomePage} options={{ headerShown: false }} />
    <Stack.Screen name="home" component={HomePage} options={{ headerShown: false }} />
    <Stack.Screen name="FullScreenMap" component={FullScreenMapScreen} options={{ headerShown: false }} />
    <Stack.Screen name="register" component={Registerpage} options={{ headerShown: false }} />
    <Stack.Screen name="otpverification" component={OTPVerification} options={{ headerShown: false }} />
    <Stack.Screen name="mainpage" component={Frontpage} options={{ headerShown: false }} />
    <Stack.Screen name="doctorappoitment" component={DoctorAppointmentScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PatientDetails" component={PatientDetails} options={{ title: 'Patient Details' }}/>
    <Stack.Screen name="RequestDetails" component={RequestDetails} options={{ title: 'Request Details' }}/>
    <Stack.Screen name="orderpage" component={MyOrdersPage} options={{ headerShown: false }}/>
    <Stack.Screen name="checkout" component={CheckoutScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="frontpage" component={Frontpage} options={{ headerShown: false }} />
    <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false }}/>
    <Stack.Screen name="categoryproducts" component={CategoryProductsScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="productdetails" component={ProductDetail} options={{ headerShown: false }}/>
    <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} options={{ headerShown: false }}/>
    {/* Admin */}
    <Stack.Screen name="admin" component={AdminLoginPage} options={{ title: 'Admin Login'  ,headerShown: false}}   />
    <Stack.Screen name="productlist" component={ProductListScreen} options={{headerShown: false}}   />
    <Stack.Screen name="addproduct" component={AddProductScreen} options={{headerShown: false}}   />
    <Stack.Screen name="userproductlist" component={UserProductListScreen} options={{headerShown: false}}   />
  </Stack.Navigator>
);

// Stack navigator for drawer screens
const MainStack = () => (
  <Stack.Navigator initialRouteName="home">
    <Stack.Screen name="frontpage" component={Frontpage} options={{ headerShown: false }} />
    <Stack.Screen name="offers" component={OffersScreen} options={{ headerShown: false }} />
    <Stack.Screen name="cart" component={Cart} options={{ headerShown: false }} />
    <Stack.Screen name="account" component={AccountScreen} options={{ headerShown: false }} />
    <Stack.Screen name="savedAddress" component={SavedAddressScreen} options={{ headerShown: false }} />
    <Stack.Screen name="myOrders" component={MyOrdersScreen} options={{ headerShown: false }} />
    <Stack.Screen name="notifications" component={NotificationsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="settings" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="help" component={HelpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="logout" component={LogoutScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Wishlist" component={Wishlist} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={MainNavigator} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="home" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 60 }, // Adjust content container style
    }} />
    <Drawer.Screen name="Offers" component={OffersScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="percent" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
    <Drawer.Screen name="cart" component={Cart} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="shopping-cart" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 25 }, // Adjust content container style
    }} />
    <Drawer.Screen name="Account" component={AccountScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="user-circle-o" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
    <Drawer.Screen name="trackorder" component={TrackOrderScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="map-marker" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
    <Drawer.Screen name="myOrders" component={UserOrderScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="list-alt" size={30} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
    <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="bell-o" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
    <Drawer.Screen name="Settings" component={SettingsScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="cog" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
    <Drawer.Screen name="Help" component={HelpScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="question-circle-o" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18 }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
    <Drawer.Screen name="Logout" component={LogoutScreen} options={{
      drawerIcon: ({ focused, color, size }) => (
        <FontAwesome name="sign-out" size={35} color={'#51aca5'} />
      ),
      headerShown: false,
      drawerLabelStyle: { marginLeft: -10, fontSize: 18, }, // Adjust label style
      drawerContentContainerStyle: { marginTop: 20 }, // Adjust content container style
    }} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#fff', // Background color of the drawer
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#51aca5', // Border color for drawer items
    marginLeft: 0, // Adjust margin as needed
    paddingLeft: 10, // Adjust padding as needed
  },
  drawerItemText: {
    fontSize: 50, // Adjust font size as needed
    color: '#51aca5', // Text color for drawer item text
    marginLeft: -16, // Adjust margin as needed
  },
});
// Main App Component
const App = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);

export default App;
