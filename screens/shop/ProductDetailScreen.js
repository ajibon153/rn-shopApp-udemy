import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import * as CartAction from '../../store/actions/CartAction';

const ProductDetailScreen = (props) => {
  // const productId = props.navigation.getParam('productId');
  // const productTitle = props.navigation.getParam('productTitle');
  const dispatch = useDispatch();
  const { productId, productTitle } = props.route.params;

  React.useEffect(() => {
    props.navigation.setOptions({
      title: productTitle,
    });
  }, []);

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  // console.log('selectedProduct', selectedProduct);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Add to Cart'
          onPress={() => {
            //console.log('selectedProduct', selectedProduct);
            dispatch(CartAction.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>Rp. {selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  //console.log('navData', navData);
  // console.log(
  //   'navData productTitle',
  //   navData.navigation.getParam('productTitle')
  // );
  return {
    headerTitle: 'product Title',
    // headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
