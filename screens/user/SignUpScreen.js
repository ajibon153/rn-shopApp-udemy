import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';

const SignUpScreen = (props) => {
  const { navigation } = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Authenticate',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='back'
            iconName={'ios-arrow-back'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={Styles.screen}
    >
      <LinearGradient
        colors={(['#ffedff'], ['#ffe3ff'])}
        style={Styles.gradient}
      >
        <Card>
          <ScrollView>
            <Input
              id='email'
              label='E-Mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorMessage='Enter a valid email address'
              onInputChange={() => {}}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLengt={5}
              autoCapitalize='none'
              errorMessage='Enter a valid password address'
              onInputChange={() => {}}
              initialValue=''
            />
          </ScrollView>
          <View style={Styles.buttonContainer}>
            <Button color={Color.primary} title='Login' onPress={() => {}} />
          </View>
          <View style={Styles.buttonContainer}>
            <Button
              color={Color.accent}
              title='Switch to Sign Up'
              onPress={() => {}}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: '50%',
    maxHeight: 400,
    padding: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default SignUpScreen;
