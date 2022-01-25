import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as authAction from '../../store/actions/AuthAction';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    // console.log('action.input ==', action.input);
    const updateValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updateFormIsValid = true;
    // console.log('updateValidities', updateValidities);
    for (const key in updateValidities) {
      updateFormIsValid = updateFormIsValid && updateValidities[key];
    }
    // console.log('updateFormIsValid', updateFormIsValid);
    return {
      inputValues: updateValues,
      inputValidities: updateValidities,
      formIsValid: updateFormIsValid,
    };
  }

  return state;
};

const AuthScreen = (props) => {
  const { navigation } = props;

  const [IsLoading, setIsLoading] = React.useState(false);
  const [IsError, setIsError] = React.useState(null);
  const [IsSignUp, setIsSignUp] = React.useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFromState] = React.useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  React.useEffect(() => {
    if (IsError)
      Alert.alert(`${IsSignUp ? 'Sign Up' : 'Log in'} Failed`, IsError, [
        { text: 'Okay' },
      ]);
  }, [IsError]);

  const onChangeInputHandler = React.useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      // console.log(
      //   'OOO onChangeInputHandler OOO',
      //   inputIdentifier,
      //   inputValue,
      //   inputValidity
      // );
      dispatchFromState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFromState]
  );

  const authHandler = async () => {
    // console.log(
    //   'authHandler',
    //   formState.inputValues.email,
    //   formState.inputValues.password
    // );
    let action;
    if (IsSignUp) {
      action = authAction.signupAuthenticate(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authAction.signinAuthenticate(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setIsLoading(true);
    try {
      let check = await dispatch(action);
      //console.log('check', check);
      if (check.success) {
        //console.log('BERHASIL !');
        navigation.navigate('MyProducts');
      } else {
        setIsError(check.error);
      }
    } catch (error) {
      //console.log('authHandler err', error);
      setIsError(error.message);
    }
    setIsLoading(false);
  };

  React.useLayoutEffect(() => {
    //console.log('============================');
    // console.log('AuthScreen', props);
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
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={Styles.gradient}>
        <Card style={Styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-Mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Enter a valid email address'
              onChangeInputHandler={onChangeInputHandler}
              initialValue=''
              initialValidation={true}
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLengt={5}
              autoCapitalize='none'
              errorText='Enter a valid password'
              onChangeInputHandler={onChangeInputHandler}
              initialValue=''
              initialValidation={true}
            />
          </ScrollView>
          <View style={Styles.buttonContainer}>
            {IsLoading ? (
              <ActivityIndicator />
            ) : (
              <Button
                color={Colors.primary}
                title={`${IsSignUp ? 'Sign Up' : 'Login'}`}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={Styles.buttonContainer}>
            <Button
              color={Colors.accent}
              title={`Switch to ${IsSignUp ? 'Login' : 'Sign Up'}`}
              onPress={() => setIsSignUp(!IsSignUp)}
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
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
