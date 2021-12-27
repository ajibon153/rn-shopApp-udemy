import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { AppLoading } from 'expo';
import AppLoading from 'expo-app-loading';

import * as Font from 'expo-font';

import ProductReducer from './store/reducer/ProductReducer';
import CartReducer from './store/reducer/CartReducer';
import OrderReducer from './store/reducer/OrderReducer';
// import ShopNavigation from './navigation/ShopNavigation';
import MyDrawer from './navigation/Drawer';

const rootReducer = combineReducers({
  products: ProductReducer,
  cart: CartReducer,
  order: OrderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  //console.log('fetchFonts');
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log('ERROR', err)}
      />
    );
  }

  return (
    <>
      <Provider store={store}>
        <MyDrawer />
        {/* <ShopNavigation /> */}
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
