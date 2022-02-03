import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/AuthAction';

export default function StartUpScreen(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      // console.log('userData getItem', userData);
      if (!userData) {
        //   props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      console.log('transformedData', transformedData);
      const { token, userId, expiryDate } = transformedData;
      // const expirationDate = new Date(expiryDate);

      // if (expirationDate <= new Date() || !token || !userId) {
      //   props.navigation.navigate('Auth');
      //   return;
      // }

      // const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('ProductOverview');
      dispatch(authActions.Authenticate(userId, token));
    };

    tryLogin();
  }, [dispatch, props]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator
        size={'large'}
        color={Colors.primary}
      ></ActivityIndicator>
    </View>
  );
}
export function LogoutScreen(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const tryLogout = async () => {
      // console.log('LogoutScreen props', props.innerRef);
      // const userData = await AsyncStorage.getItem('userData');
      dispatch(authActions.logoutAct());
      props.navigation.navigate('ProductOverview');
    };

    tryLogout();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator
        size={'large'}
        color={Colors.primary}
      ></ActivityIndicator>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
