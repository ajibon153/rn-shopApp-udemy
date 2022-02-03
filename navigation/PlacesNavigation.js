import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Platform } from 'react-native';

import PlaceListScreen from '../screens/DeviceFeature/PlaceListScreen';
import PlaceDetailScreen from '../screens/DeviceFeature/PlaceDetailScreen';
import MapScreen from '../screens/DeviceFeature/MapScreen';
import NewPlaceScreen from '../screens/DeviceFeature/NewPlaceScreen';

import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const Styles = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.secondary : '',
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

const PlaceNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...Styles,
      }}
    >
      <Stack.Screen name='PlaceList' component={PlaceListScreen} />
      <Stack.Screen name='PlaceDetail' component={PlaceDetailScreen} />
      <Stack.Screen name='NewPlace' component={NewPlaceScreen} />
      <Stack.Screen name='Map' component={MapScreen} />
    </Stack.Navigator>
  );
};

export { PlaceNavigator };
