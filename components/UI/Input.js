import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_FOCUS = 'INPUT_FOCUS';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      // console.log(INPUT_CHANGE, action);

      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    case INPUT_FOCUS:
      return {
        ...state,
        touched: false,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValidation,
    touched: false,
  });

  const { onChangeInputHandler, id } = props;

  useEffect(() => {
    // console.log('touched', inputState.touched);
    // console.log('inputState.isValid', inputState.isValid);
    // if (inputState.touched) {
    // console.log('==== onChangeInputHandler ====');
    onChangeInputHandler(id, inputState.value, inputState.isValid);
    // }
  }, [inputState, onChangeInputHandler, id]);

  useEffect(() => {
    // console.log('inputState', inputState);
  }, []);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) isValid = false;
    if (props.email && !emailRegex.test(text.toLowerCase())) isValid = false;
    if (props.min != null && +text < props.min) isValid = false;
    // if (props.max != null && +text > props.max) isValid = false;
    if (props.minLength != null && text.length < props.minLength)
      isValid = false;
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    // console.log(INPUT_BLUR);
    dispatch({ type: INPUT_BLUR });
  };
  const getFocusHandler = () => {
    // console.log(INPUT_FOCUS);
    // dispatch({ type: INPUT_FOCUS });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        onFocus={getFocusHandler}
      />
      {!inputState.isValid && (
        <View>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 14,
  },
});

export default Input;
