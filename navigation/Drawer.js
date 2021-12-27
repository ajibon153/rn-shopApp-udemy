import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ShopNavigator from './ShopNavigation';

import CartScreen from '../screens/shop/CartScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import {
  HomeNavigator,
  CartNavigator,
  OrdersNavigator,
  AdminNavigator,
} from './ShopNavigation';

import { Platform } from 'react-native';
import Colors from '../constants/Colors';

const Drawer = createDrawerNavigator();

const Styles = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : '',
  textAlign: 'center',
};

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ ...Styles, headerShown: false }}>
        <Drawer.Screen name='Home' component={HomeNavigator} />
        {/* <Drawer.Screen name='My Cart' component={CartNavigator} /> */}
        <Drawer.Screen name='Order' component={OrdersNavigator} />
        <Drawer.Screen name='Admin' component={AdminNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;
