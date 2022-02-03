import React from 'react';
import { View, ActivityIndicator, FlatList, Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useFocusEffect } from '@react-navigation/native';

import ProductItem from '../../components/Shop/ProductItem';
import * as CartAction from '../../store/actions/CartAction';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import * as productActions from '../../store/actions/ProductsAction';
import Colors from '../../constants/Colors';

const ProductOverviewScreen = (props) => {
  const [IsLoading, setIsLoading] = React.useState(true);
  const [IsRefreshing, setIsRefreshing] = React.useState(true);
  const [Error, setError] = React.useState(null);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const { navigation } = props;

  // // ==================== UDEMY EXPIRED ====================
  // const loadProducts = React.useCallback(async () => {
  // //console.log('loadProducts');
  //   setError(null);
  //   try {
  //     await dispatch(productActions.fetchProducts());
  //   } catch (error) {
  //     setError(err.message);
  //   }
  //   setIsLoading(false);
  // }, [dispatch, setIsLoading, setError]);

  // React.useEffect(() => {
  //   // re-get tiap pindah menu dari navigation
  //   const willFocusSub = navigation.addListener('willFocus', loadProducts);
  //   // console.log('navigation', navigation);

  //   return () => {
  //     // clear function useEffect
  //   //console.log('willFocusSub remove', willFocusSub);
  //     // willFocusSub.remove();
  //   };
  // }, [loadProducts]);

  // // ==================== END UDEMY EXPIRED ====================

  // ==================== NEW ====================

  const loadProducts = async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      //console.log(' ============ START ============ ');
      await dispatch(productActions.fetchProducts());
    } catch (error) {
      // console.log(' --------- ', error, ' --------- ');
      setError(error.message);
    }
    setIsRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      // console.log('============ loadProducts ============');
      loadProducts().then(() => setIsLoading(false));
    }, [dispatch, setIsLoading, setError])
  );

  // ==================== END NEW ====================

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Product',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Menu'
            iconName={'md-menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Cart'
            iconName={'md-cart'}
            onPress={() => {
              navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (IsLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );

  if (!IsLoading && products.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Product, You can start adding some!</Text>
      </View>
    );

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={IsRefreshing}
      data={products}
      keyExtractor={(item, i) => {
        return item.id;
        // return i.toString();
      }}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          title={itemData.item.title}
          accessFrom={'Prod Overview'}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => dispatch(CartAction.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductOverviewScreen;
