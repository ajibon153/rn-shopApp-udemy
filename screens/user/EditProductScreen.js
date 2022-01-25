import React from 'react';
import {
  View,
  // TextInput,
  // Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import ProductItem from '../../components/Shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import * as productAction from '../../store/actions/ProductsAction';

import Colors from '../../constants/Colors';

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

const EditProductScreen = (props) => {
  const [IsLoading, setIsLoading] = React.useState(false);
  const [Error, setError] = React.useState(null);
  const prodId = props.route.params.productId;
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const UID = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();

  const [formState, dispatchFromState] = React.useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : '',
      imageUrl: editProduct ? editProduct.imageUrl : '',
      description: editProduct ? editProduct.description : '',
      price: editProduct ? parseInt(editProduct.price) : 0,
    },
    inputValidities: {
      title: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false,
    },
    formIsValid: editProduct ? true : false,
  });

  // const [Title, setTitle] = React.useState(
  //   editProduct ? editProduct.title : ''
  // );
  // const [ImageUrl, setImageUrl] = React.useState(
  //   editProduct ? editProduct.imageUrl : ''
  // );
  // const [Price, setPrice] = React.useState(
  //   editProduct ? parseInt(editProduct.price) : 0
  // );
  // const [Description, setDescription] = React.useState(
  //   editProduct ? editProduct.description : ''
  // );

  React.useEffect(() => {
    if (!UID) navigation.navigate('Auth');
    if (Error) Alert.alert('An error Occurred!', Error, [{ text: 'Okay' }]);
  }, [Error, UID]);

  const { navigation } = props;

  const onChangeInputHandler = React.useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFromState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFromState]
  );

  const submitHandler = React.useCallback(async () => {
    // console.log('========================');
    // console.log('formState', formState);
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form', [
        { text: 'Okay' },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editProduct) {
        //console.log('====== editProduct ======', editProduct);
        await dispatch(
          productAction.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
        setIsLoading(false);
      } else {
        await dispatch(
          productAction.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
        setIsLoading(false);
      }

      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, prodId, formState]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: prodId ? 'Edit Product' : 'Add Product',
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
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Save'
            iconName={'md-checkmark'}
            onPress={() => {
              submitHandler();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, formState]);

  if (IsLoading)
    return (
      <View style={Styles.centered}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </View>
    );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={Styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            initialValue={editProduct ? editProduct.title : ''}
            initialValidation={!!editProduct}
            required
            onChangeInputHandler={onChangeInputHandler}
          />
          <Input
            id='imageUrl'
            label='Image Url'
            errorText='Please enter a valid image url!'
            keyboardType='default'
            returnKeyType='next'
            initialValue={editProduct ? editProduct.imageUrl : ''}
            initialValidation={!!editProduct}
            required
            onChangeInputHandler={onChangeInputHandler}
          />
          {editProduct ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              min={0.1}
              required
              onChangeInputHandler={onChangeInputHandler}
              initialValidation={true}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editProduct ? editProduct.description : ''}
            initialValidation={!!editProduct}
            required
            minLength={5}
            onChangeInputHandler={onChangeInputHandler}
          />
          {/* <View style={Styles.formCOntrol}>
          <Text style={Styles.label}>Title</Text>
          <TextInput
            style={Styles.input}
            value={formState.inputValues.title}
            onChangeText={onChangeInputHandler.bind(this, 'title')}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
          />
          {formState.inputValidities.title && (
            <Text>Please enter a valid title!</Text>
          )}
        </View>
        <View style={Styles.formCOntrol}>
          <Text style={Styles.label}>Image Url</Text>
          <TextInput
            style={Styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={onChangeInputHandler.bind(this, 'imageUrl')}
            keyboardType='default'
            returnKeyType='next'
          />
          {formState.inputValidities.imageUrl && (
            <Text>Please enter a valid image url!</Text>
          )}
        </View>
        {editProduct ? null : (
          <View style={Styles.formCOntrol}>
            <Text style={Styles.label}>Price</Text>
            <TextInput
              style={Styles.input}
              value={formState.inputValues.price}
              onChangeText={onChangeInputHandler.bind(this, 'price')}
              keyboardType='decimal-pad'
              autoCapitalize='sentences'
              autoCorrect
              returnKeyType='next'
            />
            {formState.inputValidities.price && (
              <Text>Please enter a valid price!</Text>
            )}
          </View>
        )}
        <View style={Styles.formCOntrol}>
          <Text style={Styles.label}>Description</Text>
          <TextInput
            style={Styles.input}
            value={formState.inputValues.description}
            keyboardType='default'
            onChangeText={onChangeInputHandler.bind(this, 'description')}
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
          />
          {formState.inputValidities.description && (
            <Text>Please enter a valid description!</Text>
          )}
        </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formCOntrol: {
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default EditProductScreen;
