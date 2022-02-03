import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

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
  AuthNavigator,
} from './ShopNavigation';
import { PlaceNavigator } from './PlacesNavigation';

import { Platform, Button, View } from 'react-native';
import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoutScreen } from '../screens/StartUpScreen';

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

const MyDrawer = (props) => {
  const UID = useSelector((state) => state.auth.userId);
  // console.log('MyDrawer', props);
  React.useEffect(() => {
    //console.log('MyDrawer', UID);
  }, [UID]);

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ ...Styles, headerShown: false }}>
        <Drawer.Screen name='Home' component={HomeNavigator} />
        {/* <Drawer.Screen name='My Cart' component={CartNavigator} /> */}
        <Drawer.Screen name='Order' component={OrdersNavigator} />
        <Drawer.Screen name='Admin' component={AdminNavigator} />
        {UID && (
          <Drawer.Screen
            name='Logout'
            component={LogoutScreen}
            // ref={props.innerRef}
          />
        )}
        <Drawer.Screen name='Device Featured' component={PlaceNavigator} />

        {/* <Drawer.Screen name='Auth' component={AuthNavigator} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// const LogoutButton = (props) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//         <DrawerItem {...props} />
//         <Button title='Logout' color={Colors.primary} onPress={() => {}} />
//       </SafeAreaView>
//     </View>
//   );
// };

export default MyDrawer;
