import React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
// import OrderItem from '../../components/Shop/OrderItem';
import CartItem from '../../components/Shop/CartItem';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

import * as ordersAction from '../../store/actions/OrderAction';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  const { navigation } = props;

  const [IsLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(ordersAction.fetchOrders()).then(() => setIsLoading(false));
    // .catch((err) => console.log('err', err));
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='Orders'
            iconName={'ios-arrow-back'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (IsLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={'small'} color={Colors.primary} />
      </View>
    );

  if (!IsLoading && orders.length === 0)
    return (
      <View style={styles.centered}>
        <Text>Not have order , maybe start ordering now ?</Text>
      </View>
    );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <>
            <OrderItem
              amount={itemData.item.totalAmount}
              date={itemData.item.readableDate}
              items={itemData.item.items}
            />
            {/* <View style={styles.orderItem}>
              <View style={styles.summary}>
                <Text style={styles.totalAmount}>
                  Rp. {itemData.item.totalAmount}
                </Text>
                <Text style={styles.date}>{itemData.item.readableDate}</Text>
              </View>
              <Button color={Colors.primary} title='Show Details' />
            </View> */}
          </>
        );
      }}
    />
  );
};

export default OrdersScreen;

const OrderItem = (props) => {
  const [ShowDetail, setShowDetail] = React.useState(false);
  //console.log(props.items);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>Rp. {props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={ShowDetail ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetail(!ShowDetail)}
      />
      {ShowDetail && (
        <View style={styles.detailItem}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              accessFrom='order'
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 12,
    color: '#888',
  },
  detailItem: {
    width: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
