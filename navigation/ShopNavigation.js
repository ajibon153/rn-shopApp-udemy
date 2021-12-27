import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Platform } from 'react-native';

import CartScreen from '../screens/shop/CartScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

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
  height: 50,
};

const CartNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        ...Styles,
      }}
    >
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='Orders' component={OrdersScreen} />
    </Stack.Navigator>
  );
};
const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...Styles,
      }}
    >
      <Stack.Screen name='Orders' component={OrdersScreen} />
      {/* <Stack.Screen name='ProductOverview' component={ProductOverviewScreen} /> */}
    </Stack.Navigator>
  );
};
const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...Styles,
      }}
    >
      <Stack.Screen name='MyProducts' component={UserProductScreen} />
      <Stack.Screen name='EditProduct' component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...Styles,
      }}
    >
      <Stack.Screen name='ProductOverview' component={ProductOverviewScreen} />
      <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='Orders' component={OrdersScreen} />
      <Stack.Screen name='Admin' component={OrdersScreen} />
    </Stack.Navigator>
  );
};

export { HomeNavigator, CartNavigator, OrdersNavigator, AdminNavigator };
