import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import CartScreen from '../screens/shop/CartScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import SignUpScreen from '../screens/user/SignUpScreen';
import StartUpScreen, { LogoutScreen } from '../screens/StartUpScreen';

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

const AuthNavigator = () => {
  const UID = useSelector((state) => state.auth.userId);

  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        ...Styles,
      }}
    >
      {UID ? (
        <Stack.Screen name='MyProducts' component={UserProductScreen} />
      ) : (
        <Stack.Screen name='Auth' component={AuthScreen} />
      )}
      <Stack.Screen name='ProductOverview' component={ProductOverviewScreen} />
    </Stack.Navigator>
  );
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
  //console.log('UID AdminNavigator', UID);
  return (
    <Stack.Navigator
      screenOptions={{
        ...Styles,
      }}
    >
      {/* <Stack.Screen name='StartUp' component={StartUpScreen} /> */}
      {/* {UID ? ( */}
      <Stack.Screen name='Auth' component={AuthScreen} />
      <Stack.Screen name='MyProducts' component={UserProductScreen} />
      {/* ) : ( */}
      {/* )} */}

      <Stack.Screen name='EditProduct' component={EditProductScreen} />
    </Stack.Navigator>
  );
};

const HomeNavigator = (props) => {
  const UID = useSelector((state) => state.auth.userId);

  React.useEffect(() => {
    // console.log('HomeNavigator', UID, props);
    if (!UID) props.navigation.navigate('Logout');
  }, [UID]);
  return (
    <Stack.Navigator
      screenOptions={{
        ...Styles,
      }}
    >
      <Stack.Screen name='StartUp' component={StartUpScreen} />
      <Stack.Screen name='ProductOverview' component={ProductOverviewScreen} />
      <Stack.Screen name='ProductDetail' component={ProductDetailScreen} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name='Orders' component={OrdersScreen} />
      <Stack.Screen name='MyProducts' component={UserProductScreen} />
      <Stack.Screen name='Auth' component={AuthScreen} />
      <Stack.Screen name='Logout' component={LogoutScreen} />
    </Stack.Navigator>
  );
};

export {
  HomeNavigator,
  CartNavigator,
  OrdersNavigator,
  AdminNavigator,
  AuthNavigator,
};
