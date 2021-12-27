import React from 'react';
import { FlatList, View, Button, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/Shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productAction from '../../store/actions/ProductsAction';

import Colors from '../../constants/Colors';

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const { navigation } = props;

  const editProductHandler = (id) => {
    navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure ?', 'Do you realy want to delete this item ?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(productAction.deleteProduct(id)),
      },
    ]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'My Product',
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
            title='Add'
            iconName={'md-create'}
            onPress={() =>
              navigation.navigate('EditProduct', { productId: undefined })
            }
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            accessFrom={'UserScreen'}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}
          >
            <Button
              color={Colors.primary}
              title='Edit'
              onPress={() => editProductHandler(itemData.item.id)}
            />
            <Button
              color={Colors.primary}
              title='Delete'
              onPress={() => deleteHandler(itemData.item.id)}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

export default UserProductScreen;
