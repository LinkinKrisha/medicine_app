import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Frontpage from '../pharmacy pages/Frontpage';
import MainNavigator from './Mainnavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Frontpage">
      <Drawer.Screen name="Frontpage" component={Frontpage} />
      <Drawer.Screen name="MainNavigator" component={MainNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
